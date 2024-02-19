<template>
  <el-container>
    <!-- 搜索栏 -->
    <el-header>
      <seach @search="handleSearch"></seach>
    </el-header>

    <!-- 展示搜索结果 -->
    <el-main>
      <div v-if="isLoading">正在加载...</div>
      <div v-else>
        <el-row v-if="devices.length === 0">
          <el-col :span="24">
            <div class="no-results">没有找到匹配的设备。</div>
          </el-col>
        </el-row>
        <el-row v-else class="recommend-products">
          <el-col :span="8" v-for="(device, index) in devices" :key="index">
            <el-col :span="23">
              <el-card shadow="hover" @click="goToDetailsPage(device.device.Device_Type_ID.Type_Name)">
                <div class="product-card">
                  <img :src="device.device.Device_Type_ID.Structure_Url[0]" alt="product image">
                  <div class="product-info">
                    <div class="product-name">{{ device.device.Device_Type_ID.Type_Name }}</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { searchDevices } from '../api/search';
import header from '../components/header.vue';

export default {
  name: 'SearchPage',
  data() {
    return {
      products: '',
      devices: [],
      isLoading: true,
    };
  },
  components: {
    seach: header,
  },
  methods: {
    handleSearch(value) {
      this.products = value;
      console.log("Received search value from child component:", value);
      this.fetchDevices();
    },
    goToDetailsPage(productId) {
      this.$router.push({ name: 'DetailsPage', params: { productId: productId } });
    },
    fetchDevices() {
      this.isLoading = true;
      searchDevices(this.products)
        .then(response => {
          this.devices = response.data.devices;
          console.log(response);
          console.log(this.devices);
          console.log("success");
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  created() {
    this.products = this.$route.query.input;
    console.log(this.products);
    console.log("get message from header");
    this.fetchDevices();
  },
};
</script>

<style scoped>
.card-content {
  padding: 20px;
}

.no-results {
  text-align: center;
  margin-top: 20px;
  color: #999;
}

.recommend-products {
  margin-top: 20px;
}

.product-card {
  position: relative;
  cursor: pointer;
}

.product-card img {
  width: 100%;
  height: auto;
}

.product-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 14px;
  text-align: center;
}

.product-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>