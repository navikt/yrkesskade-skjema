import { AltinnRolleDto } from '../api/yrkesskade'
import { rollerMedSkjematilgang } from '../assets/Lists/skjematilgangRoller'

export const sjekkTilgangTilSkjema = (roller: AltinnRolleDto[]): boolean => {
  return roller && roller.some((rolle: AltinnRolleDto) => rollerMedSkjematilgang.some((rolledefinisjonId: number) => rolle.RoleDefinitionId === rolledefinisjonId))
}
