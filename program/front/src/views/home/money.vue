<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="change">
    <div>
      <el-card>
        <el-form :model="form" label-width="100px">
          <el-form-item label="银行卡ID">
            <el-input v-model="form.cardID"></el-input>
          </el-form-item>
          <el-form-item label="银行名称">
            <el-input v-model="form.bank"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addBankCard">添加银行卡</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card>
        <el-form :model="chargeForm" label-width="100px">
          <el-form-item label="充值金额">
            <el-input v-model="chargeForm.amount"></el-input>
          </el-form-item>
          <el-form-item label="选择银行卡">
            <el-select v-model="chargeForm.selectedCard">
              <el-option v-for="card in bankCards" :key="card.CardID" :label="card.CardID"
                :value="card.CardID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="chargeForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="chargeAccount">充值</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card>
        <el-form :model="withdrawForm" label-width="100px">
          <el-form-item label="提现金额">
            <el-input v-model="withdrawForm.amount"></el-input>
          </el-form-item>
          <el-form-item label="选择银行卡">
            <el-select v-model="withdrawForm.selectedCard">
              <el-option v-for="card in bankCards" :key="card.CardID" :label="card.CardID"
                :value="card.CardID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="withdrawForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="withdrawAccount">提现</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  computed: {
    ...mapState(['userid']),
  },
  data() {
    return {
      form: {
        cardID: '',
        bank: '',
        password: '',
      },
      chargeForm: {
        amount: '',
        selectedCard: '',
        password: '',
      },
      withdrawForm: {
        amount: '',
        selectedCard: '',
        password: '',
      },
      bankCards: [],
    };
  },
  methods: {
    addBankCard() {
      const url = `http://110.42.220.245:8081/CreditCard/${this.userid}`;
      const data = {
        CardID: this.form.cardID,
        Bank: this.form.bank,
        Password: this.form.password,
      };

      axios
        .post(url, data)
        .then(response => {
          console.log("get");
          console.log(response);
          if (response.data.success) {
            this.$message.success('添加银行卡成功');
            this.form.cardID = '';
            this.form.bank = '';
            this.form.password = '';
            this.fetchBankCards();
          } else {
            this.$message.error('添加银行卡失败');
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error('添加银行卡时出现错误');
        });
    },
    chargeAccount() {
      const url = `http://110.42.220.245:8081/Balance/Charge/${this.userid}?num=${this.chargeForm.amount}`;
      const data = {
        Password: this.chargeForm.password,
      };

      axios
        .post(url, data)
        .then(response => {
          console.log("charge");
          console.log(response);
          if (response.data.success) {
            this.$message.success('充值成功');
            // Clear form data
            this.chargeForm.amount = '';
            this.chargeForm.selectedCard = '';
            this.chargeForm.password = '';
          } else {
            this.$message.error('充值失败');
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error('充值时出现错误');
        });
    },
    withdrawAccount() {
      const url = `http://110.42.220.245:8081/Balance/Withdrawal/${this.userid}?num=${this.withdrawForm.amount}`;
      const data = {
        Password: this.withdrawForm.password,
      };

      axios
        .post(url, data)
        .then(response => {
          console.log("take");
          console.log(response);
          if (response.data.success) {
            this.$message.success('提现成功');
            // Clear form data
            this.withdrawForm.amount = '';
            this.withdrawForm.selectedCard = '';
            this.withdrawForm.password = '';
          } else {
            this.$message.error('提现失败');
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error('提现时出现错误');
        });
    },
    fetchBankCards() { 
      const url = `http://110.42.220.245:8081/CreditCard/${this.userid}`; 
      axios.get(url).then(response => { 
        console.log("know")
         console.log(response)
          if (response.data) { this.bankCards = response.data.cards; } 
          else { this.$message.error('获取银行卡列表失败'); } }).catch(error => { console.log(error); 
            this.$message.error('获取银行卡列表时出现错误'); }); },
  },
  created() {
    this.fetchBankCards();
  },
};  
</script>

<style>
.change {
  border: 1px solid #ccc;
  width: 1200px;
  /* 设置边框的宽度为 300 像素 */
  margin-top: 0%;
  font-size: 30px;
  color: black;
  position: absolute;
  top: 150px;
  left: 205px;
  padding: 40px;
}
</style>