<script setup lang="ts">
import CategoryAdminForm from '../components/CategoryAdminForm.vue';
import CategoryAdminTable from '../components/CategoryAdminTable.vue';
</script>
<template>
  <div id="admin-module">
    <div class="row g-4 align-items-stretch">
      <div class="col-12 col-md-8 d-flex">
        <CategoryAdminTable class="flex-fill" />
      </div>
      <div class="col-12 col-md-4 d-flex">
        <CategoryAdminForm class="flex-fill" />
      </div>
    </div>
  </div>
</template>
