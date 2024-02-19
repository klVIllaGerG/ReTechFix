<template>
  <div class="ordering">
    <div>订单列表</div>
  </div>
  <div class="OrderDetailsContainer">
    <div class="OrderDetails">
      <el-table :data="displayedRepairData" style="width: 100%">
        <el-table-column prop="OrderID" label="订单ID" width="80" />
        <el-table-column prop="CreateTime" label="创建时间" width="200" />
        <el-table-column prop="OrderPrice" label="订单金额" width="80" />
        <el-table-column prop="CouponID" label="优惠券ID" width="80" />
        <el-table-column prop="EngineerID" label="工程师ID" width="80" />
        <el-table-column prop="RepairLocation" label="维修地点" width="200" />
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="{ row }">
            <el-button link type="info" size="middle" @click="openDetailsDialog(row)">详情</el-button>
            <el-button link type="primary" size="middle" @click="openEditDialog(row)">撤回</el-button>
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
        <!-- 左侧内容 -->
        <div><strong>优惠券 ID:</strong> {{ selectedOrder.CouObj.Id }}</div>
        <div><strong>优 惠 折 扣:</strong> {{ selectedOrder.CouObj.Discount }}</div>
        <div><strong>优 惠 类 型:</strong> {{ selectedOrder.CouObj.Name }}</div>
        <div><strong>是 否 使 用:</strong> {{ selectedOrder.CouObj.Status }}</div>
        <div><strong>优 惠 编 号:</strong> {{ selectedOrder.CouObj.Type }}</div>
        <div><strong>维 修 品 牌:</strong> {{ selectedOrder.RepairOptionID.Brand }}</div>
        <div><strong>维 修 详 情:</strong> {{ selectedOrder.RepairOptionID.RepairCategory.Detail }}</div>
        <!-- 其他左侧内容 -->
      </div>
      <div class="details-right-column">
        <!-- 右侧内容 -->
        <div><strong>维 修 I D:</strong> {{ selectedOrder.RepairOptionID.RepairCategory.ID }}</div>
        <div><strong>维 修 设 备:</strong> {{ selectedOrder.RepairOptionID.RepairCategory.Name }}</div>
        <div><strong>维 修 需 求:</strong> {{ selectedOrder.RepairOptionID.RepairRequirement }}</div>
        <div><strong>维 修 时 间:</strong> {{ selectedOrder.RepairTime }}</div>
        <strong>图 片：</strong>
          <div v-for="imageUrl in selectedOrder.Images" :key="imageUrl">
            <img :src="imageUrl" alt="图片"
              style="max-width: 100px; max-height: 100px; margin-right: 10px; cursor: pointer;"
              @click="openImageModal(imageUrl)">
          </div>
        <!-- 其他右侧内容 -->
      </div>
    </div>
  </el-dialog>
  <!-- 撤回弹窗 -->
  <el-dialog v-model="refundDialogVisible" title="撤回订单" :before-close="handleEditDialogClose">
    <span>确定要撤回这条订单信息吗(撤回后界面将不再显示该订单)？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleEditDialogClose">取消</el-button>
        <el-button type="primary" @click="submitEditForm">确定</el-button>
      </span>
    </template>

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
import { getRepairOrderInfo, refundRepairOrder, deleteRepairOrderInfo } from '@/api/order.js'; // 根据实际情况导入维修订单的前后端交互函数
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['userid']),
  },
  data() {
    return {
      repairData: [],
      refundDialogVisible: false, // 撤回弹窗可见性

      o_id: "", //记录选中的订单id

      detailsDialogVisible: false, // 初始化为false
      deleteDialogVisible: false, // 删除弹窗可见性
      selectedOrder: null, // 选中的订单数据
      displayedRepairData: [], // 当前页面显示的维修订单数据
      totalOrders: 0, // 总订单数
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的订单数
    };
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
  created() {
    console.log("尝试获取维修订单信息")
    this.getOrderData()
      .then((res) => {
        this.totalOrders = res.data.num;
        this.updateDisplayedRepairData(); // 更新当前页面显示的数据
      })
      .catch((error) => {
        console.error('', error);
      });
  },
  methods: {
    getOrderData() {
      return getRepairOrderInfo(this.userid)
        .then((res) => {
          this.repairData = res.data.repair_order; // 将获取到的数据存储到repairData中
          console.log("拿数据成功：", this.repairData);
          this.totalOrders = res.data.num;
          this.updateDisplayedRepairData(); // 更新当前页面显示的数据
        })
        .catch((error) => {
          console.error('获取维修订单信息失败:', error);
        });
    },
    openDetailsDialog(row) {
      this.selectedOrder = row;
      this.detailsDialogVisible = true;
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
    // 更新当前页面显示的数据
    updateDisplayedRepairData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.displayedRepairData = this.repairData.slice(startIndex, endIndex);
    },
    // 处理分页切换
    handlePageChange(page) {
      this.currentPage = page;
      this.updateDisplayedRepairData(); // 更新当前页面显示的数据
    },
    // 打开撤回弹窗
    openEditDialog(row) {
      this.selectedOrder = row;
      this.o_id = this.selectedOrder.OrderID;
      this.o_value = this.selectedOrder.OrderPrice;
      console.log(this.o_value);
      console.log(this.o_id);

      this.refundDialogVisible = true;
    },
    // 关闭撤回弹窗
    handleEditDialogClose() {
      this.refundDialogVisible = false;
      console.log("取消撤回");
    },
    // 提交撤回表单
    submitEditForm() {
      // 关闭弹窗
      this.refundDialogVisible = false;

      refundRepairOrder(this.userid, this.o_value)
        .then((res) => {
          console.log(res.data);
          if (res.data.success === false) {
            this.$message.error("撤回订单失败");
            return;
          }
        })
        .catch((error) => {
          console.error("请求发生错误：", error);
          console.error("撤回订单失败");
          return;
        });


      // 调用删除订单的 API 方法
      deleteRepairOrderInfo(this.userid, this.o_id)
        .then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            this.$message.success("撤回订单成功，退款将会在2小时内到账！");
            // 刷新订单数据
            this.getOrderData();
          } else {
            console.error("撤回订单失败");
          }
        })
        .catch((error) => {
          console.error("请求发生错误：", error);
          this.$message.error("撤回订单失败");
        });

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
    // 删除订单
    deleteOrder() {
      // 关闭删除弹窗
      this.handleDeleteDialogClose();

      // 调用删除订单的 API 方法
      deleteRepairOrderInfo(this.userid, this.o_id)
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
  align-items: stretch;
  /* 保持两列高度一致 */
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