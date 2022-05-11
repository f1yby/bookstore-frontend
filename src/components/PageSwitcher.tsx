import {history} from "@@/core/history";
import {BookData} from "@/service/BookService";


const jumpToDetailByBook = (book: BookData) => history.push({pathname: '/detail', query: {book: JSON.stringify(book)}})

const jumpToSearchByKeyword = (key: string) => history.push({pathname: '/search', query: {keyword: key}})

export default {
  jumpToDetailByBook,
  jumpToSearchByKeyword,
}
