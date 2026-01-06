import rootApi from "./api";

export enum ERoles {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_SELLER = "ROLE_DEV"
}

export interface IUserAuth {
  accessToken: string;
  username: string;
  fullname: string;
}

export interface IRegisterData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  fullname: string
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface IUserAccessData {
  username: string;
  password: string;

}

export interface IUserInfo {
  username: string;
  fullname: string;
  role: string;
}

export interface IDomain {
  domainId: number;
  domainName: string;
  description: string;
  tenantCode: string;
}

export interface ISystem {
  systemId: number;
  systemName: string;
  address: string;
  domainId: number;
  domainName: string;
  tenantCode: string;
}

export interface IUserAccess {
  userInfo: IUserInfo;
  apartments: {
    apartmentCode: string;
    apartmentId: number;
    domainId: number;
    domainName: string;
  }[]
}

export interface IBioRegister {
  bioKey: string;
  username: string;
  fullname: string;
}

const path = {
  login: "/auth/resident-login",
  logout: "/auth/logout",
  getUserAccess: "/auth/get-resident-access",
  register: "/auth/resident-register",
  bioRegister: "/auth/bio-register",
  bioLogin: "/auth/bio-login",
};

const getUserAccess = async () => {
  return await rootApi<IUserAccess>(
    {
      baseURL: process.env.EXPO_PUBLIC_BASE_URL + '/api',
      url: path.getUserAccess,
      method: "get",
    },
  );
};

const login = async (data: ILoginData) => {
  return await rootApi<IUserAuth>(
    {
      baseURL: process.env.EXPO_PUBLIC_BASE_URL + '/api',
      url: path.login,
      method: "post",
      data,
    },
    { withToken: false },
  );
};

const register = async (data: IRegisterData) => {
  return await rootApi<IUserAuth>(
    {
      baseURL: process.env.EXPO_PUBLIC_BASE_URL + '/api',
      url: path.register,
      method: "post",
      data,
    },
    { withToken: false },
  );
};

const logout = async (): Promise<unknown> => {
  return await rootApi(
    {
      baseURL: process.env.EXPO_PUBLIC_BASE_URL + '/api',
      url: path.logout,
      method: "post",
    },
    { withToken: false },
  );
};

const bioRegister = async () => {
  return await rootApi<IBioRegister>(
    {
      baseURL: process.env.EXPO_PUBLIC_BASE_URL + '/api',
      url: path.bioRegister,
      method: "post",
    },
  );
};

const bioLogin = async (data: {bioKey: string}) => {
  return await rootApi<IUserAuth>(
    {
      baseURL: process.env.EXPO_PUBLIC_BASE_URL + '/api',
      url: path.bioLogin,
      method: "post",
      data: data
    },
  );
};

export { bioLogin, bioRegister, getUserAccess, login, logout, register };

