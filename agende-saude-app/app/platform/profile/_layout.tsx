import { Stack } from "expo-router";
import React from "react";

export const ProfileLayout: React.FC = () => {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" options={{ title: "Perfil" }} />
            <Stack.Screen name="person" options={{ title: "Dados Pessoais" }} />
            <Stack.Screen name="appointment" options={{ title: "Consultas Agendadas" }} />
            <Stack.Screen name="terms" options={{ title: "Termos de Uso" }} />
            <Stack.Screen name="faq" options={{ title: "Perguntas Frequentes" }} />
            <Stack.Screen name="about" options={{ title: "Sobre o App" }} />
        </Stack>
    );
}

export default ProfileLayout;