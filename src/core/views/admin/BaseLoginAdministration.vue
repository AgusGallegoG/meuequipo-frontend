<script setup lang="ts">
import { Card, Divider, Button } from 'primevue';
import { useI18n } from 'vue-i18n';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import { ref } from 'vue';

type LoginForm = {
  name: string;
  password: string;
};

const { t } = useI18n();
const form = ref<LoginForm>({ name: '', password: '' });

function doLogin() {
  return true;
}
</script>
<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <Card id="loginForm">
      <template #title> {{ t('core.admin.login.title') }} </template>
      <template #content>
        <div class="container-fluid">
          <BaseInputGroupText
            :id="'username'"
            :class="'row'"
            :model-value="form.name"
            :label="t('core.admin.login.username')"
            :icon="'pi pi-user'" />
          <BaseInputGroupText
            :id="'username'"
            :class="'row'"
            :model-value="form.password"
            :label="t('core.admin.login.password')"
            :icon="'pi pi-lock'"
            :password="true" />
        </div>
        <Divider />
      </template>
      <template #footer>
        <div class="container-fluid">
          <div class="row">
            <Button raised :label="t('core.admin.login.button')" @click="doLogin()" />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
