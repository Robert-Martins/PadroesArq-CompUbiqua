export const isNull = <T> (value: T): boolean => {
    return value == null || value == undefined;
}

export const nonNull = <T> (value: T): boolean => {
    return value != null && value != undefined;
}

export const requireNonNull = <T> (value: T): T => {
    if(isNull(value))
        throw new Error();
    return value;
}