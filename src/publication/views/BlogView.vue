<script setup lang="ts">
import { pageableDefault, type Pageable } from '@/core/dominio/Pageable';
import { UtilBase } from '@/core/utilities/UtilBase';
import { useGetBlogData } from '@/publication/application/useGetBlogData';
import PublicationView from '@/publication/components/PublicationCard.vue';
import { defaultPublicationNews, type PublicationNews } from '@/publication/domain/Publication';
import Paginator, { type PageState } from 'primevue/paginator';
import ProgressSpinner from 'primevue/progressspinner';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { loading, refetch: getBlogContents } = useGetBlogData();
const { t } = useI18n();

const data = ref<PublicationNews>({ ...defaultPublicationNews });
const pageable = ref<Pageable>({ ...pageableDefault });

onMounted(async () => {
  pageable.value = UtilBase.cloneVueProxy(pageableDefault);
  await getData();
});

async function getData() {
  data.value = await getBlogContents(pageable.value);
}

async function onPageChange(event: PageState) {
  pageable.value.page = event.page;
  pageable.value.rows = event.rows;

  await getData();
}
</script>

<template>
  <div id="base-module">
    <div
      v-if="loading"
      class="h-50 d-flex align-content-center justify-content-center align-items-center"
      style="min-height: 50vh">
      <ProgressSpinner style="width: 40px; height: 40px" strokeWidth="4" />
    </div>
    <div v-else>
      <div
        v-if="data.content.length > 0"
        class="publication-container"
        v-for="publication in data.content"
        :key="publication.id">
        <PublicationView :publication="publication" class="my-3" />
      </div>
      <div v-else>
        <span>{{ t('core.states.no_results') }}</span>
      </div>
    </div>

    <Paginator
      :rows="pageable.rows"
      :first="pageable.page * pageable.rows"
      :totalRecords="data.totalRecords"
      :template="'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'"
      currentPageReportTemplate="{first} a {last} de {totalRecords}"
      @page="onPageChange"></Paginator>
  </div>
</template>
