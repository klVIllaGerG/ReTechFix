<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <!--logo部分-->
        <el-menu-item index="0" @click="tomain"> <img :src="logo" style="width: 120px; height: 92px" /></el-menu-item>
        <el-col :span="16">
            <!--搜索栏部分-->
            <div class="search">
                <el-row>
                    <el-col :span="16" :offset="4">
                        <el-input v-model="input" @keydown="handleKeypress" placeholder="请输入" />
                    </el-col>
                    <el-col :span="4" :offset="0">
                        <el-button type="primary" class="search-btn" @click="search">搜索</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-col>
        <!--右部菜单部分-->
        <div class="flex-grow" />
        <el-menu-item index="1" @click="tomail">邮箱</el-menu-item>
        <el-menu-item index="2" @click="toevaluatepage">维修与回收</el-menu-item>
        <el-menu-item index="3" @click="tomainhome">
            <template #title>个人主页</template>
        </el-menu-item>
    </el-menu>
</template>

<script >
import { ref } from 'vue'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "header",
    data() {
        return {
            activeIndex: ref(''),
            logo: require("../assets/project.png"),
            input: '',
            filteredItems: [],
        }
    },

    methods: {
        handleKeypress(e) {
            console.log(e.keyCode)
            if (e.keyCode === 32) {
                console.log("识别空格成功")
                this.input = this.input + ' '  //使用指定的字符替换空格
                e.preventDefault();
            }
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
        },
        tomail(){
            this.$router.push('/mail')
        },
        tomain() {
            this.$router.push('/mainpage')
        },
        toevaluatepage() {
            this.$router.push('/evaluatepage')
        },
        tomainhome() {
            this.$router.push('/MainHome')
        },
        search() {
            console.log("点击了搜索键")
            console.log(this.input)
            this.$router.push({ path: '/search', query: { input: this.input } });
            this.$forceUpdate()
        },
        emitSearch() {
            this.$emit("search", this.input);
        }
    },
    watch: {
        input() {
            this.emitSearch();
        }
    }
}
</script>

<style scoped>
.search {
    margin-top: 20px;
}

.flex-grow {
    flex-grow: 1;
}
</style>