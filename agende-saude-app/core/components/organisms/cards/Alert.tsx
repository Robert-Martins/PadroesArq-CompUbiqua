import { AlertProps } from "@/core/vo/types/components.props";
import styled, { useTheme } from "styled-components";
import { Flex } from "../../molecules";
import { H5, H6, Icon, Paragraph } from "../../atoms";
import { ASTheme } from "@/core/design-system/theme";
import { handleAlertColor, handleAlertIcon, handleAlertIconColor } from "@/core/utils/components.utils";
import { AlertType } from "@/core/vo/types/types";

const StyledAlertContainer = styled(Flex)<{ type: AlertType }>`
    background-color: ${({ type, theme }) => handleAlertColor(type, theme)};
    color: ${({ theme }) => theme.colors.white};
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const StyledAlertTitle = styled(H6)`

`

const StyledAlertMessage = styled(Paragraph)`

`;

const Alert: React.FC<AlertProps> = (props) => {
    const { type, title, message } = props;

    const theme: ASTheme = useTheme();

    return (
        <StyledAlertContainer align="center" gap={8} type={type}>
            <Flex direction="row" align="center" gap={8}>
                <Icon name={handleAlertIcon(type)} color={handleAlertIconColor(type, theme)} size={32} />
                <StyledAlertTitle>{title}</StyledAlertTitle>
            </Flex>
            <StyledAlertMessage>{message}</StyledAlertMessage>
        </StyledAlertContainer>
    );
}

export default Alert;