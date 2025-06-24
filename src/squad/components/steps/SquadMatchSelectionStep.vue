<script setup lang="ts">
import CalendarView from '@/calendar/components/CalendarView.vue';
import MatchItem from '@/calendar/components/item/MatchItem.vue';
import BaseSelect from '@/shared/components/BaseSelect.vue';
import { type Match, type MatchTeam } from '@/shared/dominio/Match';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import { useSquadStepperAdminStore } from '@/squad/store/squadStepperAdminStore';
import { useGetOwnMatchTeamsByCategory } from '@/team/application/useGetOwnMatchTeamsByCategory';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import Select from 'primevue/select';
import { useI18n } from 'vue-i18n';

const emits = defineEmits<{
  (e: 'next'): void;
  (e: 'prev'): void;
}>();

const teamsOptions = ref<MatchTeam[]>([]);
const category = ref<number | null>(null);
const team = ref<number | null>(null);
const match = ref<Match | null>(null);

const { t } = useI18n();
const { refetch: findClubTeams, loading: loadingClubTeams } = useGetOwnMatchTeamsByCategory();
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
      match.value = null;
    }
  }
);

async function fetchTeamsOptions(categoryid: number) {
  teamsOptions.value = await findClubTeams(categoryid);
}

function submitPartial() {
  //emitir next
  if (match.value && team.value) {
    squadStepperStore.setDataStepOne(match.value, team.value);
    emits('next');
  }
}

function goBack() {
  // emitir back
  cleanStep();

  emits('prev');
}

function cleanStep() {
  match.value = null;
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
        :label="t('matches.fields.category')" />

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
              {{ t('matches.fields.team') }}
            </label>
          </FloatLabel>
        </div>
      </div>
      <div class="col">
        <CalendarView
          v-if="team && !match"
          :isAdmin="true"
          :teamId="team"
          :isSquad="true"
          @selected="match = $event"></CalendarView>
      </div>

      <div class="col col-12 col-md-6 col-lg-4 d-flex justify-content-center">
        <Button
          v-if="match"
          class="w-100"
          :label="t('squads.clean_selection')"
          icon="pi pi-times"
          iconPos="left"
          @click="match = null"></Button>
      </div>

      <div class="col d-flex justify-content-center">
        <MatchItem v-if="match" :match="match" :isAdmin="false" :showSquad="false"></MatchItem>
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
          :disabled="!match && !team"></Button>
      </div>
    </div>
  </div>
</template>
