<template>
  <div class="ordering">
    <div>订单列表</div>
  </div>
  <div class="OrderDetailsContainer">
    <div class="OrderDetails">
      <el-table :data="displayedRecycleData" style="width: 100%">
        <el-table-column font-size="20px" prop="OrderID" label="订单ID" width="100" />
        <el-table-column prop="Recycle_Location" label="回收地址" width="100" />
        <el-table-column prop="ExpectedPrice" label="预期价格" width="100" />
        <el-table-column prop="Recycle_Time" label="回收时间" width="200" />
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="{ row }">
            <el-button link type="primary" size="middle" @click="openDetailsDialog(row)">详情</el-button>
            <el-button link type="danger" size="middle" @click="openDeleteDialog(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <div class="pageChange">
        <el-pagination background layout="prev, pager, next" :total="totalOrders" :current-page="currentPage"
          :page-size="pageSize" @current-change="handlePageChange" />
      </div>
    </div>
  </div>
  <!-- 详情弹窗 -->
  <el-dialog v-model="detailsDialogVisible" title="订单详情">
    <div v-if="selectedOrder" class="details-dialog-content">
      <div class="details-left-column">
        <div><strong>订 单 I D:</strong> {{ selectedOrder.OrderID }}</div>
        <div><strong>回 收 地 址:</strong> {{ selectedOrder.Recycle_Location }}</div>
        <div><strong>预 期 价 格:</strong> {{ selectedOrder.ExpectedPrice }}</div>
        <div><strong>回 收 时 间:</strong> {{ selectedOrder.Recycle_Time }}</div>
        <div><strong>回 收 类 型:</strong> {{ selectedOrder.Device.Device_Cate_ID.CategoryName }}</div>
        <div><strong>回 收 品 牌:</strong> {{ selectedOrder.Device.Device_Type_ID.Brand }}</div>
        <div><strong>品 牌 I D:</strong> {{ selectedOrder.Device.Device_Type_ID.TypeID }}</div>
        <div><strong>品 牌 详 情:</strong> {{ selectedOrder.Device.Device_Type_ID.Type_Name }}</div>
        <div><strong>回 收 时 间:</strong> {{ selectedOrder.Recycle_Time }}</div>
      </div>

      <div class="details-right-column">
        <div>
          <strong>图 片：</strong>
          <div v-for="imageUrl in selectedOrder.Images" :key="imageUrl">
            <img :src="imageUrl" alt="图片"
              style="max-width: 100px; max-height: 100px; margin-right: 10px; cursor: pointer;"
              @click="openImageModal(imageUrl)">
          </div>
        </div>
      </div>
    </div>
  </el-dialog>

  <!-- 删除弹窗 -->
  <el-dialog v-model="deleteDialogVisible" title="删除订单" width="30%" :before-close="handleDeleteDialogClose">
    <span>确定要删除这条订单信息吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="deleteOrder">确定</el-button>
        <el-button @click="handleDeleteDialogClose">取消</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 放大图片的弹窗 -->
  <el-dialog v-model="isImageModalVisible" title="放大图片">
    <div v-if="selectedImage">
      <img :src="selectedImage" alt="放大图片" style="max-width: 100%; max-height: 100%;" />
    </div>
  </el-dialog>
</template>

<script>
import { getRecycleOrderInfo, deleteRecycleOrderInfo } from '@/api/order.js';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['userid']),
  },
  data() {
    return {
      recycleData: [], // 存储订单数据

      deleteDialogVisible: false, // 删除弹窗可见性
      detailsDialogVisible: false, // 初始化为false
      selectedOrder: null, // 选中的订单数据

      o_id: "",

      displayedRecycleData: [], // 当前页面显示的回收订单数据
      totalOrders: 0, // 总订单数
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的订单数
      isImageModalVisible: false,
      selectedImage: '',
    };
  },
  created() {
    console.log("尝试获取回收订单信息")
    this.getOrderData()
      .then((res) => {
        // 处理返回的用户个人资料数据
        this.totalOrders = res.data.num;
        this.updateDisplayedRecycleData(); // 更新当前页面显示的数据
      })
      .catch((error) => {
        // 处理错误
        console.error('', error); // 打印错误信息
      });
  },
  mounted() {
    // 在组件加载完成后重新计算表格头部的宽度
    this.$nextTick(() => {
      const tableHeader = document.querySelector(".el-table__header");
      const tableBody = document.querySelector(".el-table__body-wrapper");
      if (tableHeader && tableBody) {
        tableHeader.style.width = tableBody.offsetWidth + "px";
      }
    });
  },
  methods: {
    getOrderData() {
      return getRecycleOrderInfo(this.userid)
        .then((res) => {
          // 处理返回的数据
          this.recycleData = res.data.recycle_order;
          console.log("拿数据成功：", this.recycleData);
          this.totalOrders = res.data.num;
          this.updateDisplayedRecycleData(); // 更新当前页面显示的数据
        })
        .catch((error) => {
          // 处理错误
          console.error('获取维修订单信息失败:', error);
        });
    },
    openDetailsDialog(row) {
      this.selectedOrder = row;
      this.detailsDialogVisible = true;
    },

    // 更新当前页面显示的数据
    updateDisplayedRecycleData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.displayedRecycleData = this.recycleData.slice(startIndex, endIndex);
    },
    // 处理分页切换
    handlePageChange(page) {
      this.currentPage = page; // 更新当前页码
      this.updateDisplayedRecycleData(); // 更新当前页面显示的数据
    },

    // 打开删除弹窗
    openDeleteDialog(row) {
      this.selectedOrder = row;
      this.o_id = this.selectedOrder.OrderID;
      this.deleteDialogVisible = true;
    },

    // 关闭删除弹窗
    handleDeleteDialogClose() {
      this.selectedOrder = null;
      this.deleteDialogVisible = false;
    },

    openImageModal(imageUrl) {
      this.selectedImage = imageUrl;
      this.isImageModalVisible = true;
      console.log(imageUrl);
    },

    closeImageModal() {
      this.isImageModalVisible = false;
      this.selectedImage = ''; // 清空选中的图片
    },

    // 删除订单
    deleteOrder() {
      // 关闭删除弹窗
      this.handleDeleteDialogClose();

      // 调用删除订单的 API 方法
      deleteRecycleOrderInfo(this.userid, this.o_id)
        .then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            this.$message.success("删除成功");
            // 刷新订单数据
            this.getOrderData();
          } else {
            console.error("删除失败");
          }
        })
        .catch((error) => {
          console.error("请求发生错误：", error);
          this.$message.error("删除失败");
        });
    },

    // 分页回调
    currentChange(e) {
      console.log(e);
    },
  },
};
</script>

<style>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.pageChange {
  display: flex;
  justify-content: center;
}

.ordering {
  font-size: 30px;
  text-align: center;
  padding: 10px 0;
}

.OrderDetailsContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  text-align: center;
}

.OrderDetails {
  font-size: 25px;
  max-width: 1400px;
  margin-top: 0px;
  /* 调整与页面上方的距离 */
  padding: 20px;
  /* 增加内边距 */
  border: 1px solid #ccc;
  /* 添加边框样式 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  /* 添加阴影效果 */
  display: inline-block;
  vertical-align: middle;
}

.el-table__header {
  height: 0px;
}

.details-dialog-content {
  display: flex;
}

.details-left-column {
  flex: 1;
  text-align: left;
  padding-right: 20px;
}

.details-right-column {
  flex: 1;
  text-align: left;
  padding-left: 20px;
}
</style>