import styled from "styled-components";
import H3 from "./H3";
import { Flex } from "../../molecules";

const StyledAgende = styled(H3)`
    color: ${({ theme }) => theme.colors.primary};
`;

const StyledSaude = styled(H3)`
    color: ${({ theme }) => theme.colors.text};
`;

const AppName = () => {
    return (
        <Flex direction='row' justify="center">
            <StyledAgende>Agende</StyledAgende>
            <StyledSaude>Saúde</StyledSaude>
        </Flex>
    );
}

export default AppName;