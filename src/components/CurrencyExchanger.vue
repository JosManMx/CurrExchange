<template>
  <div class="currexchange-container">
    <h1 class="currexchange-title">{{title}}</h1>
    <p class="currexchange-subtitle">A very simple currency exchange calculator</p>
    <label class="label">
      From
      <currency-rates-lists
        @changeRates="changeRates"
        :list="baseList()"
        :initialValue="base"
        name="base"
      ></currency-rates-lists>
    </label>
    <label class="label">
      To
      <currency-rates-lists
        @changeRates="changeRates"
        :list="targetList()"
        :initialValue="target"
        name="target"
      ></currency-rates-lists>
    </label>
    <label class="label">
      Qty
      <input
        class="input"
        type="number"
        min="1"
        @change="convertRates"
        @keyup="convertRates"
        v-model="baseAmount"
      >
    </label>

    <div v-if="baseAmount" class="currexchange-result">
      {{baseAmount}} {{base.name}} = {{targetAmount}}
      {{target.name}}
    </div>
  </div>
</template>


<script>
import { getRates, getExchangeRates } from "../vendors/exchangeratesapi.js";
import CurrencyRatesLists from "./CurrencyRatesLists";

export default {
  name: "currency-exchanger",
  components: {
    CurrencyRatesLists
  },
  data() {
    return {
      // initial values
      title: "CurrExchange",
      currencyList: [],
      base: "",
      target: "",
      baseAmount: 1,
      targetAmount: 1
    };
  },
  created() {
    // When component is created gets the rates of USD as base currency
    getRates("USD").then(res => {
      this.currencyList = res;
      this.base = res[0];
      this.target = res[1];
    });
  },

  methods: {
    changeRates(val, name) {
      this[name] = val;
      this.convertRates();
    },
    convertRates() {
      if (!this.baseAmount) {
        return;
      }
      getExchangeRates(this.base.name, this.target.name).then(res => {
        this.targetAmount = res * parseInt(this.baseAmount, 10);
      });
    },
    baseList() {
      return this.currencyList.filter(
        currency => currency.name != this.target.name
      );
    },
    targetList() {
      return this.currencyList.filter(
        currency => currency.name != this.base.name
      );
    }
  }
};
</script>


<style lang="scss">
.currexchange {
  &-container {
    max-width: 320px;
    transform: translateY(-10vh);
    margin: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: #fff;
    border-radius: 7px;
    box-shadow: 0 0 3px black;
  }
  &-title {
    margin-top: 0;
    margin-bottom: 0;
  }
  &-subtitle {
    margin-top: 0;
    margin-bottom: 2rem;
  }
  &-result {
    font-weight: bold;
    font-size: 1.5rem;
  }
}
.label {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}
.input {
  height: 34px;
  margin-left: 1rem;
  border-width: 0 0 1px 0;
  text-align: center;
  font-weight: bold;
  &:focus {
    outline: none;
    border-bottom: 1px solid var(--primary-color);
  }
}
</style>
