<script setup lang="ts">
import { useGetBlogInitContents } from '@/publication/application/useGetBlogInitContent';
import PublicationCard from '@/publication/components/PublicationCard.vue';
import type { Publication } from '@/publication/domain/Publication';
import Card from 'primevue/card';
import Carousel from 'primevue/carousel';
import ProgressSpinner from 'primevue/progressspinner';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { loading, refetch: getBlogInitContents } = useGetBlogInitContents();
const { t } = useI18n();
const data = ref<Publication[]>([]);

onMounted(async () => {
  await getInitialData();
});

async function getInitialData() {
  data.value = await getBlogInitContents();
}
</script>

<template>
  <Card>
    <template #header>
      <div class="w-100 flex-column">
        <div class="d-flex justify-content-center">
          <h3 class="pt-3 px-4 pb-0">{{ t('layout.init.blog') }}</h3>
        </div>
      </div>
    </template>
    <template #content>
      <div
        v-if="loading"
        class="h-50 d-flex align-content-center justify-content-center align-items-center"
        style="min-height: 50vh">
        <ProgressSpinner style="width: 40px; height: 40px" strokeWidth="4" />
      </div>
      <Carousel v-else :value="data">
        <template #item="slotProps"> <PublicationCard :publication="slotProps.data" /></template>
      </Carousel>
    </template>
  </Card>
</template>
