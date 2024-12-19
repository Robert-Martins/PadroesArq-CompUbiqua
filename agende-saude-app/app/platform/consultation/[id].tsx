import { Flex, Layout, TabTitle } from "@/core/components";
import { styled } from "styled-components";

const ConsultationContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const Consultation: React.FC = () => {
    return (
        <Layout>
            <TabTitle>Consultation</TabTitle>
            <ConsultationContainer>
                
            </ConsultationContainer>
        </Layout>
    )
}

export default Consultation;