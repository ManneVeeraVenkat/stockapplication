import path from "path";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import ComapnyProfile from "../Componets/CompanyProfile/ComapnyProfile";
import IncomeStaement from "../Componets/IncomeStatement/IncomeStaement";
import DesignGuide from "../DesingerGuid/DesignGuide";
import BalanceSheet from "../Componets/BalanceSheet/BalanceSheet";
import CashflowStatement from "../Componets/CashFlowStament/CashFlowStatement";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import ProtectedRouter from "./ProtectedRouter";
import SearchResult from "../Pages/SearchPage/SearchResult";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      { path: "register", element: <RegisterPage /> },
      {
        path: "search",
        element: (
          <ProtectedRouter>
            <SearchPage />
          </ProtectedRouter>
        ),
      },
      { path: "/search-result", element: <SearchResult /> },
      { path: "design-guide", element: <DesignGuide /> },
      {
        path: "company/:ticker/",
        element: (
          <ProtectedRouter>
            <CompanyPage />
          </ProtectedRouter>
        ),
        children: [
          { path: "company-profile", element: <ComapnyProfile /> },
          { path: "income-statement", element: <IncomeStaement /> },
          { path: "balance-sheet", element: <BalanceSheet /> },
          { path: "cashflow-statement", element: <CashflowStatement /> },
          // { path: "historical-dividend", element: <HistoricalDividend /> },
        ],
      },
    ],
  },
]);
