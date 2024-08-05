import { IIdentifiable } from "src/shared/types";
import { IHangar } from "./hangar.interface";
import { IReceptionDetails } from "./reception-details.interface";

export interface IHangarReceptionDetails extends IIdentifiable {
    quantity: number;
    hangar: IHangar | string;
    receptionDetails: IReceptionDetails | string;
}