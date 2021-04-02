import React from "react";
import { MenuAppBar } from "./header";

export const PageLayout = (props) => {
  return (
    <>
      <MenuAppBar />
      <h5 className='mt-5 sample-header'>
        Welcome to the Microsoft Authentication Library For Typescript - React Quickstart
      </h5>
      <br />
      <br />
      {props.children}
    </>
  );
};
