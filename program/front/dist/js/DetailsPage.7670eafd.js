"use strict";(self["webpackChunknewpage"]=self["webpackChunknewpage"]||[]).push([[868],{24070:(e,t,n)=>{n.r(t),n.d(t,{default:()=>W});n(68309),n(82526),n(41817);var r=n(73396),i=n(87139),l={class:"product-details"},u={class:"left-section"},o={class:"display"},a={class:"product-image"},c=["src","onClick"],p={class:"right-section"},s={class:"card-header"},d={class:"product-name"},m={class:"container"},f={class:"button-group"},g=(0,r._)("span",{style:{width:"90px"}},null,-1);function w(e,t,n,w,y,h){var _=(0,r.up)("seach"),v=(0,r.up)("el-step"),W=(0,r.up)("el-steps"),k=(0,r.up)("el-header"),b=(0,r.up)("el-image"),x=(0,r.up)("el-carousel-item"),S=(0,r.up)("el-carousel"),U=(0,r.up)("el-descriptions-item"),C=(0,r.up)("el-descriptions"),D=(0,r.up)("el-button"),z=(0,r.up)("el-card");return(0,r.wg)(),(0,r.iD)("div",null,[(0,r.Wm)(_),(0,r.Wm)(k,{style:{"margin-top":"20px"}},{default:(0,r.w5)((function(){return[(0,r.Wm)(W,{active:1,"align-center":""},{default:(0,r.w5)((function(){return[(0,r.Wm)(v,{title:"Step 1",description:"Some description"}),(0,r.Wm)(v,{title:"Step 2",description:"Some description"}),(0,r.Wm)(v,{title:"Step 3",description:"Some description"}),(0,r.Wm)(v,{title:"Step 4",description:"Some description"})]})),_:1})]})),_:1}),(0,r._)("div",l,[(0,r._)("div",u,[(0,r._)("div",o,[(0,r._)("div",a,[(0,r.Wm)(b,{style:{width:"300px",height:"300px"},src:y.product.currentimageUrl,"zoom-rate":1.2,"preview-src-list":y.product.srcList,"initial-index":0,fit:"cover",alt:"Product Image"},null,8,["src","preview-src-list"])])]),(0,r.Wm)(S,{interval:4e3,type:"card",height:"200px",modelValue:y.activeIndex,"onUpdate:modelValue":t[0]||(t[0]=function(e){return y.activeIndex=e})},{default:(0,r.w5)((function(){return[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(y.product.imageList,(function(e){return(0,r.wg)(),(0,r.j4)(x,{key:e.id},{default:(0,r.w5)((function(){return[(0,r._)("img",{src:e.url,alt:"Carousel Image",onClick:function(t){return h.changeImage(e.url)}},null,8,c)]})),_:2},1024)})),128))]})),_:1},8,["modelValue"])]),(0,r._)("div",p,[(0,r.Wm)(z,{class:"box-card"},{header:(0,r.w5)((function(){return[(0,r._)("div",s,[(0,r._)("h2",d,(0,i.zw)(y.product.name),1)])]})),default:(0,r.w5)((function(){return[(0,r.Wm)(C,{direction:"vertical",column:4,size:e.size,border:""},{default:(0,r.w5)((function(){return[(0,r.Wm)(U,{label:"设备类别"},{default:(0,r.w5)((function(){return[(0,r.Uk)((0,i.zw)(y.product.type),1)]})),_:1}),(0,r.Wm)(U,{label:"设备型号"},{default:(0,r.w5)((function(){return[(0,r.Uk)((0,i.zw)(y.product.name),1)]})),_:1}),(0,r.Wm)(U,{label:"使用时长"},{default:(0,r.w5)((function(){return[(0,r.Uk)("两年")]})),_:1}),(0,r.Wm)(U,{label:"市场价格"},{default:(0,r.w5)((function(){return[(0,r.Uk)((0,i.zw)(y.product.price),1)]})),_:1}),(0,r.Wm)(U,{label:"其他信息"},{default:(0,r.w5)((function(){return[(0,r.Uk)((0,i.zw)(y.product.description),1)]})),_:1})]})),_:1},8,["size"]),(0,r._)("div",m,[(0,r._)("div",f,[(0,r.Wm)(D,{class:"button",type:"primary",onClick:h.goToRecyclePage},{default:(0,r.w5)((function(){return[(0,r.Uk)("回收界面")]})),_:1},8,["onClick"]),g,(0,r.Wm)(D,{class:"button",type:"success",onClick:h.goToRepairPage},{default:(0,r.w5)((function(){return[(0,r.Uk)("维修界面")]})),_:1},8,["onClick"])])])]})),_:1})])])])}n(57658),n(34553);var y=n(78039);const h={name:"DetailsPage",data:function(){return{product:{type:"Phone",name:"iphone11",description:"高性能手机",price:"100$",currentimageUrl:n(91842),imageList:[{id:1,url:n(91842)},{id:2,url:n(91842)},{id:3,url:n(91842)},{id:4,url:n(91842)},{id:5,url:n(91842)}],srcList:["/public/p.jpg","/public/p.jpg","/public/p.jpg","/public/p.jpg","/public/p.jpg"]},activeIndex:0}},methods:{goToRecyclePage:function(){this.$router.push("/RecoveryPage")},goToRepairPage:function(){this.$router.push("/RepairPage")},changeImage:function(e){this.product.currentimageUrl=e,this.activeIndex=this.product.imageList.findIndex((function(t){return t.url===e}))}},watch:{activeIndex:function(e){this.product.currentimageUrl=this.product.imageList[e].url}},components:{seach:y.Z}};var _=n(40089);const v=(0,_.Z)(h,[["render",w]]),W=v},99233:(e,t,n)=>{n.r(t),n.d(t,{default:()=>N});var r=n(73396),i=n(87139),l={class:"product-recycle"},u={class:"left-panel"},o=["src"],a={class:"order-button"},c={class:"right-panel"},p={class:"product-info"},s={style:{display:"flex"}},d={style:{display:"flex","margin-bottom":"10px"}},m={class:"__services"},f=(0,r._)("span",{class:"gray-text"},"免费上门",-1),g=(0,r._)("span",{class:"gray-text"},"价格合理",-1),w=(0,r._)("span",{class:"gray-text"},"品质服务",-1),y=(0,r._)("hr",{style:{width:"370px","margin-left":"0px"}},null,-1),h={class:"storage-group",style:{"margin-top":"0px"}},_={class:"group-title"},v={class:"btn-group"},W={class:"product-form"},k={style:{"margin-left":"50px"}},b={style:{"margin-left":"50px"}};function x(e,t,n,x,S,U){var C=(0,r.up)("seach"),D=(0,r.up)("el-step"),z=(0,r.up)("el-steps"),O=(0,r.up)("el-header"),R=(0,r.up)("el-button"),V=(0,r.up)("Avatar"),I=(0,r.up)("el-icon"),j=(0,r.up)("Shop"),H=(0,r.up)("Management"),P=(0,r.up)("storage-group"),A=(0,r.up)("DropdownList"),L=(0,r.up)("el-form-item"),q=(0,r.up)("el-input"),Z=(0,r.up)("RepairHistory"),$=(0,r.up)("el-form");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(C),(0,r.Wm)(O,{style:{"margin-top":"20px"}},{default:(0,r.w5)((function(){return[(0,r.Wm)(z,{active:2,"align-center":""},{default:(0,r.w5)((function(){return[(0,r.Wm)(D,{title:"Step 1",description:"Some description"}),(0,r.Wm)(D,{title:"Step 2",description:"Some description"}),(0,r.Wm)(D,{title:"Step 3",description:"Some description"}),(0,r.Wm)(D,{title:"Step 4",description:"Some description"})]})),_:1})]})),_:1}),(0,r._)("div",l,[(0,r._)("div",u,[(0,r._)("img",{src:S.productImage,alt:"Device Image",style:{height:"400px",width:"400px"}},null,8,o),(0,r._)("div",a,[(0,r.Wm)(R,{type:"primary",onClick:U.goback,class:"order-button"},{default:(0,r.w5)((function(){return[(0,r.Uk)(" 返回 ")]})),_:1},8,["onClick"]),(0,r.Wm)(R,{type:"primary",onClick:U.submitForm,class:"order-button"},{default:(0,r.w5)((function(){return[(0,r.Uk)(" 下单 ")]})),_:1},8,["onClick"])])]),(0,r._)("div",c,[(0,r._)("div",p,[(0,r._)("h1",s,(0,i.zw)(S.productName),1),(0,r._)("h2",d,(0,i.zw)(S.productModel),1),(0,r._)("p",m,[(0,r.Wm)(I,{class:"gray-icon"},{default:(0,r.w5)((function(){return[(0,r.Wm)(V)]})),_:1}),f,(0,r.Wm)(I,{class:"gray-icon"},{default:(0,r.w5)((function(){return[(0,r.Wm)(j)]})),_:1}),g,(0,r.Wm)(I,{class:"gray-icon"},{default:(0,r.w5)((function(){return[(0,r.Wm)(H)]})),_:1}),w]),y]),(0,r._)("div",h,[(0,r._)("h3",_,(0,i.zw)(n.title),1),(0,r._)("div",v,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(n.options,(function(t,n){return(0,r.wg)(),(0,r.j4)(R,{key:n,type:e.selectedOption===t.value?"primary":"default",onClick:function(e){return U.selectOption(t.value)}},{default:(0,r.w5)((function(){return[(0,r.Uk)((0,i.zw)(t.label),1)]})),_:2},1032,["type","onClick"])})),128))])]),(0,r._)("div",W,[(0,r.Wm)($,{ref:"productForm",model:S.form,"label-width":"120px"},{default:(0,r.w5)((function(){return[(0,r._)("div",k,[(0,r.Wm)(P,{title:"存储容量",options:["64GB","128GB","256GB","512GB"],onOptionSelected:e.handleOptionSelected},null,8,["onOptionSelected"])]),(0,r.Wm)(L,{label:"购买渠道"},{default:(0,r.w5)((function(){return[(0,r._)("div",null,[(0,r.Wm)(A,{options:["自营门店","官方门店","网络门店"]})])]})),_:1}),(0,r.Wm)(L,{label:"机身外观"},{default:(0,r.w5)((function(){return[(0,r.Wm)(q,{class:"input",modelValue:S.form.deviceAppearance,"onUpdate:modelValue":t[0]||(t[0]=function(e){return S.form.deviceAppearance=e})},null,8,["modelValue"])]})),_:1}),(0,r.Wm)(L,{label:"屏幕显示"},{default:(0,r.w5)((function(){return[(0,r.Wm)(q,{class:"input",modelValue:S.form.screenDisplay,"onUpdate:modelValue":t[1]||(t[1]=function(e){return S.form.screenDisplay=e})},null,8,["modelValue"])]})),_:1}),(0,r.Wm)(L,{label:"屏幕外观"},{default:(0,r.w5)((function(){return[(0,r.Wm)(q,{class:"input",modelValue:S.form.screenAppearance,"onUpdate:modelValue":t[2]||(t[2]=function(e){return S.form.screenAppearance=e})},null,8,["modelValue"])]})),_:1}),(0,r._)("div",b,[(0,r.Wm)(Z,{title:"维修历史"})])]})),_:1},8,["model"])])])])],64)}n(57658);var S={class:"storage-group"},U={class:"group-header"},C={class:"group-title"},D={class:"btn-group"};function z(e,t,n,l,u,o){var a=(0,r.up)("el-button");return(0,r.wg)(),(0,r.iD)("div",S,[(0,r._)("div",U,[(0,r._)("h3",C,(0,i.zw)(n.title),1)]),(0,r._)("div",D,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(n.options,(function(e,t){return(0,r.wg)(),(0,r.j4)(a,{key:t,type:u.selectedOption===e?"primary":"default",onClick:function(t){return o.selectOption(e)}},{default:(0,r.w5)((function(){return[(0,r.Uk)((0,i.zw)(e),1)]})),_:2},1032,["type","onClick"])})),128))])])}const O={props:{title:{type:String,required:!0},options:{type:Array,required:!0}},data:function(){return{selectedOption:null}},methods:{selectOption:function(e){this.selectedOption=e,this.$emit("option-selected",e)}}};var R=n(40089);const V=(0,R.Z)(O,[["render",z],["__scopeId","data-v-1793109a"]]),I=V;var j={class:"repair-history-part"},H={class:"part-title",style:{"margin-left":"0px",display:"flex"}},P={class:"button-group"},A={key:0,class:"repair-details"};function L(e,t,n,l,u,o){var a=(0,r.up)("el-button"),c=(0,r.up)("el-input"),p=(0,r.up)("el-form-item"),s=(0,r.up)("el-form");return(0,r.wg)(),(0,r.iD)("div",j,[(0,r._)("h3",H,(0,i.zw)(n.title),1),(0,r._)("div",P,[(0,r.Wm)(a,{style:{left:"0px"},type:u.hasRepair?"primary":"default",onClick:t[0]||(t[0]=function(e){return o.setHasRepair(!0)})},{default:(0,r.w5)((function(){return[(0,r.Uk)("有")]})),_:1},8,["type"]),(0,r.Wm)(a,{type:u.hasRepair?"default":"primary",onClick:t[1]||(t[1]=function(e){return o.setHasRepair(!1)})},{default:(0,r.w5)((function(){return[(0,r.Uk)("无")]})),_:1},8,["type"])]),u.hasRepair?((0,r.wg)(),(0,r.iD)("div",A,[(0,r.Wm)(s,null,{default:(0,r.w5)((function(){return[(0,r.Wm)(p,{label:"维修详情"},{default:(0,r.w5)((function(){return[(0,r.Wm)(c,{type:"textarea",modelValue:u.repairDetails,"onUpdate:modelValue":t[2]||(t[2]=function(e){return u.repairDetails=e}),placeholder:"请输入维修详情",rows:"3",style:{width:"50%"}},null,8,["modelValue"])]})),_:1})]})),_:1})])):(0,r.kq)("",!0)])}const q={props:{title:{type:String,required:!0}},data:function(){return{hasRepair:!1,repairDetails:""}},methods:{setHasRepair:function(e){this.hasRepair=e,e||(this.repairDetails="")}}},Z=(0,R.Z)(q,[["render",L]]),$=Z;function G(e,t,n,l,u,o){var a=(0,r.up)("arrow-down"),c=(0,r.up)("el-icon"),p=(0,r.up)("el-button"),s=(0,r.up)("el-dropdown-item"),d=(0,r.up)("el-dropdown-menu"),m=(0,r.up)("el-dropdown");return(0,r.wg)(),(0,r.j4)(m,null,{dropdown:(0,r.w5)((function(){return[(0,r.Wm)(d,null,{default:(0,r.w5)((function(){return[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(n.options,(function(e,t){return(0,r.wg)(),(0,r.j4)(s,{key:t,onClick:function(t){return o.selectOption(e)}},{default:(0,r.w5)((function(){return[(0,r.Uk)((0,i.zw)(e),1)]})),_:2},1032,["onClick"])})),128))]})),_:1})]})),default:(0,r.w5)((function(){return[(0,r.Wm)(p,{type:"primary"},{default:(0,r.w5)((function(){return[(0,r.Uk)((0,i.zw)(u.selectedOption)+" ",1),(0,r.Wm)(c,{class:"el-icon--right"},{default:(0,r.w5)((function(){return[(0,r.Wm)(a)]})),_:1})]})),_:1})]})),_:1})}const Y={props:{options:{type:Array,required:!0}},data:function(){return{selectedOption:"请选择"}},methods:{selectOption:function(e){this.selectedOption=e}}},B=(0,R.Z)(Y,[["render",G]]),K=B;var T=n(78039);const F={name:"RecoveryPage",props:{title:{type:String,required:!0},options:{type:Array,required:!0}},data:function(){return{productImage:n(91842),productName:"设备名称",productModel:"设备型号",form:{storageCapacity:"",purchaseChannel:"",deviceAppearance:"",screenDisplay:"",screenAppearance:"",repairHistory:""}}},methods:{selectOption:function(e){this.selectedOption=e,this.$emit("option-selected",e)},submitForm:function(){this.$router.push({name:"recycleprice"})},goback:function(){this.$router.push({name:"DetailsPage"})}},handleOptionSelected:function(e){console.log("选中的存储容量:",e)},components:{seach:T.Z,StorageGroup:I,RepairHistory:$,DropdownList:K}},M=(0,R.Z)(F,[["render",x]]),N=M},91842:(e,t,n)=>{e.exports=n.p+"img/p.3c841285.jpg"}}]);
//# sourceMappingURL=DetailsPage.7670eafd.js.map