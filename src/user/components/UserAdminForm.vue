<script setup lang="ts">
import BaseCheckBox from '@/shared/components/BaseCheckBox.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import { getValidationRegExp, Validations } from '@/shared/dominio/enums/Validations';
import { useSaveUser } from '@/user/application/useSaveUser';
import { type UserItem, defaultUserItem } from '@/user/domain/UserTable';
import { useUserAdminStore } from '@/user/store/userAdminStore';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import { useI18n } from 'vue-i18n';

const visible = defineModel<boolean>();

const { refetch: saveUser, loading } = useSaveUser();
const userAdminStore = useUserAdminStore();
const { t } = useI18n();

const isEdit = computed(() => userAdminStore.isEdition);
const user = ref<UserItem>({ ...defaultUserItem });
const editionUser = computed(() => userAdminStore.getEditionUser);
const canSave = computed(() => {
  return user.value.email !== '' && user.value.name !== '' && isValidMail.value;
});

const isValidMail = computed(() => {
  return getValidationRegExp(Validations.EMAIL).test(user.value.email);
});

watch(visible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

watch(
  editionUser,
  (newVal) => {
    if (newVal) {
      user.value = { ...newVal };
    } else {
      user.value = { ...defaultUserItem };
    }
  },
  { immediate: true }
);

function resetForm() {
  user.value = { ...defaultUserItem };
  if (isEdit.value === true) {
    visible.value = false;
  }
  userAdminStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  //ExecuteQuery
  const response = await saveUser(user.value);
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
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          <BaseInputGroupText
            class="col d-flex align-items-center"
            :label="t('users.fields.name')"
            v-model="user.name">
          </BaseInputGroupText>

          <BaseInputGroupText
            class="col d-flex align-items-center"
            :label="t('users.fields.surnames')"
            v-model="user.surnames"></BaseInputGroupText>

          <BaseInputGroupText
            class="col d-flex align-items-center"
            :label="t('users.fields.email')"
            v-model="user.email"
            :error="!isValidMail"
            :textError="t('users.error.mail')"></BaseInputGroupText>

          <BaseCheckBox
            class="col d-flex align-items-center"
            :label="t('users.fields.active')"
            v-model="user.active">
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
          icon="pi pi-save"
          :disabled="!canSave"
          :loading="loading"></Button>
      </div>
    </template>
  </Drawer>
</template>
