<script setup lang="ts">
import router from '@/core/router';
import type { Season } from '@/season/domain/Season';
import { getActiveSeason } from '@/season/infrastructure/useCases/getActiveSeason';
import BaseDatePicker from '@/shared/components/BaseDatePicker.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import BaseSelect from '@/shared/components/BaseSelect.vue';
import { getValidationRegExp, Validations } from '@/shared/dominio/enums/Validations';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import { useDoSigninPlayer } from '@/signin/application/useDoSigninPlayer';
import { defaultSignin, type Signin } from '@/signin/domain/Signin';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { useI18n } from 'vue-i18n';

const phonePattern: RegExp = getValidationRegExp(Validations.PHONE);
const mailPattern: RegExp = getValidationRegExp(Validations.EMAIL);

const sharedEnumStore = useSharedEnumsStore();
const { t } = useI18n();

const { refetch: doSignin, loading } = useDoSigninPlayer();

const activeSeason = ref<Season | null>();
const sent = ref<boolean>(false);
const signin = ref<Signin>(cloneSignin(defaultSignin));
const canSave = computed(() => {
  return (
    signin.value.mail !== '' &&
    validMail &&
    signin.value.phone !== '' &&
    validPhone &&
    signin.value.parentName !== '' &&
    signin.value.parentSurnames !== '' &&
    signin.value.player.birthDate !== null &&
    signin.value.player.category > -1 &&
    signin.value.player.name !== '' &&
    signin.value.player.sex > -1 &&
    signin.value.player.surnames !== ''
  );
});

const validPhone = computed(() => {
  return phonePattern.test(signin.value.phone);
});

const validMail = computed(() => {
  return mailPattern.test(signin.value.mail);
});

onMounted(async () => {
  await sharedEnumStore.fetchAll();
  activeSeason.value = await getActiveSeason();
});

function getTitle() {
  var result = t('signin.title');
  if (activeSeason.value) {
    result += t('signin.season_connector') + activeSeason.value?.name;
  }
  return result;
}

function resetForm() {
  signin.value = cloneSignin(defaultSignin);
  sent.value = false;
}

async function onSubmitForm() {
  await doSignin(signin.value);
  sent.value = true;
}

function cloneSignin(original: Signin): Signin {
  return {
    id: original.id,
    parentName: original.parentName,
    parentSurnames: original.parentSurnames,
    mail: original.mail,
    phone: original.phone,
    state: original.state,
    player: {
      id: original.player.id,
      name: original.player.name,
      surnames: original.player.surnames,
      birthDate: original.player.birthDate ? new Date(original.player.birthDate) : null,
      sex: original.player.sex,
      category: original.player.category,
    },
  };
}
</script>
<template>
  <Card class="h-100">
    <template #header>
      <div class="w-100">
        <div class="d-flex justify-content-start px-3">
          <h2>{{ getTitle() }}</h2>
        </div>
      </div>
    </template>
    <template #content>
      <div class="container g-3 pt-3" v-if="!sent">
        <!-- Parent info section -->
        <div class="row mb-3">
          <div class="col-12">
            <h3 class="fw-semibold pb-2 mb-3">{{ t('signin.parent_info') }}</h3>
          </div>
          <BaseInputGroupText
            class="col-12 col-xl-5 mb-3"
            v-model="signin.parentName"
            :label="t('signin.fields.parent_name')" />
          <BaseInputGroupText
            class="col-12 col-xl-7 mb-3"
            v-model="signin.parentSurnames"
            :label="t('signin.fields.parent_surnames')" />
        </div>
        <!-- player Info Section -->
        <div class="row mb-3">
          <div class="col-12">
            <h3 class="fw-semibold pb-2 mb-3">{{ t('signin.player_info') }}</h3>
          </div>
          <BaseInputGroupText
            class="col-12 col-xl-5 mb-3"
            v-model="signin.player.name"
            :label="t('signin.fields.player_name')" />
          <BaseInputGroupText
            class="col-12 col-xl-7 mb-3"
            v-model="signin.player.surnames"
            :label="t('signin.fields.player_surnames')" />
          <BaseDatePicker
            class="col-12 col-xl-4 mb-3"
            v-model="signin.player.birthDate"
            :label="t('signin.fields.birth_date')" />
          <BaseSelect
            class="col-12 col-xl-4 mb-3"
            v-model="signin.player.sex"
            :options="sharedEnumStore.getSexOptions"
            :label="t('signin.fields.sex')" />
          <BaseSelect
            class="col-12 col-xl-4 mb-3"
            v-model="signin.player.category"
            :options="sharedEnumStore.getCategories"
            :label="t('signin.fields.category')" />
        </div>
        <!-- contact-info-section -->
        <div class="row mb-3">
          <div class="col-12">
            <h3 class="fw-semibold pb-2 mb-3">{{ t('signin.contact_info') }}</h3>
          </div>
          <BaseInputGroupText
            class="col-12 col-xl-5 mb-3"
            v-model="signin.phone"
            :label="t('signin.fields.phone')"
            :error="!validPhone" />
          <BaseInputGroupText
            class="col-12 col-xl-7 mb-3"
            v-model="signin.mail"
            :label="t('signin.fields.email')"
            :error="!validMail" />
        </div>
      </div>
      <div v-else>
        <div class="container">
          <div class="align-items-center">
            <p
              v-html="
                t('signin.success.panel', [
                  signin.player.name + ' ' + signin.player.surnames,
                  signin.mail,
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
          icon="pi pi-save"
          :disabled="!canSave"
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
          icon="pi pi-save"
          :disabled="!canSave"
          :loading="loading"></Button>
      </div>
    </template>
  </Card>
</template>

<style lang="css" scoped>
p {
  line-height: 2;
  text-align: justify;
}
</style>
