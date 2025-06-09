<script setup lang="ts">
import Editor from 'primevue/editor';

const value = defineModel<string>();

interface Props {
  class?: string;
  icon?: string;
  id?: string;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>
<template>
  <div class="py-3">
    <Editor
      :id="'editor-content-' + props.id"
      v-model="value"
      :placeholder="props.label"
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
  </div>
</template>
<style>
.p-editor .ql-editor.ql-blank::before {
  color: #a3a3a3; /* blanco translúcido */
}
</style>
