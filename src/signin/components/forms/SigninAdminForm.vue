<script setup lang="ts">
import { UtilBase } from '@/core/utilities/UtilBase';
import { useZodValidation } from '@/core/utilities/UtilZodValidations';
import BaseDatePicker from '@/shared/components/BaseDatePicker.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import BasePhoneInput from '@/shared/components/BasePhoneInput.vue';
import BaseSelect from '@/shared/components/BaseSelect.vue';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import { useSaveSignin } from '@/signin/application/useSaveSignin';
import { defaultSignin, signinPublicSchema, type Signin } from '@/signin/domain/Signin';
import { useSigninAdminStore } from '@/signin/store/SgininAdminStore';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { refetch: saveSignin, loading: loading } = useSaveSignin();

const visible = defineModel<boolean>();

const singinAdminStore = useSigninAdminStore();
const sharedEnumStore = useSharedEnumsStore();

const isEdit = computed(() => singinAdminStore.isEdition);
const editionSignin = computed(() => singinAdminStore.getEditionSignin);
const {
  form,
  errors: formErrors,
  submitted,
  isFormValid,
  validate,
  reset,
} = useZodValidation(defaultSignin, signinPublicSchema);

watch(visible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

watch(editionSignin, (newVal) => {
  if (newVal) {
    form.value = { ...newVal };
  } else {
    form.value = UtilBase.cloneVueProxy(defaultSignin);
  }
});

function resetForm() {
  reset();
  if (isEdit.value === true) {
    visible.value = false;
  }
  singinAdminStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  submitted.value = true;

  if (!validate()) return;

  const response = await saveSignin(form.value);
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
        <div class="row align-items-start">
          <BaseInputGroupText
            class="col-12 col-xl-5 mb-3"
            v-model="form.parentName"
            :label="t('signin.fields.parent_name')"
            :invalid="!!formErrors.parentName"
            :disabled="isEdit"
            :errorMessage="formErrors.parentName ?? undefined" />
          <BaseInputGroupText
            class="col-12 col-xl-7 mb-3"
            v-model="form.parentSurnames"
            :label="t('signin.fields.parent_surnames')"
            :invalid="!!formErrors.parentSurnames"
            :disabled="isEdit"
            :errorMessage="formErrors.parentSurnames ?? undefined" />
        </div>
        <!-- Parent contact-info -->
        <div class="row align-items-start">
          <BaseInputGroupText
            class="col-12 col-xl-5 mb-3"
            v-model="form.player.name"
            :label="t('signin.fields.player_name')"
            :disabled="isEdit"
            :invalid="!!formErrors.player?.name"
            :errorMessage="formErrors.player?.name ?? undefined" />
          <BaseInputGroupText
            class="col-12 col-xl-7 mb-3"
            v-model="form.player.surnames"
            :label="t('signin.fields.player_surnames')"
            :disabled="isEdit"
            :invalid="!!formErrors.player?.surnames"
            :errorMessage="formErrors.player?.surnames ?? undefined" />
          <BaseDatePicker
            class="col-12 col-xl-4 mb-3"
            v-model="form.player.birthDate"
            :label="t('signin.fields.birth_date')"
            :disabled="isEdit"
            :invalid="!!formErrors.player?.birthDate"
            :errorMessage="formErrors.player?.birthDate ?? undefined" />
          <BaseSelect
            class="col-12 col-xl-4 mb-3"
            v-model="form.player.sex"
            :options="sharedEnumStore.getSexOptions"
            :label="t('signin.fields.sex')"
            :disabled="isEdit"
            :invalid="!!formErrors.player?.sex"
            :errorMessage="formErrors.player?.sex ?? undefined" />
          <BaseSelect
            class="col-12 col-xl-4 mb-3"
            v-model="form.player.category"
            :options="sharedEnumStore.getCategories"
            :label="t('signin.fields.category')"
            :disabled="isEdit"
            :invalid="!!formErrors.player?.category"
            :errorMessage="formErrors.player?.category ?? undefined" />
        </div>
        <!-- player name-surname -->
        <div class="row align-items-start">
          <BasePhoneInput
            class="col-12 col-xl-5 mb-3"
            v-model="form.phone"
            :label="t('signin.fields.phone')"
            :disabled="isEdit"
            :invalid="!!formErrors.phone"
            :errorMessage="formErrors.phone ?? undefined" />
          <BaseInputGroupText
            class="col-12 col-xl-7 mb-3"
            v-model="form.mail"
            :label="t('signin.fields.email')"
            :disabled="isEdit"
            :invalid="!!formErrors.mail"
            :errorMessage="formErrors.mail ?? undefined" />
          <BaseSelect
            class="col-12 mb-3"
            v-model="form.state"
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
          :disabled="submitted && !isFormValid"
          :loading="loading"></Button>
      </div>
    </template>
  </Drawer>
</template>
