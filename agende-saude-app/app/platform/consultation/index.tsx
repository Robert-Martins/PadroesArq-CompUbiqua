import { ConsultationCard, Flex, Layout, PaginatedList, TabTitle } from "@/core/components";
import { findAllCommonConsultations } from "@/core/services/consultation.service";
import { styled } from "styled-components";

const ConsultationsContainer = styled(Flex)`
    margin-top: ${({ theme }) => theme.spacing.top}px;
`;

const Consultations: React.FC = () => {
    const fetchConsultations = async (pageNumber, pageSize) => {
        const nextPageData = await findAllCommonConsultations({ page: pageNumber, size: pageSize });
        return nextPageData;
    };

    return (
        <Layout>
            <TabTitle>Consultas</TabTitle>
            <ConsultationsContainer>
                <PaginatedList
                    onFetchNextPage={fetchConsultations}
                >
                    {(consultation) => <ConsultationCard consultation={consultation} />}
                </PaginatedList>
            </ConsultationsContainer>
        </Layout>
    )
}

export default Consultations;