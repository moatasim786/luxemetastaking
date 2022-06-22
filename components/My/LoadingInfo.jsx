import Link from "next/link";

const LoadingInfo = (props) => {
  try {
    return (
      <div className="mt-4">
        <p className="text-slate-400 mb-5 text-xs">
          <span className="mr-4">Token ID: {props.x.token_id}</span>
          <Link href={props.x.token_uri} passhref>
            <span className="underline cursor-pointer">NFT Metadata</span>
          </Link>
        </p>
      </div>
    );
  } catch {
    return <div />;
  }
};

export default LoadingInfo;
