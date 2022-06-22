import Link from "next/link";
import BePatient from "./BePatient";

const SomeComponent = (props) => {
  return (
    <div className="text-white h-screen w-screen flex flex-col items-center justify-center p-12 text-center">
      <h1 className="uppercase text-2xl mb-4">{props.text}</h1>
      {props.patient ? <BePatient /> : <></>}
      <p className="underline cursor-pointer">
        <Link href="/">Back to Home</Link>
      </p>
    </div>
  );
};

export default SomeComponent;
