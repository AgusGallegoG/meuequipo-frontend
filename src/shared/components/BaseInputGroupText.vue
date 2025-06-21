<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Password from 'primevue/password';
import { useI18n } from 'vue-i18n';

const model = defineModel<string>();
const { t } = useI18n();

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
</script>
<template>
  <div :class="[props.class, 'py-3', 'py-md-3', 'py-lg-3']">
    <div id="input-wrapper" class="w-100">
      <InputGroup>
        <InputGroupAddon v-if="props.icon">
          <i :class="props.icon"></i>
        </InputGroupAddon>
        <FloatLabel>
          <Password
            v-if="props.password"
            :id="'over_label_' + props.id"
            class="w-100"
            v-model="model"
            :feedback="false"
            toggleMask
            :class="{ 'p-invalid': props.invalid }"
            :disabled="props.disabled" />
          <InputText
            v-else
            :id="'over_label_' + props.id"
            v-model="model"
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
