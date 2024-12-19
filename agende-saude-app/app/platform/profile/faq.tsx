import { Flex, Layout, TabTitle } from "@/core/components";
import { styled } from "styled-components";

const FaqContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const Faq: React.FC = () => {
    return (
        <Layout>
            <TabTitle>FAQ</TabTitle>
            <FaqContainer>
                
            </FaqContainer>
        </Layout>
    )
}

export default Faq;