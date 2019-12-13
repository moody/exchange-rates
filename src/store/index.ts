import Vue from "vue";
import Vuex from "vuex";
import { ICurrencyState } from "./modules/currency";
import { INavigationState } from "./modules/navigation";

Vue.use(Vuex);

export interface IRootState {
  currency: ICurrencyState;
  navigation: INavigationState;
}

export default new Vuex.Store<IRootState>({});
