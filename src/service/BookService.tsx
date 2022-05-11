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
  writers: WriterData[],
  description: string,
  price: number,
}

const getBookByBid = (bid: number) => {

}

const getBooks = (num: number, callback: (arg0: any) => void) => {
  console.log({'number': num.toString()});
  postRequest(bookStoreApi + '/book/getBooks', {'number': num.toString()}, callback);
}
const getBookByWid = (wid: number) => {

}

const getBookByKeyword = (keyword: string) => {

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
