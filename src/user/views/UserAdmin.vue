<script setup lang="ts">
import UserAdminForm from '@/user/components/UserAdminForm.vue';
import UserAdminTable from '@/user/components/UserAdminTable.vue';
</script>
<template>
  <div id="admin-module">
    <div class="row g-4 align-items-stretch">
      <div class="col-12 col-md-8 d-flex">
        <UserAdminTable class="flex-fill" />
      </div>
      <div class="col-12 col-md-4 d-flex">
        <UserAdminForm class="flex-fill"></UserAdminForm>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped></style>
