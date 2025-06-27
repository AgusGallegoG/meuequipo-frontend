import api from '@/core/network';
import { UtilBase } from '@/core/utilities/UtilBase';
import type { ResponseSigninData } from '@/signinPeriod/domain/ResponseSigninData';
import responseSigninPeriodMock from '@/signinPeriod/infrastructure/mocks/responseSigninPeriodMock.json';
import type { ResponseSigninPeriod } from '@/signinPeriod/infrastructure/model/response/ResponseSigninPeriod';
import { mapResponseSigninToResponseSigninData } from '../service/signinService';

async function Api(file: File): Promise<ResponseSigninPeriod> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  const response = await api.post<ResponseSigninPeriod>('/signin/template', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

async function InMemory(): Promise<ResponseSigninPeriod> {
  await UtilBase.wait(500);
  return responseSigninPeriodMock as ResponseSigninPeriod;
}

async function updateSigninForm(file: File): Promise<ResponseSigninData> {
  try {
    const response = UtilBase.checkEnvironment() ? await InMemory() : await Api(file);

    return mapResponseSigninToResponseSigninData(response);
  } catch (err) {
    throw new Error(`Error subiendo documento de inscripcion`);
  }
}

export { updateSigninForm };
