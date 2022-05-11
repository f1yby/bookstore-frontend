export interface SignData {
  name: string,
  password: string,
}


export enum UserType {
  unknown,
  user,
  admin,
}

const Login = (signData: SignData) => {
}


const Signup = (signData: SignData) => {

}
const getUserType = () => {
  const sa = sessionStorage.getItem('userType');
  if (sa === 'user') {
    return UserType.user;
  } else if (sa === 'admin') {
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

