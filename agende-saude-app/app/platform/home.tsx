import { BasicLevelUserInstruction, Flex, Layout, TabTitle } from "@/core/components";
import { useAuth } from "@/core/contexts/auth.provider";
import styled from "styled-components";

const HomeContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const Home: React.FC = () => {

    const { hasBasicAccessLevelOnly } = useAuth();

    return (
        <Layout>
            <TabTitle>Home</TabTitle>
            <HomeContainer gap={16}>
                {
                    hasBasicAccessLevelOnly 
                        ? <BasicLevelUserInstruction />
                        : <></>
                }
            </HomeContainer>
        </Layout>
    )
}

export default Home;