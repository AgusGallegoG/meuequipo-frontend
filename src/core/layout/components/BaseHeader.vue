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
    <div class="row align-items-center">
      <!-- Logo -->
      <div id="base-header-logo" class="col-md-2 col-sm-1">
        <RouterLink to="/">
          <img
            id="base-header-logo-img"
            src="@/core/assets/images/logos/logo_xuven_56-80.png"
            alt="CBXuventudeVerin" />
        </RouterLink>
      </div>

      <!-- Name -->
      <div id="base-header-name" class="col-md-8 col-sm-1 text-center">
        <RouterLink
          :to="props.isAdminLayout ? '/administracion/dashboard' : '/'"
          class="d-flex align-items-center justify-content-center">
          <span style="font-weight: 700"> {{ name }} </span>
        </RouterLink>
      </div>

      <!-- User / Login -->
      <div id="base-header-user" class="col-md-2" v-if="props.isAdminLayout">
        <BaseUser />
      </div>
    </div>
  </header>
</template>
