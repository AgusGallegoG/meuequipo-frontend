<script setup lang="ts">
import BaseCheckBox from '@/shared/components/BaseCheckBox.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import { useSaveUser } from '@/user/application/useSaveUser';
import { type UserItem, defaultUserItem } from '@/user/domain/UserTable';
import { useUserAdminStore } from '@/user/store/userAdminStore';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { useI18n } from 'vue-i18n';

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
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.value.email);
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
  userAdminStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  //ExecuteQuery
  const response = await saveUser(user.value);
  if (response) {
    userAdminStore.setTableData(response);
  }
}
</script>
<template>
  <Card class="h-100">
    <template #title>
      <h3 class="mb-2 mt-2">
        {{ isEdit ? t('users.form_title_edit') : t('users.form_title_new') }}
      </h3>
    </template>
    <template #content>
      <div class="container g-3">
        <BaseInputGroupText
          :label="t('users.fields.name')"
          v-model="user.name"></BaseInputGroupText>

        <BaseInputGroupText
          :label="t('users.fields.surnames')"
          v-model="user.surnames"></BaseInputGroupText>

        <BaseInputGroupText
          :label="t('users.fields.email')"
          v-model="user.email"
          :error="!isValidMail"
          :textError="t('users.error.mail')"></BaseInputGroupText>

        <BaseCheckBox :label="t('users.fields.active')" v-model="user.active"></BaseCheckBox>
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
