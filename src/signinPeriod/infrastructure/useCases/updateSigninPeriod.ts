import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { ResponseSigninData } from '@/signinPeriod/domain/ResponseSigninData';
import responseSigninPeriodMock from '@/signinPeriod/infrastructure/mocks/responseSigninPeriodMock.json';
import type { RequestUpdateSigninPeriod } from '../model/request/RequestUpdateSigninPeriod';
import type { ResponseSigninPeriod } from '../model/response/ResponseSigninPeriod';
import { mapResponseSigninToResponseSigninData } from '../service/signinService';

async function Api(request: RequestUpdateSigninPeriod): Promise<ResponseSigninPeriod> {
  const response = await api.patch<ResponseSigninPeriod>('/signin/period', request);

  return response.data;
}
async function InMemory(): Promise<ResponseSigninPeriod> {
  await UtilBase.wait(500);
  return responseSigninPeriodMock as ResponseSigninPeriod;
}

async function updateSigninPeriod(request: RequestUpdateSigninPeriod): Promise<ResponseSigninData> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(request);

    return mapResponseSigninToResponseSigninData(response);
  } catch (err) {
    throw new Error(`Error fetching season signin period. ` + err);
  }
}

export { updateSigninPeriod };
