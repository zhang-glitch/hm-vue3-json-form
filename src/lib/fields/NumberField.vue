<template>
  <FormNumber :value="props.value" :onChange="props.onChange" />
</template>

<script lang="ts" setup>
import { getWidget } from '../theme'
import { CommonComponentEnum, fieldPropTypes } from '../types'
// import { defineProps } from 'vue'

const props = defineProps(fieldPropTypes)
const FormNumber = getWidget(CommonComponentEnum.FormNumber).value

// const handleChange = (v: any) => {
//   let value: number | null = Number(v.target.value)
//   if (isNaN(value)) {
//     value = null
//   }
//   props.onChange(value)
// }
</script>

<style></style>
