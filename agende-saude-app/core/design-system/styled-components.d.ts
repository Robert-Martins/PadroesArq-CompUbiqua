import { ASTheme } from "./theme";

declare module "styled-components" {
    export interface DefaultTheme extends ASTheme {}
}