<template>
  <img :src="`./assets/${currency}.svg`" :width="size" :height="size" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CurrencyType } from "@/types";

@Component
export default class CurrencyIcon extends Vue {
  @Prop(String) private currency!: CurrencyType;
  @Prop({ type: [Number, String], default: 40 }) private size?: number | string;
}
</script>

<style lang="scss" scoped></style>
