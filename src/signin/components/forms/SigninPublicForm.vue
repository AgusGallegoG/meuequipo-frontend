<script setup lang="ts">
import router from '@/core/router';
import { UtilBase } from '@/core/utilities/UtilBase';
import { useZodValidation } from '@/core/utilities/UtilZodValidations';
import type { Season } from '@/season/domain/Season';
import { getActiveSeason } from '@/season/infrastructure/useCases/getActiveSeason';
import BaseDatePicker from '@/shared/components/BaseDatePicker.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import BasePhoneInput from '@/shared/components/BasePhoneInput.vue';
import BaseSelect from '@/shared/components/BaseSelect.vue';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import { useDoSigninPlayer } from '@/signin/application/useDoSigninPlayer';
import { defaultSignin, signinPublicSchema, type Signin } from '@/signin/domain/Signin';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { useI18n } from 'vue-i18n';

const sharedEnumStore = useSharedEnumsStore();
const { t } = useI18n();

const { refetch: doSignin, loading } = useDoSigninPlayer();

const activeSeason = ref<Season | null>();
const sent = ref<boolean>(false);

const title = computed(() => {
  var result = t('signin.title');
  if (activeSeason.value) {
    result += t('signin.season_connector') + activeSeason.value?.name;
  }
  return result;
});

const {
  form,
  errors: formErrors,
  submitted,
  isFormValid,
  validate,
  reset,
} = useZodValidation(defaultSignin, signinPublicSchema);

onMounted(async () => {
  await sharedEnumStore.fetchAll();
  activeSeason.value = await getActiveSeason();
});

function resetForm() {
  reset();
  sent.value = false;
}

async function onSubmitForm() {
  submitted.value = true;

  if (!validate()) return;

  await doSignin(form.value);
  sent.value = true;
}
</script>
<template>
  <Card class="h-100">
    <template #header>
      <div class="w-100">
        <div class="d-flex justify-content-start px-4 pt-2">
          <h2>{{ title }}</h2>
        </div>
      </div>
    </template>
    <template #content>
      <div class="container g-3 pt-3" v-if="!sent">
        <!-- Parent info section -->
        <div class="row mb-3 align-items-start">
          <div class="col-12">
            <h3 class="fw-semibold pb-2 mb-3">{{ t('signin.parent_info') }}</h3>
          </div>
          <BaseInputGroupText
            class="col-12 col-xl-5 mb-3"
            v-model="form.parentName"
            :label="t('signin.fields.parent_name')"
            :invalid="!!formErrors.parentName"
            :errorMessage="formErrors.parentName ?? undefined" />
          <BaseInputGroupText
            class="col-12 col-xl-7 mb-3"
            v-model="form.parentSurnames"
            :label="t('signin.fields.parent_surnames')"
            :invalid="!!formErrors.parentSurnames"
            :errorMessage="formErrors.parentSurnames ?? undefined" />
        </div>
        <!-- player Info Section -->
        <div class="row mb-3 align-items-start">
          <div class="col-12">
            <h3 class="fw-semibold pb-2 mb-3">{{ t('signin.player_info') }}</h3>
          </div>
          <BaseInputGroupText
            class="col-12 col-xl-5 mb-3"
            v-model="form.player.name"
            :label="t('signin.fields.player_name')"
            :invalid="!!formErrors.player?.name"
            :errorMessage="formErrors.player?.name ?? undefined" />
          <BaseInputGroupText
            class="col-12 col-xl-7 mb-3"
            v-model="form.player.surnames"
            :label="t('signin.fields.player_surnames')"
            :invalid="!!formErrors.player?.surnames"
            :errorMessage="formErrors.player?.surnames ?? undefined" />
          <BaseDatePicker
            class="col-12 col-xl-4 mb-3"
            v-model="form.player.birthDate"
            :label="t('signin.fields.birth_date')"
            :invalid="!!formErrors.player?.birthDate"
            :errorMessage="formErrors.player?.birthDate ?? undefined" />
          <BaseSelect
            class="col-12 col-xl-4 mb-3"
            v-model="form.player.sex"
            :options="sharedEnumStore.getSexOptions"
            :label="t('signin.fields.sex')"
            :invalid="!!formErrors.player?.sex"
            :errorMessage="formErrors.player?.sex ?? undefined" />
          <BaseSelect
            class="col-12 col-xl-4 mb-3"
            v-model="form.player.category"
            :options="sharedEnumStore.getCategories"
            :label="t('signin.fields.category')"
            :invalid="!!formErrors.player?.category"
            :errorMessage="formErrors.player?.category ?? undefined" />
        </div>
        <!-- contact-info-section -->
        <div class="row mb-3 align-items-start">
          <div class="col-12">
            <h3 class="fw-semibold pb-2 mb-3">{{ t('signin.contact_info') }}</h3>
          </div>
          <BasePhoneInput
            class="col-12 col-xl-5 mb-3"
            v-model="form.phone"
            :label="t('signin.fields.phone')"
            :invalid="!!formErrors.phone"
            :errorMessage="formErrors.phone ?? undefined" />
          <BaseInputGroupText
            class="col-12 col-xl-7 mb-3"
            v-model="form.mail"
            :label="t('signin.fields.email')"
            :invalid="!!formErrors.mail"
            :errorMessage="formErrors.mail ?? undefined" />
        </div>
      </div>
      <div v-else>
        <div class="container">
          <div class="align-items-center">
            <p
              v-html="
                t('signin.success.panel', [
                  form.player.name + ' ' + form.player.surnames,
                  form.mail,
                ])
              "></p>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div v-if="!sent" class="d-flex flex-column flex-md-row justify-content-end gap-2 w-100">
        <Button
          class="w-100"
          severity="secondary"
          raised
          @click="resetForm()"
          :label="t('core.buttons.clear')"
          :icon="'pi pi-eraser'"></Button>
        <Button
          class="w-100"
          raised
          :label="t('core.buttons.save')"
          @click="onSubmitForm()"
          :disabled="submitted && !isFormValid"
          icon="pi pi-save"
          :loading="loading"></Button>
      </div>
      <div v-else class="d-flex flex-column flex-md-row justify-content-end gap-2 w-100">
        <Button
          class="w-100"
          severity="secondary"
          raised
          @click="resetForm()"
          :label="t('signin.sign_other')"
          :icon="'pi pi-eraser'"></Button>
        <Button
          class="w-100"
          raised
          :label="t('signin.go_back')"
          @click="router.push({ name: 'Inicio' })"
          icon="pi pi-home"
          :loading="loading"></Button>
      </div>
    </template>
  </Card>
</template>

<style lang="css" scoped>
p {
  line-height: 2;
  text-align: justify;
  font-size: 18px;
  padding: 0 5rem;
}
</style>
