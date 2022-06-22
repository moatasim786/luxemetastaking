import Link from "next/link";

export default function LastMint(props) {
  console.log(props.data.result[0]);
  const x = props.data.result[0];
  let name;
  let rname;
  if (x.token_address == "0x222f0aa06a64ee1d880ee23c4e67eb068ae52219") {
    name = "pista";
    rname = "Pista";
  } else if (x.token_address == "0x80485767096cb9904bd754c7727ee34c90a3375b") {
    name = "aventador";
    rname = "Aventador";
  } else if (x.token_address == "0x4961cd7c08813d8dbe5839df0360a58f67e42145") {
    name = "amggt";
    rname = "AMGGT";
  } else if (x.token_address == "0xe16c6e9c274f6e7afd7e5cc425453e713e1b438e") {
    name = "gt3";
    rname = "GT3";
  }
  console.log(x.token_address);
  return (
    <div className="w-80 h-[28rem] bg-zinc-400 m-8 p-6 transition-all ease-in-out hover:scale-105 cursor-pointer rounded-lg">
      <Link href={"/buy/" + name + "@" + x.token_id} passHref>
        <div className="text-black font-bold text-2xl h-full flex flex-col justify-center">
          <div>
            <b>
              Token Address: <br />
            </b>
            {x.token_address.substring(0, 18) + "..."}
          </div>{" "}
          <br />
          <div>
            <b>
              Sent to: <br />
            </b>
            {x.to_address.substring(0, 18) + "..."}
          </div>{" "}
          <br />
          <div>
            <b>
              Sent from: <br />
            </b>
            {x.from_address != "0x0000000000000000000000000000000000000000"
              ? x.from_address.substring(0, 18) + "..."
              : "Minted Freshly"}
          </div>{" "}
          <br />
          <div>
            <b>
              Token Name: <br />
            </b>
            {rname}
          </div>
        </div>
      </Link>
    </div>
  );
}
