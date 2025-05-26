<script setup lang="ts">
import BaseFooter from '@/core/layout/components/BaseFooter.vue';
import BaseHeader from '@/core/layout/components/BaseHeader.vue';
import BaseMenubar from '@/core/layout/components/BaseMenuBar.vue';
import BasePreFooter from '@/core/layout/components/BasePreFooter.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseAdminBreadcrumb from './components/AdminDashboard/BaseAdminBreadcrumb.vue';

const route = useRoute();

const isAdminLayout = computed(() => route.meta.requiresAuth ?? false);

const transitionName = computed(() => route.meta.transition || 'fade');
</script>
<template>
  <div class="layout-wrapper">
    <!-- MAIN HEADER -->
    <BaseHeader :isAdminLayout="isAdminLayout" />

    <!-- MAIN CONTENTS-->
    <div class="main-container">
      <!-- menu left-->
      <main id="main-content" role="main">
        <section id="router-page" class="page">
          <!-- baseBreadcrumb-->
          <BaseMenubar v-if="!isAdminLayout" />
          <BaseAdminBreadcrumb v-else />

          <div class="page-content">
            <section id="page-map">
              <RouterView v-slot="{ Component }">
                <Transition :name="transitionName" mode="out-in">
                  <component :is="Component" />
                </Transition>
              </RouterView>
            </section>
          </div>
        </section>
      </main>
    </div>

    <BasePreFooter />
    <!-- MAIN FOOTER -->
    <BaseFooter />
  </div>
</template>
