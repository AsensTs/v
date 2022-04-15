<template>
  <tr>
    <th colspan="1" rowspan="1" class="th table-cell is-leaf" v-for="(label, index) in data" :key="label + index">
      <div class="cell">{{label}}</div>
    </th>
  </tr>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
}
</script>

<style lang="scss" scoped>
th {
  color: #909399;
  font-size: 14px;
  background: #f9fbff;
}
th.is-leaf {
  border-bottom: 1px solid #ebeef5;
}
th.table-cell {
  padding: 12px 0;
  .cell {
    padding: 0 10px;
  }
}
</style>