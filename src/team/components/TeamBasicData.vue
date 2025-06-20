<script setup lang="ts">
import baseLogo from '@/core/assets/images/logos/logo_xuven.png';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import type { TeamForm } from '@/team/domain/Team';
import Card from 'primevue/card';
import { useI18n } from 'vue-i18n';

interface Props {
  team: TeamForm;
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
                  <div class="row">
                    <div class="fw-bold col-12 col-lg-6">{{ t('teams.fields.trainer') + ':' }}</div>
                    <div class="col-12 col-xl-6 text-break">{{ team.trainer }}</div>
                  </div>
                </div>
                <div class="col py-3">
                  <div class="row ">
                    <div class="fw-bold col-12 col-lg-6">{{ t('teams.fields.trainer_contact') + ':' }}</div>
                    <div class="col-12 col-xl-6 text-break">{{ team.trainerContact }}</div>
                  </div>
                </div>
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
                    <div class="fw-bold col-12 col-lg-6">{{ t('teams.fields.players') + ':' }}</div>
                    <div class="col-12 col-xl-6 text-break">{{ team.players.length }}</div>
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
