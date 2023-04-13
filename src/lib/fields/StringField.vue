<template>
  <input type="text" :value="props.value" @input="handleChange" />
</template>

<script lang="ts" setup>
import { fieldPropTypes } from '../types'
// import { defineProps } from 'vue'

const props = defineProps(fieldPropTypes)

const handleChange = (v: any) => {
  props.onChange(v.target.value)
}
</script>

<style></style>
