<template>
  <div class="main-header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ this.currentRoutes[0].meta.title }}</a-breadcrumb-item>
        <a-breadcrumb-item>
          <a :to="{name: this.currentRoutes[1].name}">{{ this.currentRoutes[1].meta.title }}</a>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="app-admin">
      <li>
        {{ userInfo.username }}
        <a-icon type="down" />
      </li>
      <li @click="signOut">退出</li>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getCookie } from '@/utils/userCookies';

export default {
  data() {
    return {
      currentRoutes: [],
    };
  },
  watch: {
    $route: {
      handler() {
        this.currentRoutes = this.$router.currentRoute.matched;
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapState(['collapsed']),
    userInfo: () => getCookie(),
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('toggleCollapsed');
    },
    signOut() {
      // removeCookie();
      // this.$forceUpdate();  没有起作用
      this.$store.dispatch('clearInfo');
      this.$router.push({
        name: 'Login',
      });
    },
  },
};
</script>
