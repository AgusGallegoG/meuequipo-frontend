<script setup lang="ts">
import CalendarView from '@/calendar/components/CalendarView.vue';
</script>
<template>
  <div id="admin-module">
    <CalendarView :isAdmin="true" />
  </div>
</template>
