import { ConsultationCard, Flex, Layout, PaginatedList, TabTitle } from "@/core/components";
import { Consultation } from "@/core/models/consultation.model";
import { Location } from "@/core/models/location.model";
import { findAllCommonConsultationsByLocationId } from "@/core/services/consultation.service";
import { findLocationById } from "@/core/services/location.service";
import { Page } from "@/core/vo/types/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { styled } from "styled-components";

const LocationContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const LocationById: React.FC = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [location, setLocation] = useState<Location>(null);

    const fetchAllCommonConsultationsByLocationId = async (pageNumber: number, pageSize: number): Promise<Page<Consultation>> => {
        const consultations: Page<Consultation> = await findAllCommonConsultationsByLocationId(Number(id), pageNumber, pageSize);
        return consultations;
    }

    const fetchLocation = async (): Promise<void> => {
        try {
            const found: Location = await findLocationById(Number(id));
            setLocation(found);
        } catch(error) {
            console.log(error);
            router.navigate("/platform/location");
        }
    }

    useEffect(() => {
        fetchLocation()
    }, [id]);
    
    return (
        <Layout>
            <TabTitle>Local</TabTitle>
            <LocationContainer>
                {location ? (
                    <>
                        <Text>{JSON.stringify(location, null, 2)}</Text>
                        <PaginatedList
                            onFetchNextPage={fetchAllCommonConsultationsByLocationId}
                        >
                            {(consultation) => <ConsultationCard consultation={consultation} />}
                        </PaginatedList>
                    </>
                ) : (
                    <Text>Carregando...</Text>
                )}
            </LocationContainer>
        </Layout>
    )
}

export default LocationById;