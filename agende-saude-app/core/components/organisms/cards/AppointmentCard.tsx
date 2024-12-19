import { AppointmentCardProps } from '@/core/vo/types/components.props';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Flex } from '../..';
import { formatDate } from '@/core/utils/utils';

const StyledAppointmentCardContainer = styled(View)`
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin: 10px;
    background-color: #fff;
`;

const StyledAppointmentCardHeader = styled(View)`
    padding: 10px;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`;

const StyledAppointmentCardHeaderTextContainer = styled(View)`
    
`;

const StyledAppointmentCardHeaderText = styled(Text)`
    font-size: 20px;
`;

const StyledAppointmentCardHeaderSmallCaps = styled(Text)`
    color: grey;
    font-size: 12px;
    font-style: italic;
`;

const StyledAppointmentCardBody = styled(View)`
    padding: 10px;
    background-color: #fff;
`;

const AppointmentCard: React.FC<AppointmentCardProps> = (props) => {
    const { appointment } = props;

    return (
        <StyledAppointmentCardContainer>
            <StyledAppointmentCardHeader>
                <Flex>
                    <StyledAppointmentCardHeaderText>{appointment.consultation.responsibleDoctor}</StyledAppointmentCardHeaderText>
                    <StyledAppointmentCardHeaderSmallCaps>{appointment.consultation.specialty}</StyledAppointmentCardHeaderSmallCaps>
                </Flex>
            </StyledAppointmentCardHeader>
            <StyledAppointmentCardBody>
                <Text style={{ fontSize: 14 }}>Status: {appointment.status}</Text>
                <Text style={{ fontSize: 14 }}>Notas: {appointment.notes}</Text>
                <Text style={{ fontSize: 14 }}>Data: {formatDate(appointment.consultation.date)}</Text>
                <Text style={{ fontSize: 14 }}>Local: {appointment.consultation.location.name}</Text>
                <Text style={{ fontSize: 14 }}>{appointment.consultation.location.user.address.address}, {appointment.consultation.location.user.address.neighborhood}</Text>
                <Text style={{ fontSize: 14 }}>{appointment.consultation.location.user.address.city} - {appointment.consultation.location.user.address.state}, {appointment.consultation.location.user.address.zipcode}</Text>
                <TouchableOpacity>
                    <Text>Ver mais</Text>
                </TouchableOpacity>
            </StyledAppointmentCardBody>
        </StyledAppointmentCardContainer>
    );
}

export default AppointmentCard;