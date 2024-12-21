import { AppointmentCard, Flex, Layout, PaginatedList, TabTitle } from "@/core/components";
import { findAllByPerson } from "@/core/services/appointment.service";
import { styled } from "styled-components";

const AppointmentContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const Appointment: React.FC = () => {
    const fetchAppointments = async (pageNumber, pageSize) => {
        const nextPageData = await findAllByPerson({ page: pageNumber, size: pageSize });
        return nextPageData;
    };

    return (
        <Layout>
            <TabTitle>Agendamentos</TabTitle>
            <AppointmentContainer>
                <PaginatedList
                    onFetchNextPage={fetchAppointments}
                >
                    {(appointment) => <AppointmentCard appointment={appointment} />}
                </PaginatedList>
            </AppointmentContainer>
        </Layout>
    );
}

export default Appointment;