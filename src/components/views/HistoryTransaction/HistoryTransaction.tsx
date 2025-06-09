import CardHeader from "@/components/commons/CardHeader";
import { useAppSelector } from "@/store/store";
import React, { useEffect, useState } from "react";
import useHistory from "./useHistory";
import { IHistoryTransaction } from "@/types/Transaction";
import { LIMIT } from "@/constans/list.constans";
import CardHistory from "@/components/commons/CardHistory";

const HistoryTransaction = () => {
  const [offset, setOffset] = useState(0);
  const [histories, setHistories] = useState<IHistoryTransaction[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const balance = useAppSelector((state) => state.balance.value);
  const { dataHistory, isLoadingHistory } = useHistory(offset, LIMIT);

  useEffect(() => {
    if (dataHistory) {
      setHistories((prev) => [...prev, ...dataHistory.data.records]);

      if (dataHistory.length < LIMIT) {
        setHasMore(false);
      }
    }
  }, [dataHistory]);

  const handleShowMore = () => {
    setOffset((prev) => prev + LIMIT);
  };

  return (
    <div className="container mx-auto mt-6 max-w-screen-2xl">
      <CardHeader valueBalance={balance as unknown as number} />
      <p className="mt-8 font-semibold text-xl">Semua Transaksi</p>
      {histories.map((history) => (
        <CardHistory
          key={history.invoice_number}
          amount={history.total_amount}
          date={history.created_on}
          desc={history.description}
        />
      ))}
      {hasMore && (
        <button
          onClick={handleShowMore}
          className="w-full mt-8 font-semibold text-center text-red-500"
          disabled={isLoadingHistory}>
          {isLoadingHistory ? "Memuat..." : "Show More"}
        </button>
      )}
    </div>
  );
};

export default HistoryTransaction;
