import { Flex, Layout, TabTitle } from "@/core/components";
import { styled } from "styled-components";

const PersonContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const Person: React.FC = () => {
    return (
        <Layout>
            <TabTitle>Meus dados</TabTitle>
            <PersonContainer>
                
            </PersonContainer>
        </Layout>
    )
}

export default Person;