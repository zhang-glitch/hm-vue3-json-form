<template>
  <input type="number" :value="props.value" @input="handleChange" />
</template>

<script lang="ts" setup>
import { fieldPropTypes } from '../types'
// import { defineProps } from 'vue'

const props = defineProps(fieldPropTypes)

const handleChange = (v: any) => {
  let value: number | null = Number(v.target.value)
  if (isNaN(value)) {
    value = null
  }
  props.onChange(value)
}
</script>

<style></style>
