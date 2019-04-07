<template>
  <select class="select" :name="name" v-model="value">
    <option :value="currency" v-for="(currency, key) in list" :key="key">{{currency.name}}</option>
  </select>
</template>

<script>
export default {
  name: "currency-rates-lists",
  data() {
    return {
      value: {}
    };
  },
  // https://vuejs.org/v2/guide/computed.html#Watchers
  watch: {
    initialValue(val, oldVal) {
      this.value = val;
    },
    value(val, oldVal) {
      this.changeRates(val);
    }
  },
  methods: {
    changeRates(val) {
      this.$emit("changeRates", val, this.name);
    }
  },
  props: ["list", "initialValue", "name"]
};
</script>

<style lang="scss">
.select {
  height: 34px;
  flex-grow: 1;
  background: none;
  border-width: 0 0 1px 0;
  border-bottom-color: 1px solid #000;
  margin-left: 1rem;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
    border-bottom-color: var(--primary-color);
  }
}
</style>
