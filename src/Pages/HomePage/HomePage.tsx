import React from "react";
import Hero from "../../Hero/Hero";
import CardList from "../../Componets/CardList/CardList";
import { toast } from "react-toastify";
import { PostPortfolio } from "../../Utilis/HttpService";
import { useAuth } from "../../Componets/Context/useAuth";

const HomePage = () => {

  return (
    <>
      <Hero />
    </>
  );
};

export default HomePage;
