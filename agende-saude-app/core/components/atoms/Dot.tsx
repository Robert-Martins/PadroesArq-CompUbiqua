import { View } from "react-native";
import styled from "styled-components/native";

type DotProps = {
    width?: number;
    height?: number;
    color?: string;
}

const Dot = styled(View)<DotProps>`
    width: ${({width}) => width || 32}px;
    height: ${({height}) => height || 32}px;
    background-color: ${({color}) => color || 'green'};
    border-radius: 50%;
`;

export default Dot;