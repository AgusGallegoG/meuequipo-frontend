<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel';
import InputGroup from 'primevue/inputgroup';
import InputNumber from 'primevue/inputnumber';

const model = defineModel<number | null>();

interface Props {
  class?: string;
  icon?: string;
  id?: string;
  label?: string;
  error?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});
</script>
<template>
  <div :class="[props.class, 'py-3', 'py-md-3', 'py-lg-3', 'responsive-inputnumber']">
    <InputGroup>
      <FloatLabel>
        <InputNumber
          :id="'over_label_' + props.id"
          v-model="model"
          showButtons
          buttonLayout="vertical"
          :invalid="error"
          :disabled="props.disabled"
          :min="0"
          :max="999">
          <template #incrementicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
        <label :for="'over_label_' + props.id" v-if="props.label">{{ props.label }}</label>
      </FloatLabel>
    </InputGroup>
  </div>
</template>
<style lang="css">
.p-inputnumber-input {
  width: 100%;
  text-align: center;
}

.responsive-inputnumber {
  width: 30%;
}

@media (min-width: 768px) {
  .responsive-inputnumber {
    width: 30%;
  }
}

@media (min-width: 992px) {
  .responsive-inputnumber {
    width: 25%;
  }
}
</style>
