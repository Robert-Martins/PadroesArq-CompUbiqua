import { handleButtonBackground, handleTextButtonIconColor } from "@/core/utils/components.utils";
import { ButtonProps, TextButtonProps } from "@/core/vo/types/components.props";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { styled, useTheme } from "styled-components";
import Icon from "../icons/Icon";

const StyledTouchableOpacity = styled(TouchableOpacity)<ButtonProps>`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

const StyledText = styled(Text)<TextButtonProps>`
    color: ${(props => handleButtonBackground(props))};
    font-size: ${({ theme }) => theme.fontSizes.xxs}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;

const TextButton: React.FC<TouchableOpacityProps & ButtonProps> = (props) => {
    const { icon, disabled, type, children, ghost } = props;

    const theme = useTheme();

    return (
        <StyledTouchableOpacity {...props} activeOpacity={0.5}>
            <StyledText type={type} ghost={ghost} disabled={disabled}>
                { children }
            </StyledText>
            { icon && <Icon name={icon} size={24} color={handleTextButtonIconColor(props, theme)} /> }
        </StyledTouchableOpacity>
    );
}

export default TextButton;