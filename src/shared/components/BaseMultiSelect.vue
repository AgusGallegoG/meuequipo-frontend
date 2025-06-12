<script setup lang="ts">
import type { Select } from '@/shared/dominio/Select';
import FloatLabel from 'primevue/floatlabel';
import MultiSelect from 'primevue/multiselect';

const model = defineModel<number[] | null>();

/**
 * ? El options se enviará de un array de Select. Se ha pensado para usar el baseEnumStore para obtener las opciones.
 * ! El label siempre es obligatorio pasarlo ya traducido del INTL
 */

interface Props {
  id?: string;
  class?: string;
  options: Select[];
  label: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>
<template>
  <div :class="[props.class, 'py-3']">
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
  </div>
</template>
