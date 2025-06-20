<script setup lang="ts">
import CalendarView from '@/calendar/components/CalendarView.vue';
import BlogInit from '@/publication/views/BlogInit.vue';
</script>

<template>
  <div id="base-module">
    <div class="h-50 py-3 g-3">
      <BlogInit />
    </div>

    <div class="h-50 py-3 g-3">
      <CalendarView :isAdmin="false"></CalendarView>
    </div>
  </div>
</template>
