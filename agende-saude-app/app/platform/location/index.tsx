import { Flex, Layout, TabTitle } from "@/core/components";
import { styled } from "styled-components";

const LocationsContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const Locations: React.FC = () => {
    return (
        <Layout>
            <TabTitle>Locais de Atendimento</TabTitle>
            <LocationsContainer>
                
            </LocationsContainer>
        </Layout>
    )
}

export default Locations;