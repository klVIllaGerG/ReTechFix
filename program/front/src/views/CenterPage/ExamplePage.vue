
  <!-- <template>
    <div>
      <h1>Example Page</h1>
      <div class="example-card">
        <h2>Card Details</h2>
        <p>ID: {{ cardData.ID }}</p>
        <p>Name: {{ cardData.Name }}</p>
        <p>Location Detail: {{ cardData.Loc_Detail }}</p>
        <p>Telephone: {{ cardData.Tel }}</p>
      </div>
      <router-link to="../CenterPage">Back to CenterPage</router-link>
    </div>
  </template>
  
  <script>
  import { getAllServiceCenters } from '@/api/centerpicture';


  export default {
    name: 'ExamplePage',
    // data() {
    //   return {
    //     cardData: {} // Store the data of the selected card
    //   };
    // },
    data() {
        return {
            cardData: this.$route.params.centerData || {}
        };
    },
    async fetchCardData() {
        try {
            const response = await getAllServiceCenters();
            const centerId = this.$route.params.centerId;

            this.cardData = response.data.ServiceCenter.find(center => center.ID === centerId) || {};
        } catch (error) {
            console.error('Error fetching card data:', error);
        }
    },

    mounted() {
      this.fetchCardData();
    },
    methods: {
    //   fetchCardData() {
    //     // You can use this.$route.params.centerId to get the centerId from the route params
    //     const centerId = this.$route.params.centerId;
  
    //     // Fetch the data based on centerId
    //     // Replace this with the actual API call to fetch card data by centerId
    //     // For demonstration purposes, let's assume you have a function named getCardDataById
    //     // that fetches the data from a source
    //     this.cardData = this.getCardDataById(centerId);
    //   },
      getCardDataById(centerId) {
        // Replace this with the actual logic to fetch card data by centerId
        // For example, you can iterate through your data array and find the matching center
        // Return the card data once found
        const matchingCenter = this.$store.state.data.find(center => center.ID === centerId);
        return matchingCenter || {}; // Return an empty object if no match is found
      }
    }
  };
  </script>
  
  <style scoped>
  .example-card {
    border: 2px solid #ccc;
    padding: 10px;
    margin-top: 20px;
  }
  </style>
   -->

   <!-- 
    
    淡入展示！！！！
    淡入展示！！！！
    淡入展示！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    淡入展示！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
     淡入展示！！！！
    淡入展示！！！！
    淡入展示！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    淡入展示！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
     淡入展示！！！！
    淡入展示！！！！
    淡入展示！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    淡入展示！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
   -->
    <!-- <template>
    <div>
      <search />
      <div>
        <div class="example-card">
          <h1>Name: {{ cardData.Name }}Details</h1>
          <h1></h1>
          <div class="image-container">
            <img :src="cardData.TIMG_URL" class="responsive-img" :class="{ 'fade-in': showImage }" />
          </div>
          <p>Location Detail: {{ cardData.Loc_Detail }}</p>
          <p>Telephone: {{ cardData.Tel }}</p>
        </div>
        <router-link to="../CenterPage">Back to CenterPage</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { getAllServiceCenters } from '@/api/centerpicture';
  import Header from '/src/components/header.vue';
  
  export default {
    name: 'ExamplePage',
    components: {
      search: Header,
    },
    data() {
      return {
        cardData: {},
        showImage: false, // 控制图片显示的标志
      };
    },
    async mounted() {
      await this.fetchCardData();
      this.showImage = true; // 在数据加载完成后显示图片
    },
    methods: {
      async fetchCardData() {
        try {
          const response = await getAllServiceCenters();
          const centerId = this.$route.params.centerId;
  
          this.cardData =
            response.data.ServiceCenter.find((center) => center.ID === centerId) || {};
        } catch (error) {
          console.error('Error fetching card data:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .example-card {
    border: 2px solid #ccc;
    padding: 10px;
    margin-top: 20px;
  }
  
  .image-container {
    max-width: 100%;
    height: 1050px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .responsive-img {
    width: 100%;
    height: auto;
    opacity: 0; /* 初始设置为透明 */
    transition: opacity 1s ease-in-out; /* 添加淡入淡出的过渡效果 */
  }
  
  .fade-in {
    opacity: 1; /* 图片淡入显示 */
  }
  </style>  -->

  
  
<!-- 
    
    基本图片展示！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    基本图片展示！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    基本图片展示！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    基本图片展示！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    基本图片展示！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    基本图片展示！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    基本图片展示！！！！！！！！！！！！！！！！！！！！！！！！！！！！

    <template>
    <div>
      <search />
      <div>
        <div class="example-card">
          <h1>Name: {{ cardData.Name }}Details</h1>
          <h1></h1>
          <div class="image-container">
            <img :src="cardData.TIMG_URL" class="responsive-img" />
          </div>
          <p>Location Detail: {{ cardData.Loc_Detail }}</p>
          <p>Telephone: {{ cardData.Tel }}</p>
        </div>
        <router-link to="../CenterPage">Back to CenterPage</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { getAllServiceCenters } from '@/api/centerpicture';
  import Header from '/src/components/header.vue';
  
  export default {
    name: 'ExamplePage',
    components: {
      search: Header,
    },
    data() {
      return {
        cardData: {},
      };
    },
    async mounted() {
      await this.fetchCardData();
    },
    methods: {
      async fetchCardData() {
        try {
          const response = await getAllServiceCenters();
          const centerId = this.$route.params.centerId;
  
          this.cardData =
            response.data.ServiceCenter.find((center) => center.ID === centerId) || {};
        } catch (error) {
          console.error('Error fetching card data:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .example-card {
    border: 2px solid #ccc;
    padding: 10px;
    margin-top: 20px;
  }
  
  .image-container {
    max-width: 100%;
    height: 1050px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .responsive-img {
    width: 100%;
    height: auto;
  }
  </style> 
-->


<!-- 
    文字淡化1


<template>
    <div>
      <search />
      <div>

        <div class="example-card">
            <h1 v-if="showText" :class="{ 'fade-in': showText }">Name: {{ cardData.Name }}Details</h1>
            <div class="image-container">
                <img :src="cardData.TIMG_URL" class="responsive-img" :class="{ 'fade-in': showImage }" />
            </div>
            <p>Location Detail: {{ cardData.Loc_Detail }}</p>
            <p>Telephone: {{ cardData.Tel }}</p>
        </div>

        <router-link to="../CenterPage">Back to CenterPage</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { getAllServiceCenters } from '@/api/centerpicture';
  import Header from '/src/components/header.vue';
  
  export default {
    name: 'ExamplePage',
    components: {
      search: Header,
    },
    data() {
      return {
        cardData: {},
        showImage: false, // 控制图片显示的标志
        showText: false, // 新增的标志用于控制文字的显示
      };
    },
    async mounted() {
      await this.fetchCardData();
      this.showImage = true; // 在数据加载完成后显示图片
      this.showText = true; // 在数据加载完成后显示文字
    },
    methods: {
      async fetchCardData() {
        try {
          const response = await getAllServiceCenters();
          const centerId = this.$route.params.centerId;
  
          this.cardData =
            response.data.ServiceCenter.find((center) => center.ID === centerId) || {};
        } catch (error) {
          console.error('Error fetching card data:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .example-card {
    border: 2px solid #ccc;
    padding: 10px;
    margin-top: 20px;
  }
  
  .image-container {
    max-width: 100%;
    height: 1050px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .responsive-img {
    width: 100%;
    height: auto;
    opacity: 0; /* 初始设置为透明 */
    transition: opacity 1s ease-in-out; /* 添加淡入淡出的过渡效果 */
  }
  
  .fade-in {
    opacity: 1; /* 图片淡入显示 */
  }
  </style>  -->

  <!-- <template>
    <div>
      <search />
      <div>
        <div class="example-card">
          <h1 v-if="cardData.Name">{{ cardData.Name }} Details</h1>
  
          <div class="image-container">
                <img :src="cardData.TIMG_URL" class="responsive-img" :class="{ 'fade-in': showImage }" />
          </div>
          
        <div class="columns-container">
          <div class="left-column" :style="{ width: leftColumnWidth }">
            <h3>地址</h3>
            <p>Location Detail: {{ cardData.Loc_Detail }}</p>
          </div>
          <div class="right-column" :style="{ width: rightColumnWidth }">
            <h3>联系电话</h3>
            <p>Telephone: {{ cardData.Tel }}</p>
          </div>
        </div>

        </div>
        <router-link to="../CenterPage">返回服务中心列表</router-link>
      </div>
    </div>
  </template>

<script>
import { getAllServiceCenters } from '@/api/centerpicture';
import Header from '/src/components/header.vue';

export default {
    
    computed: {
        screenWidth() {
        return window.innerWidth;
        },
        leftColumnWidth() {
        if (this.screenWidth >= 1000) {
            return '30%';
        } else if (this.screenWidth >= 200) {
            const minLeftWidth = Math.min(this.screenWidth * 0.5, 500); // 最小宽度为屏幕宽度的50%或500px
            const maxLeftWidth = Math.min(this.screenWidth * 0.7, 700); // 最大宽度为屏幕宽度的70%或700px
            return `calc(${minLeftWidth}px + (${maxLeftWidth - minLeftWidth}) * (100vw - 200px) / ${1000 - 200})`;
        } else {
            return '30%'; // 屏幕宽度小于200px时，左栏保持最小宽度为30%
        }
        },
    rightColumnWidth() {
      return `calc(100% - ${this.leftColumnWidth})`;
    },
  },
  name: 'ExamplePage',
  components: {
    search: Header,
  },
  data() {
    return {
      cardData: {},
      showImage: false, // 控制图片显示的标志
    };
  },
  async mounted() {
    await this.fetchCardData();
    this.showImage = true; // 在数据加载完成后显示图片
  },
  methods: {
    async fetchCardData() {
      try {
        const response = await getAllServiceCenters();
        const centerId = this.$route.params.centerId;

        this.cardData =
          response.data.ServiceCenter.find((center) => center.ID === centerId) || {};
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    },
  },
};
</script>

<style scoped>
.example-card {
  border: 2px solid #ccc;
  padding: 10px;
  margin-top: 20px;
}

.image-container {
  max-width: 100%;
  height: 1050px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.responsive-img {
  width: 100%;
  height: auto;
  opacity: 0; /* 初始设置为透明 */
  transition: opacity 1s ease-in-out; /* 添加淡入淡出的过渡效果 */
}

.fade-in {
  opacity: 1; /* 图片淡入显示 */
}
 /* .info-container {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.left-column,
.right-column {
  width: calc(50% - 20px); 
  padding: 10px;
  border: 2px solid #d92e2e31;
}  */

.columns-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.left-column, .right-column {
  overflow: hidden;
  padding: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style> -->


<template>
    <div>
      <search />
      <div class="empty-space"></div>
      <h1 v-if="cardData.Name">{{ cardData.Name }} Details</h1>
      <p style="font-size: 24px;" v-if="cardData.Name">营业至22:00</p>
      <div class="image-container">
        <img :src="cardData.TIMG_URL" class="responsive-img" :class="{ 'fade-in': showImage }" />
      </div>
  
      <div class="example-card">
        <div class="content-container">
          <div class="left-column">
            <h3 v-if="cardData.Loc_Detail">地址</h3>
            <p v-if="cardData.Loc_Detail">Location Detail: {{ cardData.Loc_Detail }}</p>
  
            <!-- 空行 -->
            <div class="empty-space"></div>
  
            <h3 v-if="cardData.Loc_Detail">联系电话</h3>
            <p v-if="cardData.Tel">
              <span style="color: black;">Telephone:</span>
              <a href="tel:{{ cardData.Tel }}" style="color: blue; text-decoration: underline;">{{ cardData.Tel }}</a>
            </p>
          </div>
          <div class="right-column">
            <h3>营 业 时 间</h3>
            <table>
              <tbody>
                <tr v-for="(day, index) in next7Days" :key="index">
                  <td>{{ day.dayName }}</td>
                  <td class="date-cell">{{ day.date }}</td>
                  <td class="date-cell">{{ day.time }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="empty-space"></div>
      <el-button class="back-button" type="primary" @click="goBack">返回服务中心列表</el-button>
      <div class="empty-space"></div>
      <div class="empty-space"></div>
    </div>
  </template>
  
  <script>
  import { getAllServiceCenters } from '@/api/centerpicture';
  import Header from '/src/components/header.vue';
  
  export default {
    name: 'ExamplePage',
    components: {
      search: Header,
    },
    data() {
      return {
        cardData: {},
        showImage: false,
      };
    },
    computed: {
      next7Days() {
        const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const currentDate = new Date();
        const next7Days = [];
  
        for (let i = 0; i < 7; i++) {
          const date = new Date(currentDate);
          date.setDate(currentDate.getDate() + i);
  
          next7Days.push({
            dayName: i === 0 ? '今天' : daysOfWeek[date.getDay()],
            date: `${date.getMonth() + 1} 月 ${date.getDate()} 日`,
            time: '10:00 - 21:30', // 修改为您的营业时间
          });
        }
  
        return next7Days;
      },
    },
    async mounted() {
        await this.fetchCardData();
        this.showImage = true;
        this.productId = this.$route.query.productId;
    },


    methods: {
      async fetchCardData() {
        try {
          const response = await getAllServiceCenters();
          const centerId = this.$route.params.centerId;
  
          this.cardData =
            response.data.ServiceCenter.find((center) => center.ID === centerId) || {};
        } catch (error) {
          console.error('Error fetching card data:', error);
        }
      },
      goBack() {
        //this.$router.push({ path: '../CenterPage' });
        this.$router.push({ name: 'CenterPage', params: { productId: this.productId } });
      },
    },
  };
  </script>
  
  <style scoped>
  .example-card {
    border: 2px solid #ccc;
    padding: 10px;
    margin-top: 20px;
  }
  
  .content-container {
    display: flex;
  }
  
  .left-column {
    width: 30%;
    padding-left: 400px;
  }
  
  .right-column {
    width: 20%;
  }
  
  .image-container {
    max-width: 100%;
    height: 1050px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .responsive-img {
    width: 100%;
    height: auto;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }
  
  .fade-in {
    opacity: 1;
  }
  .date-cell {
    padding-left: 30px; /* 调整左侧内边距 */
  }
  .date-celll {
    padding-left: 50px; /* 调整左侧内边距 */
  }
  .empty-space {
  height: 20px; /* 设置空行的高度，可以根据需要调整 */
}
  </style>
  