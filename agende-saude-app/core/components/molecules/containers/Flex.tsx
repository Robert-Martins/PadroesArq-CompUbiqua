import { FlexContainerProps } from "@/core/vo/consts/components.props";
import styled from "styled-components/native";

const Flex = styled.View<FlexContainerProps>`
    width: 100%;
    display: flex;
    flex-direction: ${({ direction }) => direction ?? "column"};
    justify-content: ${({ justify }) => justify ?? "flex-start"};
    align-items: ${({ align }) => align ?? "flex-start"};
    flex-wrap: ${({ wrap }) => wrap ?? "nowrap"};
    ${({ gap }) => gap && `gap: ${gap}px;`}
    ${({ rowGap }) => rowGap && `row-gap: ${rowGap}px;`}
    ${({ columnGap }) => columnGap && `column-gap: ${columnGap}px;`}
`

export default Flex;