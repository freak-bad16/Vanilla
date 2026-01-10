import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function HomeLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#2F80ED",
                tabBarInactiveTintColor: "#828282",
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: "#E0E0E0",
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
            }}
        >

            <Tabs.Screen
                name="chatlist"
                options={{
                    title: "Chats",
                    tabBarIcon: ({ color }) => <FontAwesome name="list" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    tabBarIcon: ({ color }) => <FontAwesome name="comments" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
