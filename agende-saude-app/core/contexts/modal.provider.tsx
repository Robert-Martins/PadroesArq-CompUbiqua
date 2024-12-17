import React, { createContext, ReactNode, useContext, useState } from "react";
import { Emphasis, ModalContent, ModalOverlay, TextButton } from "../components";
import { DisplayModalArguments } from "../vo/types/types";
import { Modal } from "react-native";

type ModalProviderProps = {
    children: ReactNode;
};
  
type ModalContextData = {
    displayModal: <T>(args: DisplayModalArguments<T>) => void;
    closeModal: () => void;
};
  
const ModalContext = createContext<ModalContextData>({} as ModalContextData);
  
export const useModal = () => useContext(ModalContext);
  
const ModalProvider = ({ children }: ModalProviderProps) => {
    const [header, setHeader] = useState<string | null>(null);
    const [modal, setModal] = useState<((props: any) => React.ReactNode) | null>(
        null
    );
    const [modalProps, setModalProps] = useState<any>({});
    const [showCloseButton, setShowCloseButton] = useState<boolean>(false);
  
    const displayModal = <T,>({ modal, header, showCloseButton, modalProps }: DisplayModalArguments<T>) => {
        setHeader(header || null);
        setModal(() => modal);
        setShowCloseButton(!!showCloseButton);
        setModalProps(modalProps || {});
    };
  
    const closeModal = () => {
        setHeader(null);
        setModal(null);
        setShowCloseButton(false);
        setModalProps({});
    };
  
    return (
        <ModalContext.Provider value={{ displayModal, closeModal }}>
            {children}
            {modal && (
                <Modal animationType="fade" transparent visible={!!modal}>
                    <ModalOverlay>
                        <ModalContent>
                            {header && <Emphasis>{header}</Emphasis>}
                            {modal(modalProps)}
                            {showCloseButton && (
                                <TextButton type="primary" onPress={closeModal} ghost>
                                    Fechar
                                </TextButton>
                            )}
                        </ModalContent>
                    </ModalOverlay>
                </Modal>
            )}
        </ModalContext.Provider>
    );
};
  
export default ModalProvider;