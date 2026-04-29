import { createApp } from 'vue'

import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router.js'
import 'element-plus/dist/index.css'
import './mock/mockServer.js'
import axios from 'axios';
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import AntDesignVue from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import { Col, Row, Button,Search,Swipe,SwipeItem,Grid,GridItem,Tabbar,TabbarItem,Tab,Tabs,Image as VanImage,
  Sticky ,NavBar,Cell, CellGroup,Dialog,AddressList,Stepper,Sidebar, SidebarItem,Empty,Toast,showLoadingToast,AddressEdit,
  ActionSheet,Cascader,Area,SwipeCell,Card,SubmitBar,RadioGroup,Radio,Checkbox, CheckboxGroup,ActionBar,ActionBarIcon,ActionBarButton,       
  ContactCard,CouponCell, CouponList,ShareSheet,NoticeBar,Step, Steps,Rate,DropdownMenu, DropdownItem    
} from 'vant';


const app =createApp(App)
app.use(store)
app.use(Vant)
app.use(ElementPlus)
app.use(router)
app.use(AntDesignVue)
app.use(Col);
app.use(Row);
app.use(Search);
app.use(Button);
app.use(Swipe);
app.use(SwipeItem);
app.use(Grid);
app.use(GridItem);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Tab);
app.use(Tabs);
app.use(VanImage);
app.use(Sticky);
app.use(NavBar);
app.use(Cell);
app.use(CellGroup);
app.use(Dialog);
app.use(AddressList);
app.use(Stepper);
app.use(Sidebar);
app.use(SidebarItem);
app.use(Empty);
app.use(Toast);
app.use(showLoadingToast);
app.use(AddressEdit);
app.use(ActionSheet);
app.use(Cascader);
app.use(Area);
app.use(SwipeCell);
app.use(Card);
app.use(SubmitBar);
app.use(Radio);
app.use(RadioGroup);
app.use(Checkbox);
app.use(CheckboxGroup);
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);
app.use(ContactCard);
app.use(CouponCell);
app.use(CouponList);
app.use(ShareSheet);
app.use(NoticeBar);
app.use(Step);
app.use(Steps);
app.use(Rate);
app.use(DropdownMenu);
app.use(DropdownItem);
app.mount('#app')
