<script setup lang="ts">
import { formatShowGameDateTime } from '@/core/utilities/UtilDate';
import { useGetBlogAdminTable } from '@/publication/application/useGetBlogAdminTable';
import BlogAdminForm from '@/publication/components/BlogAdminForm.vue';
import { type Publication } from '@/publication/domain/Publication';
import { useBlogAdminStore } from '@/publication/store/BlogAdminStore';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable, { type DataTablePageEvent, type DataTableSortEvent } from 'primevue/datatable';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { refetch: getTableItems, loading } = useGetBlogAdminTable();
const blogAdminStore = useBlogAdminStore();

const visible = ref<boolean>(false);
const selectedPublication = ref<Publication | null>(null);

const table = computed(() => blogAdminStore.getTable);
const totalOfRecords = computed(() => blogAdminStore.getTotalElements);
const rows = computed(() => blogAdminStore.getRows);

onMounted(async () => {
  blogAdminStore.cleanFilters();
  await doFetchTableItems();
});

watch(
  () => selectedPublication.value,
  () => {
    if (selectedPublication.value) {
      blogAdminStore.setSelectedToEdit(selectedPublication.value);
      toggleVisible();
    } else {
      blogAdminStore.clearSelectedToEdit();
    }
  }
);

watch(
  () => blogAdminStore.getEditionPublication,
  (newVal) => {
    if (!newVal) {
      selectedPublication.value = null;
    }
  }
);

function toggleVisible() {
  visible.value = !visible.value;
}

async function doFetchTableItems() {
  blogAdminStore.setTableData(await getTableItems(blogAdminStore.getFilters));
}

async function onSort(event: DataTableSortEvent) {
  const sortOrder = event.sortOrder;
  const sortField = event.sortField;
  if (event.sortField) {
    blogAdminStore.setSort(sortField as string, sortOrder as number);
  } else {
    blogAdminStore.clearSort();
  }
  await doFetchTableItems();
}

async function onPage(event: DataTablePageEvent) {
  blogAdminStore.setPage(event.page);
  await doFetchTableItems();
}
</script>
<template>
  <BlogAdminForm v-model="visible" @saved="doFetchTableItems"></BlogAdminForm>
  <Card class="h-100">
    <template #content>
      <DataTable
        id="publication-admin-table"
        v-model:selection="selectedPublication"
        selectionMode="single"
        :value="table"
        :loading="loading"
        dataKey="id"
        :totalRecords="totalOfRecords"
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} a {last} de {totalRecords}"
        scrollable
        removableSort
        lazy
        :rows="rows"
        @sort="onSort($event)"
        @page="onPage($event)">
        <template #empty>
          {{ t('core.states.no_results') }}
        </template>
        <template #header>
          <h3 class="mb-2 mt-2">{{ t('blog.table_title') }}</h3>
        </template>

        <Column field="title" :header="t('blog.fields.title')" style="width: 20%"></Column>
        <Column field="body" :header="t('blog.fields.body')" style="width: 55%"><template #body="slotProps"><p v-html="slotProps.data.body"></p></template></Column>
        <Column
          field="creationDate"
          :header="t('blog.fields.creation_date')"
          sortable
          style="width: 15%">
        <template #body="slotProps"><span>{{ formatShowGameDateTime(slotProps.data.creationDate) }}</span></template></Column>
        <Column field="images" style="width: 10%">
          <template #header>
            <Button
              :label="t('core.buttons.add')"
              icon="pi pi-plus"
              @click="toggleVisible"></Button>
          </template>
          <template #body="slotProps">
            <img
              v-if="slotProps.data.images && slotProps.data.images.length > 0"
              :src="slotProps.data.images[0].url"
              :alt="slotProps.data.images[0].name"
              id="preview-image"
              crossorigin="anonymous"></img>
            <span v-else>{{ t('blog.fields.no_images') }}</span>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>
<style>
#preview-image {
  max-height: 125px;
  object-fit: contain;
  aspect-ratio: 1/1;
}
</style>
