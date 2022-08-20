import React from "react";
import "./SideBarStyle.scss";
const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Niloy Admin</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <li>
            <span>Dashboard</span>
          </li>
          <li>
            <span>Dashboard</span>
          </li>
          <li>
            <span>Dashboard</span>
          </li>
          <li>
            <span>Dashboard</span>
          </li>
        </ul>
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default SideBar;
