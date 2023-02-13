import { Signer } from '@waves/signer';
import { libs } from '@waves/waves-transactions';
import { ProviderSeed } from '@waves/provider-seed';
import Cookies from "js-cookie";
import $ from "jquery";

var referral = Cookies.get('referral');
var address = '';
var seed = '';

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
}

function userExists() {
    var ue = false;
    if (address.length > 0) {
        ue = true;
    }
    return ue;
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