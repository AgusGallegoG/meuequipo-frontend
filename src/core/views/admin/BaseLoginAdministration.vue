<script setup lang="ts">
import { useLogin } from '@/auth/application/useLogin';
import { defaultLoginForm, loginFormSchema } from '@/auth/domain/LoginForm';
import { useAuthStore } from '@/auth/store/authStore';
import { useZodValidation } from '@/core/utilities/UtilZodValidations';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import { Button, Card, Divider } from 'primevue';
import Message from 'primevue/message';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const authStore = useAuthStore();
const { loading, refetch: executeLogin } = useLogin();
const router = useRouter();

const {
  form,
  errors: formErrors,
  isFormValid,
  submitted,
  validate,
} = useZodValidation(defaultLoginForm, loginFormSchema);

const loginError = ref<boolean>(false);

async function doLogin() {
  submitted.value = true;
  if (!validate()) return;

  const login = await executeLogin(form.value);

  if (login) {
    //Si tenemos login
    authStore.setData(login);
    router.push({ name: 'Dashboard' });
  } else {
    loginError.value = true; // Setear error -> mostrar mensaje de error de nombre / contraseña no válidos
  }
}
</script>
<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <Card id="loginForm">
      <template #title> {{ t('admin.login.title') }} </template>
      <template #content>
        <div class="container-fluid" style="margin-top: 25px">
          <BaseInputGroupText
            :id="'username'"
            :class="'row'"
            v-model="form.name"
            :label="t('admin.login.username')"
            :icon="'pi pi-user'"
            :invalid="!!formErrors.name"
            :errorMessage="formErrors.name ?? undefined" />
          <BaseInputGroupText
            :id="'username'"
            :class="'row'"
            v-model="form.password"
            :label="t('admin.login.password')"
            :icon="'pi pi-lock'"
            :password="true"
            :invalid="!!formErrors.password"
            :errorMessage="formErrors.password ?? undefined" />
        </div>
        <Divider />
      </template>
      <template #footer>
        <div class="container-fluid">
          <div class="row">
            <Button
              raised
              :label="t('admin.login.button')"
              @click="doLogin()"
              :loading="loading"
              :disabled="!isFormValid" />
          </div>
        </div>
        <Message v-if="loginError" severity="error" size="small" variant="simple">
          {{ t('admin.login.login_err') }}
        </Message>
        <div class="text-center mt-2">
          <RouterLink to="/" class="text-light text-decoration-none">
            <small> {{ t('admin.login.go_main') }}</small>
          </RouterLink>
        </div>
      </template>
    </Card>
  </div>
</template>
