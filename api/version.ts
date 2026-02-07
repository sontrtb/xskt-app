import rootApi, { IDataResponse } from "./api";

export interface Version {
  android: string;
  ios: string;
}


const path = {
  getVersion: "/version",
};

const getVersion = async (): Promise<IDataResponse<Version>> => {
  return await rootApi<Version>(
    {
      url: path.getVersion,
      method: "get",
    },
  );
};

export { getVersion };

