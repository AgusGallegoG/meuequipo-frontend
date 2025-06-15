<script setup lang="ts">
import { useGetSponsorsAdminTable } from '@/sponsor/application/useGetSponsorsAdminTable';
import SponsorAdminForm from '@/sponsor/components/SponsorAdminForm.vue';
import type { Sponsor } from '@/sponsor/domain/Sponsor';
import { useSponsorAdminStore } from '@/sponsor/store/SponsorAdminStore';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable, { type DataTablePageEvent, type DataTableSortEvent } from 'primevue/datatable';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { refetch: getTable, loading: loadTable } = useGetSponsorsAdminTable();
const sponsorAdminStore = useSponsorAdminStore();

const visible = ref<boolean>(false);
const selectedSponsor = ref<Sponsor | null>(null);

const table = computed(() => sponsorAdminStore.getTable);
const totalOfRecords = computed(() => sponsorAdminStore.getTotalElements);
const rows = computed(() => sponsorAdminStore.getRows);

onMounted(async () => {
  await doFetchTableItems();
});

watch(
  () => selectedSponsor.value,
  () => {
    if (selectedSponsor.value) {
      sponsorAdminStore.setSelectedToEdit(selectedSponsor.value);
      toggleVisible();
    } else {
      sponsorAdminStore.clearSelectedToEdit();
    }
  }
);

watch(
  () => sponsorAdminStore.getEditionSponsor,
  (newVal) => {
    if (!newVal) {
      selectedSponsor.value = null;
    }
  }
);

function toggleVisible() {
  visible.value = !visible.value;
}

async function doFetchTableItems() {
  sponsorAdminStore.setTableData(await getTable(sponsorAdminStore.getFilters));
}

async function onSort(event: DataTableSortEvent) {
  const sortOrder = event.sortOrder;
  const sortField = event.sortField;
  if (event.sortField) {
    sponsorAdminStore.setSort(sortField as string, sortOrder as number);
  } else {
    sponsorAdminStore.clearSort();
  }
  await doFetchTableItems();
}

async function onPage(event: DataTablePageEvent) {
  sponsorAdminStore.setPage(event.page);
  await doFetchTableItems();
}
</script>
<template>
  <SponsorAdminForm v-model="visible"></SponsorAdminForm>
  <Card class="h-100">
    <template #content>
      <DataTable
        id="sponsors-admin-table"
        v-model:selection="selectedSponsor"
        selectionMode="single"
        :loading="loadTable"
        :value="table"
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
          <div class="container g-3">
            <div class="row row-cols-2">
              <h3 class="mb-2 mt-2 col">{{ t('sponsors.table_title') }}</h3>
              <div class="col d-flex justify-content-end">
                <Button
                  :label="t('core.buttons.add')"
                  icon="pi pi-plus"
                  @click="toggleVisible()"></Button>
              </div>
            </div>
          </div>
        </template>

        <Column field="logo" :header="t('sponsors.fields.logo')">
          <template #body="slotProps">
            <img :src="slotProps.data.logo.url" class="sponsor-admin-table-logo" />
          </template>
        </Column>

        <Column field="name" :header="t('sponsors.fields.name')" sortable></Column>
      </DataTable>
    </template>
  </Card>
</template>
<style lang="css">
.sponsor-admin-table-logo {
  max-height: 75px;
  object-fit: contain;
  aspect-ratio: 1/1;
}
</style>
