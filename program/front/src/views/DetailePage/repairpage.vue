<template>
  <div class="common-layout">
    <el-container>
      <!--最顶部的标题-->
      <el-header>
        <div class="center-title" style="color:rgb(74, 112, 228) ;">
          <h1>电子产品维修信息填写界面</h1>
        </div>
      </el-header>

     
      <el-container>
    <!-- 左侧图片上传区域 -->
    <el-aside class="aside-center">
      <div class="upload-container upload-container-large">
        <!--input type="file" @change="handleFileChange" /-->
        <el-upload
        class="upload-demo"
        ref="uploadImage"
        drag
        multiple
        accept="image/jpeg,image/png,image/jpg"
        :file-list="fileList"
        :on-change="handleFileChange"
        :on-remove="handleFileRemove"
        :limit="3"
        :on-success="handleUploadSuccess"
        :auto-upload="false"
      >
    <h1>请上传维修图片 大小不超过500K</h1>
    </el-upload>
      </div>
      <!-- 图片预览走马灯(已修改) -->
    <div class="carousel-container">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(image, index) in this.imageArr" :key="index">
          <img :src="image" :alt="'Uploaded Image ' + index" style="width: 100%;" />
        </el-carousel-item>
      </el-carousel>
    </div>
    </el-aside>

    

        <el-main>

          <el-header style="margin-top: 20px;">
        <el-steps :active="2" align-center>
    <el-step title="Step 1" description="Some description" />
    <el-step title="Step 2" description="Some description" />
    <el-step title="Step 3" description="Some description" />
    <el-step title="Step 4" description="Some description" />
  </el-steps>
    </el-header>


          <div class="descriptions-container">
            <h2 class="descriptions-title">在下面表格中请填写你的用户信息</h2>
            <el-descriptions class="custom-descriptions" :column="1" border>
              <!-- 直接显示获取的姓名和电话号码 -->
              <el-descriptions-item label="姓名" label-align="center" align="center">
                {{ this.name }}
              </el-descriptions-item>
              <el-descriptions-item label="联系电话" label-align="center" align="center" background-color="blue">
                {{ this.phone }}
              </el-descriptions-item>
              <el-descriptions-item label="居住地址" label-align="center" align="center" background-color=" blue">
                <el-select v-model="form.CustomerLocation">
                  <el-option
                  v-for="location in locationInfo"
                  :key="location.ID"
                  :label="location.Location_Name"
                  :value="`${location.Location_Name} ${location.Loc_Detail}`"
                  />
                </el-select>
              </el-descriptions-item>
               <el-descriptions-item label="维修服务地点" label-align="center" align="center">
                  <el-select v-model="form.RepairLocation">
                  <el-option label="北京" value="北京" />
                  <el-option label="上海" value="上海" />
                  <el-option label="广东" value="广东" />
                  <!-- 添加其他地点选项 -->
               </el-select>
              </el-descriptions-item>


              <el-descriptions-item label="设备名称" label-align="center" align="center">
                <el-select v-model="form.Brand">
                  <el-option label="iphone" value="iphone" />
                  <el-option label="华为" value="华为" />
                  <el-option label="小米" value="小米" />
                  <el-option label="三星" value="三星" />
                  <el-option label="oppo" value="oppo" />
                  <el-option label="vivo" value="vivo" />
                  <el-option label="联想" value="联想" />
                  <el-option label="索尼" value="索尼" />
                  <el-option label="戴尔" value="戴尔" />
                  <el-option label="任天堂" value="任天堂" />
                  <!-- 添加其他地点选项 -->
               </el-select>
              </el-descriptions-item>
              <el-descriptions-item
                label="设备是否还在保修时间内"
                label-align="center"
                align="center"
              >
                <el-radio-group v-model="form.isWarranty">
                  <el-radio label="是">是</el-radio>
                  <el-radio label="否">否</el-radio>
                </el-radio-group>
              </el-descriptions-item>
              <el-descriptions-item label="期待的上门服务时间" label-align="center" align="center">
                <el-date-picker v-model="form.RepairTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </el-descriptions-item>
              <el-descriptions-item label="部件" label-align="center" align="center">
                <el-select v-model="form.ProblemPart">
                  <el-option label="镜头" value="镜头" />
                  <el-option label="屏幕" value="屏幕" />
                  <el-option label="音响" value="音响" />
                  <el-option label="芯片" value="芯片" />
                  <el-option label="其他" value="其他" />
               </el-select>
              </el-descriptions-item>
              <el-descriptions-item label="故障类型" label-align="center" align="center">
                <el-select v-model="form.ProblemDetail">
                  <el-option label="设备磨损" value="设备磨损" />
                  <el-option label="设备损毁（已经无法使用）" value="设备屏幕损毁，出现裂缝，黑屏等损坏" />
                  <el-option label="设备不灵敏" value="设备不灵敏" />
                  <el-option label="设备更新" value="设备更新" />
                  <!-- 添加其他地点选项 -->
               </el-select>
              </el-descriptions-item>
              <el-descriptions-item label="解决方法" label-align="center" align="center">
                <el-select v-model="form.Requirement">
                  <el-option label="更换部件" value="更换部件" />
                  <el-option label="维修部件" value="维修部件" />
               </el-select>
              </el-descriptions-item>
              <el-descriptions-item
                label="设备故障信息详情描述（请补充说明设备损坏的具体情况）"
                label-align="center"
                align="center"
              >
                <el-input type="textarea" v-model="form.problemDescription"></el-input>
              </el-descriptions-item>
              <el-descriptions-item label="工程师名称" label-align="center" align="center">
                <el-popover v-if="form.engineer" trigger="hover" placement="right-start" width="200">
                  <template #reference>
                    <el-select v-model="form.engineer" placeholder="请选择工程师" @mouseover="showPopoverContent = true" @mouseleave="showPopoverContent = false">
                      <el-option v-for="engineer in engineersData" :key="engineer.ID" :label="engineer.Name" :value="engineer.ID"></el-option>
                    </el-select>
                  </template>
                  <div v-if="showPopoverContent && selectedEngineer" trigger="hover" placement="right-start" width="200">
                    
                      <h4>{{ selectedEngineer.Name }}</h4>
                      <p>性别: {{ selectedEngineer.Sex }}</p>
                      <p>评分: {{ selectedEngineer.Rate }}</p>
                      <p>工龄: {{ selectedEngineer.WorkingYears }}年</p>
                    </div>
                  <!-- </el-popover>                       -->
                </el-popover>
                <el-select v-else v-model="form.engineer" placeholder="请选择工程师">
                  <el-option v-for="engineer in engineersData" :key="engineer.ID" :label="engineer.Name" :value="engineer.ID"></el-option>
                </el-select>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-main>
      </el-container>
    </el-container>

  </div>

 
    


    <!-- 添加下单按钮 -->
    <div class="order-button">

      <!-- <el-button type="text" @click="go_center" class="site-details-button">维修站点详情</el-button> -->
      <el-button type="text" @click="go_center" class="site-details-button">维修站点详情</el-button>

      <el-button type="primary" @click="goback" class="order-button">返回</el-button>
      <el-button type="primary" @click="goToPricePage" class="order-button">支付</el-button>

    </div>
</template>

<script>
//import { getEngineer } from '@/api/repair_info.js';
import axios from 'axios';
import { mapState} from 'vuex';
import {insertNavigationUpload} from "@/api/repairprice_info.js";
import {getLocationInfo} from "@/api/repair_info.js";
import { ElMessage} from 'element-plus'
export default {
  name: 'RepairPage',
  computed: {
    ...mapState(['userid']), // Map the 'userid' state from Vuex to a local property
  },
  data() {
    return {
      form: {
        CouponID:'',
        EngineerID:"eng001",
        OrderPrice:'',
        ProblemPart:"",
        ProblemDetail:'',
        problemDescription:'',
        Requirement:'',
        Brand:'',
        RepairLocation:'',
        RepairTime:'',
        isWarranty:'',
        uploadedImages: [], // Store uploaded image URLs
        CustomerLocation:'',
        Password:'',
      },
      productId:null,
      name:'',
      phone:'',
      showPopoverContent: false,
      selectedEngineer: null, // Initialize selectedEngineer
      engineersData: [], // Store the retrieved engineer data
      /*新增变量*/
      fileList:[],
      imageArr:[],
      id:null,
      userInfo:'',
      orderId:null,
      locationInfo: null,
      // engineersData: [
      //   { value: "engineerA", name: "小盛", sex: "男", rating: 4.1, experience: "5年" },
      //   { value: "engineerB", name: "老默", sex: "男", rating: 4.9, experience: "3年" },
      //   { value: "engineerC", name: "小兰", sex: "女", rating: 4.7, experience: "7年" },
      // ],
    };
  },
  
    mounted() {
    // 接收上一个组件的值，并将其赋给data.product.productId
      this.productId = this.$route.params.productId;
      console.log("接收的 productId:", this.$route.params.productId);
      this.fetchEngineersData(); // 在组件挂载时获取工程师数据
      this.fetchUserInfo();
    },
    created() {
      this.getLocationData()
      .then(() => {
        console.log("获取地址信息成功");
      })
      .catch((error) => {
        console.log("获取地址信息失败");
        console.error('Error:', error);
      });
      
    },

  /*created() {
    // 在组件创建时调用getEngineer函数，获取工程师数据
    //this.fetchEngineersData();
  },

  watch: {
    'form.engineer': function (newVal) {
      // 通过工程师的值，查找对应的个人信息并赋值给selectedEngineer
      this.selectedEngineer = this.engineersData.find((engineer) => engineer.value === newVal);
      // 控制个人名片是否显示的标志
      this.showPopoverContent = !!this.selectedEngineer;
    }
  },*/
  watch: {
  'form.engineer': function (newVal) {
    this.selectedEngineer = this.engineersData.find(engineer => engineer.ID === newVal);
  }
},


  methods: {
     /*新增方法*/
     handleFileChange(file,fileList) {
      this.fileList=fileList;
      this.imageArr=[];
      this.fileList.forEach(f=>{
        let imgResult = URL.createObjectURL(f.raw);
        this.imageArr.push(imgResult);
      })
    },
    /*新增方法*/
    handleFileRemove(file,fileList)
    {
      this.fileList=fileList;
      this.imageArr=[];
      this.fileList.forEach(f=>{
        let imgResult = URL.createObjectURL(f.raw);
        this.imageArr.push(imgResult);
      })
    },
    displayImage(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.form.uploadedImages.push(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    beforeDestroy() {
    // 释放 Blob URL 资源，避免内存泄漏
      for (const url of this.uploadedImages) {
        URL.revokeObjectURL(url);
      }
   } ,
    
    go_center() {
      this.$router.push({ name: 'CenterPage', params: { productId: this.productId } });
      // this.$router.push({ name: 'CenterPage', params: { productId: this.product.productId } });
    },
    
    /*专门用来估算设备价格的函数*/ 
    calculatePrice() {
      let basePrice = 100; // 设置基础价格
      // 根据手机型号信息调整价格
      if (this.form.Brand === 'iphone') {
        basePrice += 80;
      } else if (this.form.Brand === '华为') {
        basePrice += 80;
      } else if (this.form.Brand === '小米') {
        basePrice += 50;
      } else if (this.form.Brand === '三星') {
        basePrice += 50;
      } else if (this.form.Brand === 'oppo') {
        basePrice += 50;
      } else if (this.form.Brand === 'vivo') {
        basePrice += 50;
      } else if (this.form.Brand === '联想') {
        basePrice += 100;
      } else if (this.form.Brand === '索尼') {
        basePrice += 100;
      } else if (this.form.Brand === '戴尔') {
        basePrice += 100;
      } else if (this.form.Brand === '任天堂') {
        basePrice += 150;
      } 

      if (this.form.ProblemPart === '镜头') {
        basePrice += 100;
      } else if (this.form.ProblemPart === '屏幕') {
        basePrice += 500;
      } else if (this.form.ProblemPart === '音响') {
        basePrice += 200;
      } else if (this.form.ProblemPart === '芯片') {
        basePrice += 400;
      } else if (this.form.ProblemPart === '其他') {
        basePrice += 200;
      }
      
      if (this.form.ProblemDetail === '设备磨损') {
        basePrice += 100;
      } else if (this.form.ProblemDetail === '设备损毁（已经无法使用）') {
        basePrice += 500;
      } else if (this.form.ProblemDetail === '设备不灵敏') {
        basePrice += 200;
      } else if (this.form.ProblemDetail === '设备更新') {
        basePrice += 300;
      } 
      if (this.form.Requirement === '更换部件') {
        basePrice += 500;
      } else if (this.form.Requirement === '维修部件') {
        basePrice += 100;
      } 

      return basePrice;
    },
    onEngineerChange() {
      this.selectedEngineer = this.engineersData.find(engineer => engineer.ID === this.form.engineer);
      this.showPopoverContent = !!this.selectedEngineer;
    },
    async fetchEngineersData() {
    try {
      const response = await axios.get('http://110.42.220.245:8081/Engineer');
      this.engineersData = response.data.engineers; // 使用 response.data.engineers 提取工程师数组
      console.log('成功获取工程师数据:', this.engineersData);
    } catch (error) {
      console.error('获取工程师数据失败:', error);
    }
  },
  async fetchUserInfo() {
  try {
    const response = await axios.get(`http://110.42.220.245:8081/UserInfo/${this.userid}`);
    const userInfoArray = response.data;
    
    // 假设只有一个用户信息对象
    const userInfo = userInfoArray[0];
    
    // 从用户信息对象中获取所需的信息
    this.name = userInfo.name; // 注意属性名的大小写
    this.phone = userInfo.telephone; // 注意属性名的大小写
    this.form.Password= userInfo.password;
    console.log('成功获取个人信息:', userInfo);
    console.log('成功获取个人信息:', this.name);
    console.log('成功获取个人信息:', this.phone);
    console.log('成功获取个人信息:', this.form.Password);
  } catch (error) {
    console.error('获取个人信息失败:', error);
  }
},
  // 获取地址信息
  getLocationData() {
      return getLocationInfo(this.userid)
        .then((res) => {
          // 处理返回的数据
          this.totalOrders = res.data.Location.length;
          this.locationInfo = res.data.Location;
          console.log("正在获取")
          console.log(this.locationInfo)
          console.log(this.totalOrders)
        })
        .catch((error) => {
          // 处理错误
          console.error('获取地址信息失败:', error);
        });
    },
  
    showSiteDetails() {
      // Implement the functionality for the "维修站点详情" button
      // For example, you can redirect to a new page or show a modal with site details
      // Replace the code below with your actual implementation
      console.log('Showing site details');
    },

    
    /*fetchEngineersData() {
      // 调用getEngineer函数获取工程师数据
      getEngineer({}).then((response) => {
        this.engineersData = response.data; // 将获取到的工程师数据赋值给engineersData
      }).catch((error) => {
        console.error('Error fetching engineers data:', error);
      });
    },*/


    handleFileUpload(event) {
      const file = event.target.files[0];
      // 将选择的照片文件存储到 data 中的 form.photo
      this.form.photo = file;
    },
   
    async goToPricePage() {
  try {
    // 构造要传递给PricePage的数据
    const price = this.calculatePrice();
    console.log('计算得到的价格:', price);
    this.form.OrderPrice = price;
    const currentTime = new Date();
    const eightHoursLater = new Date(currentTime.getTime() + 8 * 60 * 60 * 1000); // 8小时的毫秒数
    const formattedTime = eightHoursLater.toISOString().slice(0, 19); // 保留 "YYYY-MM-DDTHH:MM:SS" 部分; // 保持 ISO 格式
    console.log('下单时间:', formattedTime);
    const createResponse = await this.submitForm();
    const dataToPass = {
      form: this.form,
      uploadedImages: this.uploadedImages,
      price: price, // 将计算得到的价格传递给PricePage
      currentTime: formattedTime, // 下单的本地时间
      productId: this.productId,
      orderId: this.orderId,
    };
    console.log("传递的数据", dataToPass);

    if (createResponse.data.success) {
      console.log('维修订单创建成功:', createResponse.data);
      // 获取返回的orderid并存储在页面数据中
      const orderId = createResponse.data.orderid; // 假设返回的字段名是orderid
      this.orderId = orderId;
      console.log("获取订单id", this.orderId);

      // 在订单创建成功时进行页面跳转
      this.$router.push({
        name: 'pricepage',
        query: {
          data: JSON.stringify(dataToPass),
        },
      });
    } else {
      console.error('维修订单创建失败:', createResponse.data);
      ElMessage.error(createResponse.data.message || '订单创建失败，请稍后重试或联系客服支持！');
    }
  } catch (error) {
    console.error('Error navigating to PricePage:', error);
    ElMessage.error('订单创建失败，请稍后重试或联系客服支持！');
  }
},

async submitForm() {
  try {
    this.form.ExpectedPrice = this.calculatePrice();
    const dataToPass = new FormData();
    this.id = this.userid
    dataToPass.append('id', this.id);
    console.log("正在创建回收订单", this.id)
    dataToPass.append("Json", JSON.stringify(this.form));
    console.log("FormData 中的 this.form 部分:", this.form);
    this.fileList.forEach(file => {
      dataToPass.append("file", file.raw);
    })
    const createResponse = await insertNavigationUpload(dataToPass);
    console.log(createResponse.data);

    return createResponse; // 返回响应以供调用者处理

  } catch (error) {
    console.error('Error creating order:', error);
    throw error; // 抛出错误以便在调用处处理
  }
},

      
    // go_center() {
    //   this.$router.push({ name: 'CenterPage' });

    // },
    async goback() {
      try {
         // 构造要传递给repairpage的数据
         const dataToPass = {
          productId:this.productId,
        };
        console.log("传递的数据", dataToPass);
         // 使用query参数传递数据，而不是params
         this.$router.push({
          name: 'DetailsPage',
          query: {
            data: JSON.stringify(dataToPass),
          },
         
        });
        
      } catch (error) {
        console.error('Error navigating to DetailsPage:', error);
      }
    },
  }
  
};
</script>


<style scoped>


.descriptions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
.custom-descriptions {
  margin-left: -200px; /* 调整左边距的值 */
}

.descriptions-title {
  text-align: center;
  margin-bottom: 20px;
  margin-left: -200px; /* 调整左边距的值 */
}


.carousel-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.carousel-container .el-carousel {
  width: 60%;
  height: 90%;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.my-label {
  background: var(--el-color-success-light-9);
}
.my-content {
  background: var(--el-color-danger-light-9);
}
.aside-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px; /* 调整侧边栏的宽度 */
  height: 700px; /* 保持侧边栏高度与 el-container 一致 */
  
}

.upload-container-large {
  width: 80%; /* 调整上传组件容器的宽度 */
  margin-bottom: 20px; /* 调整文件上传栏之间的间距 */
  /* 可根据需要自定义其他样式属性 */
}
.center-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px; /* 调整上传组件容器的宽度 */
  height: 100px; /* 调整上传组件容器的高度 */
  border: 5px dashed #ccc;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 50px; /* 调整上传组件之间的间距 */
}

.upload-container-large {
  width: 200px;/* 调整上传组件的宽度 */
  height: 200px; /* 调整上传组件的高度 */
  /* 可根据需要自定义其他样式属性 */
}
.repair-page {
  padding: 200px;
}

.upload-container {
  position: relative;
  width: 300px;
  height: 500px;
  border: 3px dashed #bfeaf4;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* 添加鼠标样式为手型 */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
}

.upload-text {
  margin-top: 10px;
}

.order-button {
  display: flex;
  justify-content: flex-end;
  
  margin-bottom: 600px; /* 调整底部间距 */
  margin-right: 20px; /* 调整右侧间距 */
  font-size: 15px; /* 调整按钮字体大小 */
  padding: 20px 40px; /* 增加按钮内边距 */
}


.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-right: 20px;
}
.site-details-button {
  margin-left: 10px;
  font-size: 15px;
}

  </style>



