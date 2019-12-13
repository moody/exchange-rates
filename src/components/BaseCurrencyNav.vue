<template>
  <v-navigation-drawer v-model="isShown" app disable-resize-watcher>
    <v-list-item>
      <v-list-item-title class="title">Base Currency</v-list-item-title>
    </v-list-item>

    <v-list-item disabled>
      <v-list-item-action>
        <currency-icon :currency="baseCurrency" size="26" />
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>{{
          getCurrencyName(baseCurrency)
        }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list dense>
      <v-list-item
        v-for="currency in currenciesToDisplay"
        :key="currency"
        :disabled="isFetching"
        @click.stop="onItemClicked(currency)"
      >
        <v-list-item-action>
          <currency-icon :currency="currency" size="26" />
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{ getCurrencyName(currency) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CURRENCY_NAME_MAP } from "@/consts";
import { CurrencyType } from "@/types";
import { CurrencyModule } from "@/store/modules/currency";
import { NavigationModule } from "@/store/modules/navigation";
import CurrencyIcon from "@/components/CurrencyIcon.vue";

@Component({
  name: "BaseCurrencyNav",
  components: { CurrencyIcon }
})
export default class BaseCurrencyNav extends Vue {
  public getCurrencyName(currency: CurrencyType) {
    return CURRENCY_NAME_MAP[currency];
  }

  public onItemClicked(currency: CurrencyType) {
    NavigationModule.hide();
    CurrencyModule.setBaseCurrency(currency);
    CurrencyModule.fetch();

    // Scroll to top
    const content = this.$el.firstElementChild;
    if (content) {
      content.scrollTop = 0;
    }
  }

  public get baseCurrency() {
    return CurrencyModule.baseCurrency;
  }

  public get currenciesToDisplay() {
    return CurrencyModule.currenciesToDisplay;
  }

  public get isFetching() {
    return CurrencyModule.isFetching;
  }

  public get isShown() {
    return NavigationModule.isShown;
  }

  public set isShown(b: boolean) {
    if (b) {
      NavigationModule.show();
    } else {
      NavigationModule.hide();
    }
  }
}
</script>

<style lang="scss" scoped></style>
