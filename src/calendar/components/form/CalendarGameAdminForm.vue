<script lang="ts" setup>
import { useSaveGame } from '@/calendar/application/useSaveGame';
import { useCalendarStore } from '@/calendar/store/calendarStore';
import { UtilBase } from '@/core/utilities/UtilBase';
import { useZodValidation } from '@/core/utilities/UtilZodValidations';
import { useGetRivalGameTeamsByCategory } from '@/rivals/application/useGetRivalGameTeamsByCategory';
import BaseCheckBox from '@/shared/components/BaseCheckBox.vue';
import BaseDatePicker from '@/shared/components/BaseDatePicker.vue';
import BaseInputGroupNumber from '@/shared/components/BaseInputGroupNumber.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import BaseSelect from '@/shared/components/BaseSelect.vue';
import { defaultGame, gameSchema, type Game, type GameTeam } from '@/shared/dominio/Game';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import { useGetOwnGameTeamsByCategory } from '@/team/application/useGetOwnGameTeamsByCategory';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import FloatLabel from 'primevue/floatlabel';
import Message from 'primevue/message';
import Select from 'primevue/select';
import { useI18n } from 'vue-i18n';

const visible = defineModel<boolean>();

const { t } = useI18n();
const { refetch: saveGame, loading: loading } = useSaveGame();
const { refetch: findClubTeams, loading: loadingClubTeams } = useGetOwnGameTeamsByCategory();
const { refetch: findRivalTeams, loading: loadingRivalTeams } = useGetRivalGameTeamsByCategory();
const calendarStore = useCalendarStore();
const sharedEnumStore = useSharedEnumsStore();

// const isLocal = ref<boolean>(true);
const isEdit = computed(() => calendarStore.isEdition);
const editionCalendar = computed(() => calendarStore.getEditionGame);
const loadingOptions = computed(() => loadingClubTeams || loadingRivalTeams);

const emit = defineEmits<{ (e: 'saved'): void }>();

const {
  form,
  errors: formErrors,
  submitted,
  isFormValid,
  validate,
  reset,
} = useZodValidation(defaultGame, gameSchema);

const local = ref<boolean>(true); // por defecto nos marcamos como locales

const ourTeams = ref<GameTeam[]>([]);
const rivalTeams = ref<GameTeam[]>([]);

watch(visible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

watch(editionCalendar, (newVal) => {
  if (newVal) {
    form.value = cloneGame(newVal);
    local.value = form.value.localTeam?.isOurTeam ?? false;
  } else {
    form.value = UtilBase.cloneVueProxy(defaultGame);
  }
});

watch(
  () => form.value.category,
  async (newVal, oldVal) => {
    if (newVal) {
      await fetchTeamsOptions(newVal);
      if (newVal !== oldVal) {
        (form.value.localTeam = null), (form.value.visitorTeam = null);
      }
    }
  }
);

watch(
  () => local.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      (form.value.localTeam = null), (form.value.visitorTeam = null);
    }
  }
);

function resetForm() {
  reset();
  if (isEdit.value === true) {
    visible.value = false;
  }
  calendarStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  submitted.value = true;

  if (!validate()) return;
  const response = await saveGame(form.value);
  if (response) {
    emit('saved');
  }
  visible.value = false;
}

async function fetchTeamsOptions(categoryid: number) {
  ourTeams.value = await findClubTeams(categoryid);
  rivalTeams.value = await findRivalTeams(categoryid);
}

function cloneGame(game: Game): Game {
  return {
    id: game.id,
    category: game.category,
    state: game.state,
    location: game.location,
    gameDate: game.gameDate ? new Date(game.gameDate) : null,
    localPoints: game.localPoints,
    visitorPoints: game.visitorPoints,
    localTeam: game.localTeam
      ? { ...game.localTeam, logo: game.localTeam.logo ? { ...game.localTeam.logo } : null }
      : null,
    visitorTeam: game.visitorTeam
      ? {
          ...game.visitorTeam,
          logo: game.visitorTeam.logo ? { ...game.visitorTeam.logo } : null,
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
        {{ isEdit ? t('games.form_title_edit') : t('games.form_title_new') }}
      </h3>
    </template>
    <template #default>
      <div class="container g-3 pt-3">
        <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-3 align-items-start">
          <BaseSelect
            class="col"
            v-model="form.category"
            :options="sharedEnumStore.getCategories"
            :label="t('games.fields.category')"
            :invalid="!!formErrors.category"
            :errorMessage="formErrors.category ?? undefined" />

          <BaseDatePicker
            class="col"
            v-model="form.gameDate"
            showTime
            :label="t('games.fields.game_date')"
            :invalid="!!formErrors.gameDate"
            :errorMessage="formErrors.gameDate ?? undefined" />

          <BaseInputGroupText
            class="col"
            v-model="form.location"
            :label="t('games.fields.location')"
            :invalid="!!formErrors.location"
            :errorMessage="formErrors.location ?? undefined" />

          <BaseSelect
            class="col"
            v-model="form.state"
            :options="sharedEnumStore.getGameStates"
            :label="t('games.fields.state')"
            :invalid="!!formErrors.state"
            :errorMessage="formErrors.state ?? undefined" />
        </div>
        <div class="row my-3">
          <BaseCheckBox v-model="local" :label="t('games.fields.local_game')"></BaseCheckBox>
        </div>
        <div class="row row-cols-1 row-cols-md-2 my-3 align-items-start">
          <div class="col">
            <div class="container g-3">
              <div class="row row-cols-1 text-center">
                <span class="fw-bold text-uppercase"> {{ t('games.fields.local') }}</span>
                <div class="col">
                  <div class="py-3 mb-2">
                    <div id="team-container" class="w-100">
                      <FloatLabel class="w-100 md:w-80">
                        <Select
                          id="over_label_local"
                          v-model="form.localTeam"
                          :options="local ? ourTeams : rivalTeams"
                          optionLabel="name"
                          :loading="loadingOptions.value"
                          :class="{ 'p-invalid': !!formErrors.localTeam }"
                          filter
                          class="w-100" />
                        <label for="over_label_local">
                          {{ t('games.fields.team') }}
                        </label>
                      </FloatLabel>
                      <Message
                        v-if="formErrors.localTeam"
                        severity="error"
                        size="small"
                        variant="simple">
                        {{ t(formErrors.localTeam) }}
                      </Message>
                    </div>
                  </div>
                </div>
                <BaseInputGroupNumber
                  class="col mx-auto mb-2"
                  v-model="form.localPoints"
                  :label="t('games.fields.points')"
                  :invalid="!!formErrors.localPoints"
                  :errorMessage="formErrors.localPoints ?? undefined"></BaseInputGroupNumber>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="container g-3">
              <div class="row row-cols-1 text-center">
                <span class="fw-bold text-uppercase"> {{ t('games.fields.visitor') }}</span>
                <div class="col">
                  <div class="py-3 mb-2">
                    <div id="team-container" class="w-100">
                      <FloatLabel class="w-100 md:w-80">
                        <Select
                          id="over_label_visitor"
                          v-model="form.visitorTeam"
                          :options="local ? rivalTeams : ourTeams"
                          optionLabel="name"
                          :loading="loadingOptions.value"
                          :class="{ 'p-invalid': !!formErrors.visitorTeam }"
                          filter
                          class="w-100" />
                        <label for="over_label_visitor">
                          {{ t('games.fields.team') }}
                        </label>
                      </FloatLabel>
                      <Message
                        v-if="formErrors.visitorTeam"
                        severity="error"
                        size="small"
                        variant="simple">
                        {{ t(formErrors.visitorTeam) }}
                      </Message>
                    </div>
                  </div>
                </div>
                <BaseInputGroupNumber
                  class="col mx-auto mb-2"
                  v-model="form.visitorPoints"
                  :label="t('games.fields.points')"
                  :invalid="!!formErrors.visitorPoints"
                  :errorMessage="formErrors.visitorPoints ?? undefined"></BaseInputGroupNumber>
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
          :disabled="submitted && !isFormValid"
          :loading="loading"></Button>
      </div>
    </template>
  </Drawer>
</template>
