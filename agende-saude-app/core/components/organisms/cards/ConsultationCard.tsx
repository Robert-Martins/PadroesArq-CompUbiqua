import { formatDate } from '@/core/utils/utils';
import { ConsultationCardProps } from '@/core/vo/types/components.props';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Flex } from '../..';

const StyledConsultationCardContainer = styled(View)`
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin: 10px;
    background-color: #fff;
`;

const StyledConsultationCardHeader = styled(View)`
    padding: 10px;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`;

const StyledConsultationCardHeaderTextContainer = styled(View)`
    
`;

const StyledConsultationCardHeaderText = styled(Text)`
    font-size: 20px;
`;

const StyledConsultationCardHeaderSmallCaps = styled(Text)`
    color: grey;
    font-size: 12px;
    font-style: italic;
`;

const StyledConsultationCardBody = styled(View)`
    padding: 10px;
    background-color: #fff;
`;

const ConsultationCard: React.FC<ConsultationCardProps> = (props) => {
    const { consultation } = props;

    return (
        <StyledConsultationCardContainer>
            <StyledConsultationCardHeader>
                <Flex>
                    <StyledConsultationCardHeaderText>{consultation.responsibleDoctor}</StyledConsultationCardHeaderText>
                    <StyledConsultationCardHeaderSmallCaps>{consultation.specialty}</StyledConsultationCardHeaderSmallCaps>
                </Flex>
            </StyledConsultationCardHeader>
            <StyledConsultationCardBody>
                <Text style={{ fontSize: 14 }}>Tipo: {consultation.type}</Text>
                <Text style={{ fontSize: 14 }}>Data: {formatDate(consultation.date)}</Text>
                <Text style={{ fontSize: 14 }}>Local: {consultation.location.name}</Text>
                <Text style={{ fontSize: 14 }}>{consultation.location.user.address.address}, {consultation.location.user.address.neighborhood}</Text>
                <Text style={{ fontSize: 14 }}>{consultation.location.user.address.city} - {consultation.location.user.address.state}, {consultation.location.user.address.zipcode}</Text>
                <TouchableOpacity>
                    <Text>Ver mais</Text>
                </TouchableOpacity>
            </StyledConsultationCardBody>
        </StyledConsultationCardContainer>
    );
}

export default ConsultationCard;