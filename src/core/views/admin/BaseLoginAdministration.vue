<script setup lang="ts">
import { Card, Divider, Button } from 'primevue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import { useAuthStore } from '@/auth/store/authStore';
import { defaultLoginRequest, type LoginRequest } from '@/auth/domain/LoginRequest';
import { useLogin } from '@/auth/application/useLogin';
import { userDefault } from '@/auth/domain/User';
import { useRouter } from 'vue-router';
import { UtilBase } from '@/core/utilities/UtilBase';

const { t } = useI18n();
const authStore = useAuthStore();
const { loading, refetch } = useLogin();
const router = useRouter();
const error = ref<boolean>(false);

const form = ref<LoginRequest>(defaultLoginRequest);

async function doLogin() {
  debugger;
  const login = await refetch(form.value);
  authStore.setData(login);

  // Si el login no es el default
  if (!UtilBase.isDefault(login, userDefault)) {
    router.push('/administracion');
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
