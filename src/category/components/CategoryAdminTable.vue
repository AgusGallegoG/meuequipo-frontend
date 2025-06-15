<script setup lang="ts">
import { useGetCategories } from '@/category/application/useGetCategories';
import CategoryAdminForm from '@/category/components/CategoryAdminForm.vue';
import type { CategoryItem } from '@/category/domain/CategoryTable';
import { useCategoryStore } from '@/category/store/CategoryStore';
import { UtilBase } from '@/core/utilities/UtilBase';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Tag from 'primevue/tag';
import { useI18n } from 'vue-i18n';

const categoryStore = useCategoryStore();
const { refetch: getTable, loading } = useGetCategories();
const { t } = useI18n();

const visible = ref<boolean>(false);
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
      toggleVisible();
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

function toggleVisible() {
  visible.value = !visible.value;
}

async function doFetchTableItems() {
  categoryStore.setTableData(await getTable());
}
</script>

<template>
  <CategoryAdminForm v-model="visible"></CategoryAdminForm>
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
          <div class="container g-3">
            <div class="row row-cols-2">
              <h3 class="mb-2 mt-2 col">{{ t('categories.table_title') }}</h3>
              <div class="col d-flex justify-content-end">
                <Button
                  :label="t('core.buttons.add')"
                  icon="pi pi-plus"
                  @click="toggleVisible()"></Button>
              </div>
            </div>
          </div>
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
