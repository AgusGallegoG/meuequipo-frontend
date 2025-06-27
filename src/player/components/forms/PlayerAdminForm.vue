<script setup lang="ts">
import { UtilBase } from '@/core/utilities/UtilBase';
import { useZodValidation } from '@/core/utilities/UtilZodValidations';
import { useSavePlayer } from '@/player/application/useSavePlayer';
import { defaultPlayer, playerSchema, type Player } from '@/player/domain/Player';
import { usePlayerAdminStore } from '@/player/store/PlayerAdminStore';
import BaseDatePicker from '@/shared/components/BaseDatePicker.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import BaseSelect from '@/shared/components/BaseSelect.vue';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { refetch: savePlayer, loading: loading } = useSavePlayer();

const visible = defineModel<boolean>();

const playerAdminStore = usePlayerAdminStore();
const sharedEnumStore = useSharedEnumsStore();

const isEdit = computed(() => playerAdminStore.isEdition);
const editionPlayer = computed(() => playerAdminStore.getEditionPlayer);

const emit = defineEmits<{ (e: 'saved'): void }>();

const {
  form,
  errors: formErrors,
  submitted,
  isFormValid,
  validate,
  reset,
} = useZodValidation(defaultPlayer, playerSchema);

watch(visible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

watch(editionPlayer, (newVal) => {
  if (newVal) {
    form.value = { ...newVal };
  } else {
    form.value = UtilBase.cloneVueProxy(defaultPlayer);
  }
});

function resetForm() {
  reset();
  if (isEdit.value === true) {
    visible.value = false;
  }
  playerAdminStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  submitted.value = true;

  if (!validate()) return;

  const response = await savePlayer(form.value);
  if (response) {
    emit('saved');
  }
  visible.value = false;
}
</script>
<template>
  <Drawer position="top" v-model:visible="visible" class="h-50">
    <template #header>
      <h3 class="mt-2">
        {{ isEdit ? t('player.form_title_edit') : t('player.form_title_new') }}
      </h3>
    </template>

    <template #default>
      <div class="container g-3">
        <!-- Parent contact-info -->
        <div class="row align-items-start">
          <BaseInputGroupText
            class="col-12 col-xl-5 mb-3"
            v-model="form.name"
            :label="t('player.fields.name')"
            :invalid="!!formErrors?.name"
            :errorMessage="formErrors?.name ?? undefined" />
          <BaseInputGroupText
            class="col-12 col-xl-7 mb-3"
            v-model="form.surnames"
            :label="t('player.fields.surnames')"
            :invalid="!!formErrors?.surnames"
            :errorMessage="formErrors?.surnames ?? undefined" />
          <BaseDatePicker
            class="col-12 col-xl-4 mb-3"
            v-model="form.birthDate"
            :label="t('player.fields.birth_date')"
            :invalid="!!formErrors?.birthDate"
            :errorMessage="formErrors?.birthDate ?? undefined" />
          <BaseSelect
            class="col-12 col-xl-4 mb-3"
            v-model="form.sex"
            :options="sharedEnumStore.getSexOptions"
            :label="t('player.fields.sex')"
            :disabled="isEdit"
            :invalid="!!formErrors?.sex"
            :errorMessage="formErrors?.sex ?? undefined" />
          <BaseSelect
            class="col-12 col-xl-4 mb-3"
            v-model="form.category"
            :options="sharedEnumStore.getCategories"
            :label="t('player.fields.category')"
            :disabled="isEdit"
            :invalid="!!formErrors?.category"
            :errorMessage="formErrors?.category ?? undefined" />
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
