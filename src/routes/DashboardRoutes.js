import React from "react";
import DataProvide from "../Context/DataContext";
import Dashboard from "../Components/Dashboard";

export default function DashboardRoutes() {
  return (
    <DataProvide>
      <Dashboard />
    </DataProvide>
  );
}
