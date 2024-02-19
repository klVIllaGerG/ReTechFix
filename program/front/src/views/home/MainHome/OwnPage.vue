<template>
    <div class="PageTop">
      <el-row :gutter="50">
        <el-col :span="8">
          <el-avatar class="centered-avatar" :src="avatarUrl" />
        </el-col>
        <el-col :span="16">
          <el-row class="my-row">
            <span class="username">{{ username }}</span>
          </el-row>
          <el-row class="my-row">
            <span class="info">{{ userInfo.username }}</span>
          </el-row>
        </el-col>
      </el-row>
    </div>
  
    <div class="MyPage">
      <el-collapse v-model="activeNames" @change="handleChange">
        <!-- 消费信息折叠项 -->
        <el-collapse-item title="消费信息" name="1">
          <template #title>
            <span class="collapse-title">消费信息</span>
          </template>
          <!-- 累计订单数量、已完成数量、累计消费、钱包余额统计 -->
          <el-row class="statistic-row">
            <el-col :span="8">
              <el-statistic title="累计回收订单" :value="recycleData.length" />
            </el-col>
            <el-col :span="8">
              <el-statistic title="累计维修订单" :value="repairData.length" />
            </el-col>
            <el-col :span="8">
              <el-statistic title="钱包余额" :value="userInfo.balance" />
            </el-col>
          </el-row>
        </el-collapse-item>
  
        <!-- 个人信息折叠项 -->
        <el-collapse-item title="个人信息" name="2">
          <template #title>
            <span class="collapse-title">个人信息</span>
          </template>
          <!-- 个人信息表 -->
          <el-descriptions class="info-descriptions" title="个人信息表" :column="3" border>
                    <!-- 用户ID不可修改 -->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <user />
                                </el-icon>
                                ID
                            </div>
                        </template>
                        <!-- USERINFO - ID -->
                        <p>{{ userInfo.id }}</p>
                    </el-descriptions-item>
                    <!-- 用户昵称 -->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <user />
                                </el-icon>
                                用户昵称
                            </div>
                        </template>
                        <span v-if="editMode">
                            <el-input v-model="userInfo.username" />
                        </span>
                        <span v-else>{{ userInfo.username }}</span>
                    </el-descriptions-item>
                    <!-- 电话号码 -->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <iphone />
                                </el-icon>
                                电话
                            </div>
                        </template>
                        <span v-if="editMode">
                            <el-input v-model="userInfo.telephone" />
                        </span>
                        <span v-else>{{ userInfo.telephone }}</span>
                    </el-descriptions-item>
                    <!-- 姓名不可修改 -->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <location />
                                </el-icon>
                                姓名
                            </div>
                        </template>
                        <!-- USERINFO - Name     -->
                        <p>{{ userInfo.name }}</p>
                    </el-descriptions-item>
                    <!-- 登记不可修改 -->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <tickets />
                                </el-icon>
                                等级
                            </div>
                        </template>
                        <!-- USERINFO - UserLevel   -->
                        <el-tag size="small">
                            <p>{{ userInfo.userlevel }}</p>
                        </el-tag>
                    </el-descriptions-item>
                    <!-- 身份证号不可修改 -->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <office-building />
                                </el-icon>
                                身份证号
                            </div>
                        </template>
                        <!-- USERINFO - Indentity   -->
                        <p>{{ userInfo.identity }}</p>
                    </el-descriptions-item>
                    <!-- 电子邮箱可以修改 -->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <office-building />
                                </el-icon>
                                Email
                            </div>
                        </template>
                        <span v-if="editMode">
                            <el-input v-model="userInfo.email" />
                        </span>
                        <span v-else>{{ userInfo.email }}</span>
                    </el-descriptions-item>

                </el-descriptions>
            </el-collapse-item>
            <p></p>
        </el-collapse>
    </div>
</template>
      
<script>
import {
    Iphone,
    Location,
    OfficeBuilding,
    Tickets,
    User
} from '@element-plus/icons-vue'

import { computed, ref } from 'vue'
import { getUserProfile } from '@/api/mainhome.js'
import { getRepairOrderInfo, getRecycleOrderInfo } from '@/api/order.js';
import { mapState} from 'vuex';

const size = ref('')
const iconStyle = computed(() => {
    const marginMap = {
        large: '8px',
        default: '6px',
        small: '4px',
    }
    return {
        marginRight: marginMap[size.value] || marginMap.default,
        iconStyle
    }
})

export default {
    computed: {
        iconStyle() {
            return "font-size: 14px; margin-right: 5px;";
        },
        ...mapState(['userid']), // 获取 userid 数据
        test() {
            return this.userid;
        }

    },
    data() {
        return {
            isshowSignature: true,
            editMode: false,
            editSignature: false,
            avatarUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
            userInfo: {// 用户信息...
                id: "",
                username: "",
                userlevel: "",
                name: "",
                telephone: "",
                email: "",
                identity: ""
            },
            repairData: [],
            recycleData: [],
            editedUserInfo: {

            }, // 用于保存编辑后的数据
        };
    },
    created(){
    console.log("尝试拿到个人信息")
      //请求地址,this和vm指的是全局
      getUserProfile(this.userid).then((res) => {
        console.log(res.data)
        if (res.data === false) {
          console.log("拿数据失败")
        }
        else {
          console.log("拿数据成功")
          console.log(res.data[0])
          this.userInfo.id= this.userid
          this.userInfo.name = res.data[0].name
          this.userInfo.username= res.data[0].userName
          this.userInfo.userlevel= res.data[0].level
          this.userInfo.telephone= res.data[0].telephone
          this.userInfo.email=res.data[0].email
          this.userInfo.identity= res.data[0].identity
          this.userInfo.balance= res.data[0].balance
        }
      });

      console.log("尝试获取维修订单信息")
      getRepairOrderInfo(this.userid)
      .then((res) => {
        // 处理返回的用户个人资料数据
        console.log("拿数据成功");
        console.log(this.userid);
        console.log('Response Data:', res.data); // 打印获取到的数据
        this.repairData = res.data.repair_order; // 将获取到的数据存储到repairData中
      })
      .catch((error) => {
        // 处理错误
        console.log("拿数据失败");
        console.error('Error:', error); // 打印错误信息
      });

    console.log("尝试获取回收订单信息")
    getRecycleOrderInfo(this.userid)
      .then((res) => {
        // 处理返回的用户个人资料数据
        console.log("拿数据成功");
        console.log(this.userid);
        console.log('Response Data:', res.data); // 打印获取到的数据
        this.recycleData = res.data.recycle_order; // 将获取到的数据存储到recycleData中
      })
      .catch((error) => {
        // 处理错误
        console.log("拿数据失败");
        console.error('Error:', error); // 打印错误信息
      });

  },
    components: {
        Iphone,
        Location,
        OfficeBuilding,
        Tickets,
        User,
    },
    setup() {
        const activeNames = ref(["1", "2", "3", "4"])
        return {
            activeNames
        }
    }
}
</script>
      
<style>
.PageTop {
    border: 1px solid #ccc;
    width: 1400px;
    /* 设置边框的宽度为 300 像素 */
    margin-top: 0%;
    font-size: 30px;
    color: black;
    position: absolute;
    top: 150px;
    left: 205px;
    padding: 40px;
}

.button-col {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.my-row {
    margin-top: 10px;
}

.centered-avatar {
    /* 如果需要调整头像的大小，可以在这里设置宽度和高度属性 */
    width: 120px;
    height: 120px;
}

.flex-grow {
    flex-grow: 1;
}

.demo-type {
    display: flex;
}

.demo-type>div {
    flex: 1;
    text-align: center;
}

.demo-type>div:not(:last-child) {
    border-right: 1px solid var(--el-border-color);
}

.el-col {
    text-align: center;
}

.MyPage {
    border: 1px solid #ccc;
    font-size: 20px;
    position: absolute;
    top: 390px;
    left: 185px;
    right: 0;
    padding: 40px;
    /* 调整组件的间距 */
    margin: 0 auto;
    max-width: 1400px;
}

.el-descriptions {
    margin-top: 20px;
}

.cell-item {
    display: flex;
    align-items: center;
}

.margin-top {
    margin-top: 20px;
}
</style>