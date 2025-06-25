<script setup lang="ts">
import { useSaveSquadToGame } from '@/squad/application/useSaveSquadToGame';
import SquadViewModal from '@/squad/components/SquadViewModal.vue';
import SquadGameSelectionStep from '@/squad/components/steps/SquadGameSelectionStep.vue';
import SquadNotificationBuildStep from '@/squad/components/steps/SquadNotificationBuildStep.vue';
import SquadPlayersSelectionStep from '@/squad/components/steps/SquadPlayersSelectionStep.vue';
import type { Squad } from '@/squad/domain/Squad';
import type { ViewSquad } from '@/squad/domain/ViewSquad';
import { useSquadStepperAdminStore } from '@/squad/store/squadStepperAdminStore';
import Card from 'primevue/card';
import Step from 'primevue/step';
import StepItem from 'primevue/stepitem';
import StepPanel from 'primevue/steppanel';
import Stepper from 'primevue/stepper';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const stepperStore = useSquadStepperAdminStore();
const { refetch: saveSquad } = useSaveSquadToGame();

const step = ref<string>('1');
const visibleSummary = ref<boolean>(false);
const summarySquad = ref<ViewSquad | null>(null);

watch(visibleSummary, (newVal) => {
  if (!newVal) {
    goBack();
  }
});

async function submit() {
  const squad = stepperStore.squad;

  const response = await doSaveSquad(squad);

  if (response) {
    summarySquad.value = { ...response };
    visibleSummary.value = true;
  }
}

function goBack() {
  stepperStore.resetData();

  summarySquad.value = null;

  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push({ name: 'Dashboard' });
  }
}

async function doSaveSquad(squad: Squad): Promise<ViewSquad | null> {
  return await saveSquad(squad);
}
</script>
<template>
  <SquadViewModal
    v-if="summarySquad !== null"
    v-model="visibleSummary"
    :squad="summarySquad"
    @close="goBack"></SquadViewModal>
  <Card class="h-100">
    <template #content>
      <Stepper :value="step" :linear="true">
        <StepItem value="1">
          <Step #default>
            <h2 class="text-break">{{ t('squads.stepper.game') }}</h2>
          </Step>
          <StepPanel v-slot="{ activateCallback }">
            <SquadGameSelectionStep
              @next="activateCallback('2')"
              @prev="goBack"></SquadGameSelectionStep>
          </StepPanel>
        </StepItem>
        <StepItem value="2">
          <Step #default>
            <h2 class="text-break">{{ t('squads.stepper.players') }}</h2>
          </Step>
          <StepPanel v-slot="{ activateCallback }">
            <SquadPlayersSelectionStep
              @next="activateCallback('3')"
              @prev="activateCallback('1')"></SquadPlayersSelectionStep>
          </StepPanel>
        </StepItem>
        <StepItem value="3">
          <Step #default>
            <h2 class="text-break">{{ t('squads.stepper.notification') }}</h2>
          </Step>
          <StepPanel v-slot="{ activateCallback }">
            <SquadNotificationBuildStep
              @next="submit"
              @prev="activateCallback('2')"></SquadNotificationBuildStep>
          </StepPanel>
        </StepItem>
      </Stepper>
    </template>
  </Card>
</template>
