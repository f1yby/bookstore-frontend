import { history } from '@@/core/history';
import { BookData } from '@/service/BookService';
import { UserService, UserType } from '@/service/UserService';

const jumpToDetailByBook = (book: BookData) => {
  if (UserService.getUserType() === UserType.admin) {
    history.push({
      pathname: '/manage/edit',
      query: { book: JSON.stringify(book) },
    });
  } else {
    history.push({
      pathname: '/detail',
      query: { book: JSON.stringify(book) },
    });
  }
};

const jumpToSearchByKeyword = (key: string) =>
  history.push({ pathname: '/search', query: { keyword: key } });
const jumpToEditByBook = (book: BookData) =>
  history.push({
    pathname: '/manage/edit',
    query: { book: JSON.stringify(book) },
  });

const jumpToHome = () => history.push({ pathname: '/' });

export default {
  jumpToDetailByBook,
  jumpToSearchByKeyword,
  jumpToHome,
  jumpToEditByBook,
};
