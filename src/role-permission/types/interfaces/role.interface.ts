import { IIdentifiable } from "src/shared/types";
import { IUser } from "src/user/types";

export interface IRole extends IIdentifiable {
    name: string;
    users: IUser[] | string[];
    isActive: boolean;
  }