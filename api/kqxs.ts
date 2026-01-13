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

const path = {
  kqxs: "/kqxs",
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

export { kqxs };

