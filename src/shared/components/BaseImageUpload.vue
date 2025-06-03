<script setup lang="ts">
import { UtilBase } from '@/core/utilities/UtilBase';
import FileUpload from 'primevue/fileupload';

async function onFileSelect() {
  UtilBase.wait(100);
}
</script>
<template>
  <FileUpload
    mode="basic"
    @select="onFileSelect"
    customUpload
    auto
    severity="secondary"
    class="p-button-outlined" />
</template>
