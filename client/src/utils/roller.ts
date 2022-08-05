const rolletyper: any = {
  'elevEllerStudent': {
    'isArbeidstaker': false,
    'isLaerling': false,
    'isElevEllerStudent': true,
    'showStillinger': false,
    'showWorkplace': false,
    'showAccidentBackground': false,
    'showAbsence': false,
    'showAccidentPlacePage': true,
  },
  'arbeidstaker': {
    'isArbeidstaker': true,
    'isLaerling': false,
    'isElevEllerStudent': false,
    'showStillinger': true,
    'showWorkplace': true,
    'showAccidentBackground': true,
    'showAbsence': true,
    'showAccidentPlacePage': true,
  },
  'laerling': {
    'isArbeidstaker': true,
    'isLaerling': true,
    'isElevEllerStudent': false,
    'showStillinger': true,
    'showWorkplace': true,
    'showAccidentBackground': true,
    'showAbsence': true,
    'showAccidentPlacePage': true,
  },
  'tiltaksdeltaker': {
    'showStillinger': false,
    'showWorkplace': true,
    'showAccidentBackground': true,
    'showAbsence': false,
    'showAccidentPlacePage': true,
  }
}

export default rolletyper;
