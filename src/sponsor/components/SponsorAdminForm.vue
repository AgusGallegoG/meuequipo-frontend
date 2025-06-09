<script setup lang="ts">
import BaseImageUpload from '@/shared/components/BaseImageUpload.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import { useSaveSponsor } from '@/sponsor/application/useSaveSponsor';
import { defaultSponsor, type Sponsor } from '@/sponsor/domain/Sponsor';
import { useSponsorAdminStore } from '@/sponsor/store/SponsorAdminStore';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { refetch: saveSponsor, loading } = useSaveSponsor();
const sponsorAdminStore = useSponsorAdminStore();

const isEdit = computed(() => sponsorAdminStore.isEdition);
const sponsor = ref<Sponsor>({ ...defaultSponsor });
const canSave = computed(() => sponsor.value.name !== '');
const editionSponsor = computed(() => sponsorAdminStore.getEditionSponsor);

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
  sponsorAdminStore.clearSelectedToEdit();
}

async function onSubmitForm() {
  //   ExecuteQuery
  const response = await saveSponsor(sponsor.value);
  if (response) {
    sponsorAdminStore.setTableData(response);
  }
}
</script>
<template>
  <Card class="h-100">
    <template #title>
      <h3 class="mb-2 mt-2">
        {{ isEdit ? t('sponsors.form_title_edit') : t('sponsors.form_title_new') }}
      </h3>
    </template>
    <template #content>
      <div class="container g-3">
        <div class="row">
          <!-- <img v-if="sponsor.logo" /> -->
          <BaseImageUpload
            :label="t('sponsors.fields.logo')"
            v-model="sponsor.logo"></BaseImageUpload>
        </div>
        <div class="row">
          <BaseInputGroupText
            id="name-rival-team"
            v-model="sponsor.name"
            :label="t('sponsors.fields.name')"></BaseInputGroupText>
        </div>
        <div class="row">
          <BaseInputGroupText
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
          :icon="isEdit ? 'pi pi-eraser' : 'pi pi-times'"></Button>
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
  </Card>
</template>
