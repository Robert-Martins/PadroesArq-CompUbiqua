import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Location } from "../models/location.model";
import { Person } from "../models/person.model";
import { getToken, removeTokens, setTokens } from "../utils/auth.utils";
import { AuthenticationResponse } from "../vo/types/types";
import { Optional } from "../utils/optional";
import { findCurrent } from "../services/user.service";

type AuthProviderProps = {
    children: ReactNode;
}

type AuthContextData = {
    isAuthenticated: boolean;
    login: (authenticationResponse: AuthenticationResponse) => void;
    logout: () => void;
    user: Person | Location;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const onStartApp = async () => {
            Optional.ofNullable(await getToken())
                .ifPresent(() => findCurrentUser());
        }
        onStartApp();
    }, []);

    const findCurrentUser = async () => {
        const currentUser: Person | Location = await findCurrent();
        setUser(currentUser);
    }

    const login = async (authenticationResponse: AuthenticationResponse) => {
        await setTokens(authenticationResponse);
        await findCurrentUser();
    };

    const logout = async () => {
        await removeTokens();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;