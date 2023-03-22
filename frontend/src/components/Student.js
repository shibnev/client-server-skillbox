import { MONTH_START_STUDDING, YEARS_STUDDING } from '../data/index.js';

export class Student {
  constructor({
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    yearOfStart,
    faculty,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.faculty = faculty;
    this.dateOfBirth = new Date(dateOfBirth);
    this.yearOfStart = yearOfStart;

    return {
      name: this.firstName,
      surname: this.middleName,
      lastname: this.lastName,
      birthday: this.dateOfBirth,
      studyStart: this.yearOfStart,
      faculty: this.faculty,
    }
  }
}
