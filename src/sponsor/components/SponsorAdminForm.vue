<script setup lang="ts">
import BaseImageUpload from '@/shared/components/BaseImageUpload.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import { useSaveSponsor } from '@/sponsor/application/useSaveSponsor';
import { defaultSponsor, type Sponsor } from '@/sponsor/domain/Sponsor';
import { useSponsorAdminStore } from '@/sponsor/store/SponsorAdminStore';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import { useI18n } from 'vue-i18n';

const visible = defineModel<boolean>();

const { t } = useI18n();
const { refetch: saveSponsor, loading } = useSaveSponsor();
const sponsorAdminStore = useSponsorAdminStore();

const isEdit = computed(() => sponsorAdminStore.isEdition);
const sponsor = ref<Sponsor>({ ...defaultSponsor });
const canSave = computed(() => sponsor.value.name !== '');
const editionSponsor = computed(() => sponsorAdminStore.getEditionSponsor);

watch(visible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

watch(
  editionSponsor,
  (newVal) => {
    if (newVal) {
      sponsor.value = { ...newVal };
    } else {
      sponsor.value = { ...defaultSponsor };
    }
  },
  { immediate: true }
);

function resetForm() {
  sponsor.value = { ...defaultSponsor };
  if (isEdit.value === true) {
    visible.value = false;
  }
  sponsorAdminStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  //   ExecuteQuery
  const response = await saveSponsor(sponsor.value);
  if (response) {
    sponsorAdminStore.setTableData(response);
  }
  visible.value = false;
}
</script>
<template>
  <Drawer
    position="top"
    v-model:visible="visible"
    class="h-auto overflow-y-scroll"
    style="max-height: 75% !important">
    <template #header>
      <h3 class="mb-2 mt-2">
        {{ isEdit ? t('sponsors.form_title_edit') : t('sponsors.form_title_new') }}
      </h3>
    </template>
    <template #default>
      <div class="container g-3 mt-2">
        <div class="row row-cols-1 row-cols-md-3">
          <div class="col d-flex justify-content-center">
            <BaseImageUpload
              :label="t('sponsors.fields.logo')"
              v-model="sponsor.logo"></BaseImageUpload>
          </div>
          <BaseInputGroupText
            class="col d-flex align-items-center"
            id="name-rival-team"
            v-model="sponsor.name"
            :label="t('sponsors.fields.name')"></BaseInputGroupText>
          <BaseInputGroupText
            class="col d-flex align-items-center"
            id="url-rival-team"
            v-model="sponsor.url"
            :label="t('sponsors.fields.url')"></BaseInputGroupText>
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
