import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import axios from "axios";
import { CURRENCY_NAME_MAP } from "@/consts";
import { CurrencyType, RatesType } from "@/types";
import store from "@/store";

export interface ICurrencyState {
  baseCurrency: CurrencyType;
  rates: RatesType;
  isFetching: boolean;
}

@Module({ dynamic: true, store, name: "currency" })
class Currency extends VuexModule implements ICurrencyState {
  public baseCurrency: CurrencyType = "USD";
  public rates: RatesType = {};
  public isFetching = false;

  @Mutation
  public setBaseCurrency(currency: CurrencyType) {
    this.baseCurrency = currency;
  }

  @Mutation
  public setRates(rates: RatesType) {
    delete rates[this.baseCurrency];
    this.rates = rates;
  }

  @Mutation
  private setIsFetching(b: boolean) {
    this.isFetching = b;
  }

  @Action({ rawError: true })
  public async fetch() {
    this.setIsFetching(true);
    await axios
      .get(`latest?base=${this.baseCurrency}`)
      .then(response => {
        this.setRates(response.data.rates);
      })
      .catch(error => console.error(error))
      .finally(() => this.setIsFetching(false));
  }

  get rateData() {
    return Object.entries(this.rates)
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .map(arr => {
        const currency = arr[0] as CurrencyType;
        const rate = arr[1] as number;
        return {
          currency,
          rate,
          name: CURRENCY_NAME_MAP[currency]
        };
      });
  }
}

export const CurrencyModule = getModule(Currency);
