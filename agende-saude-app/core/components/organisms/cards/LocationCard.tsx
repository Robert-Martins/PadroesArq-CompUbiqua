import { LocationCardProps } from '@/core/vo/types/components.props';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { formatAddress, formatDistance } from '@/core/utils/utils';
import { Dot, Flex } from '../..';

const StyledLocationCardContainer = styled(View)`
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin: 10px;
    background-color: #fff;
`;

const StyledLocationCardHeader = styled(Flex)`
    padding: 10px;
`;

const StyledLocationCardHeaderTextContainer = styled(View)`
    
`;

const StyledLocationCardHeaderText = styled(Text)`
    font-size: 20px;
`;

const StyledLocationCardHeaderSmallCaps = styled(Text)`
    color: grey;
    font-size: 12px;
    font-style: italic;
`;

const StyledLocationCardHeaderPicture = styled(Image)`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: blue;
`;

const StyledLocationCardBody = styled(View)<{acceptsEmergencies: boolean}>`
    padding: 10px;
    background-color: ${props => props.acceptsEmergencies ? '#e0f7fa' : '#fff'};
`;

const LocationCard: React.FC<LocationCardProps> = (props) => {
    const { location } = props;

    return (
        <StyledLocationCardContainer>
            <StyledLocationCardHeader direction='row' align='center' gap={16}>
                <StyledLocationCardHeaderPicture />
                <Flex>
                    <StyledLocationCardHeaderText>{location.name}</StyledLocationCardHeaderText>
                    <StyledLocationCardHeaderSmallCaps>há {formatDistance(location.distance)} de você</StyledLocationCardHeaderSmallCaps>
                </Flex>
            </StyledLocationCardHeader>
            <StyledLocationCardBody acceptsEmergencies={location.acceptsEmergencies}>
                <Text style={{ fontSize: 14 }}>{formatAddress(location.user.address)}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 4 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Dot width={8} height={8} color={location.acceptsEmergencies ? 'red' : 'green'}></Dot>
                        <Text style={{ fontSize: 12 }}>
                            {
                                location.acceptsEmergencies
                                    ? 'Permite consultas de emergências'
                                    : 'Apenas consultas agendadas'
                            }
                        </Text>
                    </View>
                    <Text  style={{ fontSize: 12 }}>Contato: {location.user.phone}</Text>
                </View>
                <TouchableOpacity>
                    <Text>Ver mais</Text>
                </TouchableOpacity>
            </StyledLocationCardBody>
        </StyledLocationCardContainer>
    );
}

export default LocationCard;