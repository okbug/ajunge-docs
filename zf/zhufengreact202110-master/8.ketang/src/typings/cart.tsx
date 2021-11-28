import { Lesson } from './lesson';
export interface CartItem {
    lesson: Lesson;
    amount: number;
    checked: boolean;
}
export type CartState = CartItem[];