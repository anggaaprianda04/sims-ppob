import React from "react";

interface Proptypes {
  amount: string;
  onClick: () => void;
}

const CardTopup = (props: Proptypes) => {
  const { amount, onClick } = props;

  return (
    <button
      onClick={onClick}
      className="border rounded-md py-2 text-sm text-gray-700 hover:bg-gray-100">
      Rp{Number(amount).toLocaleString("id-ID")}
    </button>
  );
};

export default CardTopup;
