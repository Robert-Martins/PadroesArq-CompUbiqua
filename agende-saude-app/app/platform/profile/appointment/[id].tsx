import { Flex, Layout, TabTitle } from "@/core/components";
import { Appointment } from "@/core/models/appointment.model";
import { findAppointmentById } from "@/core/services/appointment.service";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const AppointmentContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const AppointmentById: React.FC = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [appointment, setAppointment] = useState<Appointment>(null);

    const fetchAppointment = async (): Promise<void> => {
        try {
            const found: Appointment = await findAppointmentById(Number(id));
            setAppointment(found);
        } catch(error) {
            console.log(error);
            router.navigate("/platform/profile/appointment");
        }
    }

    useEffect(() => {
        fetchAppointment()
    }, [id]);
    
    return (
        <Layout>
            <TabTitle>Local</TabTitle>
            <AppointmentContainer>
                {appointment ? (
                    <div>{JSON.stringify(appointment, null, 2)}</div>
                ) : (
                    <div>Carregando...</div>
                )}
            </AppointmentContainer>
        </Layout>
    )
}

export default AppointmentById;