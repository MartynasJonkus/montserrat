import { Status } from "../Enums/Status"

export interface GiftCard {
    id: number;
    code: string;
    initialBalance: number;
    currency: string;
    expiresOn: string; 
    status: Status;
}

export interface CreateGiftCardDto {
    code: string;
    initialBalance: number;
    currency: string;
    expiresOn: string; 
    status: Status;
}

export interface UpdateGiftCardDto {
    code: string;
    initialBalance: number;
    currency: string;
    expiresOn: string; 
    status: Status;
}
