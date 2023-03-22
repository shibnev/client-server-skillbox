import {
  STUDENTS_DATA,
  VALID_YEAR_START,
  VALID_START_DOB,
  studentsData,
} from '../data/index.js';
import { Component } from './Component.js';
import { studentsTable } from '../index.js';
import { Student } from './Student.js';

export class Form extends Component {
  constructor({ selector }) {
    super(selector);

    this.inputsList = {
      firstName: this.$el.querySelector('#inputFirstName'),
      lastName: this.$el.querySelector('#inputLastName'),
      middleName: this.$el.querySelector('#inputMiddleName'),
      dateOfBirth: this.$el.querySelector('#inputDataOfBirth'),
      yearOfStart: this.$el.querySelector('#inputYearOfStart'),
      faculty: this.$el.querySelector('#inputFaculty'),
    }

    this.formIsValid = false;

    this.setSubmitForm();
  }

  clearInput(input) {
    input.value = '';
  }

  toggleInputError(input, isValid) {
    input.nextElementSibling.style.display = isValid ? 'none' : 'block';
  }

  validateDateOfBirth() {
    const $input = this.inputsList['dateOfBirth'];
    const inputDate = new Date($input.value).getTime();
    const validStartDate = new Date(VALID_START_DOB).getTime();

    const isValid =
      inputDate < validStartDate || inputDate > Date.now() ? false : true;

    this.toggleInputError($input, isValid);

    return isValid;
  }

  validateYearOfStart() {
    const $input = this.inputsList['yearOfStart'];
    const nowYear = new Date().getFullYear();

    const isValid =
      $input.value < VALID_YEAR_START || $input.value > nowYear ? false : true;

    this.toggleInputError($input, isValid);

    return isValid;
  }

  validate() {
    this.formIsValid = this.validateDateOfBirth() && this.validateYearOfStart();
  }


  getStudentValues() {
    const studentValues = {};

    for (const key in this.inputsList) {
      if (Object.hasOwnProperty.call(this.inputsList, key)) {
        const $input = this.inputsList[key];

        studentValues[key] = $input.value.trim();
        this.clearInput($input);
      }
    }

    return studentValues;
  }

  setSubmitForm() {
    this.$el.addEventListener('submit', (e) => {
      e.preventDefault();

      this.validate();

      if (!this.formIsValid) return;

      const studentValues = this.getStudentValues();
      const student = new Student(studentValues);

      studentsData.addData(student);
      studentsTable.fillTable();
    })
  }
}
