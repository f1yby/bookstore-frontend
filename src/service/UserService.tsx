import { postRequest, postRequestString } from '@/utils/ajax';
import { bookStoreApi } from '@/config';
import PageSwitcher from '@/components/PageSwitcher';

export interface SignData {
  username: string;
  password: string;
}

export interface SignUpData extends SignData {
  email: string;
}

export interface UserData extends SignUpData {
  permission: string;
  uid: number;
}

export interface UserDataWithBuyAmount extends UserData {
  buyAmount: number;
}

export enum UserType {
  unknown,
  user,
  admin,
}

export enum SignUpReturn {
  ok,
  alreadyExist,
  admin,
}

const SignInCallBack = (s: string | null) => {
  console.log(s);
  if (typeof s == 'string') {
    sessionStorage.setItem('userType', s.toString());
    if (s.toString() == 'Banned') {
      alert('Account Banned');
      return;
    }
    console.log(s);
    PageSwitcher.jumpToHome();
  }
};
const SignUpCallBack = (s: string) => {
  if (s == 'Ok') {
    console.log(s);
    PageSwitcher.jumpToHome();
  } else {
    alert('用户名已注册');
  }
};
const Login = (signData: SignData) => {
  console.log({
    username: signData.username,
    password: signData.password,
  });
  sessionStorage.setItem('signData', JSON.stringify(signData));

  postRequest(
    bookStoreApi + '/user/getPermissionByUsernameAndPassword',
    {
      username: signData.username,
      password: signData.password,
    },
    SignInCallBack,
  );
};
const Logout = () => {
  sessionStorage.clear();
  PageSwitcher.jumpToHome();
};

const Signup = (signUpData: SignUpData) => {
  console.log({
    username: signUpData.username,
    password: signUpData.password,
    email: signUpData.email,
  });

  postRequestString(
    bookStoreApi + '/user/add',
    {
      username: signUpData.username,
      password: signUpData.password,
      email: signUpData.email,
    },
    SignUpCallBack,
  );
};
const getUserType = (): UserType => {
  const sa = sessionStorage.getItem('userType');
  console.log(sa);
  if (sa === 'Normal') {
    return UserType.user;
  } else if (sa === 'Admin') {
    return UserType.admin;
  } else {
    return UserType.unknown;
  }
};

const getUserData = (): SignData => {
  const sa = sessionStorage.getItem('signData');
  if (sa != null) {
    console.log(JSON.parse(sa));
    return JSON.parse(sa);
  } else {
    return { username: '', password: '' };
  }
};
const getUserByUsername = (
  username: string,
  callback: (userData: UserData) => void,
) => {
  postRequest(
    bookStoreApi + '/user/admin/findByUsername',
    {
      admin: getUserData().username,
      password: getUserData().password,
      username: username,
    },
    callback,
  );
};
const getAllUsers = (callback: (userData: UserDataWithBuyAmount[]) => void) => {
  postRequest(
    bookStoreApi + '/user/admin/findAll',
    {
      username: getUserData().username,
      password: getUserData().password,
    },
    callback,
  );
};
const getAllUsersByTimePeriod = (
  period: [string, string],
  callback: (userData: UserDataWithBuyAmount[]) => void,
) => {
  postRequest(
    bookStoreApi + '/user/admin/findAllByTimePeriod',
    {
      username: getUserData().username,
      password: getUserData().password,
      start: period[0],
      end: period[1],
    },
    callback,
  );
};

const setPermission = (id: number, permission: string) => {
  postRequest(
    bookStoreApi + '/user/admin/setPermission',
    {
      username: getUserData().username,
      password: getUserData().password,
      uid: id.toString(),
      permission: permission,
    },
    (any: any) => {},
  );
};

export const UserService = {
  Login,
  Signup,
  getUserType,
  getUserData,
  Logout,
  getUserByUsername,
  getAllUsers,
  setPermission,
  getAllUsersByTimePeriod,
};
