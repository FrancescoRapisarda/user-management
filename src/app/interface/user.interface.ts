export interface User {
  name: string;
  surname: string;
  gender: 'uomo' | 'femmina' | 'altro';
  active: boolean;
}