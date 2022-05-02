import {includes} from 'lodash'
export const isFieldHidden = (roller: string[], valgtRolle: string) => {
  return includes(roller, valgtRolle.toLowerCase()) ? false : true;
}

export const isFieldMandatory = (roles: string[], valgtRolle: string) => {
  // return roles.includes(valgtRolle.toLowerCase()) ? true : false;
  return true;
}
