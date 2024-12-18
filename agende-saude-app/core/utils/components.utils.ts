import { ImagePickerResult } from "expo-image-picker";
import { Optional } from "./optional";

export const handleFormFieldIconColor = (props, theme): string => {
    return props.isFocused ? theme.colors.primary : theme.colors.divider;
}

export const handleButtonBackground = (props): string => {
    return props.theme.colors.buttons[props.disabled ? 'disabled' : props.type][props.ghost ? 'ghost' : 'background'];
}

export const handleButtonTextColor = (props): string => {
    console.log(props);
    return props.theme.colors.buttons[props.disabled ? 'disabled' : props.type][props.ghost ? 'background' : 'text'];
}

export const handleButtonIconColor = (props, theme): string => {
    return theme.colors.buttons[props.disabled ? 'disabled' : props.type][props.ghost ? 'background' : 'text'];
}

export const handleTextButtonIconColor = (props, theme): string => {
    return theme.colors.buttons[props.disabled ? 'disabled' : props.type][props.ghost ? 'ghost' : 'background'];
}

export const handleToggleButtonBackground = (props, theme): string => {
    if(!props.isSelected) 
        return theme.colors.white;
    return props.disabled 
        ? theme.colors.disabled 
        : theme.colors.primary;
}

export const handleToggleButtonBorder = (props, theme): string => {
    if(!props.isSelected) 
        return theme.colors.divider;
    return props.disabled 
        ? theme.colors.disabled 
        : theme.colors.primary;
}

export const handleCheckboxColor = (props, theme): string => {
    if(props.disabled)
        return theme.colors.disabled;
    return props.value ? theme.colors.primary : theme.colors.divider
}

export const convertImagePickerResultToFile = (result: ImagePickerResult): File => {
    return Optional.ofNullable(result)
                    .filter(result => !result.canceled)
                    .map(result => result.assets)
                    .filter((assets) => assets.length > 0)
                    .map((assets) => assets[0])
                    .map(asset => {
                        return {
                            uri: asset.uri,
                            type: "image/png",
                            name: "profile-picture"
                        } as unknown as File;
                    })
                    .orElse(null);
}