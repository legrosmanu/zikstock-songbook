import { mockGoogleCloudFirestore } from 'firestore-jest-mock';

mockGoogleCloudFirestore({
  database: {
    zikresources: [
      { title: 'abc123', url: 'Homer Simpson', createdBy: 'legrosmanu' },
      { title: 'Rain song', artist: 'Led zeppelin', url: 'https://www.songsterr.com/a/wsa/unknown-led-zeppelin-rain-song-1-guitar-tab-s401758', createdBy: 'legrosmanu' },
      { title: 'abc456', url: 'Lisa Simpson', createdBy: 'hubot1978' },
    ]
  },
});

import { Firestore } from '@google-cloud/firestore';

const db = new Firestore();

export { db };
