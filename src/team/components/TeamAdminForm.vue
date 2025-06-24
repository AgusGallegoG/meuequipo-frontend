<script setup lang="ts">
import { UtilBase } from '@/core/utilities/UtilBase';
import { useZodValidation } from '@/core/utilities/UtilZodValidations';
import { useGetFreePlayersByCategory } from '@/shared/application/useGetPlayersByCategory';
import BaseImageUpload from '@/shared/components/BaseImageUpload.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import BasePickList from '@/shared/components/BasePickList.vue';
import BaseSelect from '@/shared/components/BaseSelect.vue';
import type { Select } from '@/shared/dominio/Select';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import { useSaveTeamForm } from '@/team/application/useSaveTeamForm';
import { defaultTeamForm, teamFormSchema, type TeamForm } from '@/team/domain/Team';
import { useTeamAdminStore } from '@/team/store/teamAdminStore';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { refetch: saveTeamForm, loading: loading } = useSaveTeamForm();
const { refetch: getPlayers, loading: loadingPlayers } = useGetFreePlayersByCategory();

const visible = defineModel<boolean>();

const teamAdminStore = useTeamAdminStore();
const sharedEnumStore = useSharedEnumsStore();

const isEdit = computed(() => teamAdminStore.isEdition);
const editionForm = computed(() => teamAdminStore.getEditionTeam);
const players = ref<Select[]>([]);

const emit = defineEmits<{ (e: 'saved'): void }>();

const {
  form,
  errors: formErrors,
  submitted,
  isFormValid,
  validate,
  reset,
} = useZodValidation(defaultTeamForm, teamFormSchema);

watch(visible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

watch(editionForm, (newVal) => {
  if (newVal) {
    form.value = { ...newVal };
  } else {
    form.value = UtilBase.cloneVueProxy(defaultTeamForm);
  }
});

watch(
  () => form.value.category,
  async (newValue) => {
    if (newValue) {
      await doFetchPlayers();
    }
  }
);

function resetForm() {
  reset();
  if (isEdit.value === true) {
    visible.value = false;
  }
  teamAdminStore.clearSelectedToEdit();
}

async function doFetchPlayers() {
  if (form.value.category !== null) {
    players.value = await getPlayers(form.value.category);
  }
}

async function onSubmitForm() {
  submitted.value = true;

  if (!validate()) return;

  const response = await saveTeamForm(form.value);
  if (response) {
    emit('saved');
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
        <div class="row mt-3 align-items-start">
          <div class="col-12 col-md-4 md:mb-2">
            <BaseInputGroupText
              class="col-12"
              v-model="form.name"
              :label="t('teams.fields.name')"
              :invalid="!!formErrors.name"
              :errorMessage="formErrors.name ?? undefined" />
          </div>
          <div class="col-12 col-md-4 md:mb-2">
            <BaseSelect
              v-model="form.category"
              :options="sharedEnumStore.getCategories"
              :label="t('teams.fields.category')"
              :invalid="!!formErrors.category"
              :errorMessage="formErrors.category ?? undefined" />
          </div>
          <div class="col-12 col-md-4 md:mb-2">
            <BaseSelect
              v-model="form.sex"
              :options="sharedEnumStore.getSexOptions"
              :label="t('teams.fields.sex')"
              :invalid="!!formErrors.sex"
              :errorMessage="formErrors.sex ?? undefined" />
          </div>
        </div>

        <div class="row align-items-start">
          <div class="col-12 col-md-6 md:mb-2">
            <BaseInputGroupText
              class="col-12"
              v-model="form.trainer"
              :label="t('teams.fields.trainer')"
              :invalid="!!formErrors.trainer"
              :errorMessage="formErrors.trainer ?? undefined" />
          </div>
          <div class="col-12 col-md-6 md:mb-2">
            <BaseInputGroupText
              class="col-12"
              v-model="form.trainerContact"
              :label="t('teams.fields.trainer_contact')"
              :invalid="!!formErrors.trainerContact"
              :errorMessage="formErrors.trainerContact ?? undefined" />
          </div>
        </div>

        <div class="row mt-3 align-items-start">
          <div class="col-12 col-lg-5 md:pt-5">
            <BaseImageUpload
              :label="t('teams.fields.image')"
              v-model="form.teamImage"></BaseImageUpload>
          </div>

          <div class="col-12 col-lg-7 md:py-5">
            <BasePickList
              v-model="form.players"
              :options="players"
              :loading="loadingPlayers"
              :sourceLabel="t('teams.fields.all_players')"
              :targetLabel="t('teams.fields.team_players')"></BasePickList>
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
