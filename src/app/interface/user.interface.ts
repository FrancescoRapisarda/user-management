export interface User {
  id?: number;
  name: string;
  surname: string;
  gender: 'uomo' | 'femmina' | 'altro';
  active: boolean;
}
