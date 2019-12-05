import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import axios from "axios";
import moment from "moment";
import { SORTED_CURRENCIES } from "@/consts";
import { CurrencyType } from "@/types";
import store from "@/store";

if (process.env.NODE_ENV !== "production") {
  const MockAdapter = require("axios-mock-adapter");
  const mock = new MockAdapter(axios, { delayResponse: 2000 });
  mock.onGet().reply(200, require("./fetch-mock"));
}

type IRates = {
  [key in CurrencyType]: number[];
};

interface IFetchResponse {
  data: {
    start_at: string;
    end_at: string;
    base: CurrencyType;
    rates: {
      [key: string]: {
        [key in CurrencyType]: number;
      };
    };
  };
}

export interface ICurrencyState {
  baseCurrency: CurrencyType;
  labels: string[];
  rates: IRates;
  isFetching: boolean;
}

const getFetchUrl = (base: CurrencyType) => {
  const startAt = moment()
    .subtract(7, "days")
    .format("YYYY-MM-DD");
  const endAt = moment().format("YYYY-MM-DD");
  return `history?base=${base}&start_at=${startAt}&end_at=${endAt}`;
};

@Module({ dynamic: true, store, name: "currency" })
class Currency extends VuexModule implements ICurrencyState {
  public baseCurrency: CurrencyType = "USD";
  public labels: string[] = [];
  public rates = {} as IRates;
  public isFetching = false;

  @Mutation
  public setBaseCurrency(currency: CurrencyType) {
    this.baseCurrency = currency;
  }

  @Mutation
  public setLabels(labels: string[]) {
    this.labels = labels;
  }

  @Mutation
  public setRates(rates: IRates) {
    delete rates[this.baseCurrency];
    this.rates = rates;
  }

  @Action({ rawError: true })
  public async fetch() {
    this.setIsFetching(true);

    await axios
      .get(getFetchUrl(this.baseCurrency))
      .then((response: IFetchResponse) => {
        const ratesByDate = Object.entries(response.data.rates);
        ratesByDate.sort(([aDateStr], [bDateStr]) => {
          const aDate = new Date(aDateStr);
          const bDate = new Date(bDateStr);
          return aDate.getTime() - bDate.getTime();
        });

        const rates = Object.fromEntries(
          SORTED_CURRENCIES.map(k => [k, [] as number[]])
        ) as IRates;

        ratesByDate.forEach(([_, dateRates]) => {
          for (const k in dateRates) {
            if (rates.hasOwnProperty(k)) {
              const currency = k as CurrencyType;
              rates[currency].push(dateRates[currency]);
            }
          }
        });

        this.setLabels(
          ratesByDate.map(([dateStr]) => moment(dateStr).format("MMM D"))
        );
        this.setRates(rates);
      })
      .catch(error => console.error(error))
      .finally(() => this.setIsFetching(false));
  }

  @Mutation
  private setIsFetching(b: boolean) {
    this.isFetching = b;
  }

  /**
   * Returns a sorted array of currency keys for which rates should be
   * displayed.
   */
  get currenciesToDisplay() {
    return SORTED_CURRENCIES.filter(c => c !== this.baseCurrency);
  }
}

export const CurrencyModule = getModule(Currency);
