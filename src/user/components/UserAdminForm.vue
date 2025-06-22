<script setup lang="ts">
import { UtilBase } from '@/core/utilities/UtilBase';
import { useZodValidation } from '@/core/utilities/UtilZodValidations';
import BaseCheckBox from '@/shared/components/BaseCheckBox.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import { useSaveUser } from '@/user/application/useSaveUser';
import { type UserItem, defaultUserItem, userItemSchema } from '@/user/domain/UserTable';
import { useUserAdminStore } from '@/user/store/userAdminStore';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import { useI18n } from 'vue-i18n';

const visible = defineModel<boolean>();

const { refetch: saveUser, loading } = useSaveUser();
const userAdminStore = useUserAdminStore();
const { t } = useI18n();

const isEdit = computed(() => userAdminStore.isEdition);
const editionUser = computed(() => userAdminStore.getEditionUser);

const {
  form,
  errors: formErrors,
  submitted,
  isFormValid,
  validate,
  reset,
} = useZodValidation(defaultUserItem, userItemSchema);

watch(visible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

watch(
  editionUser,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal };
    } else {
      form.value = UtilBase.cloneVueProxy(defaultUserItem); //cuando se copia el default se copia el proxy no reactivo para asegurarse que todas las referencias estan bien
    }
  },
  { immediate: true }
);

function resetForm() {
  reset();
  if (isEdit.value === true) {
    visible.value = false;
  }
  userAdminStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  submitted.value = true;

  if (!validate()) return;
  //ExecuteQuery
  const response = await saveUser(form.value);
  if (response) {
    userAdminStore.setTableData(response);
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
        {{ isEdit ? t('users.form_title_edit') : t('users.form_title_new') }}
      </h3>
    </template>
    <template #default>
      <div class="container g-3 mt-2">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 align-items-start">
          <BaseInputGroupText
            class="col d-flex align-items-center"
            :label="t('users.fields.name')"
            v-model="form.name"
            :invalid="!!formErrors.name"
            :errorMessage="formErrors.name ?? undefined">
          </BaseInputGroupText>

          <BaseInputGroupText
            class="col d-flex align-items-center"
            :label="t('users.fields.surnames')"
            v-model="form.surnames"
            :invalid="!!formErrors.surnames"
            :errorMessage="formErrors.surnames ?? undefined">
          </BaseInputGroupText>

          <BaseInputGroupText
            class="col d-flex align-items-center"
            :label="t('users.fields.email')"
            v-model="form.email"
            :textError="t('users.error.mail')"
            :invalid="!!formErrors.email"
            :errorMessage="formErrors.email ?? undefined">
          </BaseInputGroupText>

          <BaseCheckBox
            class="col d-flex align-items-center"
            :label="t('users.fields.active')"
            v-model="form.active">
          </BaseCheckBox>
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
          :disabled="!isFormValid"
          icon="pi pi-save"
          :loading="loading"></Button>
      </div>
    </template>
  </Drawer>
</template>
