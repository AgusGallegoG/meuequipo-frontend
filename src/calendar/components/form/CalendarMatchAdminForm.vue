<script lang="ts" setup>
import { useSaveMatch } from '@/calendar/application/useSaveMatch';
import { useCalendarStore } from '@/calendar/store/calendarStore';
import { useGetRivalMatchTeamsByCategory } from '@/rivals/application/useGetRivalMatchTeamsByCategory';
import BaseCheckBox from '@/shared/components/BaseCheckBox.vue';
import BaseDatePicker from '@/shared/components/BaseDatePicker.vue';
import BaseInputGroupNumber from '@/shared/components/BaseInputGroupNumber.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import BaseSelect from '@/shared/components/BaseSelect.vue';
import { defaultMatch, type Match, type MatchTeam } from '@/shared/dominio/Match';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import { useGetOwnMatchTeamsByCategory } from '@/team/application/useGetOwnMatchTeamsByCategory';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import FloatLabel from 'primevue/floatlabel';
import Select from 'primevue/select';
import { useI18n } from 'vue-i18n';

const visible = defineModel<boolean>();

const { t } = useI18n();
const { refetch: saveMatch, loading: loading } = useSaveMatch();
const { refetch: findClubTeams, loading: loadingClubTeams } = useGetOwnMatchTeamsByCategory();
const { refetch: findRivalTeams, loading: loadingRivalTeams } = useGetRivalMatchTeamsByCategory();
const calendarStore = useCalendarStore();
const sharedEnumStore = useSharedEnumsStore();

// const isLocal = ref<boolean>(true);
const isEdit = computed(() => calendarStore.isEdition);
const editionCalendar = computed(() => calendarStore.getEditionMatch);
const loadingOptions = computed(() => loadingClubTeams || loadingRivalTeams);
const canSave = computed(() => {
  return (
    match.value.localTeam !== null &&
    match.value.visitorTeam !== null &&
    match.value.category !== null &&
    match.value.location.trim() !== '' &&
    match.value.matchDate !== null &&
    match.value.state !== null
  );
});
const match = ref<Match>({ ...defaultMatch });
const localOurs = ref<boolean>(true); // por defecto nos marcamos como locales
const visitorOurs = ref<boolean>(false);

const ourTeams = ref<MatchTeam[]>([]);
const rivalTeams = ref<MatchTeam[]>([]);

watch(visible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

watch(editionCalendar, (newVal) => {
  if (newVal) {
    match.value = cloneMatch(newVal);
    localOurs.value = match.value.localTeam?.isOurTeam ?? false;
    visitorOurs.value = match.value.visitorTeam?.isOurTeam ?? false;
  } else {
    match.value = cloneMatch(defaultMatch);
  }
});

watch(
  () => match.value.category,
  async (newVal, oldVal) => {
    if (newVal) {
      await fetchTeamsOptions(newVal);
      if (newVal !== oldVal) {
        (match.value.localTeam = null), (match.value.visitorTeam = null);
      }
    }
  }
);

function resetForm() {
  match.value = cloneMatch(defaultMatch);
  if (isEdit.value === true) {
    visible.value = false;
  }
  calendarStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  const response = await saveMatch(match.value);
  if (response) {
    calendarStore.setList(response);
  }
  visible.value = false;
}

async function fetchTeamsOptions(categoryid: number) {
  ourTeams.value = await findClubTeams(categoryid);
  rivalTeams.value = await findRivalTeams(categoryid);
}

function cloneMatch(match: Match): Match {
  return {
    id: match.id,
    category: match.category,
    state: match.state,
    location: match.location,
    matchDate: match.matchDate ? new Date(match.matchDate) : null,
    localPoints: match.localPoints,
    visitorPoints: match.visitorPoints,
    localTeam: match.localTeam
      ? { ...match.localTeam, logo: match.localTeam.logo ? { ...match.localTeam.logo } : null }
      : null,
    visitorTeam: match.visitorTeam
      ? {
          ...match.visitorTeam,
          logo: match.visitorTeam.logo ? { ...match.visitorTeam.logo } : null,
        }
      : null,
    squad: null,
  };
}
</script>
<template>
  <Drawer position="top" v-model:visible="visible" class="h-75">
    <template #header>
      <h3 class="mt-2">
        {{ isEdit ? t('matches.form_title_edit') : t('matches.form_title_new') }}
      </h3>
    </template>
    <template #default>
      <div class="container g-3 pt-3">
        <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-3">
          <BaseSelect
            class="col"
            v-model="match.category"
            :options="sharedEnumStore.getCategories"
            :label="t('matches.fields.category')" />

          <BaseDatePicker
            class="col"
            v-model="match.matchDate"
            showTime
            :label="t('matches.fields.match_date')" />

          <BaseInputGroupText
            class="col"
            v-model="match.location"
            :label="t('matches.fields.location')" />

          <BaseSelect
            class="col"
            v-model="match.state"
            :options="sharedEnumStore.getMatchStates"
            :label="t('matches.fields.state')" />
        </div>
        <div class="row row-cols-1 row-cols-md-2 my-3">
          <div class="col">
            <div class="container g-3">
              <div class="row row-cols-1 text-center">
                <span class="fw-bold text-uppercase"> {{ t('matches.fields.local') }}</span>
                <BaseCheckBox
                  v-model="localOurs"
                  :label="t('matches.fields.club_team')"></BaseCheckBox>

                <div class="col">
                  <div class="py-3 mb-2">
                    <FloatLabel class="w-100 md:w-80">
                      <Select
                        id="over_label_local"
                        v-model="match.localTeam"
                        :options="localOurs ? ourTeams : rivalTeams"
                        optionLabel="name"
                        :loading="loadingOptions.value"
                        filter
                        class="w-100" />
                      <label for="over_label_local">
                        {{ t('matches.fields.team') }}
                      </label>
                    </FloatLabel>
                  </div>
                </div>
                <BaseInputGroupNumber
                  class="col mx-auto mb-2"
                  v-model="match.localPoints"
                  :label="t('matches.fields.points')"></BaseInputGroupNumber>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="container g-3">
              <div class="row row-cols-1 text-center">
                <span class="fw-bold text-uppercase"> {{ t('matches.fields.visitor') }}</span>
                <BaseCheckBox
                  v-model="visitorOurs"
                  :label="t('matches.fields.club_team')"></BaseCheckBox>
                <div class="col">
                  <div class="py-3 mb-2">
                    <FloatLabel class="w-100 md:w-80">
                      <Select
                        id="over_label_visitor"
                        v-model="match.visitorTeam"
                        :options="visitorOurs ? ourTeams : rivalTeams"
                        optionLabel="name"
                        :loading="loadingOptions.value"
                        filter
                        class="w-100" />
                      <label for="over_label_visitor">
                        {{ t('matches.fields.team') }}
                      </label>
                    </FloatLabel>
                  </div>
                </div>
                <BaseInputGroupNumber
                  class="col mx-auto mb-2"
                  v-model="match.visitorPoints"
                  :label="t('matches.fields.points')"></BaseInputGroupNumber>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="d-flex flex-column flex-md-row justify-content-end gap-2 w-100">
        <Button
          class="w-100"
          severity="secondary"
          raised
          @click="resetForm()"
          :label="isEdit ? t('core.buttons.cancel') : t('core.buttons.clear')"
          :icon="isEdit ? 'pi pi-times' : 'pi pi-eraser'"></Button>
        <Button
          class="w-100"
          raised
          :label="t('core.buttons.save')"
          @click="onSubmitForm()"
          icon="pi pi-save"
          :disabled="!canSave"
          :loading="loading"></Button>
      </div>
    </template>
  </Drawer>
</template>
