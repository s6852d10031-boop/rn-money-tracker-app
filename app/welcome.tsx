import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* ส่วนแสดงรูปภาพ */}
      <View style={styles.imageSection}>
        <View style={styles.circleBackground}>
          <Image
            source={require("@/assets/images/welcome-character.png")}
            style={styles.characterImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* ส่วนข้อความ */}
      <View style={styles.textSection}>
        <Text style={styles.headlineText}>บันทึก{"\n"}รายรับรายจ่าย</Text>
      </View>

      {/* ปุ่มกดเริ่มต้นใช้งาน */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.replace("/(frame)/home")}
        >
          <Text style={styles.actionButtonText}>เริ่มใช้งานแอปพลิเคชัน</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  imageSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  circleBackground: {
    width: 320,
    height: 320,
    backgroundColor: "#ffffffaa",
    borderRadius: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  characterImage: {
    width: "100%",
    height: "100%",
  },
  textSection: {
    alignItems: "center",
    marginVertical: 30,
  },
  headlineText: {
    fontFamily: "Kanit_700Bold",
    fontSize: 28,
    color: "#210f4c",
    textAlign: "center",
    lineHeight: 40,
  },
  buttonSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: "#4c5f9c",
    paddingVertical: 18,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  actionButtonText: {
    fontFamily: "Kanit_700Bold",
    color: "#ffffff",
    fontSize: 18,
  },
});
