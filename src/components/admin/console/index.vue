<template>
    <el-container class="layout-container-demo" style="height: 100%;background: #FFF">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :router="true" :default-active="route.path">
            <el-menu-item index="index"><el-icon><House/></el-icon>主页</el-menu-item>
            <el-menu-item index="chart"><el-icon><PieChart/></el-icon>数据分析</el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
        >
            <el-menu-item index="0" disabled>CreditPay 管理后台</el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
            </el-sub-menu>
        </el-menu>
      </el-header>

      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.layout-container-demo .el-header .el-menu {
  border-bottom: 0;
  width: 100%;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.flex-grow{
    flex-grow: 1;
}
</style>

<script lang="ts" setup>
import { Menu, House, PieChart } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route)
</script>