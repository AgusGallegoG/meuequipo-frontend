<script setup lang="ts">
import { useGetAllSponsors } from '@/sponsor/application/useGetAllSponsors';
import SponsorItem from '@/sponsor/components/SponsorItem.vue';
import type { Sponsor } from '@/sponsor/domain/Sponsor';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

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
  <div id="base-prefooter" class="container-fluid py-5">
    <h2 class="text-center mb-5">{{ t('layout.prefooter.patro') }}</h2>

    <div class="row justify-content-center g-4">
      <div
        v-for="sponsor in sponsors"
        :key="sponsor.id"
        class="col-sm-6 col-md-3 col-lg-2 d-flex justify-content-center">
        <SponsorItem :name="sponsor.name" :url="sponsor.url" :logo="sponsor.logo"></SponsorItem>
      </div>
    </div>
  </div>
</template>
