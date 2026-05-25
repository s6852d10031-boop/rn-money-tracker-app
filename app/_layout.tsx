import { WalletProvider } from "@/Context/WalletContext";
import {
  Kanit_400Regular,
  Kanit_700Bold,
  useFonts,
} from "@expo-google-fonts/kanit";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <WalletProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
      </Stack>
    </WalletProvider>
  );
}
