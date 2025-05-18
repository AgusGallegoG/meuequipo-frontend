<script setup lang="ts">
import CheckBox from 'primevue/checkbox';

const model = defineModel<boolean>();

interface Props {
  id?: string;
  label?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div :class="[props.class, 'py-3', 'd-flex', 'align-items-center', 'justify-content-center']">
    <small v-if="props.label" class="me-2">{{ props.label }}</small>
    <CheckBox :id="props.id" v-model="model" binary></CheckBox>
  </div>
</template>
