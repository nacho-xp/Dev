import Link from "next/link";
import React from "react";

function AdminHeader() {
  return (
    <header className="mb-12 border-b border-rule pb-8 mx-auto">
      <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-dorado mb-3 text-center">
        Panel de administración
      </p>
      <h1 className="font-serif font-light text-[42px] leading-[1.1] text-ink text-center">
        Museo Nacional de <em className="italic text-dorado">Bellas Artes</em>
      </h1>
      <Link className="underline decoration-black font-sans text-[10px] tracking-[0.28em] uppercase text-dorado mb-3 text-center" href="/" >Volver al incio</Link>
    </header>
  );
}

export default AdminHeader;
