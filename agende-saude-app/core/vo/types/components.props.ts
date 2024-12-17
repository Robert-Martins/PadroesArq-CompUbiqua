import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";

export type IconProps = {
    name : keyof typeof MaterialCommunityIcons.glyphMap;
    size?: number;
    color?: string;
}

export type TextButtonProps = {
    children: ReactNode;
    type?: "primary" | "secondary" | "tertiary";
    disabled?: boolean;
    ghost?: boolean;
}

export type ButtonProps = {
    children: ReactNode;
    onPress: () => void | (<T> (parameter: T) => void);
    icon?: keyof typeof MaterialCommunityIcons.glyphMap;
    type?: "primary" | "secondary" | "tertiary";
    ghost?: boolean;
    disabled?: boolean;
    theme?: any;
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

export type ExpandableProps = {
  expanded: boolean;
  children: React.ReactNode;
  duration?: number;
}