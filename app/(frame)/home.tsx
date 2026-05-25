import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface Transaction {
  id: string;
  title: string;
  date: string;
  dateDisplay: string;
  amount: number;
  type: "income" | "expense";
}

export default function HomeScreen() {
  const router = useRouter();
  const goToIncome = () => {
    router.push({
      pathname: "/income",
      params: {
        currentIncome: totalIncome.toString(),
        currentExpense: totalExpense.toString(),
      },
    });
  };

  const goToExpenses = () => {
    router.push({
      pathname: "/expenses",
      params: {
        currentIncome: totalIncome.toString(),
        currentExpense: totalExpense.toString(),
      },
    });
  };

  const params = useLocalSearchParams();

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      title: "ขายของออนไลน์",
      date: "2026-01-12",
      dateDisplay: "12 มกราคม 2569",
      amount: 2200.0,
      type: "income",
    },
    {
      id: "2",
      title: "เงินเดือน",
      date: "2026-01-05",
      dateDisplay: "5 มกราคม 2569",
      amount: 3500.0,
      type: "income",
    },
  ]);

  const [sortedTransactions, setSortedTransactions] = useState<Transaction[]>(
    [],
  );
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (params.type && params.amount && params.detail && params.timestamp) {
      const amountNum = parseFloat(params.amount as string);

      const now = new Date();
      const isoDate = now.toISOString().split("T")[0];
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const thaiDateDisplay = now.toLocaleDateString("th-TH", options);

      const isDuplicate = transactions.some((t) => t.id === params.timestamp);

      if (!isDuplicate && !isNaN(amountNum)) {
        const newRecord: Transaction = {
          id: params.timestamp as string,
          title: params.detail as string,
          date: isoDate,
          dateDisplay: thaiDateDisplay,
          amount: amountNum,
          type: params.type as "income" | "expense",
        };

        setTransactions((prev) => [newRecord, ...prev]);
      }
    }
  }, [params.timestamp]);

  useEffect(() => {
    const sorted = [...transactions].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setSortedTransactions(sorted);

    let incomeSum = 0;
    let expenseSum = 0;

    transactions.forEach((item) => {
      if (item.type === "income") {
        incomeSum += item.amount;
      } else if (item.type === "expense") {
        expenseSum += item.amount;
      }
    });

    const netBalance = incomeSum - expenseSum;

    setTotalIncome(incomeSum);
    setTotalExpense(expenseSum);
    setBalance(netBalance);
  }, [transactions]);

  const formatMoney = (value: number) => {
    return value.toLocaleString("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={["top"]}>
      <ScrollView style={styles.mainScroll} bounces={false}>
        {/* ส่วนหัวการ์ดข้อมูลกระเป๋าเงิน*/}
        <View style={styles.headerSection}>
          <View style={styles.userInfoRow}>
            <Text style={styles.userName}>Patcha Suthirak</Text>
            <Image
              source={require("@/assets/images/stam.jpg")}
              style={styles.profileImage}
            />
          </View>

          {/* การ์ดแสดงผลยอดเงิน */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>ยอดเงินคงเหลือ</Text>
            <Text style={styles.balanceValue}>{formatMoney(balance)}</Text>

            <View style={styles.summaryRow}>
              <View style={styles.summaryColumn}>
                <Text style={styles.summaryLabel}>↓ ยอดเงินเข้ารวม</Text>
                <Text style={styles.summaryIncomeValue}>
                  {formatMoney(totalIncome)}
                </Text>
              </View>
              <View style={styles.summaryColumn}>
                <Text style={styles.summaryLabel}>ยอดเงินออกรวม ↑</Text>
                <Text style={styles.summaryExpenseValue}>
                  {formatMoney(totalExpense)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ส่วนแสดงรายการประวัติธุรกรรม */}
        <View style={styles.listSection}>
          <Text style={styles.sectionHeaderTitle}>เงินเข้า/เงินออก</Text>

          <View style={styles.listContainerCard}>
            {sortedTransactions.map((item) => {
              const isIncome = item.type === "income";
              return (
                <View key={item.id} style={styles.transactionRow}>
                  <View style={styles.rowLeftSection}>
                    {/* สัญลักษณ์ */}
                    <View
                      style={[
                        styles.avatarCircle,
                        isIncome ? styles.avatarIncome : styles.avatarExpense,
                      ]}
                    >
                      <Text style={styles.avatarIconText}>
                        {isIncome ? "↓" : "↑"}
                      </Text>
                    </View>
                    <View style={styles.textDetails}>
                      <Text style={styles.transactionTitle} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={styles.transactionDate}>
                        {item.dateDisplay}
                      </Text>
                    </View>
                  </View>
                  {/* แสดงจำนวนเงิน */}
                  <Text
                    style={[
                      styles.amountValue,
                      isIncome ? styles.amountIncome : styles.amountExpense,
                    ]}
                  >
                    {formatMoney(item.amount)}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  mainScroll: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerSection: {
    backgroundColor: "#2c396e",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: -0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  userInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  userName: {
    fontFamily: "Kanit_700Bold",
    fontSize: 22,
    color: "#ffffff",
  },
  profileImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#e0f2f1",
  },
  balanceCard: {
    backgroundColor: "#5869ac",
    borderRadius: 18,
    padding: 60,
    alignItems: "center",
    width: "100%",
    shadowColor: "#e2dbdb",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.18,
    shadowRadius: 15,
    elevation: 10,
  },
  balanceLabel: {
    fontFamily: "Kanit_700Bold",
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 6,
  },
  balanceValue: {
    fontFamily: "Kanit_700Bold",
    fontSize: 34,
    color: "#ffffff",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderColor: "rgba(178, 223, 219, 0.25)",
    paddingTop: 14,
    width: "100%",
  },
  summaryColumn: {
    flex: 1,
    alignItems: "center",
  },
  summaryLabel: {
    fontFamily: "Kanit_700Bold",
    fontSize: 11,
    color: "#ffffff",
    marginBottom: 4,
  },
  summaryIncomeValue: {
    fontFamily: "Kanit_700Bold",
    fontSize: 16,
    color: "#ffffff",
  },
  summaryExpenseValue: {
    fontFamily: "Kanit_700Bold",
    fontSize: 16,
    color: "#ffffff",
  },
  listSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  sectionHeaderTitle: {
    fontFamily: "Kanit_700Bold",
    fontSize: 18,
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 20,
  },
  listContainerCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f0f4f4",
    paddingHorizontal: 4,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f6f6",
  },
  rowLeftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 10,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarIncome: {
    backgroundColor: "#e8f5e9",
  },
  avatarExpense: {
    backgroundColor: "#ffebee",
  },
  avatarIconText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  textDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontFamily: "Kanit_700Bold",
    fontSize: 15,
    color: "#2c3e50",
    marginBottom: 2,
  },
  transactionDate: {
    fontFamily: "Kanit_700Bold",
    fontSize: 12,
    color: "#95a5a6",
  },
  amountValue: {
    fontFamily: "Kanit_700Bold",
    fontSize: 16,
    textAlign: "right",
  },
  amountIncome: {
    color: "#2ecc71",
  },
  amountExpense: {
    color: "#e74c3c",
  },
});
