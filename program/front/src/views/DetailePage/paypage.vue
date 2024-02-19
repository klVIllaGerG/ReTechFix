<template>
  <div class="pay-page">
    <img :src="require('@/assets/logo.png')" alt="Image" class="centered-image">
    <el-row class="mb-4">
      <el-button size="large" class="back-button" @click="goback">一键返回</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'PayPage',
  methods: {
    goback() {
      console.log("点击了");
      this.$router.push({ name: 'mainpage' });
    }
  }
};
</script>


<style scoped>

.pay-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.centered-image {
  max-width: 100%;
  max-height: 60vh;
}

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  height: 50px;
  width: 200px;
}
</style>
