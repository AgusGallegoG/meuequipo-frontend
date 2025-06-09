<script setup lang="ts">
import { useSavePublication } from '@/publication/application/useSavePublication';
import { type Publication, defaultPublication } from '@/publication/domain/Publication';
import { useBlogAdminStore } from '@/publication/store/BlogAdminStore';
import BaseEditor from '@/shared/components/BaseEditor.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import BaseMultipleImageUpload from '@/shared/components/BaseMultipleImageUpload.vue';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import { useI18n } from 'vue-i18n';

const visible = defineModel<boolean>();

const { t } = useI18n();
const { refetch: savePublication, loading } = useSavePublication();

const blogStore = useBlogAdminStore();

const isEdit = computed(() => blogStore.isEdition);
const editionPublication = computed(() => blogStore.getEditionPublication);
const canSave = computed(() => publication.value.title !== '' && publication.value.body !== '');
const publication = ref<Publication>({ ...defaultPublication });

watch(visible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

watch(editionPublication, (newVal) => {
  if (newVal) {
    publication.value = { ...newVal };
  } else {
    publication.value = { ...defaultPublication };
  }
});

function resetForm() {
  publication.value = { ...defaultPublication };
  if (isEdit.value === true) {
    visible.value = false;
  }
  blogStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  const response = await savePublication(publication.value);
  if (response) {
    blogStore.setTableData(response);
  }
  visible.value = false;
}
</script>
<template>
  <Drawer position="top" v-model:visible="visible" class="h-75 overflow-y-scroll">
    <template #header>
      <h3 class="mt-2">
        {{ isEdit ? t('blog.form_title_edit') : t('blog.form_title_new') }}
      </h3>
    </template>

    <template #default>
      <div class="container g-3 pt-3">
        <div class="row">
          <BaseInputGroupText
            id="publication-title"
            v-model="publication.title"
            :label="t('blog.fields.title')">
          </BaseInputGroupText>
        </div>
        <div class="row">
          <BaseEditor
            id="publication-body"
            v-model="publication.body"
            :label="t('blog.fields.body')"></BaseEditor>
        </div>
        <div class="row">
          <BaseMultipleImageUpload
            id="publication-images"
            v-model="publication.images"
            :label="t('blog.fields.images')"></BaseMultipleImageUpload>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="d-flex flex-column flex-md-row justify-content-end gap-2 w-100">
        <Button
          class="w-100"
          severity="secondary"
          raised
          @click="resetForm()"
          :label="isEdit ? t('core.buttons.cancel') : t('core.buttons.clear')"
          :icon="isEdit ? 'pi pi-times' : 'pi pi-eraser'"></Button>
        <Button
          class="w-100"
          raised
          :label="t('core.buttons.save')"
          @click="onSubmitForm()"
          icon="pi pi-save"
          :disabled="!canSave"
          :loading="loading"></Button>
      </div>
    </template>
  </Drawer>
</template>
