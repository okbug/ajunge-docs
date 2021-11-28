
import { IUserDocument } from '../models/user';

export interface UserPayload {
    id: IUserDocument['_id']
}