<script setup lang="ts">
import DatePicker from 'primevue/datepicker';
import FloatLabel from 'primevue/floatlabel';
import Message from 'primevue/message';
import { useI18n } from 'vue-i18n';

const model = defineModel<Date | null>();
const { t } = useI18n();

interface Props {
  id?: string;
  label?: string;
  showTime?: boolean;
  showIcon?: boolean;
  dateFormat?: string;
  view?: string;
  class?: string;
  disabled?: boolean;
  invalid?: boolean;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showTime: false,
  showIcon: true,
  disabled: false,
  view: 'date',
  dateFormat: 'dd/mm/yy',
  invalid: false,
  errorMessage: '',
});
</script>

<template>
  <div :class="[props.class, 'py-3', 'py-md-3', 'py-lg-3']">
    <div id="datepicker-wrapper" class="w-100">
      <FloatLabel class="w-100">
        <DatePicker
          :id="'over_label_' + props.id"
          class="w-100"
          v-model="model"
          :view="view"
          :showTime="showTime"
          hourFormat="24"
          :showIcon="showIcon"
          :disabled="props.disabled"
          :dateFormat="dateFormat"></DatePicker>
        <label :for="'over_label_' + props.id" v-if="props.label">{{ props.label }}</label>
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
