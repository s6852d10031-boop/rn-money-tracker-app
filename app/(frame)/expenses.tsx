import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExpensesScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [detail, setDetail] = useState("");
  const [amount, setAmount] = useState("");
  const [currentDateText, setCurrentDateText] = useState("");

  const homeIncome = parseFloat(params.currentIncome as string) || 5700.0;
  const homeExpense = parseFloat(params.currentExpense as string) || 1615.0;
  const currentBalance = homeIncome - homeExpense;

  const balance = currentBalance;
  const totalIncome = homeIncome;
  const totalExpense = homeExpense;

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const formattedDate = now.toLocaleDateString("th-TH", options);
      setCurrentDateText(`วันที่ ${formattedDate}`);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const formatMoney = (value: number) => {
    return value.toLocaleString("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleSaveExpense = () => {
    if (!detail.trim() && !amount.trim()) {
      Alert.alert("ข้อความเตือน", "กรุณากรอกรายการเงินออกและจำนวนเงิน");
      return;
    }
    if (!detail.trim()) {
      Alert.alert("ข้อความเตือน", "กรุณากรอกรายการเงินออก");
      return;
    }
    if (!amount.trim()) {
      Alert.alert("ข้อความเตือน", "กรุณากรอกจำนวนเงินออก");
      return;
    }

    const numericValue = parseFloat(amount);
    if (isNaN(numericValue) || numericValue <= 0) {
      Alert.alert("ข้อความเตือน", "กรุณากรอกจำนวนเงินให้มากกว่า 0 บาท");
      return;
    }

    Alert.alert("ผลการทำงาน", "บันทึกรายจ่ายเข้าฐานข้อมูลเรียบร้อยแล้ว", [
      {
        text: "ตกลง",
        onPress: () => {
          const savedDetail = detail;
          const savedAmount = amount;

          setDetail("");
          setAmount("");

          router.push({
            pathname: "/(frame)/home",
            params: {
              type: "expense",
              detail: savedDetail,
              amount: savedAmount,
              timestamp: new Date().getTime().toString(),
            },
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
      >
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

        <View style={styles.formSection}>
          <Text style={styles.currentDateText}>{currentDateText}</Text>
          <Text style={styles.directionSub}>เงินออก</Text>

          <View style={styles.inputWrapper}>
            <View style={styles.floatingLabelContainer}>
              <Text style={styles.floatingLabelText}>รายการเงินออก</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="DETAIL"
              placeholderTextColor="#b0bec5"
              value={detail}
              onChangeText={setDetail}
            />
          </View>

          <View style={styles.inputWrapper}>
            <View style={styles.floatingLabelContainer}>
              <Text style={styles.floatingLabelText}>จำนวนเงินออก</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="0.00"
              placeholderTextColor="#b0bec5"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <TouchableOpacity
            style={styles.submitBtnExpense}
            onPress={handleSaveExpense}
          >
            <Text style={styles.submitBtnText}>บันทึกเงินออก</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: "#ffffff" },
  scrollContainer: { flexGrow: 1, backgroundColor: "#ffffff" },
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
  userName: { fontFamily: "Kanit_700Bold", fontSize: 22, color: "#ffffff" },
  profileImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#e0f2f1",
  },
  balanceCard: {
    backgroundColor: "#5869ac",
    borderRadius: 22,
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
    borderColor: "rgba(178, 195, 223, 0.25)",
    paddingTop: 14,
    width: "100%",
  },
  summaryColumn: { flex: 1, alignItems: "center" },
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
  formSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 35,
    alignItems: "center",
  },
  currentDateText: {
    fontFamily: "Kanit_700Bold",
    fontSize: 24,
    color: "2c3e50",
    textAlign: "center",
    marginBottom: 6,
  },
  directionSub: {
    fontFamily: "Kanit_700Bold",
    fontSize: 16,
    color: "#7c8893",
    textAlign: "center",
    marginBottom: 35,
  },
  inputWrapper: { width: "100%", marginBottom: 24, position: "relative" },
  floatingLabelContainer: {
    position: "absolute",
    top: -10,
    left: 14,
    backgroundColor: "#ffffff",
    paddingHorizontal: 6,
    zIndex: 1,
  },
  floatingLabelText: {
    fontFamily: "Kanit_700Bold",
    fontSize: 12,
    color: "#7f8c8d",
  },
  textInput: {
    width: "100%",
    height: 54,
    borderWidth: 1.5,
    borderColor: "#524c92",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Kanit_700Bold",
    color: "#2c3e50",
    backgroundColor: "#ffffff",
  },
  submitBtnExpense: {
    backgroundColor: "#4c5a92",
    paddingVertical: 16,
    borderRadius: 35,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#cbcbcb",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  submitBtnText: {
    fontFamily: "Kanit_700Bold",
    color: "#ffffff",
    fontSize: 18,
  },
});
