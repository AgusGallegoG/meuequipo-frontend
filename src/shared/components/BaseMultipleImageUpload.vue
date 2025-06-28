<script setup lang="ts">
import { useSaveImage } from '@/shared/application/useSaveImage';
import type { ImageUpload } from '@/shared/dominio/ImageUpload';
import type { ImageView } from '@/shared/dominio/ImageView';
import Button from 'primevue/button';
import FileUpload, { type FileUploadUploaderEvent } from 'primevue/fileupload';
import Image from 'primevue/image';

const { loading: loading, refetch: saveImage } = useSaveImage();

const model = defineModel<ImageView[] | null>();

interface Props {
  label: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: ImageView[] | null): void;
}>();

async function customUploadHandler(event: FileUploadUploaderEvent) {
  const aux = event.files;
  const files: File[] = Array.isArray(aux) ? aux : [aux];

  for (const file of files) {
    const image: ImageUpload = { file };

    const response = await saveImage(image);
    if (response) {
      const actual = model.value ?? [];
      emit('update:modelValue', [...actual, response]);
    }
  }
}

function deleteImage(index: number) {
  const copy = [...(model.value ?? [])];
  copy.splice(index, 1);
  emit('update:modelValue', copy.length ? copy : null);
}
</script>
<template>
  <div class="py-3">
    <div v-if="model" class="position-relative mb-3 overflow-x-scroll w-100 text-nowrap">
      <div v-for="(image, index) in model" key="id" class="d-inline-block mx-5 position-relative">
        <Image :src="image.url" :alt="image.name" id="preview-image" crossorigin="anonymous" />
        <Button
          severity="secondary"
          @click="deleteImage(index)"
          icon="pi pi-times"
          class="position-absolute top-0"
          style="z-index: 1"></Button>
      </div>
    </div>
    <FileUpload
      :multiple="true"
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
  max-height: 125px;
  object-fit: contain;
  aspect-ratio: 1/1;
}
</style>
