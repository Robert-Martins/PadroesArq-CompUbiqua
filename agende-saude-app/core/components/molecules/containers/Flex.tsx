import { FlexContainerProps } from "@/core/vo/types/components.props";
import { View } from "react-native";
import styled from "styled-components";

const Flex = styled(View)<FlexContainerProps>`
    width: 100%;
    ${({ flex }) => flex && `flex: ${flex};`}
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