import { Flex, Layout, TabTitle } from "@/core/components";
import { styled } from "styled-components";

const LocationContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const Location: React.FC = () => {
    return (
        <Layout>
            <TabTitle>Local</TabTitle>
            <LocationContainer>
                
            </LocationContainer>
        </Layout>
    )
}

export default Location;