import { handleButtonIconColor, handleButtonTextColor } from "@/core/utils/components.utils";
import { ButtonProps, TextButtonProps } from "@/core/vo/consts/components.props";
import { TouchableOpacity, Text } from "react-native";
import { styled, useTheme } from "styled-components";
import Icon from "../icons/Icon";

const StyledTouchableOpacity = styled(TouchableOpacity)<ButtonProps>`
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

const FlatButton: React.FC<ButtonProps> = (props) => {
    const { icon } = props;

    const theme = useTheme();

    return (
        <StyledTouchableOpacity {...props} activeOpacity={0.5}>
            <StyledText type={props.type} ghost={props.ghost} disabled={props.disabled}>
                { props.children }
            </StyledText>
            { icon && <Icon name={icon} size={24} color={handleButtonIconColor(props, theme)} /> }
        </StyledTouchableOpacity>
    );
}

export default FlatButton;