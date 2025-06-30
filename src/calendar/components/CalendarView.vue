<script lang="ts" setup>
import { useGetGamesList } from '@/calendar/application/useGetGamesList';
import CalendarFilter from '@/calendar/components/CalendarFilter.vue';
import CalendarGameAdminForm from '@/calendar/components/form/CalendarGameAdminForm.vue';
import GameItem from '@/calendar/components/item/GameItem.vue';
import type { CalendarFilter as CalendarFilterType } from '@/calendar/domain/CalendarFilters';
import { useCalendarStore } from '@/calendar/store/calendarStore';
import { getWeekRangeFromOffset } from '@/core/utilities/UtilDate';
import type { Game } from '@/shared/dominio/Game';
import { useSharedEnumsStore } from '@/shared/store/sharedEnumsStore';
import Button from 'primevue/button';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import { useI18n } from 'vue-i18n';

interface Props {
  isAdmin: boolean;
  teamId?: number | null;
  isSquad?: boolean | null;
}

const props = withDefaults(defineProps<Props>(), {
  teamId: null,
  isSquad: false,
});

const emits = defineEmits<{ (e: 'selected', value: Game): void }>();

const { t } = useI18n();
const calendarStore = useCalendarStore();
const sharedEnumsStore = useSharedEnumsStore();
const { refetch: getGames, loading } = useGetGamesList();

const list = computed(() => calendarStore.getList);

const visible = ref<boolean>(false);

onMounted(async () => {
  initializeCalendarFilters();
  await doGetGames();
  await sharedEnumsStore.fetchAll();
});

watch(
  () => calendarStore.getFilters,
  async () => {
    await doGetGames();
  }
);

watch(
  () => visible.value,
  (newVal) => {
    if (!newVal) {
      // si visible pasa a false se reinicia selectedToEdit
      calendarStore.clearSelectedToEdit();
    }
  }
);

watch(
  () => props.teamId,
  (newTeamId) => {
    const currentFilters = calendarStore.getFilters;
    calendarStore.setFilters({
      ...currentFilters,
      team: newTeamId ?? null,
    });
  }
);

async function doGetGames() {
  // debugger;
  // if (calendarStore.getFilters.from == null || calendarStore.getFilters.to == null) {
  //   initializeCalendarFilters();
  // }
  calendarStore.setList(await getGames(calendarStore.getFilters, props.isSquad ?? false));
}

function initializeCalendarFilters() {
  const { from, to } = getWeekRangeFromOffset();
  const filters: CalendarFilterType = {
    from: from,
    to: to,
    team: props.teamId ?? null,
  };

  calendarStore.setFilters(filters);
}

function toggleVisible() {
  visible.value = !visible.value;
}

function onSelectGame(index: number) {
  if (props.isSquad) {
    emits('selected', list.value[index]);
  } else if (props.isAdmin) {
    calendarStore.setSelectedToEdit(list.value[index]);
    toggleVisible();
  }
  return;
}
</script>
<template>
  <CalendarGameAdminForm
    v-if="isAdmin"
    v-model="visible"
    @saved="doGetGames"></CalendarGameAdminForm>
  <Card :class="teamId ? 'h-50 everflow-y-scroll w-80' : 'h-100'">
    <template #header>
      <div class="w-100 flex-column">
        <div class="d-flex justify-content-center">
          <h3 class="pt-3 px-4">{{ t('games.table_title') }}</h3>
        </div>

        <div class="d-flex justify-content-center mb-3">
          <Button
            @click="toggleVisible"
            :label="t('core.buttons.add')"
            icon="pi pi-plus"
            v-if="isAdmin && !isSquad"></Button>
        </div>
        <CalendarFilter></CalendarFilter>
      </div>
    </template>
    <template #content>
      <div
        v-if="loading"
        class="h-50 d-flex align-content-center justify-content-center align-items-center"
        style="min-height: 50vh">
        <ProgressSpinner style="width: 40px; height: 40px" strokeWidth="4" />
      </div>
      <div v-else>
        <div clas="h-50">
          <div
            v-if="list.length > 0"
            v-for="(game, index) in list"
            :key="game.id"
            class="d-flex justify-content-center"
            @click="onSelectGame(index)">
            <GameItem :isAdmin="isAdmin" :game="game" :showSquad="isAdmin && !isSquad"></GameItem>
          </div>

          <div v-else class="h-100 w-100 d-flex justify-content-center align-middle">
            <h2>{{ t('games.no_games') }}</h2>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
