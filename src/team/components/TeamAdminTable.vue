<script setup lang="ts">
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import { useGetTeamAdminTable } from '@/team/application/useGetTeamAdminTable';
import { useGetTeamFormDetails } from '@/team/application/useGetTeamFormDetails';
import TeamAdminForm from '@/team/components/TeamAdminForm.vue';
import type { TeamItem } from '@/team/domain/TeamTable';
import { useTeamAdminStore } from '@/team/store/teamAdminStore';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import type { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable';
import DataTable from 'primevue/datatable';
import Tag from 'primevue/tag';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { refetch: getTableItems, loading } = useGetTeamAdminTable();
const { refetch: getTeamFormDetails } = useGetTeamFormDetails();
const teamAdminStore = useTeamAdminStore();
const sharedEnumStore = useSharedEnumsStore();

const visible = ref<boolean>(false);
const selectedTeam = ref<TeamItem | null>(null);

const table = computed(() => teamAdminStore.getTable);
const totalOfRecords = computed(() => teamAdminStore.getTotalElements);
const rows = computed(() => teamAdminStore.getRows);

onMounted(async () => {
  teamAdminStore.cleanFilters();
  await doFetchTableItems();
  await sharedEnumStore.fetchAll();
});

watch(
  () => selectedTeam.value,
  async () => {
    if (selectedTeam.value) {
      await doGetSigninDetails(selectedTeam.value.id);
      toggleVisible();
    } else {
      teamAdminStore.clearSelectedToEdit();
    }
  }
);

watch(
  () => teamAdminStore.getEditionTeam,
  (newVal) => {
    if (!newVal) {
      selectedTeam.value = null;
    }
  }
);

function toggleVisible() {
  visible.value = !visible.value;
}

async function doFetchTableItems() {
  teamAdminStore.setTableData(await getTableItems(teamAdminStore.getFilters));
}

async function doGetSigninDetails(id: number) {
  teamAdminStore.setSelectedToEdit(await getTeamFormDetails(id));
}

async function onSort(event: DataTableSortEvent) {
  const sortOrder = event.sortOrder;
  const sortField = event.sortField;
  if (event.sortField) {
    teamAdminStore.setSort(sortField as string, sortOrder as number);
  } else {
    teamAdminStore.clearSort();
  }
  await doFetchTableItems();
}

async function onPage(event: DataTablePageEvent) {
  teamAdminStore.setPage(event.page);
  await doFetchTableItems();
}
</script>
<template>
  <TeamAdminForm v-model="visible" @saved="doFetchTableItems" />
  <Card class="h-100">
    <template #content>
      <DataTable
        id="signin-admin-table"
        v-model:selection="selectedTeam"
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
          <h3 class="mb-2 mt-2">{{ t('teams.table_title') }}</h3>
        </template>

        <Column field="name" :header="t('teams.fields.name')" style="width: 30%"></Column>
        <Column field="trainer" :header="t('teams.fields.trainer')" style="width: 20%"></Column>
        <Column
          field="playerCount"
          :header="t('teams.fields.player_count')"
          style="width: 20%"></Column>
        <Column field="sex" :header="t('teams.fields.sex')" style="width: 15%">
          <template #body="slotProps">
            <Tag
              :value="sharedEnumStore.getSexName(slotProps.data.sex)"
              :severity="sharedEnumStore.getSexSeverity(slotProps.data.sex)" /> </template
        ></Column>
        <Column field="category" style="width: 15%">
          <template #header>
            <Button
              @click="toggleVisible()"
              :label="t('core.buttons.add')"
              icon="pi pi-plus"
              raised />
          </template>
          <template #body="slotProps">
            <Tag
              :value="sharedEnumStore.getCategoryName(slotProps.data.category)"
              severity="secondary" />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>
