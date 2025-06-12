<script setup lang="ts">
import { useActivateSeason } from '@/season/application/useActivateSeason';
import { useGetActiveSeason } from '@/season/application/useGetActiveSeason';
import { useGetSeasons } from '@/season/application/useGetSeasons';
import { emptySeason, type Season } from '@/season/domain/Season';
import { emptySeasonForm, type SeasonForm } from '@/season/domain/SeasonForm';
import BaseCheckBox from '@/shared/components/BaseCheckBox.vue';
import BaseDatePicker from '@/shared/components/BaseDatePicker.vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCreateSeason } from '../application/useCreateSeason';

const { t } = useI18n();

const options = ref<Season[]>([]);
const selected = ref<Season>(emptySeason);
const addDialog = ref<boolean>(false);
const createSeasonForm = ref<SeasonForm>(emptySeasonForm);
const canCreate = computed(() => {
  const { startDate, endDate } = createSeasonForm.value;
  return !!startDate && !!endDate && endDate > startDate;
});

const { refetch: loadSeasons, loading: loadingSeasons } = useGetSeasons();
const { refetch: loadActive } = useGetActiveSeason();
const { refetch: activateNew, loading: loadingChangeActive } = useActivateSeason();
const { refetch: create, loading: createSeasonLoading } = useCreateSeason();

async function getAllSeasons() {
  options.value = await loadSeasons();
}

async function getActiveSeason() {
  selected.value = await loadActive();
}

async function changeActiveSeason(newSeason: Season) {
  options.value = await activateNew(newSeason);
}

async function createSeason(form: SeasonForm) {
  options.value = await create(form);
}

function onAddDialog() {
  createSeasonForm.value = { ...emptySeasonForm };
  addDialog.value = !addDialog.value;
}

async function doCreateSeason() {
  await createSeason(createSeasonForm.value);
  onAddDialog();
  await getActiveSeason();
}

onMounted(async () => {
  await getActiveSeason();
  await getAllSeasons();
});
</script>

<template>
  <div class="w-100 d-flex justify-content-center align-items-center">
    <Select
      class="w-75"
      :options="options"
      optionLabel="name"
      v-model="selected"
      :loading="loadingSeasons || loadingChangeActive || createSeasonLoading"
      @change="changeActiveSeason($event.value)">
      <template #value="{ value }">
        <div v-if="value !== ''" class="d-flex justify-content-center">
          <h3 class="p-0 m-2">{{ value.name }}</h3>
        </div>
        <div v-else class="d-flex justify-content-center">
          <h3 class="p-0 m-2">{{ t('admin.dashboard.season.not_found') }}</h3>
        </div>
      </template>
      <template #option="{ option }">
        <div class="w-100">
          <span>
            {{ option.name }}
            <small v-if="option.active" class="fw-light text-info">{{
              t('admin.dashboard.season.active')
            }}</small>
          </span>
        </div>
      </template>
      <template #footer>
        <Button
          class="w-100"
          icon="pi pi-plus"
          icon-pos="right"
          :label="t('admin.dashboard.season.add')"
          @click="onAddDialog()"></Button>
      </template>
    </Select>

    <Dialog
      v-model:visible="addDialog"
      modal
      class="w-75"
      :header="t('admin.dashboard.season.modal.title')">
      <div class="row gy-2 px-1 py-2">
        <div class="col-12 col-md-5">
          <BaseDatePicker
            v-model="createSeasonForm.startDate"
            id="date-inicio"
            view="month"
            date-format="mm/yy"
            :label="t('admin.dashboard.season.modal.startDate')"></BaseDatePicker>
        </div>
        <div class="col-12 col-md-5">
          <BaseDatePicker
            v-model="createSeasonForm.endDate"
            id="date-fin"
            view="month"
            date-format="mm/yy"
            :label="t('admin.dashboard.season.modal.endDate')"></BaseDatePicker>
        </div>
        <div class="col-12 col-md-2">
          <BaseCheckBox
            id="activa"
            v-model="createSeasonForm.active"
            :label="t('admin.dashboard.season.modal.active')" />
        </div>
      </div>
      <template #footer>
        <div class="d-flex flex-column flex-md-row justify-content-end gap-2 w-100">
          <Button
            @click="onAddDialog()"
            severity="secondary"
            icon="pi pi-times"
            :label="t('core.actions.cancel')"
            iconPos="right"></Button>
          <Button
            @click="doCreateSeason()"
            :disabled="!canCreate"
            :loading="createSeasonLoading"
            icon="pi pi-save"
            :label="t('core.actions.create')"
            iconPos="right"></Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>
