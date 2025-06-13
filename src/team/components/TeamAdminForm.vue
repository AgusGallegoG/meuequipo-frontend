<script setup lang="ts">
import { useGetPlayersByCategory } from '@/shared/application/useGetPlayersByCategory';
import BaseImageUpload from '@/shared/components/BaseImageUpload.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import BasePickList from '@/shared/components/BasePickList.vue';
import BaseSelect from '@/shared/components/BaseSelect.vue';
import type { Select } from '@/shared/dominio/Select';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import { useSaveTeamForm } from '@/team/application/useSaveTeamForm';
import { defaultTeamForm, type TeamForm } from '@/team/domain/Team';
import { useTeamAdminStore } from '@/team/store/teamAdminStore';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { refetch: saveTeamForm, loading: loading } = useSaveTeamForm();
const { refetch: getPlayers, loading: loadingPlayers } = useGetPlayersByCategory();

const visible = defineModel<boolean>();

const teamAdminStore = useTeamAdminStore();
const sharedEnumStore = useSharedEnumsStore();

const isEdit = computed(() => teamAdminStore.isEdition);
const editionForm = computed(() => teamAdminStore.getEditionTeam);
const canSave = computed(() => true);
const team = ref<TeamForm>({ ...defaultTeamForm });
const players = ref<Select[]>([]);

watch(visible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

watch(editionForm, (newVal) => {
  if (newVal) {
    team.value = { ...newVal };
  } else {
    team.value = { ...defaultTeamForm };
  }
});

watch(
  () => team.value.category,
  async (newValue) => {
    if (newValue) {
      await doFetchPlayers();
    }
  }
);

function resetForm() {
  team.value = { ...defaultTeamForm };
  if (isEdit.value === true) {
    visible.value = false;
  }
  teamAdminStore.clearSelectedToEdit();
}
async function doFetchPlayers() {
  if (team.value.category !== null) {
    players.value = await getPlayers(team.value.category);
  }
}

async function onSubmitForm() {
  const response = await saveTeamForm(team.value);
  if (response) {
    teamAdminStore.setTableData(response);
  }
  visible.value = false;
}
</script>
<template>
  <Drawer position="top" v-model:visible="visible" class="h-75">
    <template #header>
      <h3 class="mt-2">
        {{ isEdit ? t('teams.form_title_edit') : t('teams.form_title_new') }}
      </h3>
    </template>

    <template #default>
      <div class="container g-3 pt-3">
        <div class="row">
          <div class="col-12 col-md-5 md:pt-5">
            <BaseImageUpload
              :label="t('teams.fields.image')"
              v-model="team.teamImage"></BaseImageUpload>
          </div>

          <div class="col-12 col-md-7 md:py-5">
            <BasePickList
              v-model="team.players"
              :options="players"
              :loading="loadingPlayers"></BasePickList>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 col-md-6 md:mb-2">
            <BaseInputGroupText
              class="col-12"
              v-model="team.name"
              :label="t('teams.fields.name')" />
          </div>
          <div class="col-12 col-md-6 md:mb-2">
            <BaseInputGroupText
              class="col-12"
              v-model="team.trainer"
              :label="t('teams.fields.trainer')" />
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-6 md:mb-2">
            <BaseInputGroupText
              class="col-12"
              v-model="team.trainerContact"
              :label="t('teams.fields.trainer_contact')" />
          </div>
          <div class="col-12 col-md-6 md:mb-2">
            <BaseSelect
              v-model="team.category"
              :options="sharedEnumStore.getCategories"
              :label="t('teams.fields.category')" />
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
