<script lang="ts" setup>
import { formatShowMatchDateTime } from '@/core/utilities/UtilDate';
import type { Match } from '@/shared/dominio/Match';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import SquadViewModal from '@/squad/components/SquadViewModal.vue';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Tag from 'primevue/tag';
import { useI18n } from 'vue-i18n';

interface Props {
  match: Match;
  isAdmin: boolean;
  showSquad: boolean;
}

defineProps<Props>();

const sharedEnumStore = useSharedEnumsStore();
const { t } = useI18n();

const defaultShield = ref<string>(
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9IBnx6EjTRl0_xQRfPLCn6j6soEfjdqLKMQ&s'
);

const visible = ref<boolean>(false);

function visibleSquad() {
  visible.value = !visible.value;
}
</script>
<template>
  <SquadViewModal
    v-if="match.squad !== null"
    v-model="visible"
    :squad="match.squad"></SquadViewModal>
  <Panel class="my-5" style="width: 90%" :style="isAdmin ? 'cursor: pointer' : ''">
    <template #header>
      <div class="container">
        <div class="row justify-content-center mb-3">
          <div class="col-auto">
            <Tag
              :value="match.category ? sharedEnumStore.getCategoryName(match.category) : ''"
              severity="info"></Tag>
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div class="container">
        <div
          class="d-flex flex-column flex-xxl-row align-items-center justify-content-center gap-2 gap-xl-3 mb-3 text-center">
          <span class="m-2">{{ match.localTeam?.name }}</span>
          <Avatar
            class="m-2 avatar-responsive"
            :image="match.localTeam?.logo ? match.localTeam.logo.url : defaultShield"></Avatar>
          <div class="fw-bold fs-5 m-2">{{ match.localPoints ?? '' }}</div>
          <div class="fs-4 fw-bold m-2">-</div>
          <div class="fw-bold fs-5 m-2">{{ match.visitorPoints ?? '' }}</div>
          <Avatar
            class="m-2 avatar-responsive"
            :image="match.visitorTeam?.logo ? match.visitorTeam.logo.url : defaultShield"></Avatar>
          <span class="m-2">{{ match.visitorTeam?.name }}</span>
        </div>

        <div class="row">
          <div class="col-12 col-md-6 text-center mb-3">
            <Tag
              :icon="'pi pi-calendar'"
              :value="
                match.matchDate ? formatShowMatchDateTime(match.matchDate) : t('matches.no_date')
              "
              severity="secondary"></Tag>
          </div>
          <div class="col-12 col-md-6 text-center">
            <Tag :icon="'pi pi-map-marker'" :value="match.location" severity="secondary"></Tag>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="container">
        <div class="row justify-content-center mb-3">
          <div class="col-auto">
            <Tag
              v-if="match.state"
              :value="sharedEnumStore.getMatchStatesName(match.state)"
              severity="info"></Tag>
          </div>
        </div>
        <div class="row justify-content-center mb-3" v-if="match.squad !== null && showSquad">
          <div class="col-auto">
            <Button
              :label="t('matches.fields.view_squad')"
              severity="primary"
              outlined
              icon="pi pi-list-check"
              @click.stop="visibleSquad"></Button>
          </div>
        </div>
      </div>
    </template>
  </Panel>
</template>
