export class AuthMock {
  private currentUser = { uid: '12345', email: 'test@example.com' };

  login(email: string, password: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  logout(): Promise<void> {
    return Promise.resolve();
  }

  isAuthenticated(): boolean {
    return true;
  }

  getCurrentUser(): any {
    return {
      id: '12345',
      email: 'test@example.com',
      name: 'Test User',
    };
  }

  register(email: string, password: string, name: string): Promise<any> {
    return Promise.resolve({
      id: '12345',
      email,
      name,
    });
  }

  onAuthStateChanged(callback: (user: any) => void): void {
    callback(this.currentUser);
  }
}
