export const handleButtonBackground = (props): string => {
    return props.theme.colors.buttons[props.disabled ? 'disabled' : props.type][props.ghost ? 'ghost' : 'background'];
}

export const handleButtonTextColor = (props): string => {
    return props.theme.colors.buttons[props.disabled ? 'disabled' : props.type][props.ghost ? 'background' : 'text'];
}

export const handleButtonIconColor = (props, theme): string => {
    return theme.colors.buttons[props.disabled ? 'disabled' : props.type][props.ghost ? 'background' : 'text'];
}