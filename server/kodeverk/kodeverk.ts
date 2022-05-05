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

  constructor() {}

  init = async (kategori: string) => {
    this.kodeverkholder = await this.hentKodeverk(kategori);
    console.log(this.kodeverkholder);
  };

  private hentKodeverk = async (kategori: string): Promise<Kodeverk> => {
    const kodeverkholder: Kodeverk = {
      kodelister: {},
    };

    for (const kodeverk of ['rolletype', 'landkoderISO2']) {
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

    console.log('kodeverkholder: ', kodeverkholder);

    return kodeverkholder;
  };

  mapKodeTilVerdi = (kode: string, kodelistenavn: string): string => {
    console.log(`hent verdi fro ${kode} fra ${kodelistenavn}`);
    console.log(this.kodeverkholder.kodelister[kodelistenavn]);
    console.log(this.kodeverkholder.kodelister[kodelistenavn]?.kodeverdierMap[kode]);



    return (
      this.kodeverkholder.kodelister[kodelistenavn]?.kodeverdierMap[kode]?.verdi || `Ukjent: ${kode}`
    );
  };

  mapKoderTilVerdier = (koder: string[], kodelistenavn: string): string[] => {
    return koder.map(
      (kode) =>
        this.kodeverkholder.kodelister[kodelistenavn]?.kodeverdierMap[kode]?.verdi || `Ukjent: ${kode}`
    );
  };
}
export interface Kodeverk {
  kodelister: { [index: string]: KodeverdiResponsDto };
}
