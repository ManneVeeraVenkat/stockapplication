import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CompanyProfile } from "../../company";
import { getComapnyProfile } from "../../FinacialModelingAPI";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import CompanyDashboard from "../../Componets/CompanyDashboard/CompanyDashboard";
import Title from "../../Componets/Title/Tile";
import Tile from "../../Componets/Title/Tile";
import CompFinder from "../../Componets/ComFinder/CompFinder";

const CompanyPage: React.FC = () => {
  const { ticker } = useParams<{ ticker?: string }>();
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) {
      setError("No company ticker provided.");
      setLoading(false);
      return;
    }

    const fetchCompanyProfile = async () => {
      try {
        setLoading(true);
        const result = await getComapnyProfile(ticker);
        if (result && Array.isArray(result.data) && result.data.length > 0) {
          setCompany(result.data[0]);
        } else {
          setError("Company not found.");
        }
      } catch (err) {
        setError("Failed to fetch company data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProfile();
  }, [ticker]);

  return (
    <div>
      {loading && <p>Loading company data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {company && (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company Name" subTitle={company.companyName} />
            <Tile title="Price" subTitle={"$" + company.price.toString()} />
            <Tile title="DCF" subTitle={"$" + company.dcf.toString()} />
            <Tile title="Sector" subTitle={company.sector} />

            <p className="bg-white shadow rounded text-medium font-medium text-gray-900 p-3 mt-1 m-4">
              {company.description}
            </p>
          </CompanyDashboard>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
