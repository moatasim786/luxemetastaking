import { useMoralis } from "react-moralis";
import { useState } from "react";
import Image from "next/image";
import mint from "../../lib/mint";

function NFT(props) {
  const setQuantity = (count) => {
    return count < 1 ? 1 : count >= maxQuantity ? maxQuantity : count;
  };
  const maxQuantity = 9;

  const [count, setCount] = useState(1);
  const { authenticate, account, isAuthenticated } = useMoralis();
  return (
    <div className="m-6 rounded-3xl border-8 border-amber-400 flex items-center align-center flex-col p-10">
      <div className="bg-neutral-800 w-56 h-56 mb-10 relative">
        <Image layout="fill" alt="" src={"/nft_gif/" + props.gif}></Image>
      </div>
      <h2 className="text-4xl font-bold italic mb-8">{props.name}</h2>
      <div className="flex justify-center w-96">
        <a
          href={props.href}
          className="bg-amber-400 text-black cursor-pointer text-center px-4 py-4 text-lg font-bold transition-all ease-in-out hover:scale-110 duration-300 drop-shadow-md rounded-2xl w-4/6"
        >
          Mint Now
        </a>
      </div>
    </div>
  );
}

export default function Minter() {
  return (
    <div className="m-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center items-center md:scale-100 scale-75">
      <NFT
        href="/mint/amggt"
        explore="/explore/amggt"
        name="AMG GT"
        gif="AMGGT.gif"
      />
      <NFT
        href="/mint/gemera"
        explore="/explore/gemera"
        name="Gemera"
        gif="GEMERA.gif"
      />
      <NFT href="/mint/gt3" explore="/explore/gt3" name="GT3" gif="GT3.gif" />
      <NFT
        href="/mint/aventador"
        explore="/explore/aventador"
        name="Aventador"
        gif="AVENTADOR.gif"
      />
      <NFT
        href="/mint/pista"
        explore="/explore/pista"
        name="Pista"
        gif="PISTA.gif"
      />
    </div>
  );
}
