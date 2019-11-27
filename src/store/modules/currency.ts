import {
  Module,
  VuexModule,
  Mutation,
  getModule
} from "vuex-module-decorators";
import { CurrencyType } from "@/consts";
import store from "@/store";

export interface ICurrencyState {
  baseCurrency: CurrencyType;
}

@Module({ dynamic: true, store, name: "currency" })
class Currency extends VuexModule implements ICurrencyState {
  baseCurrency: CurrencyType = "USD";

  @Mutation
  setBaseCurrency(currency: CurrencyType) {
    this.baseCurrency = currency;
  }
}

export const CurrencyModule = getModule(Currency);
