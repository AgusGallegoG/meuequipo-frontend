import type { PageableResponse } from '@/core/infrastructure/models/PageableResponse';
import {
  mapPlayerToRequestPlayer,
  mapResponsePlayerToPlayer,
} from '@/shared/infrastructure/service/playerService';
import type { Signin } from '@/signin/domain/Signin';
import type { SigninItem, SigninTable } from '@/signin/domain/SigninTable';
import type { RequestSignin } from '../models/requests/RequestSignin';
import type { ResponseSignin } from '../models/responses/ResponseSignin';
import type { ResponseSigninItem } from '../models/responses/ResponseSigninItem';

export function mapResponseSigninToSignin(respSig: ResponseSignin): Signin {
  return {
    id: respSig.id,
    parentName: respSig.parentName,
    parentSurnames: respSig.parentSurnames,
    mail: respSig.mail,
    phone: respSig.phone,
    state: respSig.state,
    player: mapResponsePlayerToPlayer(respSig.player),
  };
}

export function mapSigninToRequestSignin(signin: Signin): RequestSignin {
  return {
    id: signin.id !== -1 ? signin.id : null,
    mail: signin.mail,
    parentName: signin.parentName,
    parentSurnames: signin.parentSurnames,
    phone: signin.phone,
    state: signin.state !== -1 ? signin.state : null,
    player: mapPlayerToRequestPlayer(signin.player),
  };
}

export function mapPageableResponseToSigninTable(
  response: PageableResponse<ResponseSigninItem>
): SigninTable {
  return {
    content: mapResponseSigninItemToSigninItem(response.content),
    totalRecords: response.totalElements,
  };
}

function mapResponseSigninItemToSigninItem(items: ResponseSigninItem[]): SigninItem[] {
  return items.map((item) => {
    return {
      id: item.id,
      category: item.category,
      parentCompleteName: item.parentCompleteName,
      state: item.state,
      sex: item.sex,

      playerCompleteName: item.playerCompleteName,
      phone: item.phone,
      email: item.email,
    };
  });
}
