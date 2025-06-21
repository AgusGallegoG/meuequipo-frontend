<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel';
import InputGroup from 'primevue/inputgroup';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Select from 'primevue/select';
import { useI18n } from 'vue-i18n';

const model = defineModel<string>();
const { t } = useI18n();

const extension = ref('+34');
const localNumber = ref('');

const country_phones = [
  { code: 'ES', label: 'España (+34)', dialCode: '+34', flag: 'https://flagcdn.com/es.svg' },
  { code: 'PT', label: 'Portugal (+351)', dialCode: '+351', flag: 'https://flagcdn.com/pt.svg' },
];

interface Props {
  class?: string;
  icon?: string;
  id?: string;
  label?: string;
  password?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  password: false,
  disabled: false,
  invalid: false,
  errorMessage: '',
});

onMounted(() => {
  const match = model.value?.match(/^(\+\d+)\s*(.*)$/);
  if (match) {
    const [_, dialCode, number] = match;
    const found = country_phones.find((c) => c.dialCode === dialCode);
    if (found) {
      extension.value = found.dialCode;
      localNumber.value = number;
    }
  }
});

watch([extension, localNumber], ([ext, number]) => {
  model.value = ext + ' ' + number;
});

watch(model, (newVal) => {
  if (newVal === '') {
    extension.value = '+34';
    localNumber.value = '';
  }
});
</script>
<template>
  <div :class="[props.class, 'py-3', 'py-md-3', 'py-lg-3']">
    <div id="phone-number-wrapper" class="w-100">
      <InputGroup>
        <Select
          v-model="extension"
          :options="country_phones"
          style="min-width: 4rem; max-width: 4rem"
          option-label="flag"
          option-value="dialCode">
          <template #option="{ option }">
            <span>{{ option.label }}</span>
          </template>
          <template #value="{ value }">
            <div class="d-flex align-items-center gap-2" v-if="value">
              <img
                :src="country_phones.find((c) => c.dialCode === value)?.flag"
                alt=""
                width="20"
                height="15"
                style="object-fit: cover" />
            </div>
          </template>
        </Select>
        <FloatLabel>
          <InputText
            :id="'over_label_' + props.id"
            v-model="localNumber"
            class="w-100"
            :class="{ 'p-invalid': props.invalid }"
            :disabled="props.disabled" />
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
<style>
#phone-number-wrapper {
  .p-select-dropdown {
    width: 2rem !important;
  }
}
</style>
