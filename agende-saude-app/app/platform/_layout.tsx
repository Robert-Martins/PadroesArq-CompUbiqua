import { Tabs } from "expo-router";

const PlatformLayout: React.FC = () => {
    return (
      <Tabs>
            <Tabs.Screen name="home" options={{ title: "Home", tabBarIcon: () => null }} />
            <Tabs.Screen
                name="consultation"
                options={{ title: "Consultas", tabBarIcon: () => null }}
            />
            <Tabs.Screen
                name="location"
                options={{ title: "Locais", tabBarIcon: () => null }}
            />
            <Tabs.Screen
                name="profile"
                options={{ title: "Perfil", headerShown: false }} 
            />
      </Tabs>
    );
}

export default PlatformLayout;