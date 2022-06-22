import Image from "next/image";
import Link from "next/link";
import mint from "../../lib/mint";
import { useMoralis } from "react-moralis";

export default function MintPage({ name, image, text, contract, price }) {
  const { authenticate, isAuthenticated } = useMoralis();
  return (
    <div className="text-white w-full pt-24 pb-16 lg:pt-16 max-w-screen-2xl min-h-screen">
      <div className="flex lg:flex-row flex-col justify-around items-center h-full">
        <div className="flex flex-col lg:p-8 lg:w-1/2 w-4/5 lg:order-1 order-2 gap-16">
          <div className="font-bold italic text-yellow-500 text-6xl">
            {name}
            <span className="text-4xl">{price ? price : ": 100K $LUXE"}</span>
          </div>
          <div className="text-2xl italic">{text}</div>
          <div className="text-xl font-bold">
            {price ? price : "Mint cost: 100K $LUXE"}
          </div>
          <div className="flex lg:flex-row flex-col gap-4 text-black">
            <div className="px-8 py-4 font-black text-xl bg-yellow-500 rounded-2xl text-center">
              <Link href={`https://bscscan.com/token/${contract}`}>
                BSCScan
              </Link>
            </div>
            <button
              className="px-8 py-4 font-black text-xl bg-yellow-500 rounded-2xl text-center"
              onClick={async () => {
                if (!isAuthenticated) {
                  authenticate();
                }
                await mint(name);
              }}
            >
              Mint Now
            </button>
            <div className="px-8 py-4 font-black text-xl bg-yellow-500 rounded-2xl text-center">
              <Link href="https://metricpitstop.info">Statistics</Link>
            </div>
          </div>
        </div>
        <div className="lg:order-2 order-1 lg:w-1/2 lg:pb-0 pb-16">
          <div className="relative mx-auto w-96 h-96">
            <Image src={image} layout="fill" alt="NFT promo image" />
          </div>
        </div>
      </div>
    </div>
  );
}
