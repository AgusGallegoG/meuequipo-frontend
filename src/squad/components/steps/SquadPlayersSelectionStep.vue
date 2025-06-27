<script setup lang="ts">
import { useGetFreePlayersByTeam } from '@/player/application/useGetPlayersByTeam';
import BasePickList from '@/shared/components/BasePickList.vue';
import type { Select } from '@/shared/dominio/Select';
import { useSquadStepperAdminStore } from '@/squad/store/squadStepperAdminStore';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

const emits = defineEmits<{
  (e: 'next'): void;
  (e: 'prev'): void;
}>();

const playersOptions = ref<Select[]>([]);
const playersSelected = ref<number[]>([]);
const teamId = computed(() => {
  return squadStepperStore.team;
});

const { t } = useI18n();
const { loading, refetch: getPlayers } = useGetFreePlayersByTeam();
const squadStepperStore = useSquadStepperAdminStore();

onMounted(async () => {
  await getTeamPlayers();
});

function submitPartial() {
  //emitir next
  if (playersSelected.value.length > 0) {
    squadStepperStore.setDataStepTwo(playersSelected.value);
    emits('next');
  }
}

function goBack() {
  // emitir back
  cleanStep();

  emits('prev');
}

function cleanStep() {
  playersSelected.value = [];
}

async function getTeamPlayers() {
  playersOptions.value = await getPlayers(teamId.value);
}
</script>
<template>
  <div class="container h-75">
    <div class="row row-cols-1">
      <BasePickList
        v-model="playersSelected"
        :loading="loading"
        :options="playersOptions"
        :sourceLabel="t('squads.fields.all_players')"
        :targetLabel="t('squads.fields.squad_players')"
        :stepper="true"></BasePickList>
    </div>

    <div class="row">
      <div class="col col-6 col-md-4 col-lg-2">
        <Button
          class="w-100 my-3"
          :label="t('squads.back')"
          @click="goBack()"
          severity="secondary"></Button>
      </div>
      <div class="col col-6 col-md-4 col-lg-2">
        <Button
          class="w-100 my-3"
          :label="t('squads.next')"
          @click="submitPartial()"
          :disabled="playersSelected.length < 1"></Button>
      </div>
    </div>
  </div>
</template>
