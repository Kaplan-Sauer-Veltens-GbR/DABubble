export class AuthMock {
  login(email: string, password: string): Promise<boolean> {
    return Promise.resolve(true); // Simuliere einen erfolgreichen Login
  }

  logout(): Promise<void> {
    return Promise.resolve(); // Simuliere einen erfolgreichen Logout
  }

  isAuthenticated(): boolean {
    return true; // Simuliere, dass der Benutzer authentifiziert ist
  }

  getCurrentUser(): any {
    return {
      id: '12345',
      email: 'test@example.com',
      name: 'Test User',
    }; // Simuliere einen aktuellen Benutzer
  }

  register(email: string, password: string, name: string): Promise<any> {
    return Promise.resolve({
      id: '12345',
      email,
      name,
    }); // Simuliere eine erfolgreiche Registrierung
  }
}
