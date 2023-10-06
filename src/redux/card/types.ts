export type Card = {
    image: string;
    filesize: number;
    timestamp: number;
    category: string;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface CardSliceState {
    items: Card[];
    status: Status;
}

export type CardProps = {
    image: string;
    filesize: number;
    timestamp: number;
    category: string;
}