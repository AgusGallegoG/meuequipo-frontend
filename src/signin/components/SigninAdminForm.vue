<script setup lang="ts">
import BaseDatePicker from '@/shared/components/BaseDatePicker.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import BaseSelect from '@/shared/components/BaseSelect.vue';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import { defaultSignin, type Signin } from '@/signin/domain/Signin';
import { useSigninAdminStore } from '@/signin/store/SgininAdminStore';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import { useI18n } from 'vue-i18n';
import { useSaveSignin } from '../application/useSaveSignin';

const { t } = useI18n();
const { refetch: saveSignin, loading: loading } = useSaveSignin();

const visible = defineModel<boolean>();

const singinAdminStore = useSigninAdminStore();
const sharedEnumStore = useSharedEnumsStore();

const isEdit = computed(() => singinAdminStore.isEdition);
const editionSignin = computed(() => singinAdminStore.getEditionSignin);
const canSave = computed(() => {
  const s = signin.value;
  const p = s.player;

  return (
    s.parentName.trim() !== '' &&
    s.parentSurnames.trim() !== '' &&
    s.mail.trim() !== '' &&
    s.phone.trim() !== '' &&
    p &&
    p.name.trim() !== '' &&
    p.surnames.trim() !== '' &&
    p.birthDate !== null &&
    p.sex !== null &&
    p.category !== null
  );
});
const signin = ref<Signin>({ ...defaultSignin });

watch(visible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

watch(editionSignin, (newVal) => {
  if (newVal) {
    signin.value = cloneSignin(newVal);
  } else {
    signin.value = cloneSignin(defaultSignin);
  }
});

function resetForm() {
  signin.value = cloneSignin(defaultSignin);
  if (isEdit.value === true) {
    visible.value = false;
  }
  singinAdminStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  const response = await saveSignin(signin.value);
  if (response) {
    singinAdminStore.setTableData(response);
  }
  visible.value = false;
}

function cloneSignin(original: Signin): Signin {
  return {
    id: original.id,
    parentName: original.parentName,
    parentSurnames: original.parentSurnames,
    mail: original.mail,
    phone: original.phone,
    state: original.state,
    player: {
      id: original.player.id,
      name: original.player.name,
      surnames: original.player.surnames,
      birthDate: original.player.birthDate ? new Date(original.player.birthDate) : null,
      sex: original.player.sex,
      category: original.player.category,
    },
  };
}
</script>
<template>
  <Drawer position="top" v-model:visible="visible" class="h-75">
    <template #header>
      <h3 class="mt-2">
        {{ isEdit ? t('signin.form_title_edit') : t('signin.form_title_new') }}
      </h3>
    </template>

    <template #default>
      <div class="container g-3 pt-3">
        <!-- Parent name-surname -->
        <div class="row">
          <BaseInputGroupText
            class="col-12 col-md-4"
            v-model="signin.parentName"
            :label="t('signin.fields.parent_name')"
            :disabled="isEdit" />
          <BaseInputGroupText
            class="col-12 col-md-8"
            v-model="signin.parentSurnames"
            :label="t('signin.fields.parent_surnames')"
            :disabled="isEdit" />
        </div>
        <!-- Parent contact-info -->
        <div class="row">
          <BaseInputGroupText
            class="col-12 col-md-4"
            v-model="signin.phone"
            :label="t('signin.fields.phone')"
            :disabled="isEdit" />
          <BaseInputGroupText
            class="col-12 col-md-6"
            v-model="signin.mail"
            :label="t('signin.fields.email')"
            :disabled="isEdit" />
          <BaseSelect
            class="col-12 col-md-2"
            v-model="signin.player.category"
            :options="sharedEnumStore.getCategories"
            :label="t('signin.fields.category')"
            :disabled="isEdit" />
        </div>
        <!-- player name-surname -->
        <div class="row">
          <BaseInputGroupText
            class="col-12 col-md-4"
            v-model="signin.player.name"
            :label="t('signin.fields.player_name')"
            :disabled="isEdit" />
          <BaseInputGroupText
            class="col-12 col-md-8"
            v-model="signin.player.surnames"
            :label="t('signin.fields.player_surnames')"
            :disabled="isEdit" />
        </div>
        <!-- player birth-category-sex -->
        <div class="row">
          <BaseDatePicker
            class="col-12 col-md-4"
            v-model="signin.player.birthDate"
            :label="t('signin.fields.birth_date')"
            :disabled="isEdit" />
          <BaseSelect
            class="col-12 col-md-4"
            v-model="signin.player.sex"
            :options="sharedEnumStore.getSexOptions"
            :label="t('signin.fields.sex')"
            :disabled="isEdit" />
          <BaseSelect
            class="col-12 col-md-4"
            v-model="signin.state"
            :options="sharedEnumStore.getSigninStates"
            :label="t('signin.fields.state')" />
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
