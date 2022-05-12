import {postRequest} from "@/utils/ajax";
import {bookStoreApi} from "@/config";
import PageSwitcher from "@/components/PageSwitcher";

export interface SignData {
  username: string,
  password: string,
}


export enum UserType {
  unknown,
  user,
  admin,
}

const SignInCallBack = (s: string | null) => {
  console.log(s);
  if (typeof s == 'string') {
    sessionStorage.setItem('userType', s.toString());
    console.log(s);
    PageSwitcher.jumpToHome();
  }

}
const Login = (signData: SignData) => {
  console.log({
    username: signData.username,
    password: signData.password
  });
  postRequest(bookStoreApi + '/user/getUserPrivilegeByUsernameAndPassword', {
    username: signData.username,
    password: signData.password
  }, SignInCallBack);


}


const Signup = (signData: SignData) => {

}
const getUserType = () => {
  const sa = sessionStorage.getItem('userType');
  if (sa === 'Normal') {
    return UserType.user;
  } else if (sa === 'Administer') {
    return UserType.admin;
  } else {
    return UserType.unknown;
  }
}
export const UserService = {
  Login,
  Signup,
  getUserType,
}

