<template>
  <div class="storage-group">
    <div class="group-header">
      <h3 class="group-title">{{ title }}</h3>
    </div>
    <div class="btn-group">
      <el-button
        v-for="(option, index) in options"
        :key="index"
        :type="selectedOption === option ? 'primary' : 'default'"
        @click="selectOption(option)"
      >{{ option }}</el-button>
    </div>
  </div>
</template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        selectedOption: null
      };
    },
    methods: {
      selectOption(option) {
        this.selectedOption = option;
        this.$emit('option-selected', option);
      }
    }
  };
  </script>
  
  <style scoped>
  .storage-group {
    margin-bottom: 20px;
  }
  
  .group-header {
  display: flex;
  align-items: center;
}
  .group-title {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  
  .btn-group {
    display: flex;
    margin-top: 10px;
  }
  </style>
  