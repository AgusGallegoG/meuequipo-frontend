<script setup lang="ts">
import BaseImageUpload from '@/shared/components/BaseImageUpload.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import CategoryMultiSelect from '@/shared/components/CategoryMultiSelect.vue';
import { type ImageUpload } from '@/shared/dominio/ImageUpload';
import Card from 'primevue/card';
import { useI18n } from 'vue-i18n';
import { useSaveRival } from '../application/useSaveRival';
import { defaultRival, type Rival } from '../domain/RivalTable';
import { useRivalsAdminStore } from '../store/rivalsStore';

const rivalAdminStore = useRivalsAdminStore();
const { t } = useI18n();
const { refetch: saveRival, loading } = useSaveRival();

const isEdit = computed(() => rivalAdminStore.isEdition);
const rival = ref<Rival>({ ...defaultRival });
const editionRival = computed(() => rivalAdminStore.getEditionRival);
const canSave = computed(() => {
  return rival.value.name !== '';
});

watch(
  editionRival,
  (newVal) => {
    if (newVal) {
      rival.value = { ...newVal };
    } else {
      rival.value = { ...defaultRival };
    }
  },
  { immediate: true }
);

function resetForm() {
  rival.value = { ...defaultRival };
  rivalAdminStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  const response = await saveRival(rival.value, rivalAdminStore.getFilters);
  if (response) {
    rivalAdminStore.setTableData(response);
  }
}
</script>
<template>
  <Card class="h-100 w-100 d-flex flex-column justify-content-start">
    <template #title>
      <h3 class="mb-2 mt-2">
        {{ isEdit ? t('rivals.form_title_edit') : t('rivals.form_title_new') }}
      </h3>
    </template>
    <template #content>
      <div class="container g-3">
        <div class="row">
          <img v-if="rival.logo" />
          <BaseImageUpload v-else></BaseImageUpload>
        </div>
        <div class="row">
          <!--name-->
          <BaseInputGroupText
            id="name-rival-team"
            v-model="rival.name"
            :label="t('rivals.fields.name')"></BaseInputGroupText>
        </div>
        <div class="row">
          <BaseInputGroupText
            id="responsible-team"
            v-model="rival.responsible"
            :label="t('rivals.fields.responsible')"></BaseInputGroupText>
        </div>
        <div class="row">
          <BaseInputGroupText
            id="tlf-team"
            v-model="rival.tlf"
            :label="t('rivals.fields.tlf')"></BaseInputGroupText>
        </div>
        <div class="row">
          <BaseInputGroupText
            id="mail-team"
            v-model="rival.email"
            :label="t('rivals.fields.email')"></BaseInputGroupText>
        </div>
        <!--telefono contacto-->
        <!--email contacto-->

        <div class="row">
          <CategoryMultiSelect
            id="category-rivals"
            v-model="rival.categories"></CategoryMultiSelect>
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
          :icon="isEdit ? 'pi pi-eraser' : 'pi pi-times'"></Button>
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
  </Card>
</template>
