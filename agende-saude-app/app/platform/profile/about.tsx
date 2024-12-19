import { Flex, Layout, TabTitle } from "@/core/components";
import { styled } from "styled-components";

const AboutContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const About: React.FC = () => {
    return (
        <Layout>
            <TabTitle>Sobre a Plataforma</TabTitle>
            <AboutContainer>
                
            </AboutContainer>
        </Layout>
    )
}

export default About;