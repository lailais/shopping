<template>
  <footer class="footer">
    <div class="footer__region">
      <span>Region</span>
      <select class="footer__region__select">
        <option value="en-US">USA</option>
        <option value="zh-CN">China</option>
        <option value="in">India</option>
      </select>
    </div>
    <div class="footer__secondary__nav">
      <span>Copyright © 2017 IMooc All Rights Reserved.</span>
    </div>
  </footer>
</template>
<script>
  export default {
    data() {
      return {}
    },
    components: {}
  }
</script>
<style scoped>
  .footer {
    height: 100%;
    border-top: 1px solid #f0f0f0;
  }
</style>
