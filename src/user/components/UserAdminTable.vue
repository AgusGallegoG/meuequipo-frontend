<script setup lang="ts">
import { useGetUserAdminTable } from '@/user/application/useGetUserAdminTable';
import type { UserItem } from '@/user/domain/UserTable';
import { useUserAdminStore } from '@/user/store/userAdminStore';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable, { type DataTablePageEvent, type DataTableSortEvent } from 'primevue/datatable';
import Tag from 'primevue/tag';
import { useI18n } from 'vue-i18n';

const userAdminStore = useUserAdminStore();
const { t } = useI18n();
const { refetch: getTable, loading: loadTable } = useGetUserAdminTable();

const selectedUser = ref<UserItem | null>(null);

const table = computed(() => userAdminStore.getTable);
const totalOfRecords = computed(() => userAdminStore.getTotalElements);
const rows = computed(() => userAdminStore.getRows);

onMounted(async () => {
  await doFetchTableItems();
});

watch(
  () => selectedUser.value,
  () => {
    if (selectedUser.value) {
      userAdminStore.setSelectedToEdit(selectedUser.value);
    } else {
      userAdminStore.clearSelectedToEdit();
    }
  }
);

watch(
  () => userAdminStore.getEditionUser,
  (newVal) => {
    if (!newVal) {
      selectedUser.value = null;
    }
  }
);

async function doFetchTableItems() {
  userAdminStore.setTableData(await getTable(userAdminStore.getFilters));
}

async function onSort(event: DataTableSortEvent) {
  const sortOrder = event.sortOrder;
  const sortField = event.sortField;
  if (event.sortField) {
    userAdminStore.setSort(sortField as string, sortOrder as number);
  } else {
    userAdminStore.clearSort();
  }
  await doFetchTableItems();
}

async function onPage(event: DataTablePageEvent) {
  userAdminStore.setPage(event.page);
  await doFetchTableItems();
}
</script>
<template>
  <Card class="h-100">
    <template #content>
      <DataTable
        id="users-admin-table"
        v-model:selection="selectedUser"
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
          <h3 class="mb-2 mt-2">{{ t('users.table_title') }}</h3>
        </template>
        <Column field="name" :header="t('users.fields.name')" sortable></Column>

        <Column field="surnames" :header="t('users.fields.surnames')" sortable></Column>

        <Column field="email" :header="t('users.fields.email')" sortable></Column>

        <Column field="active">
          <template #body="slotProps">
            <Tag
              :value="
                slotProps.data.active ? t('users.fields.active') : t('users.fields.not_active')
              "
              :severity="slotProps.data.active ? 'success' : 'danger'"></Tag>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>
