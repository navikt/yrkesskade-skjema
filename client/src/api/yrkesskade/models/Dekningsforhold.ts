/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Dekningsforhold = {
    organisasjonsnummer: string;
    stillingstittelTilDenSkadelidte: Array<'Politikere' | 'Toppledere i offentlig administrasjon' | 'Toppledere i interesseorganisasjoner' | 'Administrerende direktører' | 'Finans- og økonomisjefer' | 'Personalsjefer' | 'Strategi- og planleggingssjefer' | 'Andre administrative ledere' | 'Salgs- og markedssjefer' | 'PR- og informasjonssjefer' | 'Forsknings- og utviklingsledere' | 'Ledere i skogbruk, gartnerier mv.' | 'Ledere innen akvakultur mv.' | 'Ledere av industriproduksjon mv.' | 'Ledere av olje- og gassutvinning mv.' | 'Ledere av bygge- og anleggsvirksomhet' | 'Ledere av logistikk og transport mv.' | 'Ledere av IKT-enheter' | 'Ledere av omsorgstjenester for barn' | 'Ledere av helsetjenester' | 'Ledere av eldreomsorg' | 'Ledere av sosialomsorg' | 'Ledere av utdanning og undervisning' | 'Ledere av forsikring og finansvirksomhet' | 'Andre ledere av produksjon og tjenesteyting' | 'Hotellsjefer' | 'Restaurantsjefer' | 'Varehandelssjefer' | 'Sports-, rekreasjons- og kultursenterledere' | 'Andre daglige ledere i tjenesteytende virksomheter' | 'Fysikere og astronomer' | 'Meteorologer' | 'Kjemikere' | 'Geologer og geofysikere' | 'Matematikere, statistikere mv.' | 'Biologer, botanikere, zoologer mv.' | 'Sivilagronomer mv.' | 'Miljøvernrådgivere' | 'Sivilingeniører (industri og produksjon)' | 'Sivilingeniører (bygg og anlegg)' | 'Sivilingeniører (miljøteknikk)' | 'Sivilingeniører (maskin- og marin-teknikk)' | 'Sivilingeniører (kjemi)' | 'Sivilingeniører (geofag, petro-leumsteknologi, metallurgi mv.)' | 'Andre sivilingeniører (unntatt elektroteknologi)' | 'Sivilingeniører (elkraftteknikk)' | 'Sivilingeniører (elektronikk)' | 'Sivilingeniører (telekommunikasjon)' | 'Sivilarkitekter' | 'Landskapsarkitekter' | 'Produkt- og klesdesignere' | 'Arealplanleggere' | 'Landmålere, kartografer mv.' | 'Grafiske- og multimediadesignere' | 'Allmennpraktiserende leger' | 'Legespesialister' | 'Spesialsykepleiere' | 'Jordmødre' | 'Sykepleiere' | 'Vernepleiere' | 'Veterinærer' | 'Tannleger' | 'Farmasøyter' | 'Helse- og miljørådgivere' | 'Fysioterapeuter' | 'Ernæringsfysiologer' | 'Audiografer og logopeder' | 'Ergoterapeuter' | 'Kiropraktorer mv.' | 'Universitets- og høyskolelektorer/-lærere' | 'Yrkesfaglærere' | 'Lektorer mv. (videregående skole)' | 'Grunnskolelærere' | 'Førskolelærere' | 'Spesialister i pedagogikk' | 'Spesiallærere / spesialpedagoger' | 'Andre språklærere' | 'Andre musikklærere' | 'Andre lærere i estetiske fag' | 'Andre IKT-lærere' | 'Andre lærere' | 'Revisorer, regnskapsrådgivere' | 'Finans- og investeringsrådgivere' | 'Finansanalytikere' | 'Organisasjonsrådgivere mv.' | 'Høyere saksbehandlere i offentlig og privat virksomhet' | 'Personal- og karriererådgivere' | 'Rådgivere innen kompetanseutvikling' | 'Reklame- og markedsføringsrådgivere' | 'Informasjonsrådgivere' | 'Salgskonsulenter innen tekniske og medisinske produkter' | 'Salgskonsulenter innen IKT-produkter' | 'Systemanalytikere/-arkitekter' | 'Programvareutviklere' | 'Nett- og multimediautviklere' | 'Applikasjonsprogrammerere' | 'Andre programvare- og applikasjonsutviklere' | 'Databasedesignere og -administratorer' | 'Systemadministratorer' | 'Nettverksansvarlige' | 'Sikkerhetsanalytikere mv.' | 'Jurister og advokater' | 'Dommere' | 'Andre juridiske yrker' | 'Arkivarer og kuratorer' | 'Bibliotekarer og andre informasjonsarbeidere' | 'Rådgivere/forskere, samfunnsøkonomi' | 'Rådgivere/forskere, samfunnsvitenskap' | 'Rådgivere/forskere, humanistiske fag' | 'Psykologer' | 'Rådgivere innen sosiale fagfelt' | 'Geistlige yrker' | 'Forfattere mv.' | 'Journalister' | 'Oversettere, tolker mv.' | 'Skulptører, kunstmalere og andre billedkunstnere' | 'Dirigenter, komponister, musikere og sangere' | 'Koreografer og dansere' | 'Regissører' | 'Skuespillere' | 'Programledere i TV og radio' | 'Andre utøvende kunstneriske yrker' | 'Bygningsingeniører' | 'Elkraftingeniører' | 'Elektronikkingeniører' | 'Maskiningeniører' | 'Kjemiingeniører' | 'Ingeniører innen petroleum, bergverk og metallurgi' | 'Tekniske tegnere' | 'Andre ingeniører' | 'Arbeidsleder, bergfag' | 'Arbeidsleder, industri' | 'Arbeidsleder, bygg og anlegg' | 'Energikontrolloperatører' | 'Kontrolloperatører ved forbrennings- kjøle- og vannrenseanlegg mv.' | 'Kontrolloperatører innen kjemisk prosessindustri' | 'Kontrolloperatører ved olje- og naturgassraffineringsanlegg' | 'Kontrolloperatører innen metallproduksjon' | 'Andre prosesskontrolloperatører' | 'Bioteknikere (ikke-medisinske laboratorier)' | 'Agroteknikere' | 'Skogteknikere' | 'Skipsmaskinister' | 'Dekksoffiserer og loser' | 'Flygere' | 'Flygeledere' | 'Teknikere innen luftfartssikkerhet' | 'Radiografer mv.' | 'Bioingeniører' | 'Reseptarer' | 'Protese- og tannteknikere' | 'Yrker innen alternativ medisin' | 'Dyrepleiere' | 'Tannpleiere' | 'Optikere' | 'Helsesekretærer' | 'Helse- og miljøkontrollører' | 'Ambulansepersonell' | 'Andre helseyrker' | 'Finansmeglere' | 'Kundebehandlere lån og kreditt' | 'Regnskapsførere' | 'Takstmenn' | 'Forsikringsagenter' | 'Selgere (engros)' | 'Innkjøpere' | 'Handels- og skipsmeglere' | 'Speditører og befraktere' | 'Konferanse- og arrangementsplanleggere mv.' | 'Arbeidsformidlere' | 'Eiendomsmeglere og - forvaltere' | 'Andre yrker innen forretningstjenester' | 'Arbeidsledere for kontorpersonell' | 'Advokatsekretær' | 'Sjefssekretærer' | 'Tollere' | 'Skattefunksjonærer' | 'Saksbehandlere innen sosiale ytelser' | 'Saksbehandlere for førerkort, importlisenser mv.' | 'Politibetjenter mv.' | 'Andre yrker innen offentlig forvaltning' | 'Privatetterforskere mv.' | 'Miljøarbeidere innen sosiale fagfelt' | 'Religiøse yrker' | 'Idrettsutøvere' | 'Trenere og idrettsdommere' | 'Sports- og aktivitetsinstruktører' | 'Fotografer og filmfotografer' | 'Interiørdesignere og dekoratører' | 'Tekniske konservatorer' | 'Sjefskokker' | 'Andre yrker innen estetiske fag' | 'Driftsteknikere, IKT' | 'Brukerstøtte, IKT' | 'Nettverks- og systemteknikere, IKT' | 'Internett-teknikere' | 'Teknikere innen radio og tv' | 'Teknikere innen telekom' | 'Kontormedarbeidere' | 'Stenografer mv.' | 'Dataregistrere' | 'Kundebehandlere, bank og postkontor' | 'Bingoverter, bookmakere mv.' | 'Pantelånere mv.' | 'Inkassomedarbeidere mv.' | 'Reisebyråmedarbeidere mv.' | 'Kundesentermedarbeidere' | 'Sentralbordoperatører' | 'Hotellresepsjonister' | 'Informasjonsskrankemedarbeidere' | 'Resepsjonister (ekskl. hotell)' | 'Intervjuere' | 'Andre opplysningsmedarbeidere' | 'Regnskapsmedarbeidere' | 'Forsikrings- og finansmedarbeidere' | 'Lønningsmedarbeidere' | 'Lagermedarbeidere og material-forvaltere' | 'Logistikkmedarbeidere' | 'Transportfunksjonærer' | 'Bibliotekassistenter' | 'Postbud og postsorterere' | 'Kodere mv.' | 'Arkivassistenter' | 'Personalkontormedarbeidere' | 'Flyverter, båtverter mv.' | 'Konduktører' | 'Reiseledere og guider' | 'Kokker' | 'Servitører' | 'Bartendere' | 'Frisører' | 'Kosmetologer mv.' | 'Renholdsledere i virksomheter' | 'Husholdere' | 'Vaktmestre' | 'Astrologer mv.' | 'Begravelsesbyrå- og krematoriearbeidere' | 'Dyrepassere og - trenere mv.' | 'Kjøreskolelærere' | 'Andre personlige tjenesteytere' | 'Torghandlere' | 'Gateselgere, mat' | 'Innehavere av kiosk/liten butikk' | 'Butikkavdelingssjefer' | 'Butikkmedarbeidere' | 'Billettselgere' | 'Mannekenger og modeller' | 'Demonstrasjonsselgere' | 'Dørselgere' | 'Telefon- og nettselgere' | 'Servicemedarbeidere (bensinstasjon)' | 'Gatekjøkken- og kafémedarbeidere mv.' | 'Andre salgsmedarbeidere' | 'Barnehage- og skolefritidsassistenter mv.' | 'Skoleassistenter' | 'Helsefagarbeidere' | 'Hjemmehjelper' | 'Andre pleiemedarbeidere' | 'Brannkonstabler' | 'Fengselsbetjenter' | 'Vektere' | 'Andre sikkerhetsarbeidere' | 'Korn- og grønnsaksprodusenter' | 'Frukt- og bærprodusenter' | 'Gartnere' | 'Kombinasjonsbrukere, nyttevekster' | 'Melke- og husdyrprodusenter' | 'Egg- og fjærfeprodusenter' | 'Birøktere mv.' | 'Andre dyreoppdrettere og røktere' | 'Plante- og husdyrprodusenter (kombinasjonsbruk)' | 'Skogbrukere' | 'Havbruksarbeidere' | 'Fiskere' | 'Fangstfolk' | 'Murere' | 'Steinhoggere mv.' | 'Betongarbeidere' | 'Tømrere og snekkere' | 'Andre bygningsarbeidere' | 'Taktekkere' | 'Gulv- og flisleggere' | 'Gips- og sparklingsarbeidere' | 'Isolatører mv.' | 'Glassarbeidere' | 'Rørleggere og VVS-montører' | 'Kuldemontører mv.' | 'Malere og byggtapetserere' | 'Overflatebehandlere og lakkerere' | 'Feiere, fasaderenholdere mv.' | 'Støpere' | 'Sveisere' | 'Kopper- og blikkenslagere' | 'Platearbeidere' | 'Riggere og spleisere' | 'Smeder' | 'Verktøymaker, låsesmeder mv.' | 'Metalldreiere mv.' | 'Metallslipere' | 'Bilmekanikere' | 'Mekanikere innen flytekniske fag' | 'Anleggsmaskin- og industrimekanikere' | 'Sykkelreparatører mv.' | 'Presisjonsinstrumentmakere og -reparatører' | 'Musikkinstrumentmakere og -stemmere' | 'Gull- og sølvsmeder, gravører mv.' | 'Keramikere mv.' | 'Glasshåndverkere' | 'Dekormalere mv.' | 'Kunsthåndverkere i tre mv.' | 'Vevere, strikkere mv. (innen husflidsproduksjon)' | 'Andre kunsthåndverkere' | 'Førtrykkere' | 'Trykkere' | 'Innbindere mv.' | 'Elektrikere' | 'Automatikere' | 'Energimontører' | 'Serviceelektronikere' | 'Tele- og IKT-installatører' | 'Slaktere, fiskehandlere mv.' | 'Bakere, konditorer mv.' | 'Ystere mv. (gårdsproduksjon)' | 'Saftere, syltere mv. (gårdsproduksjon)' | 'Prøvesmakere og kvalitetsbedømmere av mat og drikke' | 'Møbelsnekkere' | 'Skreddere, buntmakere mv.' | 'Gradører' | 'Møbeltapetserere mv.' | 'Skinnberedere og garvere' | 'Skomakere' | 'Yrkesdykkere' | 'Skytebaser og sprengningsarbeidere' | 'Produkttestere (ikke matprodukter)' | 'Desinfeksjonsarbeidere og skadedyrbekjempere' | 'Andre håndverkere' | 'Bergfagarbeidere' | 'Prosessoperatører (oppredning)' | 'Operatører innen boring mv.' | 'Operatører innen produksjon av betong mv.' | 'Operatører innen metallurgiske prosessfag' | 'Operatører innen metallflatebehandling' | 'Operatører innen kjemisk industri' | 'Operatører innen produksjon av fotofilm og -papir mv.' | 'Operatører innen produksjon av gummiprodukter' | 'Operatører innen plastprodukter' | 'Operatører innen papirprodukter' | 'Spinne- og nøstemaskinoperatører' | 'Operatører innen tekstilproduksjon mv.' | 'Industrisyere' | 'Operatører innen tekstilbearbeiding' | 'Operatører innen pels, skinn- og lærbearbeiding' | 'Operatører innen skinn og lærprodukter' | 'Renseri- og vaskerimaskinoperatører' | 'Andre operatører innen produksjon av tekstiler, pels, skinn og lær' | 'Operatører innen næringsmiddelproduksjon' | 'Operatører innen treforedling' | 'Operatører innen trelastproduksjon' | 'Operatører innen glass- og keramisk produksjon' | 'Fyrkjele- og turbinoperatører' | 'Pakke-, tappe- og etikettmaskinoperatører' | 'Andre stasjonære maskinoperatører' | 'Montører av mekaniske produkter' | 'Montører av elektriske og elektroniske produkter' | 'Andre montører' | 'Lokomotiv og T-baneførere' | 'Skiftekonduktører mv' | 'Bil-, drosje- og varebilførere' | 'Bussjåfører og trikkeførere' | 'Lastebil- og trailersjåfører' | 'Jordbruks- og skogbruksmaskinførere' | 'Anleggsmaskinførere' | 'Kran- og heisførere mv.' | 'Truckførere' | 'Dekks- og maskinmannskap (skip)' | 'Renholdere i private hjem' | 'Renholdere i virksomheter' | 'Bilvaskere' | 'Vinduspussere' | 'Andre rengjørere' | 'Hjelpearbeidere i nyttevekstproduksjon' | 'Hjelpearbeidere i husdyrproduksjon' | 'Hjelpearbeidere i kombinasjonsbruk' | 'Hjelpearbeidere i gartneri mv.' | 'Hjelpearbeidere i skogbruk' | 'Hjelpearbeidere innen havbruk' | 'Hjelpearbeidere i bergverk' | 'Hjelpearbeidere i anlegg' | 'Hjelpearbeidere i bygg' | 'Håndpakkere mv.' | 'Andre hjelpearbeidere i industri' | 'Førere av ikke-motorisert kjøretøy' | 'Laste- og lossearbeidere' | 'Varepåfyllere' | 'Kjøkkenassistenter' | 'Reklamedistributører mv.' | 'Renovasjonsarbeidere' | 'Gjenvinningsarbeidere' | 'Gatefeiere mv.' | 'Bud mv.' | 'Altmuligmann' | 'Måleravlesere mv.' | 'Andre hjelpearbeidere'>;
    rolletype: Dekningsforhold.rolletype;
    navnPaaVirksomheten?: string;
};

export namespace Dekningsforhold {

    export enum rolletype {
        ARBEIDSTAKER = 'Arbeidstaker',
    }


}
