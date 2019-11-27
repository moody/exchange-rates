import Vue from "vue";
import Vuex from "vuex";
import { ICurrencyState } from "./modules/currency";

Vue.use(Vuex);

export interface IRootState {
  currency: ICurrencyState;
}

export default new Vuex.Store<IRootState>({});
