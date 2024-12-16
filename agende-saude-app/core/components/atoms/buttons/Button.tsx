import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";

type ButtonProps = {
    children: ReactNode;
    onPress: () => void | (<T> (parameter: T) => void);
    icon?: keyof typeof MaterialCommunityIcons.glyphMap;
    disabled?: boolean;
    type?: "primary" | "secondary" | "tertiary";
    ghost?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { onPress, disabled, icon } = props;

    return (
        <TouchableOpacity disabled={disabled ?? false} onPress={onPress}>
            { icon && <MaterialCommunityIcons name={icon} size={32} color="white" /> }
            <Text>{ props.children }</Text>
        </TouchableOpacity>
    );
}

export default Button;