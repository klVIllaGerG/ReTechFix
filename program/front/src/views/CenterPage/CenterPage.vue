<template>
  <div>
    <search />
    <div>
      <div class="container">
        <el-scrollbar class="scrollbar" :height="containerHeight">
          <div class="scrollbar-container">
            <el-card v-for="center in data" :key="center.id" class="card-item"     >
              <div class="card-content">
                <div class="card-left">


                  <!-- <img
                    :src="center.TIMG_URL"
                    :class="{ 'card-image': true, 'dimmed-image': center.hovered }"
                    @mouseenter="handleImageHover(center)"
                    @mouseleave="handleImageHover(center)"
                    @click="navigateToExamplePage(center.ID)"
                  /> -->

                  <img
                    :src="center.TIMG_URL"
                    :class="{ 'card-image': true, 'dimmed-image': center.hovered }"
                    @mouseenter="center.hovered = true"
                    @mouseleave="center.hovered = false"
                    @click="navigateToExamplePage(center.ID)"
                  />


                  <!-- <img
                    :src="center.TIMG_URL"
                    class="card-image"
                    @mouseover="hoverImage(center.id, true)"
                    @mouseleave="hoverImage(center.id, false)"
                  /> -->
                  <el-button class="card-button" type="primary" @click="navigateToExamplePage(center.ID)">详情</el-button>
                </div>
                <div class="card-right">
                  <el-descriptions title="Centers Details" :column="1" border>
                    <el-descriptions-item label="ID" label-align="right" align="center">{{ center.ID }}</el-descriptions-item>
                    <el-descriptions-item label="Name" label-align="right" align="center">{{ center.Name }}</el-descriptions-item>
                    <el-descriptions-item label="Location Detail" label-align="right" align="center">{{ center.Loc_Detail }}</el-descriptions-item>
                    <el-descriptions-item label="Telephone" label-align="right" align="center">{{ center.Tel }}</el-descriptions-item>            
                  </el-descriptions>
                  <!-- <p>{{ data }}</p> -->
                </div>
              </div>
            </el-card>
          </div>
        </el-scrollbar>
        <div class="map-container">
          <!-- <BaiduMap :locations="mapLocations" /> -->
          <!-- <p>{{ mapLocations }}</p> -->
          <BaiduMap v-if="dataLoaded" :locations="mapLocations" />
          
        </div>

      </div>
    </div>
    <div class="back-button-container">
      <el-button class="back-button" type="primary" @click="CenterPageGoBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import Header from '/src/components/header.vue';
import BaiduMap from '/src/components/BaiduMap.vue';
import { getAllServiceCenters } from '@/api/centerpicture'; // Import the API function to fetch service center data

export default {
  computed: {
    containerHeight() {
      return `${window.innerHeight - 100}px`;
    },


    mapLocations() {
      return this.data.map((center) => ({
        name: center.Loc_Detail,
        lng: center.Longitude,
        lat: center.Latitude,
      }));
    },

  },
  components: {
    search: Header,
    BaiduMap,
  },
  data() {
    return {
      data: [], // Store the fetched service center data
      dataLoaded: false, // Flag to track if data has been loaded
    };
  },
  mounted() {
    this.fetchServiceCenterData(); // Fetch service center data from the server

    this.productId = this.$route.params.productId;
    console.log("接收的 productId:", this.productId);
    this.fetchServiceCenterData(); // 获取数据的方法，你可能需要调整
  },
  methods: {

    // handleImageHover(center) {
    //   center.hovered = !center.hovered; // 切换悬停状态

    //   if (center.hovered) {
    //     // 鼠标悬停时，在地图上标记相应的地点
    //     this.$refs.map.addMarker(center);
    //   } else {
    //     // 鼠标离开时，从地图上移除标记
    //     this.$refs.map.removeMarker(center);
    //   }
    // },

    CenterPageGoBack() {
      this.$router.push({ name: 'repairpage' });
    },

    
    // navigateToExamplePage(centerId) {
    //   // 根据传递的centerId进行页面导航
    //   this.$router.push({ name: 'ExamplePage', params: { centerId } });
    // },
    
    // navigateToExamplePage(centerId, centerData) {
    //   this.$router.push({ name: 'ExamplePage', params: { centerId }, state: { centerData } });

    // },

    navigateToExamplePage(centerId, centerData) {
      this.$router.push({
        name: 'ExamplePage',
        params: { centerId },
        query: { productId: this.productId },
        state: { centerData }
      });
    },

    // async fetchServiceCenterData() {
    //   try {
    //     const response = await getAllServiceCenters();
    //     this.data = response.data.ServiceCenter;
    //     this.dataLoaded = true; // Set the flag to true after data is loaded
    //   } catch (error) {
    //     console.error('Error fetching service center data:', error);
    //   }
    // },//8.14版本

    async fetchServiceCenterData() {
      try {
        const response = await getAllServiceCenters();
        this.data = response.data.ServiceCenter.map(center => ({
          ...center,
          hovered: false,
        }));
        this.dataLoaded = true; // Set the flag to true after data is loaded
      } catch (error) {
        console.error('Error fetching service center data:', error);
      }
    },//8.18版本


  },
};


</script>

<style scoped>
.container {
  display: flex;
}

.scrollbar {
  flex: 1;
  height: calc(100vh - 100px); /* 调整滚动框高度，保留页眉高度 */
  margin-right: 20px; /* 调整滚动框与地图的间距 */
}

.scrollbar-container {
  width: 1000px; /* 设置容器宽度为 1000px */
  height: 100%;
  overflow-y: auto;
}

.card-item {
  margin-bottom: 10px; /* 调整卡片之间的间距 */
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);/*  添加阴影效果 */
 }





.card-content {
  display: flex;
  align-items: center;
}

.card-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-right {
  flex: 2;
  padding-left: 20px;
}




.card-right {
  flex: 2;
  padding-left: 20px;
  width: 300px; /* 设置固定宽度 */
}

.el-descriptions {
  width: 100%; /* 让表格宽度占满容器 */
}

.el-descriptions-item {
  display: flex;
  justify-content: 50px; /* 设置标签和内容之间的间距 */
}

.el-descriptions-item__label {
  flex: 1; /* 标签占据左侧宽度 */
  text-align: right;
  padding-right: 10px; /* 右侧留出一些间距 */
}

.el-descriptions-item__content {
  flex: 2; /* 内容占据右侧宽度 */
  text-align: left;
}




.card-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  transition: filter 0.3s ease-in-out;
}






.card-button {
  margin-top: 12px;
}

.my-label {
  background: var(--el-color-success-light-9);
}

.my-content {
  background: var(--el-color-danger-light-9);
}

.map-container {
  width: 600px;
  height: 850px;
  border: 2px solid #ccc; /* Add a border style */
  border-radius: 5px; /* Optional: Add border radius */
  padding: 10px; /* Optional: Add padding */
}

.back-button-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.back-button {
  width: 100px;
  height: 40px;
}


.dimmed-image {
  filter: brightness(0.5); /* 降低亮度的样式 */
}

</style>