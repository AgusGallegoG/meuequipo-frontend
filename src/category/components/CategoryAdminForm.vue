<script setup lang="ts">
import { type CategoryItem, defaultCategoryItem } from '@/category/domain/CategoryTable';
import { useCategoryStore } from '@/category/store/CategoryStore';
import { UtilBase } from '@/core/utilities/UtilBase';
import BaseCheckBox from '@/shared/components/BaseCheckBox.vue';
import BaseDatePicker from '@/shared/components/BaseDatePicker.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { useI18n } from 'vue-i18n';
import { useSaveCategories } from '../application/useSaveCategories';

const categoryStore = useCategoryStore();
const { t } = useI18n();
const { refetch: saveCategory, loading } = useSaveCategories();

const isEdit = computed(() => categoryStore.isEdition);
const category = ref<CategoryItem>({ ...defaultCategoryItem });
const editionCategory = computed(() => categoryStore.getEditionCategory);
const canSave = computed(() => {
  return category.value.name !== '' && category.value.yearInit !== null;
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
  categoryStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  const response = await saveCategory(category.value);
  if (response) {
    categoryStore.setTableData(response);
  }
}
</script>
<template>
  <Card class="h-100">
    <template #title>
      <h3 class="mb-2 mt-2">
        {{ isEdit ? t('categories.form_title_edit') : t('categories.form_title_new') }}
      </h3>
    </template>
    <template #content>
      <BaseInputGroupText
        :label="t('categories.fields.name')"
        v-model="category.name"></BaseInputGroupText>
      <BaseDatePicker
        :label="t('categories.fields.year_init')"
        v-model="category.yearInit"
        dateFormat="yy"
        view="year"></BaseDatePicker>
      <BaseDatePicker
        :label="t('categories.fields.year_end')"
        v-model="category.yearEnd"
        dateFormat="yy"
        view="year"></BaseDatePicker>
      <BaseCheckBox :label="t('users.fields.active')" v-model="category.active"></BaseCheckBox>
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
          :loading="loading"
          icon="pi pi-save"
          :disabled="!canSave"></Button>
        <!-- :loading="loading" -->
      </div>
    </template>
  </Card>
</template>
