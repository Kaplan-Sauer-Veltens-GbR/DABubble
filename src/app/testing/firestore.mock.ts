export class MockFirestore {
  private config = {
    apiKey: 'testApiKey',
    authDomain: 'testAuthDomain',
    projectId: 'testProjectId',
    storageBucket: 'testStorageBucket',
    messagingSenderId: 'testSenderId',
    appId: 'testAppId',
  };

  collection(path: string) {
    return {
      doc: (id: string) => ({
        set: (data: any) => Promise.resolve(),
        get: () => Promise.resolve({ exists: true, data: () => ({}) }),
      }),
    };
  }

  getConfig() {
    return this.config;
  }
}
