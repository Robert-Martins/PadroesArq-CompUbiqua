import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";

export type ButtonProps = {
    children: ReactNode;
    onPress: () => void | (<T> (parameter: T) => void);
    icon?: keyof typeof MaterialCommunityIcons.glyphMap;
    disabled?: boolean;
    type?: "primary" | "secondary" | "tertiary";
    ghost?: boolean;
}

export type FlexContainerProps = {
    direction?: "row" | "column";
    justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
    align?: "stretch" | "flex-start" | "center" | "flex-end";
    wrap?: "wrap" | "nowrap";
    gap?: number;
    rowGap?: number;
    columnGap?: number;
}