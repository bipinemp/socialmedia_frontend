"use client";
import Link from "next/link";

const error = () => {
  return (
    <div>
      <h1>
        Opps :( , &nbsp; Error Go To Homepage <Link href="/">Home</Link>
      </h1>
    </div>
  );
};

export default error;
