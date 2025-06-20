<script lang="ts" setup>
import type { Select } from '@/shared/dominio/Select';
import PickList from 'primevue/picklist';
import ProgressSpinner from 'primevue/progressspinner';

interface Props {
  loading: boolean;
  options: Select[];
  sourceLabel: string;
  targetLabel: string;
  stepper?: boolean;
}

const model = defineModel<number[]>();
const props = withDefaults(defineProps<Props>(), {
  stepper: false,
});

const pickListValue = ref<[Select[], Select[]]>([[], []]);

watch(
  [() => props.options, () => model.value],
  () => {
    if (!props.options || !model.value) return;
    const selectedIds = new Set(model.value);
    pickListValue.value = [
      props.options.filter((opt) => !selectedIds.has(opt.id)),
      props.options.filter((opt) => selectedIds.has(opt.id)),
    ];
  },
  { immediate: true }
);

watch(
  () => pickListValue.value[1],
  (targetList) => {
    const newIds = targetList.map((opt) => opt.id);
    if (JSON.stringify(model.value) !== JSON.stringify(newIds)) {
      model.value = newIds;
    }
  }
);
</script>
<template>
  <ProgressSpinner v-if="loading" style="width: 40px; height: 40px" strokeWidth="4" />
  <div v-else>
    <PickList
      v-model="pickListValue"
      dataKey="id"
      :metaKeySelection="false"
      :scrollHeight="stepper ? '20rem' : '10rem'"
      :showSourceControls="false"
      :showTargetControls="false">
      <template #sourceheader>
        <span class="fw-bold" style="color: var(--p-primary-color)">{{ props.sourceLabel }}</span>
      </template>
      <template #targetheader>
        <span class="fw-bold" style="color: var(--p-primary-color)">{{ props.targetLabel }}</span>
      </template>

      <template #option="{ option }">
        <div>{{ option.name }}</div>
      </template>
    </PickList>
  </div>
</template>
