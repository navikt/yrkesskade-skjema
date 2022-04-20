import amplitude from 'amplitude-js';

export const initAmplitude = () => {
  amplitude.getInstance().init('default', '', {
    apiEndpoint: 'amplitude.nav.no/collect-auto',
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    platform: window.location.toString(),
  });
};

export const logAmplitudeEvent = (eventName: string, args?: any): void => {
  setTimeout(() => {
    try {
      const eventData: any = {
        app: 'skademelding-skjema',
        team: 'yrkesskade',
      };

      if (args) {
        let keys = Object.getOwnPropertyNames(args);
        for (let i in keys) {
          let key = keys[i];
          eventData[key] = args[key];
        }
      }
      amplitude.getInstance().logEvent(eventName, eventData);
    } catch (error) {
      console.error(error);
    }
  });
};
