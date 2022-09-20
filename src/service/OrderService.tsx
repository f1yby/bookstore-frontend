import { BookData } from '@/service/BookService';

export interface CartItemData {
  count: number;
  book: BookData;
}
