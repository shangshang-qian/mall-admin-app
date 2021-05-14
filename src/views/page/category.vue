<template>
  <div class="category-admin">
    <!-- <router-link :to="{name: 'CategoryAdd'}">新增类目</router-link> -->
    <a-button type='default' @click="changeRoute">新增类目</a-button>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="list"
      @change="changeList"
    >
      <div slot="operation" slot-scope="text, record">
        <a-button @click="edit(record)">编辑</a-button>
        <a-button>
          <a-popconfirm
            title="Are you sure？"
            ok-text="Yes"
            cancel-text="No"
            @confirm="remove(record)"
          >
            <a>删除</a>
          </a-popconfirm>
        </a-button>
      </div>
    </a-table>
    <router-view :category='record' />
  </div>
</template>

<script>
import categoryApi from '@/api/category';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 100,
    align: 'center',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 100,
    align: 'center',
    scopedSlots: { customRender: 'operation' },
  },
];
export default {
  data() {
    return {
      columns,
      categoryList: [],
      list: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        tatol: 1,
      },
      record: {},
    };
  },
  computed: {
    data() {
      return this.categoryList.map((ele) => ({
        ...ele,
        key: ele.id,
      }));
    },
  },
  methods: {
    remove(record) {
      categoryApi.delete(record.id).then(() => this.getTableData());
    },
    edit(record) {
      this.$router.push({
        name: 'CategoryEdit',
        params: {
          id: record.id,
        },
      });
      this.record = record;
    },
    getTableData() {
      categoryApi
        .list({
          page: this.list.current,
          pageSize: this.list.pageSize,
        })
        .then((res) => {
          this.list.tatol = res.total;
          this.categoryList = res.data.filter((ele) => ele.id);
        });
    },
    changeList(pagination) {
      this.list = pagination;
    },
    changeRoute() {
      this.$router.push({
        name: 'CategoryAdd',
      });
    },
  },
  watch: {
    $route: {
      handler() {
        this.getTableData();
      },
      immediate: true,
    },
  },
};
</script>

<style lang='less'>
  .category-admin {
    position: relative;
    text-align: right;
    > .ant-btn{
      margin: 3vh 5vh;
    }
    .ant-form{
      position: fixed;
      top:70px;
      left: 270px;
      background-color: #eee;
      box-shadow: 1px 2px 2px #f40;
      width: 70vw;
      height: 75vh;
      text-align: left;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 110px 0px;
    }
  }
</style>
