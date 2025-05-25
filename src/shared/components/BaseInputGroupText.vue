<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

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
  <div :class="[props.class, 'py-3', 'py-md-3', 'py-lg-3']">
    <InputGroup>
      <InputGroupAddon>
        <i :class="props.icon"></i>
      </InputGroupAddon>
      <FloatLabel>
        <Password
          v-if="props.password"
          :id="'over_label_' + props.id"
          class="w-100"
          v-model="model"
          :feedback="false"
          toggleMask />
        <InputText v-else :id="'over_label_' + props.id" v-model="model" class="w-100" />
        <label :for="'over_label_' + props.id" v-if="props.label">{{ props.label }}</label>
      </FloatLabel>
    </InputGroup>
  </div>
</template>
