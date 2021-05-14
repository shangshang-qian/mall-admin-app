<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item label="标题" prop="title" required>
      <a-input v-model="form.title" />
    </a-form-model-item>
    <a-form-model-item
      label="商品描述"
      prop="desc"
      placeholder="请输入商品描述"
    >
      <a-input v-model="form.desc" />
    </a-form-model-item>
    <a-form-model-item label="商品类目" required prop="category">
      <a-select v-model="form.category" @change="onChange">
        <a-select-option v-for="c in categoryList" :value="c.id" :key="c.id">
          {{ c.name }}
        </a-select-option>
      </a-select>
      <a-select v-model="form.c_item" placeholder='请选择子类目'>
        <a-select-option v-for="c in c_itemsList" :value="c" :key="c" >
          {{ c }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品标签" required prop="tags">
      <a-select
        mode="tags"
        placeholder="Tags Mode"
        v-model="form.tags"
        :default-value="['包邮，最晚次日达']"
      >
        <a-select-option value="包邮，次日送达">
          {{ "包邮，次日送达" }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="" :wrapperCol="{span:24}" >
      <a-button @click="next" type="primary">下一步</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 10 },
      rules: {},
      categoryList: [],
      c_itemsList: [],
    };
  },
  props: {
    form: Object,
  },
  created() {
    categoryApi.list().then((res) => {
      this.categoryList = res.data;
      // this.categoryList.forEach((ele) => {
      //   if (ele.id === this.form.category) {
      //     this.c_itemsList = ele.c_items;
      //   }
      // });
      return 1;
    });
  },
  methods: {
    onChange(val) {
      this.categoryList.forEach((ele) => {
        if (ele.id === val) {
          this.c_itemsList = ele.c_items;
        }
      });
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
        } else {
          console.log('error submit!!');
          return false;
        }
        return false;
      });
    },
  },
};
</script>
