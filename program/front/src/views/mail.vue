<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <search></search>
  <div>
    <el-table :data="messages">
      <el-table-column prop="News_Title" label="标题"></el-table-column>
      <el-table-column prop="News_Date" label="日期"></el-table-column>
      <el-table-column prop="News_Content" label="内容"></el-table-column>
    </el-table>
    <el-dialog v-model:visible="dialogVisible">
      <h3>{{ currentMessage.News_Title }}</h3>
      <p>{{ currentMessage.News_Content }}</p>
    </el-dialog>
  </div>
</template>

<script>
import header from '../components/header.vue';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      messages: [],
      dialogVisible: false,
      currentMessage: {},
    };
  },
  components: {
    "search": header,
  },
  computed: {
    ...mapState(['userid']),
  },
  methods: {
    getAllMessages() {
      const uid = this.userid; // 在这里使用 this.userid
      const url = `http://110.42.220.245:8081/NewsSystem/${uid}`;

      axios.get(url)
        .then(response => {
          console.log(response)
          this.messages = response.data.News;
        })
        .catch(error => {
          console.error(error);
        });
    },
  
  },
  mounted() {
  this. getAllMessages();
},
};
</script>