<template>
    <el-dropdown>
      <el-button type="primary">
        {{ selectedOption }} <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(option, index) in options" :key="index" @click="selectOption(option)">
            {{ option }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </template>
  
  <script>
  export default {
    props: {
      options: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        selectedOption: '请选择'
      };
    },
    methods: {
      selectOption(option) {
        this.selectedOption = option;
      }
    }
  };
  </script>
  