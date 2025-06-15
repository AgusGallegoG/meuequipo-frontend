<script lang="ts" setup>
import { useCalendarStore } from '@/calendar/store/calendarStore';
import { getFormattedWeekFromOffset, getWeekRangeFromOffset } from '@/core/utilities/UtilDate';
import Button from 'primevue/button';

const calendarStore = useCalendarStore();
const offset = ref<number>(0);
const formattedRange = computed(() => {
  return getFormattedWeekFromOffset(offset.value);
});

function setWeekRange() {
  const { from, to } = getWeekRangeFromOffset(offset.value);
  calendarStore.updateWeekRange(from, to);
}

function weekUp() {
  offset.value++;
  setWeekRange();
}

function weekDown() {
  offset.value--;
  setWeekRange();
}
</script>
<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-around align-items-center mb-2">
      <Button
        id="button-week-down"
        icon="pi pi-chevron-left"
        @click="weekDown"
        raised
        rounded
        severity="primary"></Button>
      <div class="text-center fw-bold">{{ formattedRange }}</div>
      <Button
        id="button-week-up"
        icon="pi pi-chevron-right"
        @click="weekUp"
        raised
        rounded
        severity="primary"></Button>
    </div>
  </div>
</template>
