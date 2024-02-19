<template>
  <div>
    <!-- 最上方的步骤记录条 -->

    <el-header style="margin-top: 20px;">
      <el-steps :active="3" align-center>
        <el-step title="Step 1" description="Some description" />
        <el-step title="Step 2" description="Some description" />
        <el-step title="Step 3" description="Some description" />
        <el-step title="Step 4" description="Some description" />
      </el-steps>
    </el-header>


    <div class="spacer"></div>
    <div class="spacer"></div>

    <el-row>
      <el-col :span="8">
        <el-countdown title="自动关闭界面剩余时间" :value="value" style="font-size: 20px;" />
      </el-col>
      <el-col :span="8">
        <el-countdown title="支付剩余时间" format="HH:mm:ss" :value="value1" />
      </el-col>
    </el-row>
  </div>

  <div class="total-amount">
    <span class="amount-label">预估回收价：</span>
    <span class="amount-value">{{ this.form.ExpectedPrice }}元</span>
    <el-button type="primary" @click="goback">返回</el-button>
    <el-button type="primary" @click="submitForm">提交</el-button>
  </div>
</template>

<script>
import { ref } from 'vue';
import {  ElSteps, ElCountdown } from 'element-plus';
import { deleteRecycleOrder } from "@/api/recycleprice_info.js";
import { mapState } from 'vuex';
import dayjs from 'dayjs';
import axios from 'axios';

export default {
  name: 'PricePage',
  components: {
    ElSteps,
    ElCountdown,
  },
  computed: {
    ...mapState(['userid']),
  },
  data() {
    return {
      multipleTableRef: ref(null),
      tableData: ref([]),
      value: Date.now() + 1000 * 60 * 60 * 7,
      value1: Date.now() + 1000 * 60 * 60 * 24 * 2,
      value2: dayjs().add(1, 'month').startOf('month'),
      id: null,
      orderId: null,
      price: null,
      imageUrl: require('/public/p.jpg'),
    };
  },
  async created() {
    try {
      const passedData = this.$route.query.data;
      console.log("接受的数据", passedData);

      if (passedData) {
        const parsedData = JSON.parse(passedData);
        this.form = parsedData.form;
        this.uploadedImages = parsedData.uploadedImages;
        this.productId = parsedData.productId;
        this.orderId = parsedData.orderId;  
        this.price = parsedData.form.ExpectedPrice
        // 现在orderId已经被赋值，你可以安全地访问它。
        console.log("order", this.orderId);
        console.log("form", this.form);

        // 添加传递的信息到表格数据中
        this.id = this.userid;
        console.log(this.id);
        this.tableData.push({
          form: parsedData.form,
          '服务类型（维修/回收）': '回收',
          设备品牌: parsedData.form.deviceName,
          设备型号: parsedData.form.Device_Type,
          回收地点: parsedData.form.Recycle_Location,
          下单时间: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          预期价格: parsedData.form.ExpectedPrice,
        });
      }
    } catch (error) {
      console.error('在created钩子中发生错误：', error);
    }
  },
  methods: {
    async submitForm() {
      try {
        // 构造要传递给 PayPage 的数据
        const dataToPass = {
          productId: this.productId,
        };
        console.log("传递的数据", dataToPass);

        // 使用 query 参数传递数据，而不是 params
        this.$router.push({
          name: 'paypage',
          query: {
            data: JSON.stringify(dataToPass),
            productId: this.productId,
          },
        });
      } catch (error) {
        console.error('Error navigating to PricePage:', error);
      }
      try {
        const uid = this.id; 
        const num = this.price; 
        console.log('收入',num);
        const response = await axios.post(`http://110.42.220.245:8081/Balance/Income/${uid}?num=${num}`);
        
        if (response.data.success) {
          console.log('收入successful');
        } else {
          console.error('收入failed');
        }
      } catch (error) {
        console.error('Error during recharge:', error);
      }
      
    },

    async goback() {
      try {
        await this.deleteOrder(this.id, this.orderId);

        const dataToPass = {
          productId: this.productId,
        };
        console.log("传递的数据", dataToPass);

        // 使用query参数传递数据，而不是params
        this.$router.push({
          name: 'RecoveryPage',
          query: {
            data: JSON.stringify(dataToPass),
          },
        });

      } catch (error) {
        console.error('Error navigating to repairpage:', error);
      }
    },

    async deleteOrder(uid, id) {
      try {
        console.log("用户", uid)
        console.log("订单", id)
        const response = await deleteRecycleOrder(uid, id);
        if (response.success) {
          // 订单删除成功，执行你的成功处理逻辑
          console.log('订单删除成功',response);
        } else {
          // 订单删除失败，执行你的失败处理逻辑
          console.error('订单删除失败',response);
        }
      } catch (error) {
        // 处理请求错误
        console.error('Error deleting order:', error);
      }
    },
  },
};
</script>

<style scoped>
.spacer {
  height: 100px; /* 调整为所需的空白高度 */
}
.center-steps {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.el-col {
  text-align: center;
}

.h1 {
  margin-top: 20px;
}

.el-table__header-wrapper {
  margin-bottom: 10px;
}

.el-table__footer-wrapper {
  margin-top: 10px;
}

.total-amount {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 0px;
  margin-right: 20px;
  }
  .amount-label {
    margin-right: 20px;
    font-size: larger;
  }

  .amount-value {
    font-weight: bold;
    margin-right: 10px;
  }

  .countdown-footer {
    margin-top: 8px;
  }
</style>
