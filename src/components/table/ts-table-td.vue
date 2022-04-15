<template>
  <slot></slot>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  provide() {
    return {
      rowData: this.data
    }
  },
}
</script>