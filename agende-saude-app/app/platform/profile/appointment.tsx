import { Flex, Layout, TabTitle } from "@/core/components";
import { styled } from "styled-components";

const AppointmentContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const Appointment: React.FC = () => {
    return (
        <Layout>
            <TabTitle>Agendamentos</TabTitle>
            <AppointmentContainer>
                
            </AppointmentContainer>
        </Layout>
    )
}

export default Appointment;