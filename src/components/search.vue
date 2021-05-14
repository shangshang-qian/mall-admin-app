<template>
  <a-form-model layout="inline" :model="searchForm" @submit="handleSubmit" @submit.native.prevent>
    <a-form-model-item>
      <a-input v-model="searchForm.searchWord" placeholder="请输入关键字">
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
       <a-select
                showSearch
                allowClear
                placeholder="选择类目"
                style="width: 200px"
                @change="handleChange"
       >
    <a-select-option v-for="c in categoryList" :value="c.id" :key="c.id" >
      {{ c.name }}
    </a-select-option>
  </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
      >
        搜索
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>

export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['categoryList'],
  methods: {
    handleSubmit() {
      this.$emit('submit', this.searchForm);
    },
    handleChange(val) {
      this.searchForm.category = val;
    },
  },
};
</script>
