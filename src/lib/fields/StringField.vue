<template>
  <!-- <input type="text" :value="props.value" @input="handleChange" /> -->
  <FormText :value="props" :onChange="props.onChange" />
  <!-- <FormText v-bind="rest" :onChange="handleChange" /> -->
</template>

<script lang="ts" setup>
import { CommonComponentEnum, fieldPropTypes } from '../types'
// import { defineProps } from 'vue'
import { getWidget } from '../theme'

const props = defineProps(fieldPropTypes)

const FormText = getWidget(CommonComponentEnum.FormText).value

// eslint-disable-next-line vue/no-setup-props-destructure
// const { schema, rootSchema, ...rest } = props

// const handleChange = (v: any) => {
//   props.onChange(v)
// }
</script>

<style></style>
