import rootApi, { IDataResponse } from "./api";

export type ChangeType = 'up' | 'down' | 'none';

export interface PairFrequency {
  pair: string;
  count: number;
  change: ChangeType;
  changeAmount: number;
}

export interface ConsecutivePair {
  pair: string;
  consecutiveDays: number;
  totalCount: number;
}

export interface AbsentPair {
  pair: string;
  daysAbsent: number;
}


export interface KQXSStatistics {
  date: string;
  createdAt: Date;
  topPairs3Days: PairFrequency[];
  topPairs7Days: PairFrequency[];
  consecutivePairs: ConsecutivePair[];
  longestAbsentPairs: AbsentPair[];
}


const path = {
  statistical: "/kqxs/statistical",
};

const statistical = async (): Promise<IDataResponse<KQXSStatistics>> => {
  return await rootApi<KQXSStatistics>(
    {
      url: path.statistical,
      method: "get",
    },
  );
};

export { statistical };

