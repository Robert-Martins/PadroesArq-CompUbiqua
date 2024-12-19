import { Flex, Layout, TabTitle } from "@/core/components";
import { styled } from "styled-components";

const ConsultationsContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const Consultations: React.FC = () => {
    return (
        <Layout>
            <TabTitle>Consultas</TabTitle>
            <ConsultationsContainer>
                
            </ConsultationsContainer>
        </Layout>
    )
}

export default Consultations;