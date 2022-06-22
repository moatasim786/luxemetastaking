import Link from "next/link";

const MyHeader = (props) => {
  const bscscan = `https://bscscan.com/address/${props.addr}`;
  return (
    <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
      <h1 className="text-xl md:text-3xl font-logo">Showing NFTs Owned By:</h1>
      <p className="text-sm md:text-lg mt-2 py-1 px-3 bg-slate-700 rounded-md break-all">
        {props.addr}
      </p>
      <div className="mt-10 text-xs">
        <div className="leading-relaxed">
          <p className="underline text-sm cursor-pointer">
            <Link href={bscscan}>See token on BscScan</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyHeader;
