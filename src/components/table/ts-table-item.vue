<template>
  <td colspan="1" rowspan="1" class="td table-cell is-leaf" >
    <div class="cell">
      <slot v-if="isSlot()" :row="rowData"></slot>
      <span v-else >{{rowData[prop]}}</span>
    </div>
  </td>
</template>

<script>
export default {
  name: "tableItem",
  props: {
    label: String,
    prop: String,
    width: {
      type: [String, Number]
    }
  },
  inject: ['rowData'],
  created() {
    this.isSlot;
  },
  methods: {
    isSlot() {
      if (this.$slots && this.$slots.default) {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
td {
  font-size: 12px;
  color: #606266;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
td.table-cell {
  padding: 12px 0;
  .cell {
    padding: 0 10px;
  }
}
td.is-leaf {
  border-bottom: 1px solid #ebeef5;
}
</style>