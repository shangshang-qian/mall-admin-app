<template>
  <a-form-model
    ref="ruleForm"
    :rules="rules"
    :model="form"
    :label-col="{ span: 7 }"
    :wrapper-col="{ span: 10 }"
  >
    <a-form-model-item label="类目名称" required prop="name">
      <a-input v-model="form.name" />
    </a-form-model-item>
    <a-form-model-item label="子类目" required prop="c_items">
      <a-select
        mode="tags"
        style="width: 100%"
        v-model="form.c_items"
      >
        <a-select-option v-for="i in form.c_items" :key="(i + 9).toString(36) + i">
          {{ }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 13, offset: 8 }">
      <a-button type="primary" @click="onSubmit"> Create </a-button>
      <a-button style="margin-left: 10px" @click="resetForm"> Reset </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      form: {
        name: '',
        c_items: [],
      },
      rules: {},
    };
  },
  props: {
    category: Object,
  },
  created() {
    if (this.$route.params) {
      this.form = {
        name: this.category.name,
        id: this.category.id,
        c_items: this.category.c_items,
      };
    } else {
      this.form = {
        name: '',
        c_items: [],
      };
    }
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.$route.params) {
            categoryApi.edit(this.form).then(() => {
              this.$router.push({
                name: 'Category',
              });
            });
          } else {
            categoryApi.add({
              ...this.form,
              id: +(`${new Date().getTime()}`).slice(7),
            }).then(() => {
              this.$router.push({
                name: 'Category',
              });
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
        return false;
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
//   watch: {
//     $route: {
//       handler() {
//         if (this.$route.params.id) {
//           this.form = {
//             name: this.category.name,
//             id: this.category.id,
//             c_items: this.category.c_items,
//           };
//         } else {
//           this.form.name = '';
//           this.form.c_items = [];
//         //   this.$forceUpdate();/
//         }
//       },
//       immediate: true,
//       deep: true,
//     },
  // 为什么无法清除掉上次表单遗留的数据呢？
//   },
};
</script>
