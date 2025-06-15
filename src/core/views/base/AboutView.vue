<script lang="ts" setup>
import Card from 'primevue/card';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div id="base-module">
    <Card class="w-100">
      <template #title>
        <h3>{{ t('about_page.title') }}</h3>
      </template>
      <template #content>
        <div class="w-75 d-flex text-center">
          <span>qweqweqweqweqweqweqweqweqweqwe qe qeqwe qeq qewe qe eqwe qeqwe qweq eqw eqw</span>
        </div>
      </template>
    </Card>
  </div>
</template>
