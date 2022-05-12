import {postRequest} from "@/utils/ajax";
import {bookStoreApi} from "@/config";

export interface WriterData {
  name: string,
  wid: number,
}


export interface BookData {
  bid: number,
  count: number,
  coverSrc: string,
  bookName: string,
  writers:string,
  description: string,
  price: number,
}

const getBookByBid = (bid: number) => {

}

const getBooks = ( callback: (arg0: any) => void) => {
  postRequest(bookStoreApi + '/book/getBooks', {}, callback);
}
const getBookByWid = (wid: number) => {

}

const getBookByKeyword = (keyword: string,callback: (arg0: any) => void) => {
  postRequest(bookStoreApi + '/book/getBooksByKeyword', {keyword: keyword}, callback);
}

const getBookByName = (name: string) => {

}

export const BookService = {
  getBookByBid,
  getBooks,
  getBookByKeyword,
  getBookByWid,
  getBookByName
}
