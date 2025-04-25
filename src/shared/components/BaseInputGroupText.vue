<script setup lang="ts">
import { InputGroup, InputGroupAddon, FloatLabel, InputText, Password } from 'primevue';

const model = defineModel<string>();

interface Props {
  class?: string;
  icon?: string;
  id?: string;
  label?: string;
  password?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  password: false,
});
</script>
<template>
  <div :class="props.class" class="py-3 py-md-3 py-lg-3">
    <InputGroup>
      <InputGroupAddon>
        <i :class="props.icon"></i>
      </InputGroupAddon>
      <FloatLabel>
        <Password
          v-if="props.password"
          :id="'over_label_' + props.id"
          v-model="model"
          :feedback="false"
          toggleMask />
        <InputText v-else :id="'over_label_' + props.id" v-model="model" />
        <label :for="'over_label_' + props.id" v-if="props.label">{{ props.label }}</label>
      </FloatLabel>
    </InputGroup>
  </div>
</template>
