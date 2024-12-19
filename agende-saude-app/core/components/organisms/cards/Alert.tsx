import { AlertProps } from "@/core/vo/types/components.props";
import styled, { useTheme } from "styled-components";
import { Flex } from "../../molecules";
import { H5, Icon, Paragraph } from "../../atoms";
import { ASTheme } from "@/core/design-system/theme";
import { handleAlertIcon, handleAlertIconColor } from "@/core/utils/components.utils";

const StyledAlertContainer = styled(Flex)`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const StyledAlertTitle = styled(H5)`

`

const StyledAlertMessage = styled(Paragraph)`

`;

const Alert: React.FC<AlertProps> = (props) => {
    const { type, title, message } = props;

    const theme: ASTheme = useTheme();

    return (
        <StyledAlertContainer>
            <Icon name={handleAlertIcon(type)} color={handleAlertIconColor(type, theme)} size={32} />
            <Flex>
                <StyledAlertTitle>{title}</StyledAlertTitle>
                <StyledAlertMessage>{message}</StyledAlertMessage>
            </Flex>
        </StyledAlertContainer>
    );
}

export default Alert;