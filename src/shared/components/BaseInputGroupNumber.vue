<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel';
import InputGroup from 'primevue/inputgroup';
import InputNumber from 'primevue/inputnumber';
import Message from 'primevue/message';
import { useI18n } from 'vue-i18n';

const model = defineModel<number | null>();
const { t } = useI18n();

interface Props {
  class?: string;
  icon?: string;
  id?: string;
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  invalid: false,
  errorMessage: '',
});
</script>
<template>
  <div :class="[props.class, 'py-3', 'py-md-3', 'py-lg-3', 'responsive-inputnumber']">
    <div class="inputnumber-container">
      <InputGroup>
        <FloatLabel>
          <InputNumber
            :id="'over_label_' + props.id"
            v-model="model"
            showButtons
            buttonLayout="vertical"
            :disabled="props.disabled"
            :class="{ 'p-invalid': props.invalid }"
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

      <Message
        v-if="props.invalid && props.errorMessage"
        severity="error"
        size="small"
        variant="simple">
        {{ t(props.errorMessage) }}
      </Message>
    </div>
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
