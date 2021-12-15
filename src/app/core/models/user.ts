export interface UserI {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export class User implements UserI {
  id: number;
  email: string;
  firstName: string;
  lastName: string;

  constructor({ id, email, firstName, lastName }: UserI) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get initials(): string {
    return `${this.firstName[0]}${this.lastName[0]}`.toUpperCase();
  }
}
