import rootApi, { IDataResponse } from "./api";

export interface IKqxs {
  date: string;
  specialPrize: string;
  firstPrize: string;
  secondPrize: string;
  thirdPrize: string;
  fourthPrize: string;
  fifthPrize: string;
  sixthPrize: string;
  seventhPrize: string;
  ticketCodes: string;
}

export interface IForecast {
  date: string;
  title: string;
  htmlContent: string;
}

const path = {
  kqxs: "/kqxs",
  forecast: "/kqxs/du-doan"
};

const kqxs = async (date: string): Promise<IDataResponse<IKqxs>> => {
  return await rootApi<IKqxs>(
    {
      url: path.kqxs,
      method: "get",
      params: { date }
    },
  );
};

const forecast = async (): Promise<IDataResponse<IForecast>> => {
  return await rootApi<IForecast>(
    {
      url: path.forecast,
      method: "get",
    },
  );
};

export { forecast, kqxs };

