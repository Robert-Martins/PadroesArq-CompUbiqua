import { ASTheme } from "./theme";

declare module "styled-components" {
    export interface DefaultTheme extends ASTheme {}
}

declare module "styled-components/native" {
    export interface DefaultTheme extends ASTheme {}
}