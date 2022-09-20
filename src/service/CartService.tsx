import { BookData } from '@/service/BookService';
import { UserDataWithBuyAmount, UserService } from '@/service/UserService';
import { postRequest, postRequestString } from '@/utils/ajax';
import { bookStoreApi } from '@/config';

export interface CartItemData {
  oiid: number;
  count: number;
  book: BookData;
}

export interface OrderData {
  oid: number;
  date: string;
  orderItems: CartItemData[];
}

const checkOut = (oiids: number[]) => {
  const userData = UserService.getUserData();
  console.log(oiids.toString());
  postRequestString(
    bookStoreApi + '/order/checkOut',
    {
      username: userData.username,
      password: userData.password,
      oiid: oiids.toString(),
    },
    () => {},
  );
};

const getCart = (callback: (arg0: any) => void) => {
  const userData = UserService.getUserData();
  console.log(userData);
  postRequest(
    bookStoreApi + '/order/getCart',
    {
      username: userData.username,
      password: userData.password,
    },
    callback,
  );
};
const findAll = (callback: (arg0: any) => void) => {
  const userData = UserService.getUserData();
  console.log(userData);
  postRequest(
    bookStoreApi + '/order/admin/findAll',
    {
      username: userData.username,
      password: userData.password,
    },
    callback,
  );
};
const getAllByTimePeriod = (
  period: [string, string],
  callback: (userData: OrderData[]) => void,
) => {
  postRequest(
    bookStoreApi + '/order/admin/findAllByTimePeriod',
    {
      username: UserService.getUserData().username,
      password: UserService.getUserData().password,
      start: period[0],
      end: period[1],
    },
    callback,
  );
};
const getAllByBookName = (
  name: string,
  callback: (OrderData: OrderData[]) => void,
) => {
  postRequest(
    bookStoreApi + '/order/admin/findAllByBookName',
    {
      username: UserService.getUserData().username,
      password: UserService.getUserData().password,
      bookName: name,
    },
    callback,
  );
};

const getAllByUserTimePeriod = (
  period: [string, string],
  callback: (userData: OrderData[]) => void,
) => {
  postRequest(
    bookStoreApi +
      '/order/getOrdersByUser_UsernameAndUser_PasswordAndOrder_Date',
    {
      username: UserService.getUserData().username,
      password: UserService.getUserData().password,
      start: period[0],
      end: period[1],
    },
    callback,
  );
};
const getAllByUserBookName = (
  name: string,
  callback: (OrderData: OrderData[]) => void,
) => {
  postRequest(
    bookStoreApi +
      '/order/getOrdersByUser_UsernameAndUser_PasswordAndBook_Name',
    {
      username: UserService.getUserData().username,
      password: UserService.getUserData().password,
      bookName: name,
    },
    callback,
  );
};

const getOrder = (callback: (arg0: any) => void) => {
  const userData = UserService.getUserData();
  console.log(userData);
  postRequest(
    bookStoreApi + '/order/getOrdersByUser_UsernameAndUser_Password',
    {
      username: userData.username,
      password: userData.password,
    },
    callback,
  );
};

const addToCart = (bid: number) => {
  const userData = UserService.getUserData();
  console.log(userData);
  postRequestString(
    bookStoreApi + '/order/addToCart',
    {
      username: userData.username,
      password: userData.password,
      bid: bid.toString(),
    },
    () => {},
  );
};
const removeFromCart = (bid: number) => {
  const userData = UserService.getUserData();
  console.log(userData);
  postRequest(
    bookStoreApi + '/order/removeFromCart',
    {
      username: userData.username,
      password: userData.password,
      bid: bid.toString(),
    },
    () => {},
  );
};
export const CartService = {
  getCart,
  getOrder,
  removeFromCart,
  addToCart,
  checkOut,
  findAll,
  getAllByTimePeriod,
  getAllByBookName,
  getAllByUserBookName,
  getAllByUserTimePeriod,
};
