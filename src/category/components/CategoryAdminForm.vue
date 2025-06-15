<script setup lang="ts">
import { useSaveCategories } from '@/category/application/useSaveCategories';
import { type CategoryItem, defaultCategoryItem } from '@/category/domain/CategoryTable';
import { useCategoryStore } from '@/category/store/CategoryStore';
import BaseCheckBox from '@/shared/components/BaseCheckBox.vue';
import BaseDatePicker from '@/shared/components/BaseDatePicker.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import { useI18n } from 'vue-i18n';

const visible = defineModel<boolean>();

const categoryStore = useCategoryStore();
const { t } = useI18n();
const { refetch: saveCategory, loading } = useSaveCategories();

const isEdit = computed(() => categoryStore.isEdition);
const category = ref<CategoryItem>({ ...defaultCategoryItem });
const editionCategory = computed(() => categoryStore.getEditionCategory);
const canSave = computed(() => {
  return category.value.name !== '' && category.value.yearInit !== null;
});

watch(visible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

watch(
  editionCategory,
  (newVal) => {
    if (newVal) {
      category.value = { ...newVal };
    } else {
      category.value = { ...defaultCategoryItem };
    }
  },
  { immediate: true }
);

function resetForm() {
  category.value = { ...defaultCategoryItem };
  if (isEdit.value === true) {
    visible.value = false;
  }
  categoryStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  const response = await saveCategory(category.value);
  if (response) {
    categoryStore.setTableData(response);
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
        {{ isEdit ? t('categories.form_title_edit') : t('categories.form_title_new') }}
      </h3>
    </template>
    <template #default>
      <div class="container g-3 mt-2">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          <BaseInputGroupText
            class="col d-flex align-items-center"
            :label="t('categories.fields.name')"
            v-model="category.name"></BaseInputGroupText>
          <BaseDatePicker
            class="col d-flex align-items-center"
            :label="t('categories.fields.year_init')"
            v-model="category.yearInit"
            dateFormat="yy"
            view="year"></BaseDatePicker>
          <BaseDatePicker
            class="col d-flex align-items-center"
            :label="t('categories.fields.year_end')"
            v-model="category.yearEnd"
            dateFormat="yy"
            view="year"></BaseDatePicker>
          <BaseCheckBox
            class="col d-flex align-items-center"
            :label="t('users.fields.active')"
            v-model="category.active"></BaseCheckBox>
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
