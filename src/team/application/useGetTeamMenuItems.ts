import { withLoading } from '@/shared/utils/withLoading';
import { getTeamMenuItems } from '@/team/infrastructure/useCases/getTeamMenuItems';
import type { MenuItem } from 'primevue/menuitem';
import { useI18n } from 'vue-i18n';

export function useGetTeamMenuItems() {
  const loading = ref<boolean>(false);
  const { t } = useI18n();

  async function refetch(): Promise<MenuItem[]> {
    loading.value = true;
    try {
      const response = await getTeamMenuItems();

      if (response && response.length > 0) {
        return response;
      } else {
        throw Error();
      }
    } catch (error) {
      return [{ label: t('core.menubar.label.not_found') }];
    } finally {
      loading.value = false;
    }
  }

  return { loading, refetch };
}
