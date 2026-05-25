import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#b2dfdb",
        tabBarStyle: {
          backgroundColor: "#2c396e",
          height: 60,
          paddingBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="income"
        options={{
          title: "เงินเข้า",
          tabBarIcon: ({ color }) => (
            <Ionicons name="card" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "หน้าหลัก",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-sharp" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: "เงินออก",
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
