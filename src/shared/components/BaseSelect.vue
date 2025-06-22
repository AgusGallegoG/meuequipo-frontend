<script setup lang="ts">
import type { Select as SelectModel } from '@/shared/dominio/Select';
import FloatLabel from 'primevue/floatlabel';
import Message from 'primevue/message';
import Select from 'primevue/select';
import { useI18n } from 'vue-i18n';

const model = defineModel<number | null>();
const { t } = useI18n();

/**
 * ? El options se enviará de un array de Select. Se ha pensado para usar el baseEnumStore para obtener las opciones.
 * ! El label siempre es obligatorio pasarlo ya traducido del INTL
 */

interface Props {
  id?: string;
  class?: string;
  options: SelectModel[];
  label: string;
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
  <div :class="[props.class, 'py-3']">
    <div id="select-wrapper" class="w-100">
      <FloatLabel class="w-100 md:w-80">
        <Select
          :id="'over_label' + (props.id ? props.id : '')"
          v-model="model"
          :options="props.options"
          optionValue="id"
          optionLabel="name"
          filter
          :disabled="props.disabled"
          :class="{ 'p-invalid': props.invalid }"
          class="w-100" />
        <label :for="'over_label' + (props.id ? props.id : '')">
          {{ props.label }}
        </label>
      </FloatLabel>

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
