import reverseRelation from "../../lib/reverseRelation";
import Metadata from "./Metadata";
import Image from "next/image";
import LoadingInfo from "./LoadingInfo";

const NftView = (props) => {
  console.log(props.ssr);
  const x = props.data;
  const m = JSON.parse(props.data.metadata);
  let price = 1;
  try {
    let meta = [];
    m.attributes.forEach((item) => {
      meta.push(<Metadata data={item} key={item.trait_type} />);
    });
    return (
      <div className="flex flex-col items-center justify-center p-2">
        <div
          onClick={() => {
            window.location.replace(
              "/buy/" +
                reverseRelation(x.token_address).toLowerCase() +
                "@" +
                x.token_id
            );
          }}
          className="cursor-pointer flex flex-col items-center justify-center my-10 pb-10 bg-zinc-900 px-8 pt-10 rounded-xl border border-zinc-800 shadow-xl"
        >
          <div className="bg-slate-800 shadow-xl w-64 h-64 mr-0 border border-neutral-800 relative mb-8">
            <Image
              src={"https://ipfs.io/ipfs/" + m.image.substring(7)}
              layout="fill"
              alt=""
            />
          </div>
          <div>
            <h2 className="font-logo text-2xl">{m.name}</h2>
            <h3 className="text-slate-400 mb-2 font-light">
              Token ID: {x.token_id}
            </h3>
            <div>{meta}</div>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.log(e);
    return (
      <div
        className="text-center pt-12 pb-12"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <h2 className="text-xl mb-2">This NFT is still loading...</h2>
        <p className="text-slate-400 text-xs">Try again later</p>
        <LoadingInfo x={props.data} />
      </div>
    );
  }
};

export default NftView;
