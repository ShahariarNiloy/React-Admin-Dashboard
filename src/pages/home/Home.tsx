import React from "react";
import SideBar from "../../components/sidebar/SideBar";
import "./HomeStyle.scss";

const Home = () => {
  return (
    <div className="home">
      <SideBar />
      <div className="homeContainer">container</div>
    </div>
  );
};

export default Home;
