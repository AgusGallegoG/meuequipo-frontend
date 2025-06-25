<script setup lang="ts">
import { formatShowGameDateTime } from '@/core/utilities/UtilDate';
import BaseCheckBox from '@/shared/components/BaseCheckBox.vue';
import BaseDatePicker from '@/shared/components/BaseDatePicker.vue';
import BaseEditor from '@/shared/components/BaseEditor.vue';
import BaseInputGroupText from '@/shared/components/BaseInputGroupText.vue';
import { useSquadStepperAdminStore } from '@/squad/store/squadStepperAdminStore';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
import Message from 'primevue/message';
import { useConfirm } from 'primevue/useconfirm';
import { useI18n } from 'vue-i18n';

const emits = defineEmits<{
  (e: 'next'): void;
  (e: 'prev'): void;
}>();

const dateHour = ref<Date | null>(null);
const location = ref<string>('');
const sendMail = ref<boolean>(true);
const mail = ref('');

const message = computed(() => {
  const { gameDate, location, rival } = squadStepperStore.gameInfo();

  return t('squads.game_info', [
    gameDate ? formatShowGameDateTime(gameDate) : t('squads.complete'),
    location,
    rival ?? t('squads.complete'),
  ]);
});

const squadStepperStore = useSquadStepperAdminStore();
const { t } = useI18n();
const confirm = useConfirm();

const canGoNext = computed(() => {
  return (
    dateHour.value !== null &&
    location.value !== null &&
    (!sendMail.value || (sendMail.value && mail.value !== ''))
  );
});

function confirmSubmit() {
  confirm.require({
    message: sendMail.value ? t('squads.confirm_send') : t('squads.confirm_no_send'),
    header: t('squads.title'),
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      submitPartial();
    },
  });
}

function submitPartial() {
  //emitir next
  if (canGoNext) {
    squadStepperStore.setDataStepThree(location.value, dateHour.value, mail.value, sendMail.value);
    emits('next');
  }
}

function goBack() {
  // emitir back
  cleanStep();

  emits('prev');
}

function cleanStep() {
  dateHour.value = null;
  location.value = '';
  sendMail.value = true;
}
</script>
<template>
  <ConfirmDialog style="max-width: 75vw" />
  <div class="container">
    <div class="row my-3 fw-medium" style="color: var(--p-secondary-color)">
      <Message severity="info" icon="pi pi-info-circle">{{ message }}</Message>
    </div>
    <div class="row">
      <div class="col-12 col-lg-5">
        <BaseInputGroupText
          id="location"
          v-model="location"
          :label="t('squads.fields.location')"
          icon="pi pi-map-marker">
        </BaseInputGroupText>
      </div>
      <div class="col-12 col-lg-5">
        <BaseDatePicker id="date-hour" v-model="dateHour" showTime :label="t('squads.fields.date')">
        </BaseDatePicker>
      </div>
      <div class="col-12 col-lg-2">
        <BaseCheckBox v-model="sendMail" :label="t('squads.fields.send_mail')"></BaseCheckBox>
      </div>
    </div>
    <div class="row">
      <BaseEditor
        v-if="sendMail"
        id="editor-mail"
        v-model="mail"
        :label="t('squads.fields.notification')"></BaseEditor>
    </div>
    <div class="row">
      <div class="col col-6 col-md-4 col-lg-2">
        <Button
          class="w-100 my-3"
          :label="t('squads.back')"
          @click="goBack()"
          severity="secondary"></Button>
      </div>
      <div class="col col-6 col-md-4 col-lg-2">
        <Button
          class="w-100 my-3"
          :label="t('squads.next')"
          @click="submitPartial()"
          :disabled="!canGoNext"></Button>
      </div>
    </div>
  </div>
</template>
