import { Flex, Layout, LocationCard, PaginatedList, TabTitle } from "@/core/components";
import { findAllLocations } from "@/core/services/location.service";
import { styled } from "styled-components";

const LocationsContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const Locations: React.FC = () => {
    const fetchLocations = async (pageNumber, pageSize) => {
        const nextPageData = await findAllLocations({ page: pageNumber, size: pageSize });
        return nextPageData;
    };

    return (
        <Layout>
            <TabTitle>Locais de Atendimento</TabTitle>
            <LocationsContainer>
                <PaginatedList
                    onFetchNextPage={fetchLocations}
                >
                    {(location) => <LocationCard location={location} />}
                </PaginatedList>
            </LocationsContainer>
        </Layout>
    );
}

export default Locations;