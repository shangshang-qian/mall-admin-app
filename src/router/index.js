import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getMenuRoutes from '@/utils/permission';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);

const allowRouterMap = [{
  path: '/product',
  name: 'Product',
  component: Home,
  meta: {
    title: '商品',
    icon: 'shopping-cart',
  },
  children: [{
    path: 'add',
    name: 'ProductAdd',
    component: () => import('@/views/page/productAdd.vue'),
    meta: {
      title: '添加商品',
      icon: 'plus',
    },
  }, {
    path: 'list',
    name: 'ProductList',
    component: () => import('@/views/page/productList.vue'),
    meta: {
      title: '商品列表',
      icon: 'unordered-list',
    },
  }, {
    path: 'edit/:id',
    name: 'ProductEdit',
    component: () => import('@/views/page/productAdd.vue'),
    meta: {
      title: '编辑商品',
      icon: 'unordered-list',
      hidden: true,
    },
  }, {
    path: 'category',
    name: 'Category',
    component: () => import('@/views/page/category.vue'),
    meta: {
      title: '类目管理',
      icon: 'diff',
    },
    children: [{
      path: 'add',
      name: 'CategoryAdd',
      component: () => import('@/views/page/categoryAdd.vue'),
      meta: {
        title: '新增类目',
        hidden: true,
      },
    }, {
      path: 'edit/:id',
      name: 'CategoryEdit',
      component: () => import('@/views/page/categoryAdd.vue'),
      meta: {
        title: '编辑类目',
        hidden: true,
      },
    }],
  }],
}];

const routes = [{
  path: '/',
  name: 'Home',
  redirect: '/index',
  meta: {
    title: '首页',
    hidden: false,
    icon: 'home',
  },
  component: Home,
  children: [{
    path: 'index',
    name: 'Index',
    meta: {
      title: '统计',
      icon: 'line-chart',
    },
    component: () => import('../views/page/index.vue'),
  }],
},
{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: '登录',
    hidden: true,
  },
}];

const router = new VueRouter({
  routes,
});

let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.email
        && store.state.user.role && store.state.user.username) {
      if (!isAddRoutes) {
        const allowRoutes = getMenuRoutes(store.state.user.role, allowRouterMap);
        store.dispatch('changeMenuRoutes', routes.concat(allowRoutes)).then(() => {
          router.addRoutes(allowRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});
export default router;
