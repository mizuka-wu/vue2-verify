<template></template>

<script lang="ts">
/**
 * 根据字符串校验
 */
import { CODE_CHARS, CODE_COLOR, CODE_COLOR2 } from "@/lib/config";
import VERIFY_TYPE from "@/enum/type";
import { Component, Prop, Vue, Model } from "vue-property-decorator";

const selectHandler = function() {
  return false;
};

@Component
export default class Code extends Vue {
  value: string = "";
  code: string = ""; // 显示的code

  mounted() {
    this.$el.addEventListener("selectstart", selectHandler);
  }
  beforeDestroy() {
    this.$el.removeEventListener("selectstart", selectHandler);
  }
}
</script>

<style>
</style>