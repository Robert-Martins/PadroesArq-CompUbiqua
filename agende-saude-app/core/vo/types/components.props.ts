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

export type InputProps = {
    label?: string;
    icon?: keyof typeof MaterialCommunityIcons.glyphMap;
    placeholder?: string;
    value?: string;
    keyboardType?: "default" | "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad";
    autocomplete?: "additional-name" | "address-line1" | "address-line2" |
                    "birthdate-day" | "birthdate-full" | "birthdate-month" | "birthdate-year" |
                    "cc-csc" | "cc-exp" | "cc-exp-day" | "cc-exp-month" | "cc-exp-year" | "cc-number" |
                    "country" | "current-password" | "email" |
                    "family-name" | "given-name" | "honorific-prefix" | "honorific-suffix" |
                    "name" | "new-password" | "off" | "one-time-code" |
                    "postal-code" | "street-address" | "tel" | "username";
    onValueChange?: (text: string) => void;
    onSelectionChange?: (event: any) => void;
    onBlur?: () => void;
}

export type InputOptions = {
    label: string;
    value: any;
}

export type ToggleButtonProps = {
    isSelected: boolean;
    isLeft?: boolean;
    isRight?: boolean;
}

export type ToggleProps = {
    value: boolean;
    options: InputOptions[];
    onValueChange: (value: boolean) => void;
}

export type SelectProps = {
    value?: string;
    options: InputOptions[];
    onValueChange: (value: string) => void;
}

export type CheckboxProps = {
    value?: boolean;
    disabled?: boolean;
    onValueChange?: (value: boolean) => void;
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