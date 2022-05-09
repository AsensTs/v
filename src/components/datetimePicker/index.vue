<template>
<van-action-sheet v-model:show="sheetShow" :title="title" @closed="handleClosed">
  <div class="content">
    <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" @confirm="confirm" :min-date="minDate" :max-date="maxDate"/>
  </div>
</van-action-sheet>
</template>

<script>
export default {
  props: {
    show: Boolean,
    title: String,
    minDate: {
      type: Object,
      default: () => {
        return new Date(2018, 0, 1);
      }
    },
    maxDate: {
      type: Object,
      default: () => {
        return new Date(2025, 10, 1);
      }
    }
  },
  watch: {
    show(value) {
      this.sheetShow = value
    }
  },
  data() {
    return {
      currentDate: new Date(),
      sheetShow: false
    }
  },
  created() {
    this.sheetShow = this.show;
  },
  methods: {
    handleClosed() {
      this.$emit('update:show', this.sheetShow);
    },
    confirm() {
      this.sheetShow = false;
      this.$emit('update:show', false);
      this.$emit('confirm', this.currentDate)
    }
  }
}
</script>

<style>

</style>