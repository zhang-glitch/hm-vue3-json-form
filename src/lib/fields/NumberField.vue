<template>
  <input type="number" :value="props.value" @input="handleChange" />
</template>

<script lang="ts" setup>
import { propTypes } from '../types'
// import { defineProps } from 'vue'

const props = defineProps(propTypes)

const handleChange = (v: any) => {
  props.onChange(v.target.value)
}
</script>

<style></style>
