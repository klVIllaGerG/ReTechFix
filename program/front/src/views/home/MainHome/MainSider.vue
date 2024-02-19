<template>
  <!-- 侧边栏 -->

  <div class="sidebar-cont">
    <el-menu :default-active="ac_index" @select="Select">
      <div v-for="(item, index) in menu" :key="index">
        <router-link :to="{ path: item.router }">
          <el-menu-item v-if="item.Subclass.length == 0" :index="item.id">
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span style="font-size:15px">{{ item.title }}</span>
          </el-menu-item>
          <p></p>
        </router-link>
        <!-- 二级 -->
        <el-sub-menu v-if="item.Subclass.length > 0" :index="item.id">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span style="font-size:15px">{{ item.title }}</span>
          </template>
          <div v-for="(two, index_two) in item.Subclass" :key="index_two">
            <router-link :to="{ path: two.router }">
              <el-menu-item style="font-size:12px" :index="two.id">{{ two.title }}</el-menu-item>
            </router-link>
          </div>
        </el-sub-menu>
        <p></p>
      </div>
    </el-menu>
  </div>
  <router-view></router-view>
</template>

<script>
import {
  Tickets,
  LocationInformation,
  LocationFilled,
  AddLocation,
  PhoneFilled,
  Help,
  InfoFilled,
  Setting,
  House
} from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

export default {
  components: {
    Tickets,
    LocationInformation,
    LocationFilled,
    AddLocation,
    PhoneFilled,
    Help,
    InfoFilled,
    Setting,
    House
  },
  setup() {
    const ac_index = ref('1')

    const Array = [
      {
        id: '1',
        icon: House,
        title: '个人主页',
        router: 'OwnPage',
        Subclass: []
      },
      {
        id: '2',
        icon: Tickets,
        title: '我的订单',
        router: 'OrderCenter',
        Subclass: [{
          id: '2-1',
          title: '回收订单',
          router: 'RecycleCenter',
        },
        {
          id: '2-2',
          title: '维修订单',
          router: 'RepairCenter',
        }]
      },
      {
        id: '3',
        icon: LocationInformation,
        title: '邮寄地址',
        router: 'MyAddress',
        Subclass: []
      },
      {
        id: '4',
        icon: PhoneFilled,
        title: '联系客服',
        router: 'question',
        Subclass: []
      },
      {
        id: '5',
        icon: Help,
        title: '充值提现',
        router: 'money',
        Subclass: []
      },
      {
        id: '6',
        icon: InfoFilled,
        title: '关于我们',
        router: 'aboutus',
        Subclass: []
      },
      {
        id: '7',
        icon: Setting,
        title: '账户设置',
        router: 'PersonalSettings',
        Subclass: []
      }]
    const menu = reactive(Array)


    return { menu, ac_index }
  }
}
</script>

<style scoped>
.sidebar-cont {
  position: fixed;
  top: 135px;
  left: 0;
  bottom: 50px;
  background: #ffffff;
  width: 9%;
  height: 100vh;
  color: #000000 !important;
  overflow-y: auto;
  /* 调整样式 */
  background-color: #ffffff;

}

/* 调整菜单激活样式 */
.el-menu-item--active {
  background-color: #ffffff;
}

.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
}
</style>