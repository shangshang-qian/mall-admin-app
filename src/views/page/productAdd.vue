<template>
  <div class="product-add">
    <a-steps :current="current" @change="onChange">
      <a-step v-for="s in steps" :key="s.title" :title="s.title" />
    </a-steps>
    <div class="product-info">
      <infoBasic
        v-if="current === 0"
        @next="next"
        :form="form"
      />
      <infoSales
        v-else-if="current === 1"
        @prev="prev"
        :form="form"
        @next="next"
      />
    </div>
  </div>
</template>

<script>
import InfoBasic from '@/components/infoBasic.vue';
import InfoSales from '@/components/infoSales.vue';
import productApi from '@/api/product';

export default {
  components: {
    InfoBasic,
    InfoSales,
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
      form: {
        title: '',
        desc: '',
        category: '',
        c_item: '',
        tags: [],
        price: 19.9,
        price_off: '',
        unit: 'g',
        status: false,
        images: [],
        inventory: 1000,
      },
    };
  },
  created() {
    const { id } = this.$route.params;
    if (id) {
      productApi.detail(id).then((res) => {
        this.form = res;
        this.form.status = res.status === 1;
        return 1;
      });
    }
  },
  methods: {
    onChange(newVal) {
      this.current = newVal;
    },
    next(form) {
      this.form = {
        ...this.form,
        ...form,
      };
      if (this.current === 0) {
        this.current = 1;
      } else {
        const { id } = this.$route.params;
        if (id) {
          productApi.edit(this.form);
          this.$message.info('编辑成功！！');
        } else {
          productApi.add(this.form).then((res) => console.log(res));
          this.$message.info('添加成功！！');
        }
        this.$router.push({
          name: 'ProductList',
        });
      }
    },
    prev(form) {
      this.form = {
        ...this.form,
        ...form,
      };
      this.current = 0;
    },
  },
};
</script>

<style lang="less">
.ant-steps {
  width: 50vw;
  margin: 5vh auto;
}
form > div:last-of-type {
  text-align: right;
  .ant-btn {
    margin-left: 30vh;
  }
}
form .ant-form-item-control {
  text-align: center;
}
</style>
