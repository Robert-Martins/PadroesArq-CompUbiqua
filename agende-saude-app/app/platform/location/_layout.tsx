import { Stack } from "expo-router";

const LocationLayout: React.FC = () => {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" options={{ title: "Locais" }} />
            <Stack.Screen name="[id]" options={{ title: "Detalhes do Local" }} />
        </Stack>
    )
}

export default LocationLayout;