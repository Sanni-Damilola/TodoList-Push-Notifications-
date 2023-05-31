import React from "react";
import { useRoutes } from "react-router-dom";
import Homescreen from "../Home/Homescreen";

const Route = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Homescreen />,
    },
  ]);

  return element;
};

export default Route;
