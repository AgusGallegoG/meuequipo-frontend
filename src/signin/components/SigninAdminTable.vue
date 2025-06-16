<script setup lang="ts">
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import { useGetSigninAdminTable } from '@/signin/application/useGetSigninAdminTable';
import { useGetSigninDetails } from '@/signin/application/useGetSigninDetails';
import SigninAdminForm from '@/signin/components/forms/SigninAdminForm.vue';
import type { SigninItem } from '@/signin/domain/SigninTable';
import { useSigninAdminStore } from '@/signin/store/SgininAdminStore';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import type {
  DataTablePageEvent,
  DataTableRowClickEvent,
  DataTableSortEvent,
} from 'primevue/datatable';
import DataTable from 'primevue/datatable';
import Tag from 'primevue/tag';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { refetch: getTableItems, loading } = useGetSigninAdminTable();
const { refetch: getSigninDetails } = useGetSigninDetails();
const signinAdminStore = useSigninAdminStore();
const sharedEnumStore = useSharedEnumsStore();

const visible = ref<boolean>(false);
const selectedSignin = ref<SigninItem | null>(null);

const table = computed(() => signinAdminStore.getTable);
const totalOfRecords = computed(() => signinAdminStore.getTotalElements);
const rows = computed(() => signinAdminStore.getRows);
const expandedRows = ref<SigninItem[]>([]);

onMounted(async () => {
  await doFetchTableItems();
  await sharedEnumStore.fetchAll();
});

watch(
  () => selectedSignin.value,
  async () => {
    if (selectedSignin.value) {
      await doGetSigninDetails(selectedSignin.value.id);
      toggleVisible();
    } else {
      signinAdminStore.clearSelectedToEdit();
    }
  }
);

watch(
  () => signinAdminStore.getEditionSignin,
  (newVal) => {
    if (!newVal) {
      selectedSignin.value = null;
    }
  }
);

function toggleVisible() {
  visible.value = !visible.value;
}

async function doFetchTableItems() {
  signinAdminStore.setTableData(await getTableItems(signinAdminStore.getFilters));
}

async function doGetSigninDetails(id: number) {
  signinAdminStore.setSelectedToEdit(await getSigninDetails(id));
}

async function onSort(event: DataTableSortEvent) {
  const sortOrder = event.sortOrder;
  const sortField = event.sortField;
  if (event.sortField) {
    signinAdminStore.setSort(sortField as string, sortOrder as number);
  } else {
    signinAdminStore.clearSort();
  }
  await doFetchTableItems();
}

async function onPage(event: DataTablePageEvent) {
  signinAdminStore.setPage(event.page);
  await doFetchTableItems();
}

function onRowClick(event: DataTableRowClickEvent) {
  const target = event.originalEvent.target as HTMLElement;
  // Verifica si el clic fue en el botón de expansión (el ícono)
  const isExpanderClick = target.closest('.p-datatable-row-toggle-icon');

  if (!isExpanderClick) {
    selectedSignin.value = event.data;
  }
  return;
}
</script>
<template>
  <SigninAdminForm v-model="visible" />
  <Card class="h-100">
    <template #content>
      <DataTable
        id="signin-admin-table"
        v-model:expanded-rows="expandedRows"
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
        @row-click="onRowClick($event)"
        @sort="onSort($event)"
        @page="onPage($event)">
        <template #empty>
          {{ t('core.states.no_results') }}
        </template>
        <template #header>
          <h3 class="mb-2 mt-2">{{ t('signin.table_title') }}</h3>
        </template>

        <Column expander style="width: 2.5%"> </Column>
        <Column
          field="playerCompleteName"
          :header="t('signin.fields.player_complete_name')"
          style="width: 52.5%">
        </Column>

        <Column field="category" :header="t('signin.fields.category')" style="width: 15%">
          <template #body="slotProps">
            <Tag
              :value="sharedEnumStore.getCategoryName(slotProps.data.category)"
              severity="secondary" />
          </template>
        </Column>
        <Column field="state" :header="t('signin.fields.state')" sortable style="width: 15%">
          <template #body="slotProps">
            <Tag
              :value="sharedEnumStore.getSigninStateName(slotProps.data.state)"
              severity="secondary"></Tag>
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
        <template #expansion="slotProps">
          <div class="container py-2">
            <div class="row">
              <div class="col-12 col-xl-6">
                <strong>{{ t('signin.fields.parent_complete_name') }}</strong>
                {{ slotProps.data.parentCompleteName }}
              </div>
              <div class="col-12 col-xl-3">
                <strong>{{ t('signin.fields.email_exp') }}</strong>
                {{ slotProps.data.email }}
              </div>
              <div class="col-12 col-xl-3">
                <strong>{{ t('signin.fields.phone_exp') }}</strong>
                {{ slotProps.data.phone }}
              </div>
            </div>
          </div>
        </template>
      </DataTable>
    </template>
  </Card>
</template>
