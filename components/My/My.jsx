import NftView from "./NftView";
import Invalid from "./Invalid";
import MyHeader from "./MyHeader";
import BePatient from "./BePatient";
const My = (props) => {
  let NftViews = [];
  props.data.map((i) => {
    i.result.forEach((item) => {
      NftViews.push(
        <NftView
          data={item}
          add={item.token_address}
          key={item.token_id}
          meta={props.meta}
        />
      );
    });
  });
  if (NftViews.length < 1) {
    return <Invalid text="This address does not own an NFT." patient={true} />;
  }
  return (
    <div className="min-h-screen pt-16 text-white">
      <MyHeader addr={!props.addr ? "No address found" : props.addr} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-2xl m-auto">
        {NftViews}
      </div>
      <BePatient />
    </div>
  );
};

export default My;
