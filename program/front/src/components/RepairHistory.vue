<template>
  <div class="repair-history-part">
    <h3 class="part-title" style="margin-left: 0px;display: flex;">{{ title }}</h3>
    <!-- <div class="button-group-wrapper"> -->
      <div class="button-group" >
        <el-button style="left: 0px;"
          :type="hasRepair ? 'primary' : 'default'"
          @click="setHasRepair(true)"
        >有</el-button>
        <el-button
          :type="!hasRepair ? 'primary' : 'default'"
          @click="setHasRepair(false)"
        >无</el-button>
      </div>
    <!-- </div> -->

    <div v-if="hasRepair" class="repair-details">
      <el-form>
        <el-form-item label="维修详情">
          <el-input
            type="textarea"
            v-model="repairDetails"
            placeholder="请输入维修详情"
            rows="3"
            
            style="width: 50%;"></el-input>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hasRepair: false,
      repairDetails: ''
    };
  },
  methods: {
    setHasRepair(value) {
      this.hasRepair = value;
      if (!value) {
        this.repairDetails = '';
      }
    }
  }
};
</script>

<style>

.repair-history-part {
  margin-bottom: 20px;
  
}

.part-title {
  
  font-size: 18px;
  font-weight: bold;
}

.button-group {
  position: absolute;
  margin-top: 5px;
  margin-left: 0;
}

.repair-details {
  margin-top: 75px;
}

</style>
