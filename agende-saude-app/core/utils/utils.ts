import { Address } from "../models/address.model";
import { PageableFilter } from "../vo/types/filters";
import { Optional } from "./optional";

const isValidDate = (date: Date): boolean => {
    return date instanceof Date || Object.prototype.toString.call(date) === "[object Date]";
}

const formatAddress = (address: Address): string => {
    return `${address.address}, ${address.neighborhood}, ${address.city} - ${address.state}, ${address.zipcode}`;
};

const formatDistance = (distanceInMeters: number): string => {
    return Optional.ofNullable(distanceInMeters)
        .map(distance => {
            if (distance < 1000) {
                return `${distance} m`;
            } else {
                const distanceInKilometers = (distance / 1000).toFixed(2);
                return `${distanceInKilometers} km`;
            }
        })
        .orElse(null);
};

export const formatDate = (date: Date): string => {
    return Optional.ofNullable(date)
        .filter(isValidDate)
        .map(d => new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(d))
        .orElse(null);
};

const transformRequestParamValue = (value: any): string => {
    return Optional.ofNullable(value)
        .map(val => {
            if (isValidDate(val)) {
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