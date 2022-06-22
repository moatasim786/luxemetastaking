import { useMoralis } from "react-moralis";
import { useState } from "react";
import Image from "next/image";
// oldu

export default function BuyBox(props) {
  console.log(props.data);
  return (
    <div>
      <div>{props.data}</div>
    </div>
  );
}
