<script lang="ts" setup>
import Card from 'primevue/card';
import { useI18n } from 'vue-i18n';

import about1 from '@/core/assets/images/about/about_1.jpg';
import about2 from '@/core/assets/images/about/about_2.jpg';
import baseLogo from '@/core/assets/images/logos/logo_xuven.png';

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
                loading="lazy"
                class="img-fluid"
                :src="baseLogo"
                alt="CB Xuventude Verin Escudo"
                name="CB Xuventude Verin Escudo"
                style="max-width: 150px" />
            </div>
          </div>
        </div>

        <div class="py-5 container">
          <div class="row align-items-center">
            <div class="col-12">
              <h1 v-html="t('about_page.q_history')"></h1>
              <p v-html="t('about_page.a_history')"></p>
            </div>
          </div>
        </div>

        <div class="py-5 container">
          <div class="row align-items-center">
            <div class="col-12 col-xl-4 d-flex justify-content-center">
              <img loading="lazy" class="img-fluid" :src="about1" alt="CB Xuventude Verin" />
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
              <img class="img-fluid" loading="lazy" :src="about2" alt="CB Xuventude Verin" />
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

img {
  border-radius: 5px;
}
</style>
