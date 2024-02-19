<template>
    <div class="change">
      <div class="contact-page">
        <div class="chat-container">
          <div class="chat-history">
            <div v-for="message in messages" :key="message.ID" class="message" :class="{'user-message': message.type === 'user', 'service-message': message.type === 'service'}">
              <div class="avatar-wrapper" v-if="message.type === 'user'">
                <el-avatar class="avatar user-avatar" :src="userAvatar"></el-avatar>
              </div>
              <div class="avatar-wrapper" v-else>
                <el-avatar class="avatar service-avatar" :src="serviceAvatar"></el-avatar>
              </div>
              <div class="message-content">{{ message.content }}</div>
            </div>
          </div>
          <div class="chat-input">
            <el-select v-model="selectedQuestion" placeholder="请选择问题">
              <el-option v-for="question in questions" :key="question.ID" :label="question.Question" :value="question.ID"></el-option>
            </el-select>
            <el-button class="send-button" type="primary" :style="{backgroundColor: '#00BFFF'}" @click="sendMessage">发送</el-button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ElAvatar, ElSelect, ElOption, ElButton } from 'element-plus';
  import axios from 'axios';
  
  export default {
    name: 'ContactPage',
    components: {
      ElAvatar,
      ElSelect,
      ElOption,
      ElButton,
    },
    data() {
      return {
        selectedQuestion: '',
        questions: [],
        messages: [],
        userAvatar: require('@/assets/logo.png'), // 替换为实际的用户头像路径
        serviceAvatar: require('@/assets/project2.png'), // 替换为实际的客服头像路径
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        axios
          .get('http://110.42.220.245:8081/CustomerService')
          .then((response) => {
            const customerService = response.data.customer_service;
            this.questions = customerService.map((item) => ({
              ID: item.ID,
              Question: item.Question,
              Answer: item.Answer,
            }));
          })
          .catch((error) => {
            console.error(error);
          });
      },
      sendMessage() {
        const question = this.questions.find((q) => q.ID === this.selectedQuestion);
        if (question) {
          this.messages.push({ type: 'user', content: question.Question });
          this.messages.push({ type: 'service', content: question.Answer });
        }
        this.selectedQuestion = '';
      },
    },
  };
  </script>
  
  <style>
  .contact-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .change {
    border: 1px solid #ccc;
    width: 1200px;
    margin-top: 0%;
    font-size: 30px;
    color: black;
    position: absolute;
    top: 150px;
    left: 205px;
    padding: 40px;
  }
  
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 500px;
     width: 1000px;
    border: 1px solid #ccc;
    overflow-y: auto;
    padding: 10px;
    margin-left: -100px; /* 修改此行，控制向左移动的距离 */
  }
  
  .chat-history {
    flex: 1;
  }
  
  .message {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 10px;
  }
  
  .avatar-wrapper {
    margin-right: 10px;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  
  .user-message {
    background-color: #e2f0cb;
  }
  
  .service-message {
    background-color: #d1d1d1;
  }
  
  .message-content {
    flex: 1;
  }
  
  .chat-input {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  
  .send-button {
    margin-left: 10px;
  }
  </style>