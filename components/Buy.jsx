import Image from "next/image";
import { useState } from "react";
import reverseRelation from "../lib/reverseRelation";
import { useMoralis, useWeb3Transfer } from "react-moralis";
import buy from "../lib/buy";
import sell from "../lib/sell";
import Link from "next/link";

export default function BuyPage(props) {
  const { account } = useMoralis();
  const [query, setQuery] = useState("");
  const [transfer, setTransfer] = useState("");
  let price = props.price;
  let owner = props.data.owner_of;
  let onSale = price > 0;
  let isOwned = owner === account;
  console.log(`isOwned: ${isOwned}, account: ${account}, owner: ${owner}`);
  const preventDefault = (f) => (e) => {
    e.preventDefault();
    f(e);
  };
  const handleSubmit = preventDefault(async () => {
    let price = parseInt(query);
    if (((price >= 1 && price <= 1000000) || price == 0) && price % 1 === 0) {
      console.log(await sell(props.relationKey, props.data.token_id, price));
    } else {
      alert(
        "NFT price should be a whole number between 1 BNB and 1M BNB, or 0 (if you don't want to sell your NFT)"
      );
    }
  });
  const options = {
    type: "erc721",
    receiver: transfer,
    contractAddress: props.data.token_address,
    tokenId: props.data.token_id,
    chain: "bsc",
  };
  const { fetch, error, isFetching } = useWeb3Transfer(options);
  const handleTransfer = preventDefault(async () => {
    fetch();
  });
  const handleParam = (setValue) => (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="py-32 text-white bg-[#030303] w-full pt-24 pb-16 xl:pt-16 max-w-screen-2xl">
      <div className="flex px-16 xl:flex-row flex-col justify-around items-center h-full">
        <div className="xl:pb-0 xl:w-2/5 pb-16 flex justify-center xl:justify-end">
          <div className="border-2 border-neutral-800 relative md:w-96 md:h-96 w-60 h-60 bg-zinc-900">
            <Image
              src={
                "https://ipfs.io/ipfs/" +
                JSON.parse(props.data.metadata).image.substring(7)
              }
              layout="fill"
              alt="NFT Preview"
            />
          </div>
        </div>
        <div className="flex flex-col xl:p-8 gap-8 xl:w-2/4 w-full items-center xl:items-start h-full">
          <div className="flex flex-col gap-2 bg-white w-full text-black p-4 rounded-lg">
            <div className="font-['Caveat'] text-4xl lg:text-7xl text-yellow-600 font-bold">
              {props.data.name.substring(14)}
              <span className="text-yellow-800 text-[0.5em] pl-3">
                #{props.data.token_id}
              </span>
            </div>
            <span
              className={`text-xs rounded-lg font-bold py-1 px-3 text-bold w-fit ${
                onSale
                  ? "bg-green-200 text-green-900"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {onSale ? "On Sale" : "Not for Sale"}
            </span>
            <br />
            <span className="text-lg lg:text-md">
              <Link href={`/address/${props.data.owner_of}`} passHref>
                <div className="inline underline cursor-pointer">
                  <b className="pr-2">Current Owner:</b>
                  <span className="text-sm hidden lg:inline">
                    {props.data.owner_of.substring(0, 20)}...
                  </span>
                  <span className="text-sm lg:hidden inline">
                    {props.data.owner_of.substring(0, 6)}...
                  </span>
                </div>
              </Link>
              <br />
              <b className="pr-2">Contract Address:</b>
              <span className="text-sm hidden lg:inline">
                {props.data.token_address.substring(0, 20)}...
              </span>
              <span className="text-sm lg:hidden inline">
                {props.data.token_address.substring(0, 6)}...
              </span>
            </span>
            <div className="font-bold text-sm">
              {isOwned ? (
                <p>You own this NFT.</p>
              ) : (
                <p>Owner of this NFT? Connect wallet to change price</p>
              )}
            </div>
          </div>
          {onSale ? (
            <div className="flex flex-col gap-4 bg-white text-black p-6 w-full rounded-lg">
              <div className="text-xl flex flex-col text-zinc-900 font-bold">
                <p>
                  <span className="text-lg">Price:</span>
                  <span className="text-2xl pl-2 font-bold">{price}</span>
                  <span className="text-lg pl-1">BNB</span>
                </p>
              </div>
              {!isOwned ? (
                account ? (
                  <button
                    onClick={() => {
                      buy(
                        reverseRelation(props.data.token_address),
                        props.data.token_id,
                        price
                      );
                    }}
                    className="text-lg w-fit py-1 px-6 font-bold bg-amber-400 transition-all duration-200 ease-in-out max-w-xs hover:scale-110 rounded-xl"
                  >
                    Buy Now
                  </button>
                ) : (
                  <p>Connect wallet to get started</p>
                )
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
          {isOwned ? (
            <div className="bg-white text-black p-6 w-full rounded-lg">
              <div className="flex flex-col pb-12">
                <form className="w-full h-full" onSubmit={handleSubmit}>
                  <div className="pb-2 font-bold">Set NFT Price:</div>
                  <div className="flex items-end">
                    <input
                      id="search"
                      type="number"
                      value={query}
                      onChange={handleParam(setQuery)}
                      className="bg-gray-200 rounded-md py-1 px-4 w-32 text-black transition-all"
                      aria-label="Search by address"
                      placeholder="New Price"
                    />
                    <span className="ml-1 font-bold text-sm">BNB</span>
                    <button
                      className="bg-gray-200 ml-8 rounded-md px-4 py-1"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                  <p className="pt-6">
                    To remove NFT from sale, set price to 0.
                  </p>
                </form>
              </div>
              <form className="w-full h-full" onSubmit={handleTransfer}>
                <div className="pb-2 font-bold">Transfer NFT:</div>
                <div className="flex items-end">
                  <input
                    id="search"
                    value={transfer}
                    onChange={handleParam(setTransfer)}
                    className="bg-gray-200 rounded-md py-1 px-4 w-full text-black transition-all"
                    aria-label="Search by address"
                    placeholder="Recipient"
                  />
                  <button
                    className="bg-gray-200 ml-2 rounded-md px-4 py-1"
                    type="submit"
                  >
                    Transfer
                  </button>
                </div>
                {error && (
                  <div className="pt-2">
                    <div className="text-red-400">
                      <b>Something went wrong</b>
                      <br />
                      <span className="text-red-300">
                        Make sure you enter a valid address.
                      </span>
                    </div>
                  </div>
                )}
              </form>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
