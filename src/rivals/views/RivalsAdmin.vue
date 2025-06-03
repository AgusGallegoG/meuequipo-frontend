<script setup lang="ts">
import RivalsAdminForm from '@/rivals/components/RivalsAdminForm.vue';
import RivalsAdminTable from '@/rivals/components/RivalsAdminTable.vue';
</script>
<template>
  <div id="admin-module">
    <div class="row g-4 align-items-stretch">
      <div class="col-12 col-xl-8 d-flex">
        <RivalsAdminTable class="flex-fill"></RivalsAdminTable>
      </div>
      <div class="col-12 col-xl-4 d-flex">
        <RivalsAdminForm class="d-flex h-100"></RivalsAdminForm>
      </div>
    </div>
  </div>
</template>
