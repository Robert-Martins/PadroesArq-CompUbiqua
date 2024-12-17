import { handleButtonBackground, handleButtonIconColor, handleButtonTextColor } from "@/core/utils/components.utils";
import { ButtonProps, TextButtonProps } from "@/core/vo/types/components.props";
import { Text, TouchableOpacity } from "react-native";
import styled, { useTheme } from "styled-components";
import Icon from "../icons/Icon";

const StyledTouchableOpacity = styled(TouchableOpacity)<ButtonProps>`
    background-color: ${(props) => handleButtonBackground(props)};
    padding: 8px;
    border-radius: ${({ theme }) => theme.border.lg}px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

const StyledText = styled(Text)<TextButtonProps>`
    color: ${(props => handleButtonTextColor(props))};
    font-size: ${({ theme }) => theme.fontSizes.xs}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;

const FlatButton: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { icon, disabled, type, children, ghost } = props;
    
    const theme = useTheme();
    
    return (
        <StyledTouchableOpacity {...props} activeOpacity={0.5}>
            { icon && <Icon name={icon} size={32} color={handleButtonIconColor(props, theme)} /> }
            <StyledText type={type} ghost={ghost} disabled={disabled}>
                { children }
            </StyledText>
        </StyledTouchableOpacity>
    );
}

export default FlatButton;