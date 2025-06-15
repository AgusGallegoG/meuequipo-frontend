<script lang="ts" setup>
import CalendarView from '@/calendar/components/CalendarView.vue';

interface Props {
  teamId: number;
}

const props = defineProps<Props>();
</script>
<template>
  <div>
    <CalendarView :isAdmin="false" :teamid="props.teamId" />
  </div>
</template>
