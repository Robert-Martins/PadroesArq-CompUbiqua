import styled from "styled-components/native";

const Layout = styled.ScrollView.attrs(() => ({
    contentContainerStyle: {
            flexGrow: 1,
        },
}))`
    flex: 1;
    width: 100%;
    padding: ${({ theme }) => theme.spacing.layout}px;
    background-color: ${({ theme }) => theme.colors.background};
`;
  
export default Layout;