<script setup lang="ts">
import baseLogo from '@/core/assets/images/logos/logo_xuven.png';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import Card from 'primevue/card';
import { useI18n } from 'vue-i18n';
import type { TeamPublic } from '../domain/TeamPublic';

interface Props {
  team: TeamPublic;
}

const sharedEnumStore = useSharedEnumsStore();
const { t } = useI18n();

defineProps<Props>();

onMounted(async () => {
  await sharedEnumStore.fetchAll();
});
</script>
<template>
  <Card>
    <template #header>
      <div class="w-100">
        <div class="d-flex justify-content-center text-center">
          <h2>{{ team.name }}</h2>
        </div>
      </div>
    </template>
    <template #content>
      <div class="w-100">
        <div class="container g-3">
          <div class="row align-items-center">
            <div class="col-12 col-md-6 col-lg-8">
              <div class="row row-cols-1">
                <div class="col py-3">
                  <div class="row ">
                    <div class="fw-bold col-12 col-lg-6">{{ t('teams.fields.category') + ':' }}</div>
                    <div class="col-12 col-xl-6 text-break">
                      {{ team.category ? sharedEnumStore.getCategoryName(team.category) : '' }}
                    </div>
                  </div>
                </div>
                <div class="col py-3">
                  <div class="row ">
                    <div class="fw-bold col-12 col-lg-6">{{ t('teams.fields.sex') + ':' }}</div>
                    <div class="col-12 col-xl-6 text-break">{{ team.sex ? sharedEnumStore.getSexName(team.sex) : '' }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4 d-flex justify-content-center py-3">
              <img class="img-fluid" :src="team.teamImage ? team.teamImage.url : baseLogo"
                style="max-height: 150px;" loading="lazy"></img>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
