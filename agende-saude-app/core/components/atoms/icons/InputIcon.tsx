import styled from "styled-components/native";
import { IconProps } from "@/core/vo/types/components.props";
import Icon from "./Icon";

const StyledInputIcon = styled.View<IconProps>`
    position: absolute;
    top: 30px;
    left: 8px;
`;

const InputIcon: React.FC<IconProps> = (props) => {
    return (
        <StyledInputIcon>
            <Icon {...props} />
        </StyledInputIcon>
    );
}

export default InputIcon;