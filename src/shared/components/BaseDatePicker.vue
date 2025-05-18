<script setup lang="ts">
import DatePicker from 'primevue/datepicker';
import FloatLabel from 'primevue/floatlabel';

const model = defineModel<Date | null>();

interface Props {
  id?: string;
  label?: string;
  showTime?: boolean;
  showIcon?: boolean;
  dateFormat?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showTime: false,
  showIcon: true,
  dateFormat: 'dd/mm/yy',
});
</script>

<template>
  <div :class="[props.class, 'py-3', 'py-md-3', 'py-lg-3']">
    <FloatLabel>
      <DatePicker
        :id="'over_label_' + props.id"
        class="w-100"
        v-model="model"
        :showTime="showTime"
        :showIcon="showIcon"
        :dateFormat="dateFormat"></DatePicker>
      <label :for="'over_label_' + props.id" v-if="props.label">{{ props.label }}</label>
    </FloatLabel>
  </div>
</template>
