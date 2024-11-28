import { Optional } from './optional';

export const acceptTrue = (value: boolean, onTrue: () => void): void => {
    value && onTrue();
}

export const acceptTrueOrElse = (value: boolean, onTrue: () => void, onFalse: () => void): void => {
    value ? onTrue() : onFalse();
}

export const acceptTrueThrows = (value: boolean, onTrue: () => Error): void => {
    if (value) {
        throw onTrue();
    }
}

export const acceptFalse = (value: boolean, onFalse: () => void): void => {
    !value && onFalse();
};

export const asyncAcceptTrueOrElse = async (value: boolean, onTrue: () => Promise<void>, onFalse: () => Promise<void>): Promise<void> => {
    value ? await onTrue() : await onFalse();
}

export const asyncAcceptFalse = async (value: boolean, onFalse: () => Promise<void>): Promise<void> => {
    !value && await onFalse();
}

export const acceptFalseThrows = (value: boolean, onFalse: () => Error): void => {
    if (!value) {
        throw onFalse();
    }
}

export const until = async (value: () => Promise<boolean> | boolean, perform: () => void, matches: boolean = false): Promise<void> => {
    let bool: Promise<boolean> | boolean = true;
    do {
        bool && perform();
        bool = (typeof bool === 'boolean' ? value() : await value()) && matches;
    } while(bool);
}

export const isUUID = (value: string): boolean => {
    return Optional.ofNullable(value)
        .map(val => val.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/))
        .isPresent();
}

export const isPresent = (value: unknown): boolean => {
    return Optional.ofNullable(value).isPresent();
}

export const isNotPresent = (value: unknown) => {
    return Optional.ofNullable(value).isEmpty();
}