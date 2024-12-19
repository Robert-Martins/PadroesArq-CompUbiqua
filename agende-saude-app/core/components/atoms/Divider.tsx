import styled from "styled-components/native";

const StyledDivider = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.divider};
    border-radius: ${({ theme }) => theme.border.sm}px;
`;

export const Divider: React.FC = () => {
    return <StyledDivider />;
};

export default Divider;