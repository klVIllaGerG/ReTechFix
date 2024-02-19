<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mainpage">
    <el-container>
      <el-header>
        <seach></seach>
      </el-header>
      <el-main>
        <el-carousel :interval="4000" type="card" height="300px" >
          <el-carousel-item v-for="(image, index) in images" :key="index">
            <img :src="image.Structure_Url[1]" alt="轮播图片" @click="goToDetailsPage(image.Type_Name)">
          </el-carousel-item>
        </el-carousel>
        <!--日活统计-->
        <el-row :gutter="16">
          <el-col :span="8">
            <div class="statistic-card">
              <el-statistic :value="webCounter.totalUser">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Website Users
                    <el-tooltip effect="dark" content="Number of users on the website" placement="top">
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>than yesterday</span>
                  <span class="green">
                    {{ webCounter.userIncreaseRate }}%
                    <el-icon>
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="statistic-card">
              <el-statistic :value="webCounter.transactionAmount">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Transaction Amount
                    <el-tooltip effect="dark" content="Total transaction amount on the website" placement="top">
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>month on month</span>
                  <span class="red">
                    {{ webCounter.transactionIncreaseRate }}%
                    <el-icon>
                      <CaretBottom />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="statistic-card">
              <el-statistic :value="webCounter.requestTimes" title="Website Visits Today">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Website Visits Totle
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>than yesterday</span>
                  <span class="green">
                    {{ webCounter.visitIncreaseRate }}%
                    <el-icon>
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
                <div class="footer-item">
                  <el-icon :size="14">
                    <ArrowRight />
                  </el-icon>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <!--产品类型展示-->
        <el-row class="recommend-products">
          <el-col :span="8" v-for="(product, index) in paginatedProducts" :key="index">
            <el-col :span="23">
              <el-card shadow="hover" @click="goToDetailsPage(product.Type_Name)">
                <div class="product-card">
                  <img :src="product.Structure_Url[0]" alt="product image">
                  <div class="product-info">
                    <div class="product-name">{{ product.Type_Name }}</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-col>
        </el-row>

        <el-footer>
          <el-col :span="5" :offset="9">
            <!-- 使用分页组件 -->
            <el-pagination background layout="prev, pager, next" :total="totalPages * 10" v-model="currentPage"
              @current-change="handlePageChange" />
          </el-col>
        </el-footer>
      </el-main>
    </el-container>
  </div>
</template>


<script>
import axios from 'axios';
import { ref } from 'vue';
import header from '../components/header.vue';
import { pictureget } from '@/api/picture';

export default {
  data() {
    return {
      images: [],
      activeIndex: ref('1'),
      products: [],
      currentPage: 1,
      totalPages: 0, // 添加一个 totalPages 属性
      webCounter: {
        requestTimes: 0,
        transactionAmount: 0,
        totalUser: 0,
        userIncreaseRate: 0,
        transactionIncreaseRate: 0,
        visitIncreaseRate: 0,
      },
    };
  },
  components: {
    "seach": header,
  },
  computed: {
    paginatedProducts() {
      const itemsPerPage = 6;
      const startIndex = (this.currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return this.products.slice(startIndex, endIndex);
    },
  },
  methods: {
    fetchWebCounter() {
      const url = 'http://110.42.220.245:8081/WebCounter';

      axios
        .get(url)
        .then(response => {
          this.webCounter = response.data;
        })
        .catch(error => {
          console.log(error);
          this.$message.error('Failed to fetch web counter data');
        });
    },
  handlePageChange(currentPage) {
    this.currentPage = currentPage;
  },
  goToDetailsPage(productId) {
    this.$router.push({ name: 'DetailsPage', params: { productId: productId } });
  },
  calculateTotalPages() {
    const itemsPerPage = 6;
    this.totalPages = Math.ceil(this.products.length / itemsPerPage);
  },
},
mounted() {
  this.fetchWebCounter();
  pictureget().then((res) => {
    if (res.data === false) {
      this.$message.error("获得失败");
    } else {
      this.$message.success("获得成功");
      console.log("获得成功");
      console.log(res.data);
      this.products = res.data.DeviceType;
      this.images = res.data.DeviceType;
      console.log("products");
      console.log(this.products);
      this.calculateTotalPages(); // 在数据加载完成后计算总页数
    }
  });
},
};
</script>

<style scoped>
.wrapper {
  /*渐变的背景色*/
  /*height: 100vh;
  background-image: linear-gradient(to bottom right, #FC466B, #3F5EF8);
  overflow: hidden;*/
  /*背景图*/
  background: url("../assets/background.jpg");
  width: 100%;
  height: 100%;
}

.search {
  margin-bottom: 0px;
}

.flex-grow {
  flex-grow: 1;
}

:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}

.red {
  color: var(--el-color-error);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
  margin-left: 100px;
}

.logo {
  width: 100%;
  max-width: 100px;
}

.search-input {
  margin-right: 20px;
  width: 100%;
  max-width: 500px;
}

.search-btn {
  margin-left: 20px;
  width: 100%;
  max-width: 100px;
}

.recommend-products {
  margin-bottom: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-card img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-price {
  font-size: 14px;
  color: #f00;
}

.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #ddd;
}

.nav-bar el-col {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  font-weight: bold;
}

.nav-bar a {
  color: #333;
  text-decoration: none;
}
</style>