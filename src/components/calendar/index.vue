<template>
<van-action-sheet v-model:show="show_a" :title="title" @closed="handleClosed">
  <div class="content">
    <van-dropdown-menu>
      <van-dropdown-item v-model="year" :options="yearOptions" @change="handleYearChange"/>
      <van-dropdown-item v-model="month" :options="monthOptions" @change="handleMonthChange"/>
    </van-dropdown-menu>
    <van-calendar v-if="show_calendar" :show-confirm="showConfirm" :title="title" :poppable="false" :style="{ height: '420px' }" @confirm="confirm" :min-date="minDate_c" :max-date="maxDate_c"/>
  </div>
</van-action-sheet>
</template>

<script>
/**
 * 使用：
 * import TsCalendar from '@components/calendar'
 * <ts-calendar v-model:show="show" title="选择日期" @confirm="confirm" :min-date="minDate" :max-date="maxDate"></ts-calendar>
 * 
 * 属性：
 *  show:    控制显示隐藏
 *  title:   标题
 *  minDate: 日期范围最小值  例：new Date(2018, 0, 1)
 *  maxDate: 日期范围最大值  例：new Date(2022, 11, 31)
 *  years:   自定义年份      例：options [{text: '', value: ''}]
 *  show-confirm： 是否展示确认按钮，默认 true
 * 
 * 方法：
 * confirm 日期选择完成后触发，若 show-confirm 为 true，则点击确认按钮后触发
 * 
 * 2022.4.25
*/
export default {
  props: {
    show: Boolean,
    title: {
      type: String,
      default: '选择日期'
    },
    minDate: {
      type: Object,
      default: () => {
        return new Date(2018, 0, 1);
      }
    },
    maxDate: {
      type: Object,
      default: () => {
        return new Date();
      }
    },
    years: {
      type: Array,
      default: () => {
        return [];
      }
    },
    showConfirm: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    show(value) {
      this.show_a = value
    }
  },
  data() {
    return {
      show_a: false,
      year: 2022,
      yearOptions: [],
      month: 0,
      monthOptions: [],
      minDate_c: '',
      maxDate_c: '',
      show_calendar: true
    }
  },
  created() {
    console.log(this.showConfirm);
    this.initData();

    const date = new Date();
    this.initMonth(date);
    this.initYear(date);
  },
  methods: {
    initData() {
      this.show_a = this.show;
      this.maxDate_c = this.maxDate;
      this.minDate_c = this.minDate;
    },
    initYear(date) {
      let year = date.getFullYear();
      this.year = year;
      if (this.years.length) { // 自定义年份 options
        this.yearOptions = this.years;
        return;
      }
      for (let i = 0; i < 4; i++) {
        this.yearOptions.push({
          text: `${year-i}年`,
          value: year - i
        })
      }
    },
    initMonth(date) {
      this.month = date.getMonth()
      for (let i = 0; i < 12; i++) {
        this.monthOptions.push({
          text: `${i+1}月`, 
          value: i
        })
      }
    },
    handleClosed() {
      this.$emit('update:show', this.show_a);
    },
    confirm(value) {
      this.show_a = false;
      this.$emit('update:show', false);
      this.$emit('confirm', value)
    },
    handleYearChange() {
      this.show_calendar = false;
      let D = new Date();
      let year = this.year;
      let month = this.month;
      let thisYear = D.getFullYear();
      
      if (year !== thisYear) { // 判断选择年份是否是本年
        this.month = 11;
        this.minDate_c = new Date(year, 0, 1);
        this.maxDate_c = new Date(year, this.month, 31);
      } else {
        month = D.getMonth()
        this.month = month;
        this.minDate_c = new Date(year, 0, 1);
        this.maxDate_c = new Date(year, month, this.getMonthDays(year, month));
      }
      this.showCalendar();
    },
    handleMonthChange() {
      this.show_calendar = false;
      let year = this.year;
      let month = this.month;
      let days = this.getMonthDays(year, month)
      this.minDate_c = new Date(year, month, 1);
      this.maxDate_c = new Date(year, month, days);
      this.showCalendar();
    },
    getMonthDays(year, month) {
      let days = new Date(year, month + 1, 0).getDate();
      return days;
    },
    showCalendar() { // 刷新 calendar dom
      this.$nextTick(()=>{
        this.show_calendar = true;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-dropdown-menu {
  ::v-deep .van-dropdown-menu__item {
    // justify-content: left;
  }
}
.van-calendar {
  ::v-deep .van-calendar__header-title {
    display: none;
  }
}
</style>