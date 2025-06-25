<script setup lang="ts">
import { formatShowGameDateTime } from '@/core/utilities/UtilDate';
import type { ViewSquad } from '@/squad/domain/ViewSquad';
import Dialog, { type DialogBreakpoints } from 'primevue/dialog';
import { useI18n } from 'vue-i18n';

interface Props {
  squad: ViewSquad | null;
}

const { t } = useI18n();
const visible = defineModel<boolean>();

const props = defineProps<Props>();

const dialogBreakpoints: DialogBreakpoints = {
  '640px': '100vw',
  '768px': '90vw',
  '992x': '75vw',
  '1200px': '50vw',
};
</script>

<template>
  <Dialog
    v-model:visible="visible"
    class="dialog-responsive"
    modal
    :breakpoints="dialogBreakpoints"
    :draggable="false">
    <template #header>
      <h2 style="color: var(--p-primary-color)">{{ t('squads.title') }}</h2>
    </template>

    <template #default>
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-12">
            <h3>{{ t('squads.fields.location') }}</h3>
            <span>{{ props.squad?.location }}</span>
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col-12">
            <h3>{{ t('squads.fields.date') }}</h3>
            <span>{{ props.squad ? formatShowGameDateTime(props.squad.date) : '' }}</span>
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col-12">
            <h3>{{ t('squads.fields.squad_players') }}</h3>
          </div>
          <div class="col-12 text-break">
            <ul>
              <li v-if="props.squad" v-for="item in props.squad.players" key="id">
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>

    <template #footer></template>
  </Dialog>
</template>
