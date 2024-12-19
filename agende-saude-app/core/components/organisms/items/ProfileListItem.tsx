import { ProfileListItemProps } from "@/core/vo/types/components.props";
import { Flex } from "../../molecules";
import { Emphasis, Icon } from "../../atoms";

const ProfileListItem: React.FC<ProfileListItemProps> = (props) => {
    const { icon, title } = props;

    return (
        <Flex>
            <Flex>
                <Icon name={icon} size={32} />
                <Emphasis>{title}</Emphasis>
            </Flex>
            <Icon name="chevron-right" size={24} />
        </Flex>
    );
}

export default ProfileListItem;