<script setup lang="ts">
import BaseUser from '@/core/layout/components/Header/BaseUser.vue';

interface Props {
  isAdminLayout: boolean;
}

const name = 'CB Xuventude Verín';

const props = defineProps<Props>();
</script>

<template>
  <header id="base-header" class="container-fluid">
    <div class="row align-items-center text-center h-100">
      <!-- Logo -->
      <div id="base-header-logo" class="col-2 col-sm-2 col-md-3 text-start">
        <RouterLink :to="props.isAdminLayout ? '/administracion/dashboard' : '/'">
          <img
            id="base-header-logo-img"
            src="@/core/assets/images/logos/logo_xuven_56-80.png"
            alt="CBXuventudeVerin"
            class="img-fluid" />
        </RouterLink>
      </div>

      <!-- Name -->
      <div
        id="base-header-name"
        class="col-8 col-sm-8 col-md-6 d-flex justify-content-center align-items-center">
        <RouterLink
          :to="props.isAdminLayout ? '/administracion/dashboard' : '/'"
          class="w-100 d-flex justify-content-center align-items-center">
          <span style="font-weight: 700" class="text-nowrap"> {{ name }} </span>
        </RouterLink>
      </div>

      <!-- User / Login -->
      <div
        id="base-header-user"
        class="col-2 col-md-3 col-sm-2 text-end"
        v-if="props.isAdminLayout">
        <BaseUser />
      </div>
    </div>
  </header>
</template>
