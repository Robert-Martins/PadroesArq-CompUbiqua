import { Flex, Layout, TabTitle } from "@/core/components";
import { styled } from "styled-components";

const AppointContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const Appoint: React.FC = () => {
    return (
        <Layout>
            <TabTitle>Agendar</TabTitle>
            <AppointContainer>
                
            </AppointContainer>
        </Layout>
    )
}

export default Appoint;