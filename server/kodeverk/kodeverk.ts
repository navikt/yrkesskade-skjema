import { string } from 'yup';
import {
  KodeverdiResponsDto,
  KodeverkApiService,
  OpenAPI as KodeverkOpenApi,
} from '../../client/src/api/kodeverk';
import config from '../config';
KodeverkOpenApi.BASE = config.KODEVERK_URL;

export class KodeverkLoader {
  private kodeverkholder: Kodeverk = {
    kodelister: {},
  };

  init = async (kategori: string) => {
    this.kodeverkholder = await this.hentKodeverk(kategori);
  };

  private hentKodeverk = async (kategori: string): Promise<Kodeverk> => {
    const kodeverkholder: Kodeverk = {
      kodelister: {},
    };

    for (const kodeverk of ['rolletype', 'landkoderISO2', 'paavirkningsform', 'sykdomstype']) {
      const resultat = await KodeverkApiService.hentKodeverdierForType(
        kodeverk
      );

      kodeverkholder.kodelister[kodeverk] = resultat;
    }

    for (const kodeverk of ['stillingstittel', 'harSkadelidtHattFravaer', 'tidsrom', 'hvorSkjeddeUlykken', 'typeArbeidsplass', 'skadetype', 'skadetKroppsdel', 'bakgrunnForHendelsen', 'aarsakOgBakgrunn', 'alvorlighetsgrad']) {
      const resultat =
        await KodeverkApiService.hentMapMedKodeverdierForTypeOgKategori(
          kodeverk,
          kategori
        );
      kodeverkholder.kodelister[kodeverk] = resultat;
    }

    return kodeverkholder;
  };

  mapKodeTilVerdi = (kode: string, kodelistenavn: string): string => {
    return (
      this.kodeverkholder.kodelister[kodelistenavn]?.kodeverdierMap[kode]?.verdi || `Ukjent: ${kode}`
    );
  };

  mapKoderTilVerdier = (koder: string[], kodelistenavn: string): string[] => {
    return koder?.map(
      (kode) =>
        this.kodeverkholder.kodelister[kodelistenavn]?.kodeverdierMap[kode]?.verdi || `Ukjent: ${kode}`
    ) || [`Kode(r) mangler for kodelistenavn ${kodelistenavn}`];
  };
}
export interface Kodeverk {
  kodelister: { [index: string]: KodeverdiResponsDto };
}
