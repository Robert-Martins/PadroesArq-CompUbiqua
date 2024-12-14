import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Location } from "../models/location.model";
import { Person } from "../models/person.model";
import { getToken, removeTokens, setTokens } from "../utils/auth.utils";
import { AuthenticationRequest, AuthenticationResponse } from "../vo/types/types";
import { authenticate } from "../services/auth.service";
import { Optional } from "../utils/optional";
import { findCurrent } from "../services/user.service";

type AuthProviderProps = {
    children: ReactNode;
}

type AuthContextData = {
    isAuthenticated: boolean;
    login: (authenticationRequest: AuthenticationRequest) => void;
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

    const login = async (authenticationRequest: AuthenticationRequest) => {
        const response: AuthenticationResponse = await authenticate(authenticationRequest);
        await setTokens(response);
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