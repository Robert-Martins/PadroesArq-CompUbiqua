import { Flex, Layout, TabTitle } from "@/core/components";
import { styled } from "styled-components";

const TermsContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const Terms: React.FC = () => {
    return (
        <Layout>
            <TabTitle>Termos da plataforma</TabTitle>
            <TermsContainer>

            </TermsContainer>
        </Layout>
    );
}

export default Terms;