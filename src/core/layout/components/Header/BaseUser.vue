<script setup lang="ts">
import { Avatar } from 'primevue';
import { useI18n } from 'vue-i18n';

const name = 'Name Surname Surname';
const isLogged = true;
const { t } = useI18n();
</script>
<template>
  <div
    id="base-user-logged"
    v-if="isLogged"
    class="d-flex flex-row-reverse align-items-center justify-content-around">
    <div id="base-user-logged-name" class="d-flex">
      <span> {{ name }} </span>
    </div>

    <Avatar icon="pi pi-user" class="mr-2" size="large" shape="circle" />
  </div>
</template>
