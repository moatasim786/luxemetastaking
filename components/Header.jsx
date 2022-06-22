import Logo from "../public/logo.webp";
import Image from "next/image";
import { useMoralis } from "react-moralis";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { luxeToken } from "../lib/nftRelations";
import Menu from "./Menu";
import Link from "next/link";
import Luxe from "../artifacts/contracts/Luxe.sol/LuxeToken.json";

export default function Header() {
  const [isMenu, setIsMenu] = useState(false);
  const [balance, setBalance] = useState("?");
  const { authenticate, account } = useMoralis();
  useEffect(() => {
    const getUserBalance = async () => {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      const luxe = new ethers.Contract(luxeToken.mainnet, Luxe.abi, signer);
      let balance = await luxe.balanceOf(account);
      let balanceParsed = Math.floor(parseInt(balance._hex, 16) / 10 ** 18);
      setBalance(balanceParsed);
      return balanceParsed;
    };
    if (account) {
      getUserBalance();
    }
  }, [account]);
  return (
    <header>
      <div className="drop-shadow-xl z-50 h-20 w-full bg-black border-b border-neutral-700 fixed">
        <div className="flex h-full">
          <div className="pl-8 w-full h-full flex items-center justify-start">
            <div className="w-40 h-32 cursor-pointer transition-all ease-in-out hover:scale-110 duration-300">
              <Link href="/" passHref>
                <div className="relative w-40 h-32">
                  <Image src={Logo} alt="Logo" layout="fill" />
                </div>
              </Link>
            </div>
            <div className="flex items-center justify-end w-full h-full md:gap-8 px-8 text-white">
              <div className="gap-4 lg:flex hidden">
                <Link href="/">
                  <a className="font-bold transition-all ease-in-out hover:scale-110 duration-300 hover:font-black px-3">
                    Home
                  </a>
                </Link>
                <Link href="https://luxeracing.tech">
                  <a className="font-bold transition-all ease-in-out hover:scale-110 duration-300 hover:font-black px-3">
                    Main
                  </a>
                </Link>
                <div onClick={account ? () => {} : authenticate}>
                  <Link href={account ? `/address/${account}/` : "#"}>
                    <a className="font-bold transition-all ease-in-out hover:scale-110 duration-300 hover:font-black px-3">
                      My NFTs
                    </a>
                  </Link>
                </div>
                <Link href="/staking">
                  <a className="font-bold transition-all ease-in-out hover:scale-110 duration-300 hover:font-black px-3">
                    Staking
                  </a>
                </Link>
                <Link href="/minting">
                  <a className="font-bold transition-all ease-in-out hover:scale-110 duration-300 hover:font-black px-3">
                    Minting
                  </a>
                </Link>
              </div>
              <div className="lg:block hidden select-none">
                {account ? (
                  <div className="flex items-center">
                    <div className="mr-3 text-sm">{balance} $LUXE</div>
                    <button className="font-bold text-black border border-black py-4 px-7 rounded-full overflow-hidden text-ellipsis lg:max-w-[160px] bg-amber-400">
                      {account}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-row text-md">
                    <button
                      onClick={authenticate}
                      className="font-bold text-black border border-black py-4 px-7 rounded-l-full transition-all bg-amber-400"
                    >
                      Connect
                    </button>
                    <button
                      onClick={() =>
                        authenticate({
                          provider: "walletconnect",
                          mobileLinks: [
                            "rainbow",
                            "metamask",
                            "argent",
                            "trust",
                            "imtoken",
                            "pillar",
                          ],
                        })
                      }
                      className="font-bold text-black border border-black drop-shadow-md py-4 px-7 rounded-r-full transition-all bg-amber-400"
                    >
                      WalletConnect
                    </button>
                  </div>
                )}
              </div>
              <div>
                <button
                  className="lg:hidden block text-3xl"
                  onClick={() => {
                    setIsMenu(!isMenu);
                  }}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Menu visible={isMenu} />
      </div>
    </header>
  );
}
