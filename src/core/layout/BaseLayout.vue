<script setup lang="ts">
import BaseHeader from '@/core/layout/components/BaseHeader.vue';
import BaseFooter from '@/core/layout/components/BaseFooter.vue';
import BaseMenubar from '@/core/layout/components/BaseMenuBar.vue';
import BasePreFooter from '@/core/layout/components/BasePreFooter.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const isAdminLayout = computed(() => route.meta.requiresAuth);

const transitionName = computed(() => route.meta.transition || 'fade');
</script>
<template>
  <div class="layout-wrapper">
    <!-- MAIN HEADER -->
    <BaseHeader :is-admin-layout="isAdminLayout" />

    <!-- MAIN CONTENTS-->
    <div class="main-container">
      <!-- menu left-->
      <main id="main-content" role="main">
        <section id="router-page" class="page">
          <!-- baseBreadcrumb-->
          <BaseMenubar v-if="!isAdminLayout" />

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
