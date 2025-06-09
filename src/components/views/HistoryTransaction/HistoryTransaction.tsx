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

  useEffect(() => {
    if (dataHistory) {
      if (offset === 0) {
        setHistories(dataHistory.data.records);
      } else {
        setHistories((prev) => [...prev, ...dataHistory.data.records]);
      }

      if (dataHistory.length < LIMIT) {
        setHasMore(false);
      }
    }
  }, [dataHistory, offset]);

  return (
    <div className="container mx-auto mt-6 max-w-screen-2xl">
      <CardHeader valueBalance={balance as unknown as number} />
      <p className="mt-8 font-semibold text-xl">Semua Transaksi</p>
      {histories.map((history, index: number) => (
        <CardHistory
          key={index}
          amount={history.total_amount}
          date={history.created_on}
          desc={history.description}
        />
      ))}
      {dataHistory?.data.records.length !== 0 ? (
        <>
          {hasMore && (
            <button
              onClick={handleShowMore}
              className="w-full mt-8 font-semibold text-center text-red-500"
              disabled={isLoadingHistory}>
              {isLoadingHistory ? "Memuat..." : "Show More"}
            </button>
          )}{" "}
        </>
      ) : (
        <p className="text-red-700 font-semibold mt-6 text-center">
          Tidak ada yang ditampilkan
        </p>
      )}
    </div>
  );
};

export default HistoryTransaction;
