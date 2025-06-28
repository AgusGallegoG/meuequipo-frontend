<script setup lang="ts">
import { useSaveImage } from '@/shared/application/useSaveImage';
import type { ImageUpload } from '@/shared/dominio/ImageUpload';
import type { ImageView } from '@/shared/dominio/ImageView';
import Button from 'primevue/button';
import FileUpload, { type FileUploadUploaderEvent } from 'primevue/fileupload';
import Image from 'primevue/image';

const { loading: loading, refetch: saveImage } = useSaveImage();

const model = defineModel<ImageView | null>();

interface Props {
  label: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: ImageView | null): void;
}>();

async function customUploadHandler(event: FileUploadUploaderEvent) {
  const image: ImageUpload = { file: event.files[0] };
  const response = await saveImage(image);
  response ? emit('update:modelValue', response) : emit('update:modelValue', null);
}

function deleteImage() {
  emit('update:modelValue', null);
}
</script>
<template>
  <div class="py-3">
    <div v-if="model" class="d-flex justify-content-center mb-3">
      <div class="d-inline-block position-relative">
        <Image :src="model.url" :alt="model.name" id="preview-image" crossorigin="anonymous" />
        <Button
          severity="secondary"
          @click="deleteImage"
          icon="pi pi-times"
          class="position-absolute top-0"
          style="z-index: 1"></Button>
      </div>
    </div>
    <FileUpload
      v-else
      :multiple="false"
      mode="basic"
      accept="image/*"
      @uploader="customUploadHandler"
      auto
      customUpload
      :chooseLabel="props.label"
      severity="secondary"
      class="p-button-outlined"
      :loading="loading" />
  </div>
</template>
<style>
#preview-image {
  max-height: 150px;
  object-fit: contain;
  aspect-ratio: 1/1;
}
</style>
