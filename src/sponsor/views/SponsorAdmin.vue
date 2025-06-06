<script setup lang="ts">
import SponsorAdminForm from '@/sponsor/components/SponsorAdminForm.vue';
import SponsorAdminTable from '@/sponsor/components/SponsorAdminTable.vue';
</script>
<template>
  <div id="admin-module">
    <div class="row g-4 align-items-stretch">
      <div class="col-12 col-md-8 d-flex">
        <SponsorAdminTable class="flex-fill" />
      </div>
      <div class="col-12 col-md-4 d-flex">
        <SponsorAdminForm class="flex-fill" />
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped></style>
