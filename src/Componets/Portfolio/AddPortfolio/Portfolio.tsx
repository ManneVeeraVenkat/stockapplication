import { SyntheticEvent } from "react";

interface Props {
  onPortfolioCreate: (e: SyntheticEvent) => void;
  symbol: string;
}

const AddPortfolio = ({ onPortfolioCreate, symbol }: Props) => {
  return (
    <div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
      <form onSubmit={onPortfolioCreate}>
        <input readOnly={true} hidden={true} value={symbol} />
        <button
          type="submit"
          className="px-6 py-2 font-bold rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition duration-300"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddPortfolio;
