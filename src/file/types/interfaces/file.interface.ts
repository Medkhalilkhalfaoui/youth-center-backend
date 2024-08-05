import { IIdentifiable } from '../../../shared/types';

export interface IFile extends IIdentifiable {
  mimetype: string;
  filename: string;
  originalname: string;
  size: number;
}
