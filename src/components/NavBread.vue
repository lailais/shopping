<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <router-link to="/" >Home</router-link>
        <slot name="a"></slot>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  components: {
  }
}
</script>
