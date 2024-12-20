import { Flex, Layout, TabTitle } from "@/core/components";
import { Consultation } from "@/core/models/consultation.model";
import { findConsultationById } from "@/core/services/consultation.service";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { styled } from "styled-components";

const ConsultationContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const ConsultationById: React.FC = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [consultation, setConsultation] = useState<Consultation>(null);

    const fetchConsultation = async (): Promise<void> => {
        try {
            const found: Consultation = await findConsultationById(Number(id));
            setConsultation(found);
        } catch(error) {
            console.log(error);
            router.navigate("/platform/consultation");
        }
    }

    useEffect(() => {
        fetchConsultation()
    }, [id]);

    return (
        <Layout>
            <TabTitle>Consulta</TabTitle>
            <ConsultationContainer>
                {consultation ? (
                    <Text>{JSON.stringify(consultation, null, 2)}</Text>
                ) : (
                    <Text>Carregando...</Text>
                )}
            </ConsultationContainer>
        </Layout>
    )
}

export default ConsultationById;