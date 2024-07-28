import React from "react";
import { FC } from "react";
import { Outlet } from "react-router-dom";

export const LayoutNormal: FC = () => {
  return (
    <div className="layout-normal mx-auto overflow-x-hidden mb-5">
      <Outlet />
    </div>
  );
};
