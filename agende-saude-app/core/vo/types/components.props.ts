import { ASTheme } from "@/core/design-system/theme";
import { Media } from "@/core/models/media.model";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { AlertType } from "./types";
import { Location } from "@/core/models/location.model";
import { Consultation } from "@/core/models/consultation.model";

export type AppIcon = keyof typeof MaterialCommunityIcons.glyphMap;

export type IconProps = {
    name : AppIcon;
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
    children?: ReactNode;
    onPress: (() => void | Promise<void>) | (<T> (parameter: T) => void);
    icon?: AppIcon;
    type: "primary" | "secondary" | "tertiary";
    ghost?: boolean;
    disabled?: boolean;
    theme?: ASTheme;
}

type CommonInputProps<T> = {
    label?: string;
    placeholder?: string;
    value?: T;
    onValueChange?: (value: T) => void;
    editable?: boolean;
}

export type InputProps = CommonInputProps<string> & {
    icon?: AppIcon;
    inputMode?: "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
    keyboardType?: "default" | "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad";
    autocomplete?: "additional-name" | "address-line1" | "address-line2" |
                    "birthdate-day" | "birthdate-full" | "birthdate-month" | "birthdate-year" |
                    "cc-csc" | "cc-exp" | "cc-exp-day" | "cc-exp-month" | "cc-exp-year" | "cc-number" |
                    "country" | "current-password" | "email" |
                    "family-name" | "given-name" | "honorific-prefix" | "honorific-suffix" |
                    "name" | "new-password" | "off" | "one-time-code" |
                    "postal-code" | "street-address" | "tel" | "username";
    onSelectionChange?: (event: any) => void;
    onBlur?: () => void;
    mask?: string;
}

export type TextAreaProps = InputProps;

export type InputOptions<T> = {
    label: string;
    value: T;
}

export type ToggleButtonProps = {
    isSelected: boolean;
    isLeft?: boolean;
    isRight?: boolean;
}

export type CommonSelectionInputProps<T> = CommonInputProps<T> & {
    options: InputOptions<T>[];
}

export type ToggleProps<T> = CommonSelectionInputProps<T>;

export type SelectProps<T> =CommonSelectionInputProps<T> & {
    icon?: AppIcon;
};

export type SelectionListProps<T> = {
    options: InputOptions<T>[];
    onSelect: (value: T) => void;
}

export type CheckboxProps = CommonInputProps<boolean>;

export type FlexContainerProps = {
    flex?: number;
    direction?: "row" | "column";
    justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
    align?: "stretch" | "flex-start" | "center" | "flex-end" | "space-between";
    wrap?: "wrap" | "nowrap";
    gap?: number;
    rowGap?: number;
    columnGap?: number;
}

export type CopyToClipboardProps = {
    text: string;
};

export type MediaRenderProps = {
    media: Media;
    icon: AppIcon;
}

export type FileInputProps = MediaRenderProps & {
    onChangeValue: (updatedMedia: Media | null) => void;
}

export type ExpandableProps = {
  expanded: boolean;
  children: React.ReactNode;
  duration?: number;
}

export type ConfirmationModalProps = {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export type SliderRef = {
    nextSlide: (callback?: () => void) => void;
    previousSlide: (callback: () => void) => void;
    goToLastSlide: () => void;
    isLastSlide: () => boolean;
    isFirstSlide: () => boolean;
}

export type SliderProps = {
    showNavigation?: boolean;
    children: ReactNode;
    allowDotsNavigation?: boolean;
}

export type AlertProps = {
    type: AlertType;
    title: string;
    message: string;
}

export type ProfileListItemProps = {
    icon: AppIcon;
    title: string;
}

export type LocationCardProps = {
    location: Location;
}

export type ConsultationCardProps = {
    consultation: Consultation;
}