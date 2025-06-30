<script lang="ts" setup>
import { useZodValidation } from '@/core/utilities/UtilZodValidations';
import BaseDatePicker from '@/shared/components/BaseDatePicker.vue';
import SigninUploader from '@/signinPeriod/components/upload/SigninUploader.vue';
import { defaultSigninPeriod, signinPeriodSchema } from '@/signinPeriod/domain/SigninPeriod';
import { useSigninPeriodStore } from '@/signinPeriod/store/signinPeriodStore';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Message from 'primevue/message';
import { useI18n } from 'vue-i18n';
import { useGetSigninForm } from '../application/useGetSigninForm';
import { useGetSigninPeriodInfo } from '../application/useGetSigninPeriodInfo';
import { useUpdateSigninPeriod } from '../application/useUpdateSigninPeriod';

const { t } = useI18n();
const signinPeriodStore = useSigninPeriodStore();
const { refetch: updateInterval, loading: loadingInterval } = useUpdateSigninPeriod();
const { refetch: getSigniPeriodInfo } = useGetSigninPeriodInfo();
const { refetch: getDocument } = useGetSigninForm();

const visibility = ref<boolean>(true);
const signinPeriod = computed(() => {
  return signinPeriodStore.signinPeriod;
});
const isActive = computed(() => {
  return signinPeriodStore.isActive;
});
const downloads = computed(() => {
  return signinPeriodStore.downloads;
});
const hasForm = computed(() => {
  return signinPeriodStore.hasForm;
});
const badgeTextWithDocs = computed(() => {
  return t('signin_period.badge_d', [downloads.value]);
});
const badgeTextWithOutDocs = computed(() => {
  return t('signin_period.badge_no_d');
});

onMounted(async () => {
  await getPeriodInfo();
});

const {
  form,
  errors: formErrors,
  submitted,
  isFormValid,
  validate,
} = useZodValidation(defaultSigninPeriod, signinPeriodSchema);

function onCloseMessage() {
  visibility.value = false;
}

async function updatePeriodInterval() {
  submitted.value = true;
  if (!validate()) return;

  signinPeriodStore.setData(await updateInterval(form.value));
  visibility.value = true;
}

async function getPeriodInfo() {
  //Se ejecuta en el mounted para traer la información del period
  // -> setea el visibility a true segun si el periodo es activo o no, se ejecuta despues de cada actualización
  signinPeriodStore.setData(await getSigniPeriodInfo());
  visibility.value = true;
}

async function getDocumentSignin() {
  await getDocument();
}

watch(
  () => signinPeriod.value,
  () => {
    form.value = { ...signinPeriod.value };
  }
);
</script>
<template>
  <div>
    <Card class="h-100">
      <template #header>
        <div class="w-100 flex-column">
          <div class="d-flex justify-content-center">
            <h3 class="pt-3 px-4">{{ t('signin_period.title') }}</h3>
          </div>
        </div>
      </template>
      <template #content>
        <div class="container">
          <div class="row">
            <h4>{{ t('signin_period.period_name') }}</h4>
          </div>
          <div class="row pb-3 d-flex align-middle align-items-start">
            <div class="col-12 col-lg-4 align-items-center">
              <BaseDatePicker
                :label="t('signin_period.fields.date_init')"
                v-model="form.dateInit"
                :invalid="!!formErrors.dateInit"
                :error-message="formErrors.dateInit ?? undefined">
              </BaseDatePicker>
            </div>
            <div class="col-12 col-lg-4">
              <BaseDatePicker
                :label="t('signin_period.fields.date_end')"
                v-model="form.dateEnd"
                :invalid="!!formErrors.dateEnd"
                :error-message="formErrors.dateEnd ?? undefined"></BaseDatePicker>
            </div>
            <div class="col-12 col-lg-4 align-content-center">
              <Button
                class="w-100 my-3"
                :label="t('signin_period.update')"
                :icon="'pi pi-save'"
                :disabled="submitted && !isFormValid"
                @click="updatePeriodInterval"></Button>
            </div>
          </div>
          <div class="row row-cols-1 py-3 justify-content-center" v-if="visibility">
            <Message
              :closable="true"
              @close="onCloseMessage"
              class="w-auto"
              :severity="isActive ? 'info' : 'error'"
              :icon="isActive ? 'pi pi-file-check' : 'pi pi-file-excel'">
              {{ isActive ? t('signin_period.open_period') : t('signin_period.closed_period') }}
            </Message>
          </div>
          <Divider></Divider>
          <div class="row">
            <h4>
              {{ t('signin_period.doc_settings') }}
              <Badge
                class="pi pi-info-circle"
                v-tooltip.top="hasForm ? badgeTextWithDocs : badgeTextWithOutDocs"
                severity="secondary"></Badge>
            </h4>
          </div>
          <div class="row pb-3">
            <div class="col-12 col-lg-6 justify-content-center">
              <SigninUploader
                class="w-100 my-3"
                :label="t('signin_period.upload_form')"
                @uploaded="getPeriodInfo" />
            </div>
            <div class="col-12 col-lg-6 d-flex justify-content-center">
              <Button
                class="w-100 my-3"
                :label="t('signin_period.download_form')"
                :disabled="!hasForm"
                @click="getDocumentSignin()"></Button>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
