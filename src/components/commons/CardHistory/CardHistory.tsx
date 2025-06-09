import CurrencyFormatter from "@/components/ui/CurrencyFormatter";
import { formatDate } from "@/config/formatDate";
import React from "react";

interface PropTypes {
  amount: number;
  date: string;
  desc: string;
}

const CardHistory = (props: PropTypes) => {
  const { amount, date, desc } = props;

  return (
    <div className="p-4 mt-4 border rounded-md shadow-sm flex justify-between">
      <div>
        <p className="font-semibold mb-2 text-xl text-green-500 ">
          Rp {<CurrencyFormatter amount={amount} />}
        </p>
        <p className="text-sm text-gray-500">{formatDate(date)}</p>
      </div>
      <span className="text-sm text-gray-600">{desc}</span>
    </div>
  );
};

export default CardHistory;
