<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel';
import MultiSelect from 'primevue/multiselect';
import { useI18n } from 'vue-i18n';
import { useSharedDropdownsStore } from '../store/sharedDropdownsStore';

const { t } = useI18n();

const model = defineModel<number[] | null>();
const options = computed(() => sharedEnumsStore.getCategories);
const sharedEnumsStore = useSharedDropdownsStore();

interface Props {
  id?: string;
  class?: string;
}

onMounted(async () => {
  await sharedEnumsStore.fetchCategories();
});

const props = withDefaults(defineProps<Props>(), {});
</script>
<template>
  <div :class="[props.class, 'py-3']">
    <FloatLabel class="w-100 md:w-80">
      <MultiSelect
        id="over_label"
        v-model="model"
        :options="options"
        optionValue="id"
        optionLabel="name"
        filter
        :maxSelectedLabels="6"
        class="w-100" />
      <label for="over_label">{{ t('shared.dropdowns.categories') }}</label>
    </FloatLabel>
  </div>
</template>
