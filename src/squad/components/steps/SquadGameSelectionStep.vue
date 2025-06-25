<script setup lang="ts">
import CalendarView from '@/calendar/components/CalendarView.vue';
import GameItem from '@/calendar/components/item/GameItem.vue';
import BaseSelect from '@/shared/components/BaseSelect.vue';
import { type Game, type GameTeam } from '@/shared/dominio/Game';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import { useSquadStepperAdminStore } from '@/squad/store/squadStepperAdminStore';
import { useGetOwnGameTeamsByCategory } from '@/team/application/useGetOwnGameTeamsByCategory';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import Select from 'primevue/select';
import { useI18n } from 'vue-i18n';

const emits = defineEmits<{
  (e: 'next'): void;
  (e: 'prev'): void;
}>();

const teamsOptions = ref<GameTeam[]>([]);
const category = ref<number | null>(null);
const team = ref<number | null>(null);
const game = ref<Game | null>(null);

const { t } = useI18n();
const { refetch: findClubTeams, loading: loadingClubTeams } = useGetOwnGameTeamsByCategory();
const sharedEnumStore = useSharedEnumsStore();
const squadStepperStore = useSquadStepperAdminStore();

onMounted(async () => {
  await sharedEnumStore.fetchAll();
});

watch(
  () => category.value,
  async (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
      await fetchTeamsOptions(newVal);
    }
  }
);

watch(
  () => team.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      game.value = null;
    }
  }
);

async function fetchTeamsOptions(categoryid: number) {
  teamsOptions.value = await findClubTeams(categoryid);
}

function submitPartial() {
  //emitir next
  if (game.value && team.value) {
    squadStepperStore.setDataStepOne(game.value, team.value);
    emits('next');
  }
}

function goBack() {
  // emitir back
  cleanStep();

  emits('prev');
}

function cleanStep() {
  game.value = null;
  team.value = null;
}
</script>
<template>
  <div class="container h-75">
    <div class="row row-cols-1">
      <BaseSelect
        class="col"
        v-model="category"
        :options="sharedEnumStore.getCategories"
        :label="t('games.fields.category')" />

      <div class="col">
        <div class="py-3 mb-2">
          <FloatLabel class="w-100 md:w-80">
            <Select
              id="over_label_local"
              v-model="team"
              :options="teamsOptions"
              optionLabel="name"
              optionValue="id"
              :loading="loadingClubTeams"
              filter
              class="w-100" />
            <label for="over_label_local">
              {{ t('games.fields.team') }}
            </label>
          </FloatLabel>
        </div>
      </div>
      <div class="col">
        <CalendarView
          v-if="team && !game"
          :isAdmin="true"
          :teamId="team"
          :isSquad="true"
          @selected="game = $event"></CalendarView>
      </div>

      <div class="col col-12 col-md-6 col-lg-4 d-flex justify-content-center">
        <Button
          v-if="game"
          class="w-100"
          :label="t('squads.clean_selection')"
          icon="pi pi-times"
          iconPos="left"
          @click="game = null"></Button>
      </div>

      <div class="col d-flex justify-content-center">
        <GameItem v-if="game" :game="game" :isAdmin="false" :showSquad="false"></GameItem>
      </div>
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
          :disabled="!game && !team"></Button>
      </div>
    </div>
  </div>
</template>
