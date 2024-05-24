"use client";

import image from "next/image";
import {memo} from "react";
import ActiveUsers from "./users/ActiveUsers";
import { NavbarProps } from "@/types/type";

const Navbar =({ activeElement } : NavbarProps) =>{
  return(
    <nav className="flex select-none items-center
    justify-between gap-4 bg-primary-black px-5
    text-white">
      <div className="flex items-center gap-4">
      <img src="/assets/Ligma_logo/ligma_color.png" className="h-12 w-auto" alt="Ligma" width={58} height={20} />
      <div className="">
      <h2 className="text-2xl font-mono font-extralight tracking-widest">Ligma</h2>
      <p className="text-xs font-extralight text-gray-400 tracking-widest">Design Tool</p>
      </div>
      </div>
      <ActiveUsers/>
    </nav>
  )
}

export default memo(Navbar, (prevProps, nextProps)=> prevProps.activeElement === nextProps.activeElement);