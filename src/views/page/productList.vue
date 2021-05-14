<template>
    <div class="product-list">
        <search-box @submit="submitSearch" :categoryList='categoryList' />
        <a-button @click="changeRoute"> 新增商品 </a-button>
        <products-table
                    :productsList='productsList'
                    :page='list'
                    @changeList='changePreList'
                    @edit='editProduct'
                    @remove='removeProduct'
         />
    </div>
</template>

<script>
import SearchBox from '@/components/search.vue';
import ProductsTable from '@/components/productsTable.vue';
import categoryApi from '@/api/category';
import productApi from '@/api/product';

export default {
  data() {
    return {
      searchForm: {},
      categoryList: [],
      list: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      productsList: [],
      productsObj: {},
    };
  },
  components: {
    SearchBox,
    ProductsTable,
  },
  async created() {
    categoryApi.list().then((res) => {
      this.categoryList = res.data;
      this.categoryList.forEach((ele) => {
        this.productsObj[ele.id] = ele.name;
      });
    });
    this.getTableData();
  },
  methods: {
    submitSearch(form) {
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      productApi.list({
        page: this.list.current,
        size: this.list.pageSize,
        ...this.searchForm,
      }).then((res) => {
        this.list.total = res.total;
        this.productsList = res.data.map((ele) => ({
          ...ele,
          categoryName: this.productsObj[ele.category],
        }));
      });
    },
    changePreList(newList) {
      this.list = newList;
      this.getTableData();
    },
    changeRoute() {
      this.$router.push({
        name: 'ProductAdd',
      });
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      productApi.removeColumn(record.id).then(() => this.getTableData());
    },
  },
};
</script>

<style lang='less'>
  .product-list{
    position: relative;

    .ant-form-item{
      padding: 2vh;
    }
    > .ant-btn{
       position: absolute;
       top: 10px;
       right: 15px;
    }
  }
</style>
