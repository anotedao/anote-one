import { Signer } from '@waves/signer';
import { libs } from '@waves/waves-transactions';
import { ProviderSeed } from '@waves/provider-seed';
import Cookies from "js-cookie";

var savedReferral = Cookies.get('referral');

function getSeed() {
    var seed = libs.crypto.randomSeed();
    console.log(seed);
}

function initWaves() {
    // console.log(savedReferral);
    getSeed();
}

initWaves();