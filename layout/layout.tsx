import Image from "next/image";
import React from "react";
import styles from "../styles/layout.module.css";
const Layout = ({ children }: any) => {
  return (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-8/12 h-6/7 grid lg:grid-cols-2">
        <div className={styles.imgStyle}>
          <div className={styles.imgFile}></div>
        </div>
        <div className="right flex felx-col justify-evenly ">
          <div className="text-center py-20">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
