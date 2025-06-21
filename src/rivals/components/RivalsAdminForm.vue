<script setup lang="ts">
import { useSaveRival } from '@/rivals/application/useSaveRival';
import { defaultRival, type Rival } from '@/rivals/domain/RivalTable';
import { useRivalsAdminStore } from '@/rivals/store/rivalsStore';
import BaseImageUpload from '@/shared/components/BaseImageUpload.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import CategoryMultiSelect from '@/shared/components/BaseMultiSelect.vue';
import BasePhoneInput from '@/shared/components/BasePhoneInput.vue';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import { useI18n } from 'vue-i18n';

const visible = defineModel<boolean>();

const rivalAdminStore = useRivalsAdminStore();
const sharedEnumsStore = useSharedEnumsStore();
const { t } = useI18n();
const { refetch: saveRival, loading } = useSaveRival();

const isEdit = computed(() => rivalAdminStore.isEdition);
const rival = ref<Rival>({ ...defaultRival });
const editionRival = computed(() => rivalAdminStore.getEditionRival);
const canSave = computed(() => {
  return rival.value.name !== '';
});

watch(visible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
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
  if (isEdit.value === true) {
    visible.value = false;
  }
  rivalAdminStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  const response = await saveRival(rival.value, rivalAdminStore.getFilters);
  if (response) {
    rivalAdminStore.setTableData(response);
  }
  visible.value = false;
}
</script>
<template>
  <Drawer
    position="top"
    v-model:visible="visible"
    class="h-auto overflow-y-scroll"
    style="max-height: 75% !important">
    <template #header>
      <h3 class="mb-2 mt-2">
        {{ isEdit ? t('rivals.form_title_edit') : t('rivals.form_title_new') }}
      </h3>
    </template>
    <template #default>
      <div class="container g-3 mt-2">
        <div class="row row-cols-1 row-cols-md-2">
          <!--name-->
          <BaseInputGroupText
            class="col d-flex align-items-center"
            id="name-rival-team"
            v-model="rival.name"
            :label="t('rivals.fields.name')"></BaseInputGroupText>

          <CategoryMultiSelect
            class="col d-flex align-items-center"
            id="category-rivals"
            v-model="rival.categories"
            :options="sharedEnumsStore.getCategories"
            :label="t('shared.dropdowns.categories')"></CategoryMultiSelect>
        </div>
        <div class="row row-cols-1 row-cols-md-3">
          <BaseInputGroupText
            class="col d-flex align-items-center"
            id="responsible-team"
            v-model="rival.responsible"
            :label="t('rivals.fields.responsible')"></BaseInputGroupText>

          <BasePhoneInput
            class="col d-flex align-items-center"
            id="tlf-team"
            v-model="rival.tlf"
            :label="t('rivals.fields.tlf')"></BasePhoneInput>

          <BaseInputGroupText
            class="col d-flex align-items-center"
            id="mail-team"
            v-model="rival.email"
            :label="t('rivals.fields.email')"></BaseInputGroupText>
        </div>
        <div class="row row-cols-1">
          <div class="col d-flex justify-content-center">
            <BaseImageUpload
              :label="t('rivals.fields.logo')"
              v-model="rival.logo"></BaseImageUpload>
          </div>
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
