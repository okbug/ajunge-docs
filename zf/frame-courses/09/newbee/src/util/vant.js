import Vue from 'vue'
import {
  Button, NavBar, Form, Field, Swipe, SwipeItem,
  Lazyload, Grid, GridItem, Image as VanImage, GoodsAction, GoodsActionIcon,
  GoodsActionButton, Card, Checkbox, CheckboxGroup, Stepper, SubmitBar,
  AddressList, AddressEdit, ContactCard, ActionSheet, Tab, Tabs
} from 'vant'
[Button, NavBar, Form, Field, Swipe, SwipeItem,
  Lazyload, Grid, GridItem, VanImage, GoodsAction, GoodsActionIcon,
  GoodsActionButton, Card, Checkbox, CheckboxGroup, Stepper, SubmitBar,
  AddressList, AddressEdit, ContactCard, ActionSheet, Tab, Tabs].forEach(item => {
    Vue.use(item)
  })
