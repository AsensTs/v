<template>
  <div class="table-title" :style="{textAlign: titleAlign?titleAlign:'center'}">{{title}}</div>
  <table :border="border?1:0" width="100%">
    <colgroup>
      <col v-for="(w, index) in widths" :name="'el-table_1_column_'+index" :key="'el-table_1_column_'+index" :width="w">
    </colgroup>
    <ts-table-header :data="labels"></ts-table-header>
    <tr v-for="(item, index) in tableData" :key="'table-tr'+index">
      <ts-table-td :data ="item">
        <slot :row="item" attrs></slot>
      </ts-table-td>
    </tr>
  </table>
</template>

<script>
import tsTableHeader from './ts-table-header'
import tsTableTd from './ts-table-td.vue'
export default {
  name: 'tsTable',
  components: {
    tsTableHeader,
    tsTableTd
  },
  props: {
    modelValue: {
      type: Array,
      default: () => {
        return []
      }
    },
    title: String,
    border: {
      type: Boolean,
      default: false
    },
    titleAlign: String
  },
  data() {
    return {
      tableData: [],
      slotsData: null,
      keys: null,
      labels: null,
      widths: null,
    }
  },
  created() {
    this.tableData = this.modelValue;
    let keys = [];
    let labels = [];
    let widths = [];
    this.$slots.default().forEach(item => {
      keys.push(item.props.prop);
      labels.push(item.props.label);
      widths.push(item.props.width?this.formatWidth(item.props.width):'')
    })
    this.keys = keys;
    this.labels = labels;
    this.widths = widths;
  },
  methods: {
    formatWidth(w) {
      return parseInt(w);
    }
  }
}
</script>

<style lang="scss" scoped>
.table-title {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 20px;
}
</style>