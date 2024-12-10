export class MockRouter {
  navigate(commands: any[], extras?: any): Promise<boolean> {
    return Promise.resolve(true);
  }

  navigateByUrl(url: string, extras?: any): Promise<boolean> {
    return Promise.resolve(true);
  }

  events = {
    subscribe: (callback: any) => {
      callback({ id: 1, url: '/test' });
      return { unsubscribe: () => {} };
    },
  };
}
