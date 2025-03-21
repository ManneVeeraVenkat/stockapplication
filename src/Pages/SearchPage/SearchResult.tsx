import React from "react";
import { toast } from "react-toastify";
import CardList from "../../Componets/CardList/CardList";
import { useAuth } from "../../Componets/Context/useAuth";
import Hero from "../../Hero/Hero";
import { PostPortfolio } from "../../Utilis/HttpService";

type Props = {};

const SearchResult = (props: Props) => {
  const { searchResults, hasSearched } = useAuth();

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    PostPortfolio(e.target[0].value)
      .then((res) => {
        if (res?.status === 204) {
          toast.success("Stock added to portfolio!");
        } else {
          toast.warning(JSON.stringify(res.failureResponse));
        }
      })
      .catch((e) => {
        toast.warning("Could not add stock to portfolio!");
      });
  };
  return (
    <div>
      {hasSearched && searchResults.length === 0 && (
        <p className="mb-3 text-xl font-semibold text-center text-red-500">
          No results found!
        </p>
      )}
      {searchResults.length > 0 ? (
        <CardList
          searchResults={searchResults}
          onPortfolioCreate={onPortfolioCreate}
        />
      ) : (
        <Hero />
      )}
    </div>
  );
};

export default SearchResult;
