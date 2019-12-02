<template>
  <v-select
    :items="items"
    label="Base Currency"
    v-model="selected"
    @change="setBaseCurrency"
  ></v-select>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SORTED_CURRENCIES, CURRENCY_NAME_MAP } from "@/consts";
import { CurrencyModule } from "@/store/modules/currency";
import { CurrencyType } from "@/types";

@Component({
  name: "BaseCurrencySelect",
  created() {
    this.$data.selected = CurrencyModule.baseCurrency;
  }
})
export default class BaseCurrencySelect extends Vue {
  private selected = "";
  private items = SORTED_CURRENCIES.map(c => ({
    text: `${c} (${CURRENCY_NAME_MAP[c]})`,
    value: c
  }));

  private setBaseCurrency(currency: CurrencyType) {
    CurrencyModule.setBaseCurrency(currency);
    CurrencyModule.fetch();
  }
}
</script>

<style lang="scss" scoped></style>
