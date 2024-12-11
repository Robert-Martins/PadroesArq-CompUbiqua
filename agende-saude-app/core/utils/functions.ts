export const acceptTrueOrElse = (
    value: boolean, onTrue: () => void, onFalse: () => void
): void => {
    value ? onTrue() : onFalse();
}

export const acceptFalse = (
    value: boolean, onFalse: () => void
): void => {
    !value && onFalse();
}