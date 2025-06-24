<script setup lang="ts">
import { UtilBase } from '@/core/utilities/UtilBase';
import { useZodValidation } from '@/core/utilities/UtilZodValidations';
import { useSaveRival } from '@/rivals/application/useSaveRival';
import { defaultRival, rivalSchema, type Rival } from '@/rivals/domain/RivalTable';
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
const editionRival = computed(() => rivalAdminStore.getEditionRival);

const emit = defineEmits<{ (e: 'saved'): void }>();

onMounted(async () => {
  await sharedEnumsStore.fetchAll();
});

const {
  form,
  errors: formErrors,
  submitted,
  isFormValid,
  validate,
  reset,
} = useZodValidation(defaultRival, rivalSchema);

watch(visible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

watch(
  editionRival,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal };
    } else {
      form.value = UtilBase.cloneVueProxy(defaultRival);
    }
  },
  { immediate: true }
);

function resetForm() {
  reset();
  if (isEdit.value === true) {
    visible.value = false;
  }
  rivalAdminStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  submitted.value = true;

  if (!validate()) return;

  const response = await saveRival(form.value);
  if (response) {
    emit('saved');
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
        <div class="row row-cols-1 row-cols-md-2 align-items-start">
          <!--name-->
          <BaseInputGroupText
            class="col d-flex align-items-center"
            id="name-rival-team"
            v-model="form.name"
            :label="t('rivals.fields.name')"
            :invalid="!!formErrors.name"
            :errorMessage="formErrors.name ?? undefined"></BaseInputGroupText>

          <CategoryMultiSelect
            class="col d-flex align-items-center"
            id="category-rivals"
            v-model="form.categories"
            :options="sharedEnumsStore.getCategories"
            :label="t('shared.dropdowns.categories')"
            :invalid="!!formErrors.categories"
            :errorMessage="
              Array.isArray(formErrors.categories)
                ? (formErrors.categories[0] ?? undefined)
                : formErrors.categories
            "></CategoryMultiSelect>
        </div>
        <div class="row row-cols-1 row-cols-md-3 align-items-start">
          <BaseInputGroupText
            class="col d-flex align-items-center"
            id="responsible-team"
            v-model="form.responsible"
            :label="t('rivals.fields.responsible')"
            :invalid="!!formErrors.responsible"
            :errorMessage="formErrors.responsible ?? undefined"></BaseInputGroupText>

          <BasePhoneInput
            class="col d-flex align-items-center"
            id="tlf-team"
            v-model="form.tlf"
            :label="t('rivals.fields.tlf')"
            :invalid="!!formErrors.tlf"
            :errorMessage="formErrors.tlf ?? undefined"></BasePhoneInput>

          <BaseInputGroupText
            class="col d-flex align-items-center"
            id="mail-team"
            v-model="form.email"
            :label="t('rivals.fields.email')"
            :invalid="!!formErrors.email"
            :errorMessage="formErrors.email ?? undefined"></BaseInputGroupText>
        </div>
        <div class="row row-cols-1">
          <div class="col d-flex justify-content-center">
            <BaseImageUpload :label="t('rivals.fields.logo')" v-model="form.logo"></BaseImageUpload>
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
          :disabled="submitted && !isFormValid"
          icon="pi pi-save"
          :loading="loading"></Button>
      </div>
    </template>
  </Drawer>
</template>
