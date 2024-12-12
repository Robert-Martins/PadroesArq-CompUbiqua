import { PageableFilter } from "../vo/types/filters";
import { Optional } from "./optional";

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

const transformRequestParamValue = (value: any): string => {
    return Optional.ofNullable(value)
        .map(val => {
            if (val instanceof Date || Object.prototype.toString.call(val) === "[object Date]") {
                return new Date(val).toISOString();
            }
            if (typeof val === 'boolean') {
                return `${val}`;
            }
            if (typeof val === 'string') {
                return val;
            }
            return JSON.stringify(val);
        })
        .orElse('');
};
  
export const createRequestParams = <T>(filter: PageableFilter<T>): Record<string, string> => {
    const { page, size, sort, direction, ...rest } = filter;
  
    return {
        page: Optional.ofNullable(page).map(p => p.toString()).orElse('1'),
        size: Optional.ofNullable(size).map(s => s.toString()).orElse('10'),
        sort: Optional.ofNullable(sort).map(s => `${s},${direction ?? 'desc'}`).orElse(''),
        ...Object.entries(rest).reduce((acc, [key, value]) => {
            acc[key] = transformRequestParamValue(value);
            return acc;
        }, {} as Record<string, string>)
    };
};