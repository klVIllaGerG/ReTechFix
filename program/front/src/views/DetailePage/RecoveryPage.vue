<template>
  <seach/>
  
  <!-- 步骤条显示回收进度 -->
    <el-header style="margin-top: 20px;">
        <el-steps :active="2" align-center>
            <el-step title="Step 1" description="Some description" />
            <el-step title="Step 2" description="Some description" />
            <el-step title="Step 3" description="Some description" />
            <el-step title="Step 4" description="Some description" />
        </el-steps>
    </el-header>

  <div class="product-recycle">
    <div class="centered-container">
    <div class="left-panel">
      <img :src="productImage" alt="Device Image" style="height: 400px; width: 400px;"/>

      <div class="order-button">
        
        <el-button type="primary" @click="goback" class="order-button">  返回  </el-button>
        <el-button type="primary" @click="goToPricePage" class="order-button">  下单  </el-button>
      </div>

    </div>


    <div class="right-panel">
      <!-- 输入设备基本信息，品牌、型号 -->
      <div class="product-info">
        <div class="info-title">
          <h1>{{ deviceInfo && deviceInfo.DeviceType[0].Brand }}</h1>
          <h2>{{ deviceInfo && deviceInfo.DeviceType[0].Type_Name }}</h2>
        </div>
        <p class="__services">
          <el-icon class="gray-icon"><Avatar /></el-icon><span class="gray-text">免费上门</span>
          <el-icon class="gray-icon"><Shop /></el-icon><span class="gray-text">价格合理</span>
          <el-icon class="gray-icon"><Management /></el-icon><span class="gray-text">品质服务</span>
        </p>
        <hr style="width: 370px; margin-left: 0px;"/>
      </div>

      

      <div class="product-form">
        <div class="storage-group" style="margin-top: 0px;">
          <h3 class="group-title">{{ title }}</h3>
          <div class="btn-group">
            <el-button
              v-for="(option, index) in options"
              :key="index"
              :type="selectedOption === option.value ? 'primary' : 'default'"
              @click="selectOption(option.value)"
            >{{ option.label }}</el-button>
          </div>
        </div>
        
        <el-form ref="productForm" :model="form" label-width="120px">
          
          <el-form ref="productForm" :model="form" label-width="120px">
            <el-form-item label="存储容量">
              <el-select v-model="form.StorageCapacity" placeholder="请选择存储容量">
                <el-option label="64G" value="64G"></el-option>
                <el-option label="128G" value="128G"></el-option>
                <el-option label="256G" value="256G"></el-option>
                <el-option label="无" value="无"></el-option>
              </el-select>
            </el-form-item>
          </el-form>


          <el-form-item label="购买渠道">
            <el-select v-model="form.PurchaseChannel" placeholder="请选择购买渠道">
              <el-option label="自营门店" value="自营门店"></el-option>
              <el-option label="官方门店" value="官方门店"></el-option>
              <el-option label="网络门店" value="网络门店"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="回收时间" label-align="center" align="center">
            <el-date-picker v-model="form.Recycle_Time" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>

          <el-form-item label="回收地点" label-align="center" align="center">
            <el-select v-model="form.Recycle_Location">
              <el-option
                v-for="location in locationInfo"
                :key="location.ID"
                :label="location.Location_Name"
                :value="`${location.Location_Name} ${location.Loc_Detail}`"
              />
            </el-select>
          </el-form-item>

        </el-form>
        <!-- 修改部分 -->
          <el-upload
          class="upload-demo"
          ref="uploadImage"
          drag
          multiple
          accept="image/jpeg,image/png,image/jpg"
          :file-list="fileList"
          :on-change="fileChange"
          :limit="3"
          :on-success="handleUploadSuccess"
          :auto-upload="false"
          >
          <!-- 修改部分结束 -->
          <h1>点击上传回收设备的图片，内存小于500KB</h1>
            <!-- ... Your upload icon and text ... -->
          </el-upload>
      </div>
    </div>
  </div>
  </div>
</template>
  
  <script>
  // import RepairHistory from '@/components/RepairHistory.vue'
  // import DropdownList from '@/components/DropdownList.vue';
  import header from '/src/components/header.vue'
  import axios from 'axios';
  import {insertNavigationUpload,getLocationInfo} from "@/api/recycle_info.js";
  import { mapState} from 'vuex';
  export default {

    name:'RecoveryPage',

    props: {
      title: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      }
    },
    computed: {
    ...mapState(['userid']), // Map the 'userid' state from Vuex to a local property
    },
    data() {
      return {
        productImage: require('/public/p.jpg'),
        productName: '设备名称',
        productId: '设备型号',
        form: {
          Device_Cate: 'phone',
          Device_Type: '',
          ExpectedPrice: 0,
          CustomerLocation:'shanghai',
          Recycle_Location: '',
          Recycle_Time: '',
          StorageCapacity:'',
          PurchaseChannel:'',          
        },
        uploadedImages: ['http://110.42.220.245:8081/Image/iPhone6.jpg',],
        deviceInfo: null,
        locationInfo: null,
        imageList:[],
        /*新增变量*/
        fileArr:[],
        fileList:[],
        id:null,
        orderId:null,
      };
    },
    components: {
      "seach": header,
      // RepairHistory,
      // DropdownList,
    },
    mounted() {
    // 接收上一个组件的值，并将其赋给data.product.productId
      this.productId = this.$route.params.productId;
      this.id = this.userid;
      console.log("接收的 Id:", this.id);
      console.log("接收的 productId:", this.$route.params.productId);
    },
    created() {
      this.getTypename();
      this.fetchDeviceInfo();
      this.getLocationData()
      .then(() => {
        console.log("获取地址信息成功");
      })
      .catch((error) => {
        console.log("获取地址信息失败");
        console.error('Error:', error);
      });
    },
    methods: {
      calculatePrice() {
  let basePrice = 100; // 设置基础价格

  // 根据存储容量调整价格
  if (this.form.StorageCapacity === '64G') {
    basePrice += 50; // 假设增加50元
  } else if (this.form.StorageCapacity === '128G') {
    basePrice += 100; // 假设增加100元
  } else if (this.form.StorageCapacity === '256G') {
    basePrice += 150; // 假设增加150元
  }

  // 根据时间长短调整价格
  if (this.form.Recycle_Time instanceof Date) {
    const currentTime = new Date();
    const timeDifference = this.form.Recycle_Time.getTime() - currentTime.getTime();
    
    // 假设每小时加价10元
    const hoursDifference = Math.ceil(timeDifference / (60 * 60 * 1000));
    const timePrice = hoursDifference * 10;
    basePrice += timePrice;
  }

  // 根据设备类型调整价格
  if (this.form.Device_Type === 'phone') {
    basePrice += 50; // 假设手机类设备加价50元
  } else if (this.form.Device_Type === 'tablet') {
    basePrice += 80; // 假设平板类设备加价80元
  } // 根据您的需求添加更多设备类型

  // 还可以根据其他选项继续调整价格

  return basePrice;
},
      selectOption(option) {
        this.selectedOption = option;
        this.$emit('option-selected', option);
      },
      goback() {
        this.$router.push({ name: 'DetailsPage' });
      },
      getTypename(){
        this.productId = this.$route.params.productId;
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
      fetchDeviceInfo() {
        axios.get(`http://110.42.220.245:8081/DeviceType/${this.productId}`)
          .then(response => {
              
              this.deviceInfo = response.data;
              console.log(this.deviceInfo)
              // 将图片也更新
              this.productName = this.deviceInfo.DeviceType[0].Brand
              this.form.Device_Type =  this.deviceInfo.DeviceType[0].Type_Name
              this.imageList = this.deviceInfo.DeviceType[0].Structure_Url
              this.productImage = this.imageList[1]
          })
          .catch(error => {
            console.error('请求错误:', error);
          });
      },
      async goToPricePage() {
        try {
          // 构造要传递给PricePage的数据
          this.form.ExpectedPrice = this.calculatePrice();
          console.log('计算得到的价格:',  this.form.ExpectedPrice);
          await this.submitForm();
          const dataToPass = {
            form: this.form,
            uploadedImage:this.$refs.uploadedImage,            
            productId:this.productId,
            orderId:this.orderId,
          };
          
          // 使用query参数传递数据，而不是params
          this.$router.push({
            name: 'recycleprice',
            query:{
              data: JSON.stringify(dataToPass),
            }
          });
          
        } catch (error) {
          console.error('Error navigating to PricePage:', error);
        }
      },
      /*新增方法*/ 
      async submitForm()
      {
        try{
          this.form.ExpectedPrice = this.calculatePrice();
          const dataToPass = new FormData();
          this.id =this.userid
          if (this.form.Recycle_Time instanceof Date) {
        // 将日期转换为所需格式
            this.form.Recycle_Time = this.form.Recycle_Time.toISOString();
          }
          console.log("正在创建回收订单", this.form.Recycle_Time)
          dataToPass.append('id', this.id);
          
          dataToPass.append("Json",JSON.stringify(this.form));
          console.log("FormData 中的 this.form 部分:", this.form);
          for(var i=0;i<this.fileArr.length;i++)
          {
           dataToPass.append("file",this.fileArr[i]);
          }
          const createResponse = await insertNavigationUpload(dataToPass);
          console.log(createResponse.data);
  
          if (createResponse.data.success) {
            console.log('回收订单创建成功:', createResponse.data);
             // 获取返回的orderid并存储在页面数据中
              const orderId = createResponse.data.orderid; // 假设返回的字段名是orderid
              this.orderId = orderId;
              console.log("获取订单id",this.orderId)
          } 
          else {
            console.error('回收订单创建失败:', createResponse.data);
          }
        }
        catch (error) {
        console.error('Error creating order:', error);
        } 
      },
      fileChange(file)
      {
        this.fileArr.push(file.raw);
      }
    },
    
    handleOptionSelected(option) {
        console.log('选中的存储容量:', option);
        // 在这里处理选中的存储容量
        this.form.storage_capacity = option;
    },
  };
  </script>
  
  <style>
  /* 样式按字母顺序重新排列 */
  
  .__services {
    display: flex;
    margin-bottom: 20px;
  }
  
  .btn-group {
    margin-top: 10px;
  }
  
  .centered-container {
    display: flex;
    align-items: center; /* 垂直居中容器内的内容 */
  }
  
  .centered-steps {
    width: 50%;
  }
  
  .container {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
  
  .gray-icon {
    color: #888;
    font-size: 18px;
    margin-right: 5px;
  }
  
  .gray-text {
    color: #888;
    font-size: 12px;
    margin-right: 20px;
    margin-bottom: 0px;
  }
  
  .group-title {
    font-size: 18px;
    font-weight: bold;
  }
  
  .h1 {
    font-size: 24px;
    font-weight: bold;
  }
  
  .h2 {
    font-size: 18px;
  }
  
  .input {
    width: 300px;
  }
  
  .left-panel {
    flex: 1;
    margin-top: 100px;
    margin-right: 20px;
  }

  .options-container {
  display: flex;
  align-items: center;
  }
  
  .order-button {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px; /* 调整底部间距 */
    margin-right: 20px; /* 调整右侧间距 */
    font-size: 15px; /* 调整按钮字体大小 */
    padding: 20px 40px; /* 增加按钮内边距 */
  }
  
  .product-form {
    position: relative;
    margin-top: 0px;
    margin-left: 20px;
  }
  
  .product-info {
    padding: 20px;
    margin-left: 50px;
    margin-bottom: 0%;
  }
  
  .product-recycle {
    display: flex;
    justify-content: center; /* 水平居中整个 product-recycle 区域 */
    align-items: flex-start; /* 顶部对齐项目 */
  }
  
  .right-panel {
    text-align: left; /* 设置整个 right-panel 的文本内容为左对齐 */
    margin-left: 20px;
  }
  
  .right-panel h1,
  .right-panel h2,
  .right-panel p {
    text-align: left; /* 设置 h1、h2、p 元素的文本内容为左对齐 */
  }
  
  .storage-group {
    margin-bottom: 20px;
  }
  
  </style>
  
  