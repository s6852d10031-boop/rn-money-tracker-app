import React, { createContext, useContext, useEffect, useState } from "react";

export interface Transaction {
  id: string;
  title: string;
  date: string;
  dateDisplay: string;
  amount: number;
  type: "income" | "expense";
}

interface WalletContextType {
  transactions: Transaction[];
  totalIncome: number;
  totalExpense: number;
  balance: number;
  addTransaction: (
    title: string,
    amount: number,
    type: "income" | "expense",
  ) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      title: "ซื้อรองเท้า Nike Air มือ 2",
      date: "2026-02-02",
      dateDisplay: "2 กุมภาพันธ์ 2569",
      amount: 800.0,
      type: "expense",
    },
    {
      id: "2",
      title: "กิน KFC",
      date: "2026-01-15",
      dateDisplay: "15 มกราคม 2569",
      amount: 500.0,
      type: "expense",
    },
    {
      id: "3",
      title: "ขายของออนไลน์",
      date: "2026-01-12",
      dateDisplay: "12 มกราคม 2569",
      amount: 2200.0,
      type: "income",
    },
    {
      id: "4",
      title: "ซื้อคีย์บอร์ด",
      date: "2026-01-10",
      dateDisplay: "10 มกราคม 2569",
      amount: 1200.0,
      type: "expense",
    },
    {
      id: "5",
      title: "เงินเดือน",
      date: "2026-01-05",
      dateDisplay: "5 มกราคม 2569",
      amount: 3500.0,
      type: "income",
    },
  ]);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let incomeSum = 0;
    let expenseSum = 0;

    transactions.forEach((item) => {
      if (item.type === "income") {
        incomeSum += item.amount;
      } else if (item.type === "expense") {
        expenseSum += item.amount;
      }
    });

    setTotalIncome(incomeSum);
    setTotalExpense(expenseSum);
    setBalance(incomeSum - expenseSum);
  }, [transactions]);

  const addTransaction = (
    title: string,
    amount: number,
    type: "income" | "expense",
  ) => {
    const now = new Date();
    const isoDate = now.toISOString().split("T")[0];
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const thaiDateDisplay = now.toLocaleDateString("th-TH", options);

    const newRecord: Transaction = {
      id: now.getTime().toString(),
      title,
      date: isoDate,
      dateDisplay: thaiDateDisplay,
      amount,
      type,
    };

    setTransactions((prev) => [newRecord, ...prev]);
  };

  return (
    <WalletContext.Provider
      value={{
        transactions,
        totalIncome,
        totalExpense,
        balance,
        addTransaction,
      }}
    >
      ={children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
