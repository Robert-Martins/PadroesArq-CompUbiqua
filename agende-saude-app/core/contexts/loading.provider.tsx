import { createContext, ReactNode, useContext, useState } from "react";

type LoadingProviderProps = {
    children: ReactNode;
}

type LoadingContextData = {
  show: boolean;
  start: () => void;
  stop: () => void;
};

const LoadingContext = createContext<LoadingContextData>({} as LoadingContextData);

export const useLoading = () => useContext(LoadingContext);

const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [show, setShow] = useState(false);
    
    const start = () => setShow(true);
    const stop = () => setShow(false);
    
    return (
        <LoadingContext.Provider value={{ show, start, stop }}>
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;