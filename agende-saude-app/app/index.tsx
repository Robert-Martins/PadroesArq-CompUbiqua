import { useAuth } from "@/core/contexts/auth.provider";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const AppEntrypoint: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
  
    useEffect(() => {
        setTimeout(() => {
            if (isAuthenticated !== undefined) {
                router.replace(
                    isAuthenticated ? "/platform/home" : "/auth/welcome"
                );
            }
        }, 50);
    }, [isAuthenticated]);
  
    return null;
};

export default AppEntrypoint;