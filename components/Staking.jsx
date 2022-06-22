import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Script from "next/script";
import {
  useMoralis,
  useWeb3Transfer,
  enableWeb3,
  isWeb3Enabled,
  web3,
} from "react-moralis";
import { Moralis } from "moralis";
import React, { useEffect, useState } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider"; 

export default function Staking() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [bal, setBal] = useState();
  const [stakedAmount, setStakes] = useState(0);
  const { authenticate, account } = useMoralis();

  useEffect(
    () => {
      document.querySelector("body").classList.add("body")
    }
  )

  const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const ABI = [
    {
      inputs: [
        { internalType: "contract IERC20", name: "_token", type: "address" },
        {
          internalType: "contract IERC20",
          name: "_receiptToken",
          type: "address",
        },
        {
          internalType: "contract IMasterChef",
          name: "_masterchef",
          type: "address",
        },
        { internalType: "address", name: "_admin", type: "address" },
        { internalType: "address", name: "_treasury", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "shares",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "lastDepositedTime",
          type: "uint256",
        },
      ],
      name: "Deposit",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "performanceFee",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "callFee",
          type: "uint256",
        },
      ],
      name: "Harvest",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    { anonymous: false, inputs: [], name: "Pause", type: "event" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Paused",
      type: "event",
    },
    { anonymous: false, inputs: [], name: "Unpause", type: "event" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Unpaused",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "shares",
          type: "uint256",
        },
      ],
      name: "Withdraw",
      type: "event",
    },
    {
      inputs: [],
      name: "MAX_CALL_FEE",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MAX_PERFORMANCE_FEE",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MAX_WITHDRAW_FEE",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MAX_WITHDRAW_FEE_PERIOD",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "admin",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "available",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "calculateHarvestSphynxRewards",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "calculateTotalPendingSphynxRewards",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "callFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
      name: "deposit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_user", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
      ],
      name: "depositForOtherUser",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "emergencyWithdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getPricePerFullShare",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_user", type: "address" }],
      name: "getUserInfo",
      outputs: [
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "harvest",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_token", type: "address" }],
      name: "inCaseTokensGetStuck",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "lastHarvestedTime",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "masterchef",
      outputs: [
        { internalType: "contract IMasterChef", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "performanceFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "receiptToken",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_admin", type: "address" }],
      name: "setAdmin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_callFee", type: "uint256" }],
      name: "setCallFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_performanceFee", type: "uint256" },
      ],
      name: "setPerformanceFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_treasury", type: "address" }],
      name: "setTreasury",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_withdrawFee", type: "uint256" },
      ],
      name: "setWithdrawFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_withdrawFeePeriod",
          type: "uint256",
        },
      ],
      name: "setWithdrawFeePeriod",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "token",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalShares",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "treasury",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "userInfo",
      outputs: [
        { internalType: "uint256", name: "shares", type: "uint256" },
        { internalType: "uint256", name: "lastDepositedTime", type: "uint256" },
        {
          internalType: "uint256",
          name: "sphynxAtLastUserAction",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "lastUserActionTime",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_shares", type: "uint256" }],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawFeePeriod",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  const tokenABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sniper",
          type: "address",
        },
      ],
      name: "BoughtEarly",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "BuyBackTriggered",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "isExcluded",
          type: "bool",
        },
      ],
      name: "ExcludeFromFees",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "pair",
          type: "address",
        },
        { indexed: true, internalType: "bool", name: "value", type: "bool" },
      ],
      name: "SetAutomatedMarketMakerPair",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "tokensSwapped",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "ethReceived",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokensIntoLiquidity",
          type: "uint256",
        },
      ],
      name: "SwapAndLiquify",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "newAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "oldAddress",
          type: "address",
        },
      ],
      name: "UpdateUniswapV2Router",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "newWallet",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "oldWallet",
          type: "address",
        },
      ],
      name: "buyBackWalletUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "newWallet",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "oldWallet",
          type: "address",
        },
      ],
      name: "marketingWalletUpdated",
      type: "event",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "_isExcludedMaxTransactionAmount",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "automatedMarketMakerPairs",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "bnbAmountInWei", type: "uint256" },
      ],
      name: "buyBackTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "buyBackWallet",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "buyBuyBackFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "buyLiquidityFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "buyMarketingFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "buyTotalFees",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "deadAddress",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "disableTransferDelay",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "enableTrading",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "bool", name: "excluded", type: "bool" },
      ],
      name: "excludeFromFees",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "updAds", type: "address" },
        { internalType: "bool", name: "isEx", type: "bool" },
      ],
      name: "excludeFromMaxTransaction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "isExcludedFromFees",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "limitsInEffect",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "marketingWallet",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxTransactionAmount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxWallet",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "removeLimits",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "sellBuyBackFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "sellLiquidityFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "sellMarketingFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "sellTotalFees",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "pair", type: "address" },
        { internalType: "bool", name: "value", type: "bool" },
      ],
      name: "setAutomatedMarketMakerPair",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "swapEnabled",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "swapTokensAtAmount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokensForBuyBack",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokensForLiquidity",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokensForMarketing",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tradingActive",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tradingActiveBlock",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "transferDelayEnabled",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "uniswapV2Pair",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "uniswapV2Router",
      outputs: [
        {
          internalType: "contract IUniswapV2Router02",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newWallet", type: "address" }],
      name: "updateBuyBackWallet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_marketingFee", type: "uint256" },
        { internalType: "uint256", name: "_liquidityFee", type: "uint256" },
        { internalType: "uint256", name: "_buyBackFee", type: "uint256" },
      ],
      name: "updateBuyFees",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newMarketingWallet",
          type: "address",
        },
      ],
      name: "updateMarketingWallet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "newNum", type: "uint256" }],
      name: "updateMaxAmount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_marketingFee", type: "uint256" },
        { internalType: "uint256", name: "_liquidityFee", type: "uint256" },
        { internalType: "uint256", name: "_buyBackFee", type: "uint256" },
      ],
      name: "updateSellFees",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bool", name: "enabled", type: "bool" }],
      name: "updateSwapEnabled",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "newAmount", type: "uint256" }],
      name: "updateSwapTokensAtAmount",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ];

  const sendOptions = {
    contractAddress: "0xd0fe57e281c29d379f6828bc5f5e0d0d2afbb088",
    functionName: "deposit",
    abi: ABI,
    params: {
      _amount: BigInt(stakedAmount * 10 ** 18),
    },
  };
  //0xc658639FEAa313C4b6BD69C5Bf9300835E766535
  const payAllOptions = {
    contractAddress: "0xd0fe57e281c29d379f6828bc5f5e0d0d2afbb088",
    functionName: "withdrawAll",
    abi: ABI,
    params: {},
  };

  const payOptions = {
    contractAddress: "0xd0fe57e281c29d379f6828bc5f5e0d0d2afbb088",
    functionName: "withdraw",
    abi: ABI,
    params: {},
  };

  const getData = {
    contractAddress: "0xd0fe57e281c29d379f6828bc5f5e0d0d2afbb088",
    functionName: "getUserInfo",
    abi: ABI,
    params: {
      _user: account,
    },
  };

  const getAllowance = {
    contractAddress: "0x13D5e09c1E2648cb94D1AD67eD266D581F6E1926",
    functionName: "allowance",
    abi: tokenABI,
    params: {
      owner: account,
      spender: "0xd0fe57e281c29d379f6828bc5f5e0d0d2afbb088",
    }
  }

  const Approve = {
    contractAddress: "0x13D5e09c1E2648cb94D1AD67eD266D581F6E1926",
    functionName: "approve",
    abi: tokenABI,
    params: {
      spender: "0xd0fe57e281c29d379f6828bc5f5e0d0d2afbb088",
      amount: BigInt(stakedAmount * 10 ** 18),
    }
  }

  const HandelChange = (obj) => {
    setOption(obj);
    console.log(obj);
  };

  return (
    <div className="h-full w-full flex justify-center lg:items-center items-start bg-geometric bg-cover bg-center bg-fixed">
      <div className="py-24 lg:p-0 text-white flex absolute gap-16 flex-col lg:flex-row w-3/4 lg:h-2/4 justify-center items-center transition-all">
        <div className="items-center justify-around drop-shadow-xl bg-blue-700 w-full lg:w-1/3 lg:max-w-sm lg:h-full h-96 flex flex-col p-8 rounded-xl border-[1px] border-yellow-500">
          <div className="text-4xl font-bold">Start Staking!</div>
          <div className="text-xl text-center">Welcome to Luxe staking!</div>
        </div>
        <div className="items-center justify-around drop-shadow-xl bg-blue-700 w-full lg:w-1/3 lg:max-w-sm lg:h-full h-96 flex flex-col p-8 rounded-xl border-[1px] border-yellow-500">
          <div className="text-xl text-center">
            To start staking, enter an amount and press &quot;Stake!&quot;
          </div>
          <div>
            <input
              onChange={(event) => setStakes(event.target.value)}
              className="bg-blue-900 rounded-md p-4 border-[1px] border-yellow-500"
              type="number"
            />
          </div>
          <div>
            {account ? (
              <button
                className="drop-shadow-md p-4 rounded-md transition-all overflow-hidden text-ellipsis max-w-[240px] hover:scale-110 bg-blue-900 border-[1px] border-yellow-500"
                onClick={async () => {
                  if (BigInt(stakedAmount)) {
                    const all = await Moralis.executeFunction(
                      getAllowance
                    );
                    console.log(BigInt(all))
                    if  (BigInt(all/ 10 ** 18) < BigInt(100000000000)) {
                      const app = await Moralis.executeFunction(
                        Approve
                      );
                      await app.wait();
                    }
                    const transaction = await Moralis.executeFunction(
                      sendOptions
                    );
                    console.log(transaction.hash);
                    await transaction.wait();
                  } else if (!BigInt(stakedAmount)) {
                    alert("Please enter a value");
                  }
                }}
              >
                Stake!
              </button>
            ) : (
              <div>Please connect first...</div>
            )}
          </div>
        </div>
        <div className="items-center justify-around drop-shadow-xl bg-blue-700 w-full lg:w-1/3 lg:max-w-sm lg:h-full h-96 flex flex-col p-8 rounded-xl border-[1px] border-yellow-500">
          <div className="text-xl text-center">
            Here, you can withdraw all your coins.
          </div>

          {account ? (
            <>
              <button
                className="drop-shadow-md p-4 rounded-md transition-all overflow-hidden text-ellipsis max-w-[240px] hover:scale-110 bg-blue-900 border-[1px] border-yellow-500"
                onClick={async () => {
                  const transaction = await Moralis.executeFunction(
                    payAllOptions
                  );
                  console.log(transaction.hash);
                  await transaction.wait();
                }}
              >
                Withdraw All
              </button>

              <button
                className="drop-shadow-md p-4 rounded-md transition-all overflow-hidden text-ellipsis max-w-[240px] hover:scale-110 bg-blue-900 border-[1px] border-yellow-500"
                onClick={async () => {
                  const data = await Moralis.executeFunction(getData);
                  setBal(BigInt(data[0] / 10 ** 18).toString());
                }}
              >
                Check
              </button>

              <div>You have {bal} coins staked</div>
            </>
          ) : (
            <div>Please connect first...</div>
          )}
        </div>
      </div>
    </div>
  );
}
