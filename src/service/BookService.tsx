import { postRequest, postRequestString } from '@/utils/ajax';
import { bookStoreApi } from '@/config';
import basicLayout from '@/layouts/BasicLayout';
import PageSwitcher from '@/components/PageSwitcher';
import pageSwitcher from '@/components/PageSwitcher';
import { history } from 'umi';
import { UserService } from '@/service/UserService';

export interface WriterData {
  name: string;
  wid: number;
}

export interface BookData {
  bid: number;
  inventory: number;
  image: string;
  name: string;
  writers: string;
  description: string;
  price: number;
  isbn: string;
  type: string;
  activated: boolean;
}

export interface BookDataWithSell extends BookData {
  sell: number;
}

const getBookByBid = (bid: number) => {};

const getBooks = (callback: (arg0: BookData[]) => void) => {
  postRequest(bookStoreApi + '/book/getBooks', {}, callback);
};
const getBookWithSells = (callback: (arg0: BookDataWithSell[]) => void) => {
  postRequest(bookStoreApi + '/book/admin/getBookWithSells', {}, callback);
};
const getBookWithSellsByTimePeriod = (
  period: [string, string],
  callback: (arg0: BookDataWithSell[]) => void,
) => {
  postRequest(
    bookStoreApi + '/book/admin/getBookWithSellsByTimePeriod',
    {
      start: period[0],
      end: period[1],
    },
    callback,
  );
};
const getBookWithSellsByUserData = (
  callback: (arg0: BookDataWithSell[]) => void,
) => {
  postRequest(
    bookStoreApi + '/book/getBookWithSellsByUsernameAndPassword',
    {
      username: UserService.getUserData().username,
      password: UserService.getUserData().password,
    },
    callback,
  );
};
const getBookWithSellsByTimePeriodAndUserData = (
  period: [string, string],
  callback: (arg0: BookDataWithSell[]) => void,
) => {
  postRequest(
    bookStoreApi + '/book/getBookWithSellsByTimePeriodAndUsernameAndPassword',
    {
      start: period[0],
      end: period[1],
      username: UserService.getUserData().username,
      password: UserService.getUserData().password,
    },
    callback,
  );
};

const getBookByKeyword = (keyword: string, callback: (arg0: any) => void) => {
  postRequest(
    bookStoreApi + '/book/getBooksByKeyword',
    { keyword: keyword },
    callback,
  );
};

const update = (book: BookData) => {
  console.log(book);
  postRequestString(
    bookStoreApi + '/book/admin/update',
    {
      bid: book.bid.toString(),
      inventory: book.inventory.toString(),
      image: book.image,
      name: book.name,
      writers: book.writers,
      description: book.description,
      price: book.price.toString(),
      type: book.type,
      isbn: book.isbn,
      activated: book.activated.toString(),
    },
    () => {
      history.goBack();
    },
  );
};
const add = (book: BookData) => {
  console.log(book);
  postRequestString(
    bookStoreApi + '/book/admin/add',
    {
      inventory: book.inventory.toString(),
      image: book.image,
      name: book.name,
      writers: book.writers,
      description: book.description,
      price: book.price.toString(),
      type: book.type,
      isbn: book.isbn,
      activated: book.activated.toString(),
    },
    () => {
      history.goBack();
    },
  );
};

export const BookService = {
  getBookByBid,
  getBooks,
  getBookByKeyword,
  update,
  add,
  getBookWithSells,
  getBookWithSellsByTimePeriod,
  getBookWithSellsByUserData,
  getBookWithSellsByTimePeriodAndUserData,
};
