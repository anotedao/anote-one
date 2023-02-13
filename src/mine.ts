import { Signer } from '@waves/signer';
import { libs } from '@waves/waves-transactions';
import { ProviderSeed } from '@waves/provider-seed';
import Cookies from "js-cookie";
import $ from "jquery";
import copy from 'copy-to-clipboard';

let referral = Cookies.get('referral');
let address = '';
let seed = '';

function loadData() {
    var s = localStorage.getItem('seedTemp'); 
    if (s != null) {
        seed = s;
    }

    var a = localStorage.getItem('addressTemp'); 
    if (a != null) {
        address = a;
    }
}

async function createUser() {
    seed = libs.crypto.randomSeed();
    var signer = new Signer({
        NODE_URL: 'https://node.anote.digital',
    });
    var provider = new ProviderSeed(seed);
    provider.connect({
        NODE_URL: 'https://node.anote.digital',
        NETWORK_BYTE: 55,
    });
    signer.setProvider(provider);
    var user = await signer.login();
    address = user.address;

    localStorage.setItem("seedTemp", seed);
    localStorage.setItem("addressTemp", address);

    isReferralAlias();
}

function saveUserServer() {
    var url = 'https://mobile.anote.digital/new-user/' + address;
    if (referral != undefined && referral?.length > 0) {
        url += '/' + referral;
    }
    $.getJSON(url, function(data) {
        if (!data.success) {
            console.log(data.error);
        }
    });
}

function userExists() {
    var ue = false;
    if (address.length > 0) {
        ue = true;
    }
    return ue;
}

function isReferralAlias() {
    if (referral != undefined && referral?.length > 0) {
        $.getJSON("https://node.anote.digital/alias/by-alias/" + referral, function(data) {
            if (data.error != undefined && data.error > 0) {
                console.log(data.message);
            } else {
                referral = data.address;
            }
            isReferralValid();
        });
    }
}

function isReferralValid() {
    if (referral != undefined && referral?.length > 0) {
        $.getJSON("https://node.anote.digital/addresses/validate/" + referral, function(data) {
            if (!data.valid) {
                referral = '';
            }
            saveUserServer();
        });
    }
}

async function main() {
    loadData();

    if (!userExists()) {
        await createUser();
    }

    console.log(address);
    $("#seed").html(seed);
}

main();

$("#buttonCopy").on("click", function () {
    copy(String(seed));
    $("#messageCopy").fadeIn(function () {
        setTimeout(function () {
            $("#messageCopy").fadeOut();
        }, 1000);
    });
});