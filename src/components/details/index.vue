<template>
  <div id="details-page" class="details-page" @click="handleCloseDetailsPage">
    <div @click.stop="" class="details-content">
      <div class="topbar">
        <div class="back" @click="handleCloseDetailsPage"><van-icon name="arrow-left" /></div>
        <div class="title">{{title}}</div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { removeTouch } from '@utils/touchs'
export default {
  name: 'details-page',
  props: {
    title: {
      type: String,
      default: "",
    },
    
  },
  mounted() {
    removeTouch(document.getElementById('details-page'));
  },
  methods: {
    ...mapActions({
      closeDetails: 'details/close_details'
    }),
    handleCloseDetailsPage() {
      history.pushState(null, null, `/#${this.$route.fullPath}`);
      this.closeDetails();
    }
  }
}
</script>
