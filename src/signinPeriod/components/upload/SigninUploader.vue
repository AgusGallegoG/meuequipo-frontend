<script lang="ts" setup>
import { useSaveSigninForm } from '@/signinPeriod/application/useSaveSigninForm';
import { useSigninPeriodStore } from '@/signinPeriod/store/signinPeriodStore';
import FileUpload, { type FileUploadUploaderEvent } from 'primevue/fileupload';

const { refetch: saveInscription, loading } = useSaveSigninForm();
const signinPeriodStore = useSigninPeriodStore();

interface Props {
  label: string;
}

const props = defineProps<Props>();

async function customUploadHandler(event: FileUploadUploaderEvent) {
  const file: File = { ...event.files[0] };
  signinPeriodStore.setData(await saveInscription(file));
}
</script>

<template>
  <FileUpload
    :multiple="false"
    mode="basic"
    accept="application/pdf"
    @uploader="customUploadHandler"
    auto
    customUpload
    :chooseLabel="props.label"
    severity="secondary"
    class="p-button-outlined"
    :loading="loading" />
</template>
