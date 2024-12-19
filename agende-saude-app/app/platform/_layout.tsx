import { Icon } from "@/core/components";
import { Tabs } from "expo-router";

const PlatformLayout: React.FC = () => {
    return (
      <Tabs 
        screenOptions={{ 
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#f8f9fa',
                height: 56,
                borderTopWidth: 0,
                paddingBottom: 0,
            },
            tabBarActiveTintColor: '#007bff',
            tabBarInactiveTintColor: '#6c757d',
        }}
      >
            <Tabs.Screen name="home" options={{ title: "Home", tabBarIcon: ({ color, size }) => <Icon name="home-outline" color={color} size={size} /> }} />
            <Tabs.Screen
                name="consultation"
                options={{ title: "Consultas", tabBarIcon: ({ color, size }) => <Icon name="clipboard-edit-outline" color={color} size={size} /> }}
            />
            <Tabs.Screen
                name="location"
                options={{ title: "Locais", tabBarIcon: ({ color, size }) => <Icon name="hospital-building" color={color} size={size} /> }}
            />
            <Tabs.Screen
                name="profile"
                options={{ title: "Perfil", tabBarIcon: ({ color, size }) => <Icon name="account-check-outline" color={color} size={size} /> }}
            />
      </Tabs>
    );
}

export default PlatformLayout;