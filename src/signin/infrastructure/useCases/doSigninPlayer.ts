import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { RequestSignin } from '@/signin/infrastructure/models/requests/RequestSignin';

async function Api(signin: RequestSignin): Promise<void> {
  await api.post('/signin', signin);
}

async function InMemory(): Promise<void> {
  await UtilBase.wait(500);
}

async function doSigninPlayer(request: RequestSignin): Promise<void> {
  try {
    UtilBase.checkEnvironment() ? await InMemory() : await Api(request);
  } catch (error) {
    throw new Error(`Error sending signin`);
  }
}

export { doSigninPlayer };
