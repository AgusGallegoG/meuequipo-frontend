<script setup lang="ts">
import { useGetRivalDetails } from '@/rivals/application/useGetRivalDetails';
import { useGetRivalsAdminTable } from '@/rivals/application/useGetRivalsAdminTable';
import { type RivalItem } from '@/rivals/domain/RivalTable';
import { useRivalsAdminStore } from '@/rivals/store/rivalsStore';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable, { type DataTablePageEvent, type DataTableSortEvent } from 'primevue/datatable';
import { useI18n } from 'vue-i18n';

const rivalAdminStore = useRivalsAdminStore();
const { t } = useI18n();
const { refetch: getTableItems, loading } = useGetRivalsAdminTable();
const { refetch: getRivalDetails } = useGetRivalDetails();

const selectedRival = ref<RivalItem | null>(null);

const table = computed(() => rivalAdminStore.getTable);
const totalOfRecords = computed(() => rivalAdminStore.getTotalElements);
const rows = computed(() => rivalAdminStore.getRows);

watch(
  () => selectedRival.value,
  () => {
    if (selectedRival.value) {
      doGetRivalDetails(selectedRival.value.id);
    } else {
      rivalAdminStore.clearSelectedToEdit();
    }
  }
);

async function doGetRivalDetails(id: number) {
  rivalAdminStore.setSelectedToEdit(await getRivalDetails(id));
}

async function doFetchTableItems() {
  rivalAdminStore.setTableData(await getTableItems(rivalAdminStore.getFilters));
}

onMounted(async () => {
  await doFetchTableItems();
});

async function onSort(event: DataTableSortEvent) {
  const sortOrder = event.sortOrder;
  const sortField = event.sortField;
  if (event.sortField) {
    rivalAdminStore.setSort(sortField as string, sortOrder as number);
  } else {
    rivalAdminStore.clearSort();
  }
  await doFetchTableItems();
}

async function onPage(event: DataTablePageEvent) {
  rivalAdminStore.setPage(event.page);
  await doFetchTableItems();
}
</script>
<template>
  <Card class="h-100">
    <template #content>
      <DataTable
        id="rivals-admin-table"
        v-model:selection="selectedRival"
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
        <template #empty>{{ t('core.states.no_results') }}</template>
        <template #header>
          <h3 class="mb-2 mt-2">{{ t('rivals.table_title') }}</h3>
        </template>

        <Column field="logo" :header="t('rivals.fields.logo')">
          <template #body="slotProps">
            <img :src="slotProps.data.logo.url" class="rival-admin-table-logo" />
          </template>
        </Column>

        <Column field="name" :header="t('rivals.fields.name')" sortable></Column>

        <Column field="responsible" :header="t('rivals.fields.responsible')"></Column>

        <Column field="tlf" :header="t('rivals.fields.tlf')"></Column>
      </DataTable>
    </template>
  </Card>
</template>
<style lang="css">
.rival-admin-table-logo {
  max-height: 75px;
  object-fit: contain;
}
</style>
