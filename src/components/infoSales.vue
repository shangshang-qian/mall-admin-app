<template>
     <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item label="商品售价" prop="price" required>
      <a-input v-model="form.price" />
    </a-form-model-item>
    <a-form-model-item
      label="商品折扣价"
      prop="price_off"
    >
      <a-input v-model="form.price_off" />
    </a-form-model-item>
    <a-form-model-item label="商品库存" required prop="inventory">
      <a-input v-model="form.inventory" />
    </a-form-model-item>
    <a-form-model-item label="计量单位" required prop="unit">
      <a-input v-model="form.unit" />
    </a-form-model-item>
    <a-form-model-item label=""  prop="status" :wrapperCol="{span:24}" >
        <a-checkbox v-model="form.status"  >
            上架
        </a-checkbox>
    </a-form-model-item>
    <a-form-model-item label="商品相册" prop="images" required>
         <a-upload
      :action="'http://mallapi.duyiedu.com//upload/images?appkey=' + $store.state.user.appkey"
      list-type="picture-card"
      :file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
      name='avatar'
    >
      <div v-if="fileList.length < 8">
        <a-icon :type='uploading ? "loading" : "plus"' />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
         </a-upload>
    </a-form-model-item>
    <a-form-model-item label="" :wrapperCol="{span:20}" >
      <a-button @click="prev" type="default">上一步</a-button>
      <a-button @click="next" type="primary">提交</a-button>
    </a-form-model-item>
</a-form-model>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 10 },
      rules: {},
      previewImage: '',
      previewVisible: false,
      fileList: [],
      uploading: false,
    };
  },
  props: {
    form: Object,
  },
  created() {
    this.form.images.forEach((ele, index) => {
      this.fileList.push({
        name: `image-${index}.jpeg`,
        url: ele,
        status: 'done',
        uid: index,
      });
    });
  },
  methods: {
    prev() {
      this.$emit('prev', this.form);
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        return false;
      });
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        console.log(file.response, file);
        this.form.images = this.form.images.filter((ele) => {
          if (file.response) {
            return ele !== file.response.data.url;
          }
          return ele !== file.url;
        });
      }
      this.fileList = fileList;
    },
    handleCancel() {
      this.previewVisible = false;
    },
  },
};
</script>
