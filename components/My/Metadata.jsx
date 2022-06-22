const Meta = (props) => {
  return (
    <div>
      <p className="text-sm">
        <span className="font-bold mr-4">{props.data.trait_type}</span>
        <span className="text-xs text-slate-400 font-light">
          {props.data.value}
        </span>
      </p>
    </div>
  );
};

export default Meta;
