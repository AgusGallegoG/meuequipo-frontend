<script setup lang="ts">
import PublicationView from '@/publication/components/PublicationCard.vue';
import { onMounted, ref } from 'vue';
import { useGetBlogContents } from '../application/useGetBlogContent';
import type { Publication } from '../domain/Publication';
import Skeleton from 'primevue/skeleton';

const { loading, refetch: getBlogContents } = useGetBlogContents();
const data = ref<Publication[]>([]);

onMounted(async () => {
  await getInitialData();
});

async function getInitialData() {
  data.value = await getBlogContents(true);
}
</script>
<!-- THIS COMPONENT IS SET TO BE A LIST OF NEWS -->

<template>
  <div>
    <Skeleton
      v-if="loading"
      :shape="'rectangle'"
      :height="'50vh'"
      :width="'75vw'"
      class="publication-container-skeleton"></Skeleton>
    <div class="publication-container" v-for="publication in data" :key="publication.id">
      <PublicationView :publication="publication" />
    </div>
  </div>
</template>

<style lang="css">
.publication-container {
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
}

.publication-container-skeleton {
  min-height: 100%;
  padding-bottom: 2rem;
}
</style>
