import { useMoralis } from "react-moralis";
import Link from "next/link";

export default function Menu({ visible }) {
  const { authenticate, account } = useMoralis();
  return (
    <>
      <div
        className={`z-50 md:w-1/2 w-[95%] lg:hidden block justify-center transition-all bg-white ${
          visible ? "h-[30rem]" : "h-0"
        } duration-500 ease-in-out lg:h-0 overflow-hidden mt-2 rounded-xl drop-shadow-xl fixed top-24`}
      >
        <div className="flex flex-col justify-center h-full p-5 space-y-4">
          {account ? (
            <button className="border border-neutral-400 font-bold p-4 rounded-lg bg-neutral-200 transition-all ease-in-out hover:scale-110 duration-300 overflow-hidden text-ellipsis">
              {account}
            </button>
          ) : (
            <div className="flex flex-col">
              <button
                onClick={authenticate}
                className="border border-neutral-400 font-bold p-4 mb-4 rounded-lg bg-neutral-200 transition-all ease-in-out hover:scale-105 duration-300"
              >
                Connect Browser Wallet
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
                className="border border-neutral-400 font-bold p-4 rounded-lg bg-neutral-200 transition-all ease-in-out hover:scale-105 duration-300"
              >
                Connect Walletconnect
              </button>
            </div>
          )}
          <button className="w-full py-4 text-lg font-semibold transition-all rounded-lg bg-neutral-200 hover:scale-105 border border-neutral-400">
            <Link href="https://luxeracing.tech">Main</Link>
          </button>{" "}
          <button className="w-full py-4 text-lg font-semibold transition-all rounded-lg bg-neutral-200 hover:scale-105 border border-neutral-400">
            <Link href="/minting">Minting</Link>
          </button>
          <button className="w-full py-4 text-lg font-semibold transition-all rounded-lg bg-neutral-200 hover:scale-105 border border-neutral-400">
            <Link href="/staking">Staking</Link>
          </button>
          <button className="w-full py-4 text-lg font-semibold transition-all rounded-lg bg-neutral-200 hover:scale-105 border border-neutral-400">
            <Link href={account ? `/address/${account}/` : "#"}>My NFTs</Link>
          </button>
        </div>
      </div>
    </>
  );
}
