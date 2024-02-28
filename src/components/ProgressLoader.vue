<template>
  <div>
    <br />
    <v-progress-linear 
      v-if="exibirProgresso"
      indeterminate 
      color="red"
    ></v-progress-linear>
    <br />
  </div>
</template>

<script>
export default {
  props: {
    exibirProgresso: {
      type: Boolean,
      default: false
    }
  }
};
</script>