<template>
  <a-table :columns="columns" :data-source='data'
           :pagination = 'page'
           @change="changePage">
    <div slot="operation" slot-scope="text,record">
      <a-button @click="edit(record)">编辑</a-button>
      <a-button>
        <a-popconfirm title="Are you sure？" ok-text="Yes" cancel-text="No"
                      @confirm='remove(record)'>
          <a href="#">删除</a>
        </a-popconfirm>
      </a-button>
    </div>
  </a-table>
</template>
<script>

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    key: 'desc',
    dataIndex: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    key: 'category',
    dataIndex: 'categoryName',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '限制购买数量',
    dataIndex: 'limit',
    key: 'limit',
    ellipsis: true,
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 200,
    align: 'center',
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  data() {
    return {
      columns,
    };
  },
  props: {
    productsList: Array,
    page: Object,
  },
  computed: {
    data() {
      return this.productsList.map((ele) => ({
        ...ele,
        key: ele.id,
      }));
    },
  },
  methods: {
    changePage(newPage) {
      this.$emit('changeList', newPage);
    },
    edit(record) {
      this.$emit('edit', record);
    },
    remove(record) {
      this.$emit('remove', record);
    },
  },
};
</script>
