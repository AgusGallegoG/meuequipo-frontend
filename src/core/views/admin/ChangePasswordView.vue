<script setup lang="ts">
import { useChangePass } from '@/auth/application/useChangePass';
import { changePassSchema, defaultChangePass } from '@/auth/domain/ChangePass';
import { useAuthStore } from '@/auth/store/authStore';
import router from '@/core/router';
import { useZodValidation } from '@/core/utilities/UtilZodValidations';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import { useI18n } from 'vue-i18n';

const authStore = useAuthStore();
const { t } = useI18n();
const { refetch: doChangePass, loading } = useChangePass();

const {
  form,
  errors: formErrors,
  submitted,
  isFormValid,
  validate,
  reset,
} = useZodValidation(defaultChangePass, changePassSchema);

async function onSubmit() {
  submitted.value = true;
  if (!validate()) return;

  await doChangePass(form.value);

  router.push({ name: 'Dashboard' });
}

function onReset() {
  reset();

  router.push({ name: 'Dashboard' });
}
</script>
<template>
  <div id="admin-changepass-module">
    <Card id="loginForm" class="w-100">
      <template #header>
        <div class="container mt-3 mx-3">
          <div class="row">
            <h1 class="text-break">{{ t('admin.login.changepass', [authStore.getUsername]) }}</h1>
          </div>
          <div class="row">
            <h3 class="text-break">{{ '(' + authStore.getEmail + ')' }}</h3>
          </div>
        </div>
      </template>
      <template #content>
        <div class="container mt-3">
          <div class="row mx-5">
            <BaseInputGroupText
              :id="'oldpass'"
              v-model="form.oldPass"
              :label="t('admin.login.password_old')"
              :icon="'pi pi-user'"
              :password="true"
              :invalid="!!formErrors.oldPass"
              :errorMessage="formErrors.oldPass ?? undefined" />
          </div>

          <div class="row mx-5">
            <BaseInputGroupText
              :id="'newpass'"
              v-model="form.newPass"
              :label="t('admin.login.password_new')"
              :icon="'pi pi-lock'"
              :password="true"
              :invalid="!!formErrors.newPass"
              :errorMessage="formErrors.newPass ?? undefined" />
          </div>

          <div class="row mx-5">
            <BaseInputGroupText
              :id="'newpass-confirmation'"
              v-model="form.confirmNewPass"
              :label="t('admin.login.password_repeat')"
              :icon="'pi pi-lock'"
              :password="true"
              :invalid="!!formErrors.confirmNewPass"
              :errorMessage="formErrors.confirmNewPass ?? undefined" />
          </div>
        </div>
        <Divider />
      </template>
      <template #footer>
        <div class="container">
          <div class="row g-3 my-3">
            <div class="col-12 col-md-6">
              <Button
                class="w-100"
                raised
                icon="pi pi-arrow-left"
                :label="t('core.buttons.back')"
                @click="onReset()"
                severity="secondary" />
            </div>

            <div class="col-12 col-md-6">
              <Button
                class="w-100"
                raised
                icon="pi pi-save"
                :label="t('core.buttons.save')"
                @click="onSubmit()"
                :loading="loading"
                :disabled="submitted && !isFormValid" />
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
