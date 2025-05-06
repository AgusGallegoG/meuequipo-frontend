<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SponsorItem from '@/sponsor/components/SponsorItem.vue';
import type { Sponsor } from '../domain/Sponsor';
import { onMounted, ref } from 'vue';
import { useGetAllSponsors } from '../application/useGetAllSponsors';

const { t } = useI18n();

const sponsors = ref<Sponsor[]>([]);

const { refetch: getSponsors } = useGetAllSponsors();

onMounted(async () => {
  await getData();
});

async function getData() {
  sponsors.value = await getSponsors();
}
</script>

<template>
  <div id="base-prefooter" class="container-fluid p-5">
    <h2 class="text-center pb-5">{{ t('layout.prefooter.patro') }}</h2>

    <div class="row justify-content-center">
      <div v-for="sponsor in sponsors" :key="sponsor.id" class="col-sm-6 col-md-3">
        <SponsorItem :name="sponsor.name" :url="sponsor.url" :logo="sponsor.logo"></SponsorItem>
      </div>
    </div>
  </div>
</template>
