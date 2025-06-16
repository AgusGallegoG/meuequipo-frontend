<script lang="ts" setup>
import Card from 'primevue/card';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div id="base-module">
    <Card class="w-100">
      <template #title>
        <h2>{{ t('about_page.title') }}</h2>
      </template>
      <template #content>
        <div class="py-3 container">
          <div class="row align-items-center">
            <div class="col-12 col-xl-8">
              <h1 v-html="t('about_page.q1')"></h1>
              <p v-html="t('about_page.a1')"></p>
            </div>
            <div class="col-12 col-xl-4 d-flex justify-content-center">
              <img
                class="img-fluid"
                src="@/core/assets/images/logos/logo_xuven.png"
                alt="CB Xuventude Verin Escudo"
                name="CB Xuventude Verin Escudo"
                style="max-width: 150px" />
            </div>
          </div>
        </div>

        <div class="py-5 container">
          <div class="row align-items-center">
            <div class="col-12 col-xl-4 d-flex justify-content-center">
              <img
                class="img-fluid"
                src="https://th.bing.com/th/id/OIP.9uQeXJPOGm7x6d4fFhnXxAHaD4?w=315&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
                alt="CB Xuventude Verin" />
            </div>

            <div class="col-12 col-xl-8">
              <h1 v-html="t('about_page.q2')"></h1>
              <p v-html="t('about_page.a2')"></p>
            </div>
          </div>
        </div>

        <div class="py-5 container">
          <div class="row align-items-center">
            <div class="col-12 col-xl-8">
              <h1 v-html="t('about_page.q3')"></h1>
              <p v-html="t('about_page.a3')"></p>
            </div>
            <div class="col-12 col-xl-4 d-flex justify-content-center">
              <img
                class="img-fluid"
                src="https://th.bing.com/th/id/OIP.9uQeXJPOGm7x6d4fFhnXxAHaD4?w=315&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
                alt="CB Xuventude Verin" />
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
<style lang="css" scoped>
p {
  line-height: 2;
  text-align: justify;
}
</style>
