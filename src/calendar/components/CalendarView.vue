<script lang="ts" setup>
import { useGetMatchesList } from '@/calendar/application/useGetMatchesList';
import CalendarFilter from '@/calendar/components/CalendarFilter.vue';
import CalendarMatchAdminForm from '@/calendar/components/form/CalendarMatchAdminForm.vue';
import MatchItem from '@/calendar/components/item/MatchItem.vue';
import type { CalendarFilter as CalendarFilterType } from '@/calendar/domain/CalendarFilters';
import { useCalendarStore } from '@/calendar/store/calendarStore';
import { getWeekRangeFromOffset } from '@/core/utilities/UtilDate';
import type { Match } from '@/shared/dominio/Match';
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

const emits = defineEmits<{ (e: 'selected', value: Match): void }>();

const { t } = useI18n();
const calendarStore = useCalendarStore();
const sharedEnumsStore = useSharedEnumsStore();
const { refetch: getMatches, loading } = useGetMatchesList();

const list = computed(() => calendarStore.getList);

const visible = ref<boolean>(false);

onMounted(async () => {
  initializeCalendarFilters();
  await doGetMatches();
  await sharedEnumsStore.fetchAll();
});

watch(
  () => calendarStore.getFilters,
  async () => {
    await doGetMatches();
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

async function doGetMatches() {
  calendarStore.setList(await getMatches(calendarStore.getFilters, props.isSquad ?? false));
}

function initializeCalendarFilters() {
  const { from, to } = getWeekRangeFromOffset();
  const filters: CalendarFilterType = {
    from: props.teamId ? null : from,
    to: props.teamId ? null : to,
    team: props.teamId ?? null,
  };

  calendarStore.setFilters(filters);
}

function toggleVisible() {
  visible.value = !visible.value;
}

function onSelectMatch(index: number) {
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
  <CalendarMatchAdminForm
    v-if="isAdmin"
    v-model="visible"
    @saved="doGetMatches"></CalendarMatchAdminForm>
  <Card :class="teamId ? 'h-50 everflow-y-scroll w-80' : 'h-100'">
    <template #header>
      <div class="w-100 flex-column">
        <div class="d-flex justify-content-center">
          <h3 class="pt-3 px-4">{{ t('matches.table_title') }}</h3>
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
        <div
          v-for="(match, index) in list"
          :key="match.id"
          class="d-flex justify-content-center"
          @click="onSelectMatch(index)">
          <MatchItem :isAdmin="isAdmin" :match="match" :showSquad="isAdmin && !isSquad"></MatchItem>
        </div>
      </div>
    </template>
  </Card>
</template>
