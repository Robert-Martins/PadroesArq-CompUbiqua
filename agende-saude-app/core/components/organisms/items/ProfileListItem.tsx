import { ProfileListItemProps } from "@/core/vo/types/components.props";
import { Flex } from "../../molecules";
import { Icon, Paragraph } from "../../atoms";
import styled from "styled-components/native";

const StyledProfileListItem = styled(Flex)`
    width: 100%;
    padding: 8px 16px 8px 0;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.divider};
`;

const StyledProfileListItemTitle = styled(Paragraph)`
    color: ${({theme}) => theme.colors.text};
`;

const ProfileListItem: React.FC<ProfileListItemProps> = (props) => {
    const { icon, title } = props;

    return (
        <StyledProfileListItem direction='row' justify="space-between" align='center'>
            <Flex direction='row' align='center' gap={8}>
                <Icon name={icon} size={28} color="#9E9E9E" />
                <StyledProfileListItemTitle>{title}</StyledProfileListItemTitle>
            </Flex>
            <Icon name="chevron-right" size={24} color="#9E9E9E" />
        </StyledProfileListItem>
    );
}

export default ProfileListItem;