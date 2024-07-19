import React from "react";
import Image from "next/image";

// Supondo que as imagens sejam importadas ou tenham seus caminhos definidos
import PSQL from "../icons/postgresql-svgrepo-com.svg";
import JavaScript from "../icons/js-square-svgrepo-com.svg";
import java from "../icons/java-svgrepo-com.svg";
import Csharp from "../icons/c-sharp-svgrepo-com (1).svg";

const MyComponent = () => {
  return (
    <div className="h-15 flex items-center justify-center">
      <ul className="md:justify-center contents justify-between relative">
        <li className="flex p-2 bg-opacity-5 invert">
          <Image
            src={PSQL}
            width={50}
            height={50}
            alt="Picture of the author"
            className="mySvg"
          />{" "}
        </li>

        <li className="flex p-2 bg-transparent backdrop-blur-sm">
          <Image
            src={JavaScript}
            width={50}
            height={50}
            alt="Picture of the author"
            className="full-shadow invert rounded-sm"
          />{" "}
        </li>

        <li className="flex p-2 invert ">
          <Image
            src={java}
            width={50}
            height={50}
            alt="Picture of the author"
          />{" "}
        </li>

        <li className="flex p-2 invert">
          <Image
            src={Csharp}
            width={50}
            height={50}
            alt="Picture of the author"
          />{" "}
        </li>
      </ul>
    </div>
  );
};

export default MyComponent;
