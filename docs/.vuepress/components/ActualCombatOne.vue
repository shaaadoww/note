<template>
  <el-form
    ref="ruleFormRef"
    :model="data.ruleForm"
  >
    <el-form-item label="媒体面积" prop="number" :rules="[{ required: true, message: '请输入媒体面积', trigger: ['blur', 'change'] }]">
      <YInputNumber
        v-model="data.ruleForm.number"
        :min="0"
        :max="99999999.99"
        :bind="{
          placeholder: '请输入媒体面积或体积，若无则输入/',
          isAllowChar: '/'
        }"
      ></YInputNumber>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >验证</el-button
      >
      <span v-show="data.isShow">{{data.ruleForm.number}}</span>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import YInputNumber from '../global-components/y-input-number.vue'

export default defineComponent({
  components: {
    YInputNumber
  },

  setup () {
    const ruleFormRef = ref<any>()
    const data = reactive({
      isShow: false,
      ruleForm: {
        number: ''
      }
    })

    const submitForm = async (formEl: any | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          data.isShow = true
          console.log('submit!')
        } else {
          data.isShow = false
          console.log('error submit!', fields)
        }
      })
    }

    return {
      data,
      ruleFormRef,
      submitForm
    }
  }
})

</script>