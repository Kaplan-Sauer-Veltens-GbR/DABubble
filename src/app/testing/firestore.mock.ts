export class MockFirestore {
  collection(path: string) {
    return {
      doc: (id: string) => ({
        set: (data: any) => Promise.resolve(),
        get: () => Promise.resolve({ exists: true, data: () => ({}) }),
      }),
    };
  }
}
