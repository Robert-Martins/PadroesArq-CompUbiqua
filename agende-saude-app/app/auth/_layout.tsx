import { Stack } from "expo-router";
import React from "react";

const AuthLayout: React.FC = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" options={{ title: "Login" }} />
            <Stack.Screen name="register" options={{ title: "Registrar" }} />
            <Stack.Screen name="reset-password" options={{ title: "Recuperar Senha" }} />
        </Stack>
    );
}

export default AuthLayout;