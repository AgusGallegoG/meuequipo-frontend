import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { ResponseSigninData } from '@/signinPeriod/domain/ResponseSigninData';
import responseSigninPeriodMock from '@/signinPeriod/infrastructure/mocks/responseSigninPeriodMock.json';
import type { RequestUpdateSigninPeriod } from '../model/request/RequestUpdateSigninPeriod';
import type { ResponseSigninPeriod } from '../model/response/ResponseSigninPeriod';
import { mapResponseSigninToResponseSigninData } from '../service/signinService';

async function Api(): Promise<ResponseSigninPeriod> {
  const response = await api.get<ResponseSigninPeriod>('/signin/info');

  return response.data;
}
async function InMemory(): Promise<ResponseSigninPeriod> {
  await UtilBase.wait(500);
  return responseSigninPeriodMock as ResponseSigninPeriod;
}

async function getSigninPeriodInfo(): Promise<ResponseSigninData> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api();

    return mapResponseSigninToResponseSigninData(response);
  } catch (err) {
    throw new Error(`Error fetching season signin period. ` + err);
  }
}

export { getSigninPeriodInfo };
