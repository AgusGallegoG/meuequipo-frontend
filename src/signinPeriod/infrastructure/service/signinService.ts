import { mapToLocaleDateString, parseBackendDate } from '@/core/utilities/UtilDate';
import type { ResponseSigninData } from '@/signinPeriod/domain/ResponseSigninData';
import type { SigninPeriod } from '@/signinPeriod/domain/SigninPeriod';
import type { RequestUpdateSigninPeriod } from '../model/request/RequestUpdateSigninPeriod';
import type { ResponseSigninPeriod } from '../model/response/ResponseSigninPeriod';

export function mapResponseSigninToResponseSigninData(
  response: ResponseSigninPeriod
): ResponseSigninData {
  return {
    dateEnd: parseBackendDate(response.dateEnd),
    dateInit: parseBackendDate(response.dateInit),
    id: response.id,
    downloads: response.downloads,
    hasForm: response.hasForm,
    isActive: response.isActive,
  };
}

export function mapSigninPeriodToRequestUpdate(per: SigninPeriod): RequestUpdateSigninPeriod {
  return {
    id: per.id,
    dateEnd: per.dateEnd ? mapToLocaleDateString(per.dateEnd) : '',
    dateInit: per.dateInit ? mapToLocaleDateString(per.dateInit) : '',
  };
}
