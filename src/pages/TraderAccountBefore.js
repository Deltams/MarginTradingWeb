import React, { Component } from "react";
import logoTraderAccount from "./LogoLiquidityPool.png";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { ethers } from "ethers";

export default class TraderAccount extends Component {
  constructor() {
    super();

    this.state = {
      balanceUser: "0", // Баланс на кошельке пользователя
      currentWETHQuote: null,
      currentMarginLevel: null,
      currentAvailable: null,
      currentAvailableWETH: null,
      showBorrow: 1,
      hiddenDeposit: false, // Переключатель для показа формы внесения депозита
      hiddenWithdraw: false, // Переключатель для показа формы вывода депозита
      deposit: "0", // Сейчас деньги пользователя, которые он перевел в Liquidity pool
      annualPercentageRate: "15", // Примерная процентная ставка дохода от вложенных средств
      totalMoney: "94567830120", // Всего денег на контракте Liquidity pool
      totalTrade: "5000000000", // Всего денег на контракте в данный момент заблокировано (торгуется)
      userAccount: "", // Адрес кошелька, с которым происходит взаимодействие
      userAmountSend: "", // Сколько пользователь готов внести в Liquidity pool
      userAmountSendTRA: "", // Сколько пользователь готов внести в TRA
      userAmountBorrowTRA: "", // Сколько пользователь готов взять из LP
      userAmountExchangeTRA: "", // Сколько пользователь готов обменять через TRA
      userWETHToUSDC: "",
      userMargin: "",
      userHF: "",
      userEntryPrice: "",
      userLiquidityPrice: "",
      userDifference: "",
      userDEBT: "",
      typeOfSwap: 0,
    };

    // Заполняем необходимую информацию по контрактам
    this.addressLP = "0x76a999d5f7efde0a300e710e6f52fb0a4b61ad58"; // В тестовой сети
    this.abiLP = `[{"inputs":[{"internalType":"address","name":"_USDC","type":"address"},{"internalType":"address","name":"_CA","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"ICA","outputs":[{"internalType":"contract ICentralAccount","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDC","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"accrueLoss","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"accrueProfit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"balanceX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUserBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferToLP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]`;
    this.addressUSDC = "0xae246e208ea35b3f23de72b697d47044fc594d5f"; // В тестовой сети
    this.abiUSDC = `[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]`;
    this.addressCA = "0x084815d1330ecc3ef94193a19ec222c0c73dff2d"; // В тестовой сети
    this.abiCA = `[{"inputs":[{"internalType":"address","name":"_USDC","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"ILP","outputs":[{"internalType":"contract ILiquidityPool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ITRA","outputs":[{"internalType":"contract ITraderAccount","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDC","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"availableUSDC","outputs":[{"internalType":"uint256","name":"answer","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"countUSDCOwner","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"countUSDCTraders","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"getTraderDebt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ownerProfit","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_profitOrLoss","type":"uint256"},{"internalType":"bool","name":"_PORL","type":"bool"}],"name":"returnTraderDebt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_LP","type":"address"}],"name":"setLP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_ownerProfit","type":"uint16"}],"name":"setOwnerProfit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_SC","type":"address"}],"name":"setSC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_TRA","type":"address"}],"name":"setTRA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]`;
    this.addressTRA = "0x564db7a11653228164fd03bca60465270e67b3d7";
    this.abiTRA = `[
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_USDC",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_WETH",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_CA",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "ICA",
        "outputs": [
          {
            "internalType": "contract ICentralAccount",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "IRM",
        "outputs": [
          {
            "internalType": "contract IRiskManager",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ISC",
        "outputs": [
          {
            "internalType": "contract ISwapContract",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "USDC",
        "outputs": [
          {
            "internalType": "contract IERC20",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "WETH",
        "outputs": [
          {
            "internalType": "contract IERC20",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "debtInterest",
        "outputs": [
          {
            "internalType": "uint16",
            "name": "",
            "type": "uint16"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_traderKill",
            "type": "address"
          }
        ],
        "name": "eliminate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_trader",
            "type": "address"
          }
        ],
        "name": "getAccountValueInUSDC",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_trader",
            "type": "address"
          }
        ],
        "name": "getDayDebt",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "_days",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_trader",
            "type": "address"
          }
        ],
        "name": "getHF",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "_HF",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getUserBalanceUSDC",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getUserBalanceUSDCWithoutDebt",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getUserBalanceWEther",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getUserDebt",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint16",
            "name": "_newDebtInterest",
            "type": "uint16"
          }
        ],
        "name": "setDebtInterest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_RM",
            "type": "address"
          }
        ],
        "name": "setRiskManager",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_SC",
            "type": "address"
          }
        ],
        "name": "setSwapContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_amountOutMinimum",
            "type": "uint256"
          }
        ],
        "name": "swapUSDCToWETH",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_amountOutMinimum",
            "type": "uint256"
          }
        ],
        "name": "swapWETHToUSDC",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "transferDebtFromCA",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "transferDebtToCA",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "transferToTraderUSDC",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "withdrawUSDC",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]`;
    this.addressSC = "0xf8b299f87ebb62e0b625eaf440b73cc6b7717dbd"; // В тестовой сети
    this.abiSC = `[
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_CA",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "_TRA",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "_USDC",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "_WETH",
                  "type": "address"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                }
              ],
              "name": "OwnableInvalidOwner",
              "type": "error"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
                }
              ],
              "name": "OwnableUnauthorizedAccount",
              "type": "error"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferred",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "_amountOut",
                  "type": "uint256"
                }
              ],
              "name": "quotedWETHToUSDC",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "ICA",
              "outputs": [
                {
                  "internalType": "contract ICentralAccount",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "TRA",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "USDC",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "WETH",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_amountIn",
                  "type": "uint256"
                }
              ],
              "name": "quoteWETHToUSDC",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "quoter",
              "outputs": [
                {
                  "internalType": "contract IQuoter",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "renounceOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "router",
              "outputs": [
                {
                  "internalType": "contract ISwapRouter",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "router02",
              "outputs": [
                {
                  "internalType": "contract UniswapV2Router02",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_amountIn",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_amountOutMinimum",
                  "type": "uint256"
                }
              ],
              "name": "swapUSDCToWETH",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "amountOut",
                  "type": "uint256"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_amountIn",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_amountOutMinimum",
                  "type": "uint256"
                }
              ],
              "name": "swapWETHToUSDC",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "amountOut",
                  "type": "uint256"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "transferOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ]`;
    this.addressRM = "0x484242986f57dfca98eec2c78427931c63f1c4ce"; // В тестовой сети
    this.abiRM = `[
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_TRA",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "HF_ELIMINATE",
        "outputs": [
          {
            "internalType": "uint16",
            "name": "",
            "type": "uint16"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ITRA",
        "outputs": [
          {
            "internalType": "contract ITraderAccount",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_trader",
            "type": "address"
          }
        ],
        "name": "addTrader",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_begin",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_end",
            "type": "uint256"
          }
        ],
        "name": "checkTraders",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "answer",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_begin",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_end",
            "type": "uint256"
          }
        ],
        "name": "checkTradersDay",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "answer",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_trader",
            "type": "address"
          }
        ],
        "name": "deleteTrader",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_traderId",
            "type": "uint256"
          }
        ],
        "name": "eliminate",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getCountTraders",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint16",
            "name": "_new_HF_ELIMINATE",
            "type": "uint16"
          }
        ],
        "name": "setHFEliminate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]`;

    // Делаем привязку к функции контекста this
    this.onClose = this.onClose.bind(this);
    this.onHiddenDeposit = this.onHiddenDeposit.bind(this);
    this.onHiddenWithdraw = this.onHiddenWithdraw.bind(this);
    this.getCurrentQuoteWETHToUSDC = this.getCurrentQuoteWETHToUSDC.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSwapChange = this.handleSwapChange.bind(this);
    this.getUserBalanceUSDC = this.getUserBalanceUSDC.bind(this);
    this.onShowBorrow = this.onShowBorrow.bind(this);
    this.getCurrentMarginLevel = this.getCurrentMarginLevel.bind(this);
    this.getCurrentAvailable = this.getCurrentAvailable.bind(this);
    this.getCurrentAvailableWETH = this.getCurrentAvailableWETH.bind(this);
    // this.onAddAllBalanceUser = this.onAddAllBalanceUser.bind(this);
    // this.getTotalMoneyLiquidityPool = this.getTotalMoneyLiquidityPool.bind(this);
    // this.sendDepositToLiquidityPool = this.sendDepositToLiquidityPool.bind(this);
    // this.getUserBalanceLiquidityPool = this.getUserBalanceLiquidityPool.bind(this);
    // this.sendWithdrawToLiquidityPool = this.sendWithdrawToLiquidityPool.bind(this);
    // this.getTotalTradedCentralAccount = this.getTotalTradedCentralAccount.bind(this);
    this.sendUSDCToTraderAccount = this.sendUSDCToTraderAccount.bind(this);
    this.borrowUSDCFromTraderAccount =
      this.borrowUSDCFromTraderAccount.bind(this);
    this.onToastUser = this.onToastUser.bind(this);
    this.updatePositionWETH = this.updatePositionWETH.bind(this);
    this.repayUSDCToTraderAccount = this.repayUSDCToTraderAccount.bind(this);
    this.withdrawUSDCFromTraderAccount =
      this.withdrawUSDCFromTraderAccount.bind(this);
    this.swapTokens = this.swapTokens.bind(this);
  }

  onToastUser(messageUser, negative) {
    if (negative === true) {
      alert("Negative: " + messageUser);
    } else {
      alert("Positive: " + messageUser);
    }
  }

  onClose() {
    this.setState({ hiddenDeposit: false });
    this.setState({ hiddenWithdraw: false });
  }

  async getUserBalanceUSDC() {
    if (this.state.userAccount !== "") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const USDCContract = new ethers.Contract(
        this.addressUSDC,
        this.abiUSDC,
        provider
      );
      let balance = ethers.formatUnits(
        (await USDCContract.balanceOf(this.state.userAccount)).toString(),
        6
      );
      console.log(balance);
      this.setState({
        balanceUser: balance,
      });
    } else {
      console.log("Connect MetaMask!");
    }
  }

  async getCurrentQuoteWETHToUSDC() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const SwapContract = new ethers.Contract(
      this.addressSC,
      this.abiSC,
      provider
    );
    try {
      let value_1 = ethers.formatUnits(
        (await SwapContract.quoteWETHToUSDC(ethers.parseEther("1"))).toString(),
        6
      );
      console.log(value_1);
      this.setState({
        currentWETHQuote: value_1,
      });
    } catch (error) {
      console.log(error);
      this.onToastUser("some problems with Uniswap occured", true);
    }
  }

  async getCurrentAvailable() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const TraderAccount = new ethers.Contract(
      this.addressTRA,
      this.abiTRA,
      signer
    );
    console.log(provider);
    try {
      let balance = ethers.formatUnits(
        (await TraderAccount.getUserBalanceUSDC()).toString(),
        6
      );
      this.setState({
        currentAvailable: balance,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        currentAvailable: "some problem occured",
      });
      this.onToastUser("didn't get TRA USDC of trader", true);
    }
  }

  async getCurrentAvailableWETH() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const TraderAccount = new ethers.Contract(
      this.addressTRA,
      this.abiTRA,
      signer
    );
    console.log(provider);
    try {
      let balance = ethers.formatUnits(
        (await TraderAccount.getUserBalanceWEther()).toString(),
        18
      );
      this.setState({
        currentAvailableWETH: balance,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        currentAvailableWETH: "some problem occured",
      });
      this.onToastUser("didn't get TRA WETH of trader", true);
    }
  }

  async getCurrentMarginLevel() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const CentralAccount = new ethers.Contract(
      this.addressCA,
      this.abiCA,
      provider
    );
    try {
      let ownerProfit = ethers.formatUnits(
        (await CentralAccount.ownerProfit()).toString(),
        0
      );
      let COEF_OWNER_PROFIT = 10000;
      this.setState({
        currentMarginLevel: (ownerProfit * 100) / COEF_OWNER_PROFIT,
      });
    } catch (error) {
      console.log(error);
      this.onToastUser("some problems with CA occured", true);
    }
  }

  handleInputChange(event) {
    let newValue = event.target.value;

    if (newValue === ".") {
      newValue = "0" + newValue;
    }

    newValue = newValue.replace(/[^0-9.]/g, "");

    const dotCount = (newValue.match(/\./g) || []).length;
    if (dotCount > 1) {
      return;
    }

    const dotIndex = newValue.indexOf(".");
    let checkVal = 7;
    // console.log(this.state.typeOfSwap,this.state.typeOfSwap == 1);
    // console.log(this.state.showBorrow,this.state.showBorrow === 2);
    if (this.state.showBorrow === 2 && this.state.typeOfSwap == 1) {
      checkVal = 19;
    }
    console.log(checkVal);
    if (dotIndex !== -1 && newValue.length - dotIndex > checkVal) {
      return;
    }

    if (newValue === undefined) {
      newValue = "";
    }

    switch (this.state.showBorrow) {
      case 0: {
        console.log("ok");
        this.setState({ userAmountSendTRA: newValue });
        break;
      }
      case 1: {
        this.setState({ userAmountBorrowTRA: newValue });
        break;
      }
      default: {
        this.setState({ userAmountExchangeTRA: newValue });
        break;
      }
    }
  }

  handleSwapChange(event) {
    let newValue = event.target.value;
    this.setState({ typeOfSwap: newValue });
  }

  async onHiddenDeposit() {
    if (this.state.hiddenDeposit === true) {
      //await this.sendDepositToLiquidityPool();
      this.setState({ hiddenDeposit: false });
    } else {
      // await this.getUserBalanceUSDC();
      // await this.getUserBalanceLiquidityPool();
      this.setState({ hiddenDeposit: true });
    }
  }

  async onHiddenWithdraw() {
    if (this.state.hiddenWithdraw === true) {
      // await this.sendWithdrawToLiquidityPool();
      this.setState({ hiddenWithdraw: false });
    } else {
      // await this.getUserBalanceUSDC();
      // await this.getUserBalanceLiquidityPool();
      this.setState({ hiddenWithdraw: true });
    }
  }

  async onShowBorrow(val) {
    this.setState({ showBorrow: val });
    // console.log(val);
  }

  async sendUSDCToTraderAccount() {
    if (this.state.userAccount !== "") {
      if (this.state.userAmountSendTRA === "") {
        console.log("Empty amount");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      try {
        // console.log(ethers.parseUnits(this.state.userAmountSendTRA, 6));
        const TraderAccount = new ethers.Contract(
          this.addressTRA,
          this.abiTRA,
          signer
        );
        const USDCContract = new ethers.Contract(
          this.addressUSDC,
          this.abiUSDC,
          signer
        );
        await USDCContract.approve(
          this.addressTRA,
          ethers.parseUnits(this.state.userAmountSendTRA, 6)
        );
        await TraderAccount.transferToTraderUSDC(
          ethers.parseUnits(this.state.userAmountSendTRA, 6)
        );
        // Обновление состояния переменных
        let balanceUser_TRA, balanceUser;
        try {
          balanceUser_TRA = ethers.formatUnits(
            (await TraderAccount.getUserBalanceUSDC()).toString(),
            6
          );
          balanceUser = ethers.formatUnits(
            (await USDCContract.balanceOf(this.state.userAccount)).toString(),
            6
          );
        } catch (error) {
          console.log(error);
          this.onToastUser("Error when updated", true);
        }
        this.setState({
          userAmountSendTRA: "",
          currentAvailable: balanceUser_TRA,
          balanceUser: balanceUser,
        });
        this.onToastUser("Ok", false);
      } catch (error) {
        console.log(error);
        this.onToastUser("Error occured", true);
      }
    } else {
      console.log("Connect MetaMask!");
    }
  }

  async borrowUSDCFromTraderAccount() {
    if (this.state.userAccount !== "") {
      if (this.state.userAmountBorrowTRA === "") {
        console.log("Empty amount");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      try {
        const TraderAccount = new ethers.Contract(
          this.addressTRA,
          this.abiTRA,
          signer
        );
        await TraderAccount.transferDebtFromCA(
          ethers.parseUnits(this.state.userAmountBorrowTRA, 6)
        );
        // Обновление состояния переменных
        let balanceUser_TRA;
        try {
          balanceUser_TRA = ethers.formatUnits(
            (await TraderAccount.getUserBalanceUSDC()).toString(),
            6
          );
        } catch (error) {
          console.log(error);
        }
        let userWETH,
          userAllInUSDC,
          userMargin,
          userHF,
          userLiquidityPrice,
          userWETHToUSDC,
          userDEBT;
        try {
          const SwapContract = new ethers.Contract(
            this.addressSC,
            this.abiSC,
            signer
          );
          const RiskManager = new ethers.Contract(
            this.addressRM,
            this.abiRM,
            signer
          );
          userWETH = await TraderAccount.getUserBalanceWEther();

          userAllInUSDC = await TraderAccount.getAccountValueInUSDC(
            this.state.userAccount
          );

          userMargin = await TraderAccount.getUserBalanceUSDCWithoutDebt();

          userHF = "NO DEBT";
          userDEBT = await TraderAccount.getUserDebt();
          let HF_eliminate;
          userLiquidityPrice = "NO DEBT";

          if (ethers.formatUnits(userDEBT, 6) !== "0.0") {
            try {
              HF_eliminate = await RiskManager.HF_ELIMINATE();
              console.log(HF_eliminate);
              userHF = await TraderAccount.getHF(this.state.userAccount);
              userLiquidityPrice = (userAllInUSDC * HF_eliminate) / userHF;
              console.log(userLiquidityPrice);
              console.log(HF_eliminate);

              userHF = ethers.formatUnits(userHF.toString(), 4);
              userLiquidityPrice = ethers.formatUnits(
                userLiquidityPrice.toString(),
                6
              );
            } catch (error) {
              console.log(error);
            }
          }

          userWETHToUSDC = await SwapContract.quoteWETHToUSDC(userWETH);

          userWETHToUSDC = ethers.formatUnits(userWETHToUSDC.toString(), 6);
          userMargin = ethers.formatUnits(userMargin.toString(), 6);
          userAllInUSDC = ethers.formatUnits(userAllInUSDC.toString(), 6);
          userDEBT = ethers.formatUnits(userDEBT.toString(), 6);
        } catch (error) {
          console.log(error);
        }
        this.setState({
          userAmountBorrowTRA: "",
          currentAvailable: balanceUser_TRA,
          userWETHToUSDC: userWETHToUSDC,
          userAllInUSDC: userAllInUSDC,
          userMargin: userMargin,
          userHF: userHF,
          userEntryPrice: "",
          userLiquidityPrice: userLiquidityPrice,
          userDifference: "",
          userDEBT: userDEBT,
        });
        this.onToastUser("Ok", false);
      } catch (error) {
        console.log(error);
        if (error.revert) {
          this.onToastUser(error.revert.args[0], true);
        } else {
          this.onToastUser("Error occured", true);
        }
      }
    } else {
      console.log("Connect MetaMask!");
    }
  }

  async updatePositionWETH() {
    if (this.state.userAccount !== "") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      try {
        const TraderAccount = new ethers.Contract(
          this.addressTRA,
          this.abiTRA,
          signer
        );
        const SwapContract = new ethers.Contract(
          this.addressSC,
          this.abiSC,
          signer
        );
        const RiskManager = new ethers.Contract(
          this.addressRM,
          this.abiRM,
          signer
        );

        let userWETH = await TraderAccount.getUserBalanceWEther();

        let userAllInUSDC = await TraderAccount.getAccountValueInUSDC(
          this.state.userAccount
        );

        let userMargin = await TraderAccount.getUserBalanceUSDCWithoutDebt();

        let userHF = "NO DEBT";
        let userDEBT = await TraderAccount.getUserDebt();
        let HF_eliminate;
        let userLiquidityPrice = "NO DEBT";

        if (ethers.formatUnits(userDEBT, 6) !== "0.0") {
          try {
            HF_eliminate = await RiskManager.HF_ELIMINATE();
            console.log(HF_eliminate);
            userHF = await TraderAccount.getHF(this.state.userAccount);
            userLiquidityPrice = (userAllInUSDC * HF_eliminate) / userHF;
            console.log(userLiquidityPrice);
            console.log(HF_eliminate);

            userHF = ethers.formatUnits(userHF.toString(), 4);
            userLiquidityPrice = ethers.formatUnits(
              userLiquidityPrice.toString(),
              6
            );
          } catch (error) {
            userHF = "NO DEBT";
          }
        }

        let userWETHToUSDC = await SwapContract.quoteWETHToUSDC(userWETH);

        // Обновление состояния переменных
        userWETHToUSDC = ethers.formatUnits(userWETHToUSDC.toString(), 6);
        userMargin = ethers.formatUnits(userMargin.toString(), 6);
        userAllInUSDC = ethers.formatUnits(userAllInUSDC.toString(), 6);
        userDEBT = ethers.formatUnits(userDEBT.toString(), 6);

        this.setState({
          userWETHToUSDC: userWETHToUSDC,
          userAllInUSDC: userAllInUSDC,
          userMargin: userMargin,
          userHF: userHF,
          userEntryPrice: "",
          userLiquidityPrice: userLiquidityPrice,
          userDifference: "",
          userDEBT: userDEBT,
        });
      } catch (error) {
        console.log(error);
        if (error.revert) {
          this.onToastUser(error.revert.args[0], true);
        } else {
          this.onToastUser("Error occured, position", true);
        }
      }
    } else {
      console.log("Connect MetaMask!");
    }
  }

  async repayUSDCToTraderAccount() {
    if (this.state.userAccount !== "") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      try {
        const TraderAccount = new ethers.Contract(
          this.addressTRA,
          this.abiTRA,
          signer
        );
        await TraderAccount.transferDebtToCA();
        // Обновление состояния переменных
        let balanceUser_TRA;
        try {
          balanceUser_TRA = ethers.formatUnits(
            (await TraderAccount.getUserBalanceUSDC()).toString(),
            6
          );
        } catch (error) {
          console.log(error);
        }
        let userWETH,
          userAllInUSDC,
          userMargin,
          userHF,
          userLiquidityPrice,
          userWETHToUSDC,
          userDEBT;
        try {
          const SwapContract = new ethers.Contract(
            this.addressSC,
            this.abiSC,
            signer
          );
          const RiskManager = new ethers.Contract(
            this.addressRM,
            this.abiRM,
            signer
          );
          userWETH = await TraderAccount.getUserBalanceWEther();

          userAllInUSDC = await TraderAccount.getAccountValueInUSDC(
            this.state.userAccount
          );

          userMargin = await TraderAccount.getUserBalanceUSDCWithoutDebt();
          userDEBT = await TraderAccount.getUserDebt();

          userHF = "NO DEBT";
          let HF_eliminate;
          userLiquidityPrice = "NO DEBT";

          if (ethers.formatUnits(userDEBT, 6) !== "0.0") {
            try {
              HF_eliminate = await RiskManager.HF_ELIMINATE();
              console.log(HF_eliminate);
              userHF = await TraderAccount.getHF(this.state.userAccount);
              userLiquidityPrice = (userAllInUSDC * HF_eliminate) / userHF;
              console.log(userLiquidityPrice);
              console.log(HF_eliminate);

              userHF = ethers.formatUnits(userHF.toString(), 4);
              userLiquidityPrice = ethers.formatUnits(
                userLiquidityPrice.toString(),
                6
              );
            } catch (error) {
              console.log(error);
            }
          }

          userWETHToUSDC = await SwapContract.quoteWETHToUSDC(userWETH);

          userWETHToUSDC = ethers.formatUnits(userWETHToUSDC.toString(), 6);
          userMargin = ethers.formatUnits(userMargin.toString(), 6);
          userAllInUSDC = ethers.formatUnits(userAllInUSDC.toString(), 6);
          userDEBT = ethers.formatUnits(userDEBT.toString(), 6);
        } catch (error) {
          console.log(error);
        }
        this.setState({
          userAmountBorrowTRA: "",
          currentAvailable: balanceUser_TRA,
          userWETHToUSDC: userWETHToUSDC,
          userAllInUSDC: userAllInUSDC,
          userMargin: userMargin,
          userHF: userHF,
          userEntryPrice: "",
          userLiquidityPrice: userLiquidityPrice,
          userDifference: "",
          userDEBT: userDEBT,
        });
        this.onToastUser("Ok", false);
      } catch (error) {
        console.log(error);
        if (error.revert) {
          this.onToastUser(error.revert.args[0], true);
        } else {
          this.onToastUser("Error occured", true);
        }
      }
    } else {
      console.log("Connect MetaMask!");
    }
  }

  async withdrawUSDCFromTraderAccount() {
    if (this.state.userAccount !== "") {
      if (this.state.userAmountSendTRA === "") {
        console.log("Empty amount");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      try {
        const USDCContract = new ethers.Contract(
          this.addressUSDC,
          this.abiUSDC,
          signer
        );
        const TraderAccount = new ethers.Contract(
          this.addressTRA,
          this.abiTRA,
          signer
        );
        await TraderAccount.withdrawUSDC(
          ethers.parseUnits(this.state.userAmountSendTRA, 6)
        );
        // Обновление состояния переменных
        let balanceUser, balanceUser_TRA;
        try {
          balanceUser = ethers.formatUnits(
            (await USDCContract.balanceOf(this.state.userAccount)).toString(),
            6
          );
          balanceUser_TRA = ethers.formatUnits(
            (await TraderAccount.getUserBalanceUSDC()).toString(),
            6
          );
        } catch (error) {
          console.log(error);
        }
        let userWETH,
          userAllInUSDC,
          userMargin,
          userHF,
          userLiquidityPrice,
          userWETHToUSDC,
          userDEBT;
        try {
          const SwapContract = new ethers.Contract(
            this.addressSC,
            this.abiSC,
            signer
          );
          const RiskManager = new ethers.Contract(
            this.addressRM,
            this.abiRM,
            signer
          );
          userWETH = await TraderAccount.getUserBalanceWEther();

          userAllInUSDC = await TraderAccount.getAccountValueInUSDC(
            this.state.userAccount
          );

          userMargin = await TraderAccount.getUserBalanceUSDCWithoutDebt();
          userDEBT = await TraderAccount.getUserDebt();

          userHF = "NO DEBT";
          let HF_eliminate;
          userLiquidityPrice = "NO DEBT";

          if (ethers.formatUnits(userDEBT, 6) !== "0.0") {
            try {
              HF_eliminate = await RiskManager.HF_ELIMINATE();
              console.log(HF_eliminate);
              userHF = await TraderAccount.getHF(this.state.userAccount);
              userLiquidityPrice = (userAllInUSDC * HF_eliminate) / userHF;
              console.log(userLiquidityPrice);
              console.log(HF_eliminate);

              userHF = ethers.formatUnits(userHF.toString(), 4);
              userLiquidityPrice = ethers.formatUnits(
                userLiquidityPrice.toString(),
                6
              );
            } catch (error) {
              console.log(error);
            }
          }

          userWETHToUSDC = await SwapContract.quoteWETHToUSDC(userWETH);

          userWETHToUSDC = ethers.formatUnits(userWETHToUSDC.toString(), 6);
          userMargin = ethers.formatUnits(userMargin.toString(), 6);
          userAllInUSDC = ethers.formatUnits(userAllInUSDC.toString(), 6);
          userDEBT = ethers.formatUnits(userDEBT.toString(), 6);
        } catch (error) {
          console.log(error);
        }
        this.setState({
          userAmountBorrowTRA: "",
          balanceUser: balanceUser,
          currentAvailable: balanceUser_TRA,
          userWETHToUSDC: userWETHToUSDC,
          userAllInUSDC: userAllInUSDC,
          userMargin: userMargin,
          userHF: userHF,
          userEntryPrice: "",
          userLiquidityPrice: userLiquidityPrice,
          userDifference: "",
          userDEBT: userDEBT,
        });
        this.onToastUser("Ok", false);
      } catch (error) {
        console.log(error);
        if (error.revert) {
          this.onToastUser(error.revert.args[0], true);
        } else {
          this.onToastUser("Error occured", true);
        }
      }
    } else {
      console.log("Connect MetaMask!");
    }
  }

  async swapTokens() {
    if (this.state.userAccount !== "") {
      if (this.state.userAmountExchangeTRA === "") {
        console.log("Empty amount");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      try {
        const USDCContract = new ethers.Contract(
          this.addressUSDC,
          this.abiUSDC,
          signer
        );
        const TraderAccount = new ethers.Contract(
          this.addressTRA,
          this.abiTRA,
          signer
        );
        const SwapContract = new ethers.Contract(
          this.addressSC,
          this.abiSC,
          signer
        );
        let quote, swapAmountOut;
        if (this.state.typeOfSwap == 0) {
          quote = "0";
          swapAmountOut = await TraderAccount.swapUSDCToWETH(
            ethers.parseUnits(this.state.userAmountExchangeTRA, 6),
            ethers.parseUnits(quote, 0)
          );
        } else {
          quote = "0";
          swapAmountOut = await TraderAccount.swapWETHToUSDC(
            ethers.parseUnits(this.state.userAmountExchangeTRA, 18),
            ethers.parseUnits(quote, 0)
          );
        }

        // Обновление состояния переменных
        let balanceUser_TRA, balanceUser_TRA_WETH;
        try {
          balanceUser_TRA = ethers.formatUnits(
            (await TraderAccount.getUserBalanceUSDC()).toString(),
            6
          );
        } catch (error) {
          console.log(error);
        }
        try {
          balanceUser_TRA_WETH = ethers.formatUnits(
            (await TraderAccount.getUserBalanceWEther()).toString(),
            18
          );
        } catch (error) {
          console.log(error);
        }
        let userWETH,
          userAllInUSDC,
          userMargin,
          userHF,
          userLiquidityPrice,
          userWETHToUSDC,
          userDEBT;
        try {
          const RiskManager = new ethers.Contract(
            this.addressRM,
            this.abiRM,
            signer
          );
          userWETH = await TraderAccount.getUserBalanceWEther();

          userAllInUSDC = await TraderAccount.getAccountValueInUSDC(
            this.state.userAccount
          );

          userMargin = await TraderAccount.getUserBalanceUSDCWithoutDebt();
          userDEBT = await TraderAccount.getUserDebt();

          userHF = "NO DEBT";
          let HF_eliminate;
          userLiquidityPrice = "NO DEBT";

          if (ethers.formatUnits(userDEBT, 6) !== "0.0") {
            try {
              HF_eliminate = await RiskManager.HF_ELIMINATE();
              console.log(HF_eliminate);
              userHF = await TraderAccount.getHF(this.state.userAccount);
              userLiquidityPrice = (userAllInUSDC * HF_eliminate) / userHF;
              console.log(userLiquidityPrice);
              console.log(HF_eliminate);

              userHF = ethers.formatUnits(userHF.toString(), 4);
              userLiquidityPrice = ethers.formatUnits(
                userLiquidityPrice.toString(),
                6
              );
            } catch (error) {
              console.log(error);
            }
          }

          userWETHToUSDC = await SwapContract.quoteWETHToUSDC(userWETH);

          userWETHToUSDC = ethers.formatUnits(userWETHToUSDC.toString(), 6);
          userMargin = ethers.formatUnits(userMargin.toString(), 6);
          userAllInUSDC = ethers.formatUnits(userAllInUSDC.toString(), 6);
          userDEBT = ethers.formatUnits(userDEBT.toString(), 6);
        } catch (error) {
          console.log(error);
        }
        this.setState({
          userAmountBorrowTRA: "",
          currentAvailable: balanceUser_TRA,
          currentAvailableWETH: balanceUser_TRA_WETH,
          userWETHToUSDC: userWETHToUSDC,
          userAllInUSDC: userAllInUSDC,
          userMargin: userMargin,
          userHF: userHF,
          userEntryPrice: "",
          userLiquidityPrice: userLiquidityPrice,
          userDifference: "",
          userDEBT: userDEBT,
        });
        this.onToastUser("You received: " + swapAmountOut, false);
      } catch (error) {
        console.log(error);
        if (error.revert) {
          this.onToastUser(error.revert.args[0], true);
        } else {
          this.onToastUser("Error occured", true);
        }
      }
    } else {
      console.log("Connect MetaMask!");
    }
  }

  async componentDidMount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.setState({ userAccount: accounts[0] });
      this.getCurrentQuoteWETHToUSDC();
      this.getCurrentMarginLevel();
      this.getCurrentAvailable();
      this.getCurrentAvailableWETH();
      this.getUserBalanceUSDC();
      this.updatePositionWETH();
    } else {
      console.log("Connect MetaMask!");
    }
  }

  render() {
    return (
      <>
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ height: "110vh" }}
        >
          <Row className="d-flex justify-content-center align-items-center">
            <Row
              style={{
                border: "2px solid #333",
                flexDirection: "row",
              }}
            >
              {/* <Col>10000000000</Col> */}
              <Col className="text-start" style={{ marginTop: "15px" }}>
                <p>
                  Current price:{" "}
                  {this.state.currentWETHQuote ? (
                    <strong>{"$ " + this.state.currentWETHQuote}</strong>
                  ) : (
                    <></>
                  )}
                </p>
              </Col>
              <Col className="text-end" style={{ marginTop: "15px" }}>
                <p>
                  Margin level:{" "}
                  {this.state.currentMarginLevel ? (
                    <strong>{this.state.currentMarginLevel + " %"}</strong>
                  ) : (
                    <></>
                  )}
                </p>
              </Col>
            </Row>
            <Row
              className="d-flex justify-content-center align-items-center"
              style={{ marginTop: "15px" }}
            >
              <div
                className="rectangle"
                style={{
                  height: "420px",
                  width: "550px",
                  border: "2px solid #333",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Row className="text-center" style={{ marginTop: "15px" }}>
                  <strong>BORROW USDC</strong>
                </Row>

                <Row className="button-row" style={{ marginTop: "15px" }}>
                  <Col className="text-end">
                    <Button
                      onClick={() => this.onShowBorrow(0)}
                      variant="secondary"
                      style={{ width: "150px" }}
                    >
                      Deposit
                    </Button>
                  </Col>
                  <Col className="text-center">
                    <Button
                      onClick={() => this.onShowBorrow(1)}
                      variant="dark"
                      style={{ width: "150px" }}
                    >
                      DEBT
                    </Button>
                  </Col>
                  <Col className="text-start">
                    <Button
                      onClick={() => this.onShowBorrow(2)}
                      variant="secondary"
                      style={{ width: "150px" }}
                    >
                      Exchange
                    </Button>
                  </Col>
                </Row>
                <Row
                  className="d-flex justify-content-center align-items-center"
                  style={{ marginTop: "40px" }}
                >
                  {this.state.showBorrow === 2 ? (
                    <>
                      <Row
                        className="button-row"
                        style={{ marginBottom: "15px" }}
                      >
                        <Col>
                          <Form.Control
                            onChange={this.handleInputChange}
                            type="text"
                            placeholder="Amount "
                            value={this.state.userAmountExchangeTRA}
                            // style={{ width: "100%" }}
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            value={this.state.typeOfSwap}
                            onChange={this.handleSwapChange}
                          >
                            <option value={0}>USDC to WETH</option>
                            <option value={1}>WETH to USDC</option>
                          </Form.Select>
                        </Col>
                      </Row>
                      {/* <Row
                        className="button-row"
                        style={{ marginBottom: "15px" }}
                      >
                        <Col className="text-start">Entry price:</Col>
                        <Col className="text-end">100000 USDC</Col>
                      </Row> */}
                      <Row
                        className="button-row"
                        style={{ marginBottom: "15px" }}
                      >
                        <Col className="text-start">Available USDC:</Col>
                        <Col className="text-end">
                          {this.state.currentAvailable ? (
                            <>{this.state.currentAvailable + " USDC"}</>
                          ) : (
                            <></>
                          )}
                        </Col>
                      </Row>
                      <Row
                        className="button-row"
                        style={{ marginBottom: "15px" }}
                      >
                        <Col className="text-start">Available WETH:</Col>
                        <Col className="text-end">
                          {this.state.currentAvailableWETH ? (
                            <>{this.state.currentAvailableWETH + " WETH"}</>
                          ) : (
                            <></>
                          )}
                        </Col>
                      </Row>
                      <Row
                        className="button-row"
                        style={{ marginBottom: "15px" }}
                      >
                        <Col className="text-start">Fees:</Col>
                        <Col className="text-end">5 %</Col>
                      </Row>
                      <Row
                        className="button-row"
                        style={{ marginBottom: "15px" }}
                      >
                        <Button onClick={this.swapTokens} variant="dark">
                          SWAP
                        </Button>
                      </Row>
                    </>
                  ) : (
                    <>
                      {this.state.showBorrow === 1 ? (
                        <>
                          <Row
                            className="button-row"
                            style={{ marginBottom: "15px" }}
                          >
                            <Form.Control
                              onChange={this.handleInputChange}
                              type="text"
                              placeholder="Amount (USDC)"
                              value={this.state.userAmountBorrowTRA}
                              // style={{ width: "100%" }}
                            />
                          </Row>
                          <Row
                            className="button-row"
                            style={{ marginBottom: "15px" }}
                          >
                            <Col className="text-start">Available:</Col>
                            <Col className="text-end">
                              {this.state.currentAvailable ? (
                                <>{this.state.currentAvailable + " USDC"}</>
                              ) : (
                                <></>
                              )}
                            </Col>
                          </Row>
                          <Row
                            className="button-row"
                            style={{ marginBottom: "15px" }}
                          >
                            <Col className="text-start">Your deposit:</Col>
                            <Col className="text-end">
                              {this.state.userMargin ? (
                                <>{this.state.userMargin + " USDC"}</>
                              ) : (
                                <></>
                              )}
                            </Col>
                          </Row>
                          <Row
                            className="button-row"
                            style={{ marginBottom: "15px" }}
                          >
                            <Col className="text-start">Borrow APY:</Col>
                            <Col className="text-end">5 %</Col>
                          </Row>
                          <Row
                            className="button-row"
                            style={{ marginBottom: "15px" }}
                          >
                            <Button
                              onClick={this.borrowUSDCFromTraderAccount}
                              variant="dark"
                            >
                              BORROW
                            </Button>
                          </Row>
                        </>
                      ) : (
                        <>
                          <Row
                            className="button-row"
                            style={{ marginBottom: "15px" }}
                          >
                            <Form.Control
                              onChange={this.handleInputChange}
                              type="text"
                              placeholder="Amount (USDC)"
                              value={this.state.userAmountSendTRA}
                              // style={{ width: "100%" }}
                            />
                          </Row>
                          <Row
                            className="button-row"
                            style={{ marginBottom: "15px" }}
                          >
                            <Col className="text-start">Balance:</Col>
                            <Col className="text-end">
                              {this.state.userAccount ? (
                                <>{this.state.balanceUser + " USDC"}</>
                              ) : (
                                <></>
                              )}
                            </Col>
                          </Row>
                          <Row
                            className="button-row"
                            style={{ marginBottom: "15px" }}
                          >
                            <Col className="text-start">Borrow APY:</Col>
                            <Col className="text-end">5 %</Col>
                          </Row>
                          <Row
                            className="button-row"
                            style={{ marginBottom: "15px" }}
                          >
                            <Button
                              onClick={this.sendUSDCToTraderAccount}
                              variant="dark"
                            >
                              DEPOSIT
                            </Button>
                          </Row>
                          <Row
                            className="button-row"
                            style={{ marginBottom: "15px" }}
                          >
                            <Button
                              onClick={this.withdrawUSDCFromTraderAccount}
                              variant="secondary"
                            >
                              WITHDRAW
                            </Button>
                          </Row>
                        </>
                      )}
                    </>
                  )}
                </Row>
              </div>
            </Row>
            <Row
              style={{
                border: "2px solid #333",
                flexDirection: "row",
                marginTop: "15px",
              }}
            >
              {/* <Col>Position</Col> */}
              <Col
                className="text-center"
                style={{ marginTop: "15px", marginBottom: "15px" }}
              >
                <Row>Position</Row>
                <Row>Long</Row>
              </Col>
              <Col className="text-center" style={{ marginTop: "15px" }}>
                <Row>Asset</Row>
                <Row>ETH</Row>
              </Col>
              <Col className="text-center" style={{ marginTop: "15px" }}>
                <Row>WETH</Row>
                {/* {quoteWETHToUSDC(getTraderWETH)} */}
                <Row>{this.state.userWETHToUSDC}</Row>
              </Col>
              <Col className="text-center" style={{ marginTop: "15px" }}>
                <Row>Margin</Row>
                {/* {getUserBalanceUSDCWithoutDebt} */}
                <Row>
                  {this.state.userMargin !== ""
                    ? "$ " + this.state.userMargin
                    : this.state.userMargin}
                </Row>
              </Col>
              <Col className="text-center" style={{ marginTop: "15px" }}>
                <Row>Debt</Row>
                {/* {getUserBalanceUSDCWithoutDebt} */}
                <Row>
                  {this.state.userDEBT !== ""
                    ? "$ " + this.state.userDEBT
                    : this.state.userDEBT}
                </Row>
              </Col>
              {/* <Col className="text-center" style={{ marginTop: "15px" }}>
                <Row>Entry price</Row>
                {/* {price of buying WETH}  <Row>ETH</Row></Col> */}
              <Col className="text-center" style={{ marginTop: "15px" }}>
                <Row>HF</Row>
                {/* {HF value} */}
                <Row>{this.state.userHF}</Row>
              </Col>
              <Col className="text-center" style={{ marginTop: "15px" }}>
                <Row>Liquidity price</Row>
                {/* {price when eliminating} */}
                <Row>{this.state.userLiquidityPrice}</Row>
              </Col>
              {/* <Col className="text-center" style={{ marginTop: "15px" }}>
                <Row>Difference</Row>
                {/* {(current WETH price - Entry price) * WETH} 
                <Row>ETH</Row>
              </Col>
              <Col className="text-center" style={{ marginTop: "15px" }}>
                <Row>USDC</Row>
                {/* {Debt} 
                <Row>
                  {this.state.currentMarginLevel ? (
                    <strong>{this.state.currentMarginLevel + " %"}</strong>
                  ) : (
                    <></>
                  )}
                </Row>
              </Col> */}
              <Col>
                <Row className="button-row" style={{ marginTop: "20px" }}>
                  <Button
                    onClick={this.repayUSDCToTraderAccount}
                    variant="secondary"
                  >
                    REPAY
                  </Button>
                </Row>
              </Col>
            </Row>
          </Row>
        </Container>
      </>
      //   <Container className="d-flex justify-content-center align-items-center" style={{ height: '110vh' }}>
      //       <Row>
      //         <div
      //           className="rectangle"
      //           style={{
      //             height: "200px",
      //             width: "400px",
      //             border: "2px solid #333",
      //             display: "flex",
      //             flexDirection: "column",
      //           }}
      //         >
      //           <Row className="text-center" style={{ marginTop: "15px" }}>
      //             <Col>100000000000</Col>
      //             <Col>100000000000</Col>
      //           </Row>
      //         </div>
      //       </Row>
      //       <Row>
      //         <div
      //           className="rectangle"
      //           style={{
      //             height: "320px",
      //             width: "370px",
      //             border: "2px solid #333",
      //             display: "flex",
      //             flexDirection: "column",
      //           }}
      //         >
      //           <Row className="text-center" style={{ marginTop: "15px" }}>
      //             <Col>
      //               <img
      //                 src={logoTraderAccount}
      //                 height="80"
      //                 width="100"
      //                 className="d-inline-block align-top"
      //                 alt="Logo"
      //               />
      //             </Col>
      //           </Row>
      //           <Row className="text-center" style={{ marginTop: "15px" }}>
      //             <Col>
      //               {/* Добавить ссылку на Ether scan  */}
      //               <Button
      //                 variant="outline-dark"
      //                 style={{ width: "250px", paddingTop: "10px" }}
      //               >
      //                 <h5>TRADER ACCOUNT</h5>
      //               </Button>
      //             </Col>
      //           </Row>
      //           <Row className="button-row" style={{ marginBottom: "5px" }}>
      //             <Col className="text-end">
      //               <Button variant="dark" style={{ width: "150px" }}>
      //                 Deposit
      //               </Button>
      //             </Col>
      //             <Col className="text-start">
      //               <Button variant="secondary" style={{ width: "150px" }}>
      //                 Withdraw
      //               </Button>
      //             </Col>
      //           </Row>
      //         </div>
      //       </Row>
      //     </Container>
    );
  }
}
