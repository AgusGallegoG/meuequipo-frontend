<script setup lang="ts">
import type { Select } from '@/shared/dominio/Select';
import FloatLabel from 'primevue/floatlabel';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import { useI18n } from 'vue-i18n';

const model = defineModel<number[] | null>();
const { t } = useI18n();

/**
 * ? El options se enviará de un array de Select. Se ha pensado para usar el baseEnumStore para obtener las opciones.
 * ! El label siempre es obligatorio pasarlo ya traducido del INTL
 */

interface Props {
  id?: string;
  class?: string;
  options: Select[];
  label: string;
  invalid?: boolean;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  invalid: false,
  errorMessage: '',
});
</script>
<template>
  <div :class="[props.class, 'py-3']">
    <div id="multiselect-wrapper" class="w-100">
      <FloatLabel class="w-100 md:w-80">
        <MultiSelect
          :id="'over_label' + (props.id ? props.id : '')"
          v-model="model"
          :options="props.options"
          optionValue="id"
          optionLabel="name"
          filter
          :maxSelectedLabels="6"
          class="w-100" />
        <label :for="'over_label' + (props.id ? props.id : '')">{{ props.label }}</label>
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
