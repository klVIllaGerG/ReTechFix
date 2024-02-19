<template>
  <div>
    <Headerr></Headerr>
    <MainSider></MainSider>

  </div>
</template>
  
<script>
import MainSider from './MainSider.vue';
import header from '../../../components/header.vue';

export default {
  components: {
    MainSider,
    "Headerr":header
  }
};
</script>