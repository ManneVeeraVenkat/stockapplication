import { useEffect, useState } from "react";
import ListPortfolio from "../../Componets/Portfolio/ListPortfolio/ListPortfolio";
import { PortfolioResponse } from "../../Entity/PortfolioResponse";
import {
  DeletePortfolio,
  GetPortfolioDeatiles,
} from "../../Utilis/HttpService";
import { toast } from "react-toastify";

type Props = {};

const SearchPage = (props: Props) => {
  const [portfolioValues, setPortfolioValues] = useState<
    PortfolioResponse[] | null
  >([]);

  useEffect(() => {
    GetPortfolio();
  }, []);

  const GetPortfolio = () => {
    GetPortfolioDeatiles()
      .then((res) => {
        if (res) {
          setPortfolioValues(res.successResponse!);
        }
      })
      .catch((error) => {
        console.log(error);
        setPortfolioValues(null);
      });
  };

  const onPortfolioDelete = (e: any) => {
    DeletePortfolio(e.target[0].value).then((res) => {
      if (res?.status == 200) {
        toast.success("Stock deleted from portfolio!");
        GetPortfolio();
      }
    });
  };
  return (
    <div className="App">
      <ListPortfolio
        portfolioValues={portfolioValues!}
        onPortfolioDelete={onPortfolioDelete}
      />
    </div>
  );
};

export default SearchPage;
