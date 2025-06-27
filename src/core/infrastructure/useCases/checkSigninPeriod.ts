import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';

async function Api(): Promise<boolean> {
  const response = await api.get('/signin/period-active');

  return response.data;
}

async function InMemory(): Promise<boolean> {
  await UtilBase.wait(100);
  return true;
}

async function checkSigninPeriod() {
  try {
    return UtilBase.checkEnvironment() ? await InMemory() : await Api();
  } catch (error) {
    throw new Error(`Error fetching data of signinPeriod`);
  }
}

export { checkSigninPeriod };
