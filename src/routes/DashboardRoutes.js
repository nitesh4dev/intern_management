import React from "react";
import DataProvide from "../Context/DataContext";
import Dashboard from "../Components/Dashboard";

export default function DashboardRoutes() {
  return (
    <>
      {/* DataProvide exposes, global data like title, which will be used by different components inside our app, like Header.js  */}
      <DataProvide>
        <Dashboard />
      </DataProvide>
    </>
  );
}
