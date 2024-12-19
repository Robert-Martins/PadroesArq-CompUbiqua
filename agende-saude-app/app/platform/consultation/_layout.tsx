import { Stack } from "expo-router";

const ConsultationLayout: React.FC = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "Consultas" }} />
            <Stack.Screen name="[id]" options={{ title: "Detalhes da Consulta" }} />
            <Stack.Screen name="appoint" options={{ title: "Nova Consulta" }} />
        </Stack>
    );
}

export default ConsultationLayout;