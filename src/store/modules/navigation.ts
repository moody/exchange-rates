import {
  Module,
  VuexModule,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "@/store";

export interface INavigationState {
  isShown: boolean;
}

@Module({ dynamic: true, store, name: "navigation" })
class Navigation extends VuexModule implements INavigationState {
  public isShown = false;

  @Mutation
  public hide() {
    this.isShown = false;
  }

  @Mutation
  public show() {
    this.isShown = true;
  }

  @Mutation
  public toggle() {
    this.isShown = !this.isShown;
  }
}

export const NavigationModule = getModule(Navigation);
