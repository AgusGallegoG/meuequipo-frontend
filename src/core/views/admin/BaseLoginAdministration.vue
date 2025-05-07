<script setup lang="ts">
import { useLogin } from '@/auth/application/useLogin';
import { userDefault } from '@/auth/domain/User';
import {
  defaultLoginRequest,
  type LoginRequest,
} from '@/auth/infrastructure/models/requests/LoginRequest';
import { useAuthStore } from '@/auth/store/authStore';
import { UtilBase } from '@/core/utilities/UtilBase';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import { Button, Card, Divider } from 'primevue';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const authStore = useAuthStore();
const { loading, refetch: executeLogin } = useLogin();
const router = useRouter();
const error = ref<boolean>(false);

const form = ref<LoginRequest>(defaultLoginRequest);

onMounted(() => {
  form.value = { ...defaultLoginRequest };
});

async function doLogin() {
  const login = await executeLogin(form.value);
  authStore.setData(login);

  // Si el usuario logueado no es el default
  if (!UtilBase.isDefault(login, userDefault)) {
    router.push({ name: 'Dashboard' });
  } else {
    error.value = true; // Setear error -> mostrar mensaje de error de nombre / contraseña no válidos
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
            :icon="'pi pi-user'" />
          <BaseInputGroupText
            :id="'username'"
            :class="'row'"
            v-model="form.password"
            :label="t('admin.login.password')"
            :icon="'pi pi-lock'"
            :password="true" />
        </div>
        <Divider />
      </template>
      <template #footer>
        <div class="container-fluid">
          <div class="row">
            <Button raised :label="t('admin.login.button')" @click="doLogin()" :loading="loading" />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
