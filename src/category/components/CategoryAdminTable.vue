<script setup lang="ts">
import { useGetCategories } from '@/category/application/useGetCategories';
import type { CategoryItem } from '@/category/domain/CategoryTable';
import { useCategoryStore } from '@/category/store/CategoryStore';
import { UtilBase } from '@/core/utilities/UtilBase';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Tag from 'primevue/tag';
import { useI18n } from 'vue-i18n';

const categoryStore = useCategoryStore();
const { refetch: getTable, loading } = useGetCategories();
const { t } = useI18n();

const selectedCategory = ref<CategoryItem | null>(null);
const table = computed(() => categoryStore.getTable);

onMounted(async () => {
  await doFetchTableItems();
});

watch(
  () => selectedCategory.value,
  () => {
    if (selectedCategory.value) {
      categoryStore.setSelectedToEdit(selectedCategory.value);
    } else {
      categoryStore.clearSelectedToEdit();
    }
  }
);

watch(
  () => categoryStore.getEditionCategory,
  (newVal) => {
    if (!newVal) {
      selectedCategory.value = null;
    }
  }
);

async function doFetchTableItems() {
  categoryStore.setTableData(await getTable());
}
</script>

<template>
  <Card class="h-100">
    <template #content>
      <DataTable
        id="category-admin-table"
        lazy
        v-model:selection="selectedCategory"
        selectionMode="single"
        dataKey="id"
        :loading="loading"
        :value="table"
        scrollable>
        <template #empty>{{ t('core.states.no_results') }}</template>
        <template #header>
          <h3 class="mb-2 mt-2">{{ t('categories.table_title') }}</h3>
        </template>
        <Column field="name" :header="t('categories.fields.name')"></Column>

        <Column field="yearInit" :header="t('categories.fields.year_init')">
          <template #body="slotProps">
            {{ slotProps.data.yearInit ? UtilBase.getYear(slotProps.data.yearInit) : '' }}
          </template>
        </Column>

        <Column field="yearEnd" :header="t('categories.fields.year_end')">
          <template #body="slotProps">
            {{ slotProps.data.yearEnd ? UtilBase.getYear(slotProps.data.yearEnd) : '' }}
          </template>
        </Column>

        <Column field="active">
          <template #body="slotProps">
            <Tag
              :value="
                slotProps.data.active
                  ? t('categories.fields.active')
                  : t('categories.fields.not_active')
              "
              :severity="slotProps.data.active ? 'success' : 'danger'"></Tag>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>
