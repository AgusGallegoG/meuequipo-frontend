<script setup lang="ts">
import CalendarView from '@/calendar/components/CalendarView.vue';
import Card from 'primevue/card';
import { useGetTeamFormDetails } from '../application/useGetTeamFormDetails';
import TeamBasicData from '../components/TeamBasicData.vue';
import { defaultTeamForm, type TeamForm } from '../domain/Team';

interface Props {
  id: string;
}

const props = defineProps<Props>();
const team = ref<TeamForm>({ ...defaultTeamForm });
const { refetch } = useGetTeamFormDetails();

onMounted(async () => {
  await doGetTeamDetails();
});

async function doGetTeamDetails() {
  team.value = await refetch(+props.id);
}
</script>

<template>
  <div id="base-module">
    <div class="container g-3">
      <Card class="h-100">
        <template #content>
          <TeamBasicData :team="team" class="pb-4" />
          <CalendarView :isAdmin="false" :teamId="+props.id" class="pt-4" />
        </template>
      </Card>
    </div>
  </div>
</template>
