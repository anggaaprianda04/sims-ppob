type CurrencyProps = {
  amount: number;
};

const CurrencyFormatter: React.FC<CurrencyProps> = ({ amount }) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return <span>{formatter.format(amount)}</span>;
};

export default CurrencyFormatter;
