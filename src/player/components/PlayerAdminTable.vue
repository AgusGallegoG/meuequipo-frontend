<script setup lang="ts">
import { UtilBase } from '@/core/utilities/UtilBase';
import { mapToLocaleDateString } from '@/core/utilities/UtilDate';
import { useGetPlayerAdminTable } from '@/player/application/useGetPlayerAdminTable';
import PlayerAdminForm from '@/player/components/forms/PlayerAdminForm.vue';
import type { Player } from '@/player/domain/Player';
import { defaultPlayerFilters, type PlayerFilter } from '@/player/domain/PlayerFilter';
import { usePlayerAdminStore } from '@/player/store/PlayerAdminStore';
import BaseSelect from '@/shared/components/BaseSelect.vue';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import type { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable';
import DataTable from 'primevue/datatable';
import Tag from 'primevue/tag';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { refetch: getTableItems, loading } = useGetPlayerAdminTable();
const playerAdminStore = usePlayerAdminStore();
const sharedEnumStore = useSharedEnumsStore();

const visible = ref<boolean>(false);
const selectedPlayer = ref<Player | null>(null);

const table = computed(() => playerAdminStore.getTable);
const totalOfRecords = computed(() => playerAdminStore.getTotalElements);
const rows = computed(() => playerAdminStore.getRows);
const filters = ref<PlayerFilter>(UtilBase.cloneVueProxy(defaultPlayerFilters));

onMounted(async () => {
  await doFetchTableItems();
  await sharedEnumStore.fetchAll();
});

watch(
  () => selectedPlayer.value,
  async () => {
    if (selectedPlayer.value) {
      playerAdminStore.setSelectedToEdit(selectedPlayer.value);
      toggleVisible();
    } else {
      playerAdminStore.clearSelectedToEdit();
    }
  }
);

watch(
  () => playerAdminStore.getEditionPlayer,
  (newVal) => {
    if (!newVal) {
      selectedPlayer.value = null;
    }
  }
);

function toggleVisible() {
  visible.value = !visible.value;
}

async function doFetchTableItems() {
  playerAdminStore.setCategory(filters.value.categoryId);
  playerAdminStore.setPlayerSex(filters.value.sex);
  playerAdminStore.setTableData(await getTableItems(playerAdminStore.getFilters));
}

async function onSort(event: DataTableSortEvent) {
  const sortOrder = event.sortOrder;
  const sortField = event.sortField;
  if (event.sortField) {
    playerAdminStore.setSort(sortField as string, sortOrder as number);
  } else {
    playerAdminStore.clearSort();
  }
  await doFetchTableItems();
}

async function onPage(event: DataTablePageEvent) {
  playerAdminStore.setPage(event.page);
  await doFetchTableItems();
}

async function cleanFilters() {
  filters.value = UtilBase.cloneVueProxy(defaultPlayerFilters);
  playerAdminStore.cleanFilters();
  await doFetchTableItems();
}
</script>
<template>
  <PlayerAdminForm v-model="visible" @saved="doFetchTableItems" />
  <Card class="h-25 my-3">
    <template #content>
      <div class="container">
        <div class="row mt-3 align-items-center">
          <BaseSelect
            class="col-12 col-lg-5"
            v-model="filters.categoryId"
            :options="sharedEnumStore.getCategories"
            :label="t('player.fields.category')" />
          <BaseSelect
            class="col-12 col-lg-5"
            v-model="filters.sex"
            :options="sharedEnumStore.getSexPlayersOptions"
            :label="t('player.fields.sex')" />
          <div class="col-12 col-lg-2">
            <Button icon="pi pi-search" class="mx-2" @click="doFetchTableItems"></Button>
            <Button
              icon="pi pi-eraser"
              severity="secondary"
              class="mx-2"
              @click="cleanFilters"></Button>
          </div>
        </div>
      </div>
    </template>
  </Card>
  <Card class="h-75 my-3">
    <template #content>
      <DataTable
        id="player-admin-table"
        v-model:selection="selectedPlayer"
        selectionMode="single"
        rowExpansion
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
          <h3 class="mb-2 mt-2">{{ t('player.table_title') }}</h3>
        </template>
        <Column field="name" :header="t('player.fields.name')" style="width: 20%"></Column>
        <Column field="surnames" :header="t('player.fields.surnames')" style="width: 30%"></Column>
        <Column field="birthDate" :header="t('player.fields.birth_date')" style="width: 20%">
          <template #body="slotProps">
            <span>{{ mapToLocaleDateString(slotProps.data.birthDate) }}</span>
          </template>
        </Column>
        <Column field="category" :header="t('player.fields.category')" style="width: 15%">
          <template #body="slotProps">
            <Tag
              :value="sharedEnumStore.getCategoryName(slotProps.data.category)"
              severity="secondary" />
          </template>
        </Column>
        <Column field="sex" style="width: 15%">
          <template #header>
            <Button
              @click="toggleVisible()"
              :label="t('core.buttons.add')"
              icon="pi pi-plus"
              raised />
          </template>
          <template #body="slotProps">
            <Tag
              :value="sharedEnumStore.getSexPlayersName(slotProps.data.sex)"
              :severity="sharedEnumStore.getSexPlayersSeverity(slotProps.data.sex)" />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>
