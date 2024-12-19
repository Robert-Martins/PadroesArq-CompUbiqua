import AsyncStorage from "@react-native-async-storage/async-storage";

const PREVIOUS_USERS_KEY: string = 'previous-users';

const FORM_KEY_SUFFIX: string = '-form';

export const getPreviousUsers = (): Promise<string[] | null> => {
    return AsyncStorage.getItem(PREVIOUS_USERS_KEY)
        .then((value) => {
            return value ? JSON.parse(value) : null;
        });
}

export const includeNewUser = (user: string): Promise<void> => {
    return getPreviousUsers()
        .then((previousUsers) => {
            const userExists: boolean = previousUsers?.includes(user);
            if (userExists) {
                return Promise.resolve();
            }
            const newUsers: string[] = previousUsers ? [...previousUsers, user] : [user];
            return AsyncStorage.setItem(PREVIOUS_USERS_KEY, JSON.stringify(newUsers));
        });
}

export const getForm = <T> (formName: string): Promise<T | null> => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(formName + FORM_KEY_SUFFIX)
            .then((value) => {
                resolve(value ? JSON.parse(value) : null);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export const saveForm = <T> (formName: string, form: T): Promise<void> => {
    return formName && form ? AsyncStorage.setItem(formName + FORM_KEY_SUFFIX, JSON.stringify(form)) : Promise.resolve();
}

export const clearForm = (formName: string): Promise<void> => {
    return formName ? AsyncStorage.removeItem(formName + FORM_KEY_SUFFIX) : Promise.resolve();
}