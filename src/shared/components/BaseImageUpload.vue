<script setup lang="ts">
import { UtilBase } from '@/core/utilities/UtilBase';
import FileUpload from 'primevue/fileupload';

async function onFileSelect() {
  UtilBase.wait(100);
}
</script>
<template>
  <div class="py-3">
    <FileUpload
      mode="basic"
      @select="onFileSelect"
      customUpload
      auto
      severity="secondary"
      class="p-button-outlined" />
  </div>
</template>
