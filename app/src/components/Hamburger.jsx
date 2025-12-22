"use client"; 

import Link from "next/link";

function Hamburger({ firstPage, secondPage }) {
  return (
    <div className="text-white">
      <h2>
        <Link href="/">{firstPage}</Link> <span>/ {secondPage}</span>
      </h2>
    </div>
  );
}

export default Hamburger;
