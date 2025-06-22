import type { ChangePassRequest } from '@/auth/infrastructure/models/requests/ChangePassRequest';
import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';

async function Api(data: ChangePassRequest): Promise<void> {
  await api.patch<void>('/auth/changepass', data);
}

async function InMemory(): Promise<void> {
  await UtilBase.wait(2000);
}

async function changePass(data: ChangePassRequest): Promise<void> {
  try {
    UtilBase.checkEnvironment() ? await InMemory() : await Api(data);
  } catch (error) {
    throw new Error(`Error al realizar la llamda post.changepass: ${error}`);
  }
}

export { changePass };
