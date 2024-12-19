import Toast, { ToastProps } from "react-native-toast-message";

const DEFAULT_TOAST_DISPLAY_TIME = 4000;

const DEFAULT_TOP_OFFSET = 30;

export const agendeSaudeAppToastConfig: ToastProps = {
    visibilityTime: DEFAULT_TOAST_DISPLAY_TIME,
    topOffset: DEFAULT_TOP_OFFSET,
    position: 'top',
}

export const displaySuccessMessage = (message: string, sub: string): void => {
    Toast.show({
        type: 'success',
        text1: message,
        text2: sub,
    });
}

export const displayInfoMessage = (message: string, sub: string): void => {
    Toast.show({
        type: 'info',
        text1: message,
        text2: sub,
    });
}

export const displayErrorMessage = (message: string, sub: string): void => {
    Toast.show({
        type: 'error',
        text1: message,
        text2: sub,
    });
}