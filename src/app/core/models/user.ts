export interface UserI {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean | number;
}

export class User implements UserI {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;

  constructor({ id, email, firstName, lastName, isAdmin }: UserI) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isAdmin = typeof isAdmin === 'number' ? isAdmin === 1 : isAdmin;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get initials(): string {
    return `${this.firstName[0]}${this.lastName[0]}`.toUpperCase();
  }
}
