<script setup lang="ts">
import Editor from 'primevue/editor';
import Message from 'primevue/message';
import { useI18n } from 'vue-i18n';

const value = defineModel<string>();
const { t } = useI18n();

interface Props {
  class?: string;
  icon?: string;
  id?: string;
  label?: string;
  invalid?: boolean;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  invalid: false,
  errorMessage: '',
});
</script>
<template>
  <div class="py-3">
    <div id="editor-container" class="w-100">
      <Editor
        :id="'editor-content-' + props.id"
        v-model="value"
        :placeholder="props.label"
        :class="{ 'p-invalid': props.invalid }"
        editorStyle="height: 150px; font-size: var(--font-size)">
        <template v-slot:toolbar>
          <span class="ql-formats">
            <button v-tooltip.bottom="'Negrita'" class="ql-bold"></button>
            <button v-tooltip.bottom="'Cursiva'" class="ql-italic"></button>
            <button v-tooltip.bottom="'Sublineado'" class="ql-underline"></button>
          </span>
          <span class="ql-formats">
            <button v-tooltip.bottom="'Listado'" class="ql-list" value="ordered"></button>
          </span>
        </template>
      </Editor>

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
.p-editor .ql-editor.ql-blank::before {
  color: #a3a3a3; /* blanco translúcido */
}
</style>
