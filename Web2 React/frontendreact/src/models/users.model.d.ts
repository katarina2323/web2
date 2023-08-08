export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  address: string;
  picture: string;
  role: string;
  verificationStatus: string;
}

export interface GetSellers {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  address: string;
  picture: string;
  role: string;
  verificationStatus: string;
}

export interface UserAuthorization{
    unique_name: string,
    nameid: string,     
    role: string,       
}

export interface FormData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  address: string;
  picture: string;
  role: string;
}