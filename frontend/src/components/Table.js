import { Data } from '../data/Data.js';
import { FETCH_URL, STUDENTS_DATA, YEARS_STUDDING } from '../data/index.js';
import { Component } from './index.js';

export class Table extends Component {
  constructor({ selector, data }) {
    super(selector)
    this.data = data;
    this.$table = this.$el;
    this.$tableBody = this.$table.querySelector('tbody');

    this.sortButtons = {
      lastName: {
        el: this.$el.querySelector('#sortTableNames'),
        switcher: false,
      },
      faculty: {
        el: this.$el.querySelector('#sortTableFac'),
        switcher: false,
      },
      dateOfBirth: {
        el: this.$el.querySelector('#sortTableAge'),
        switcher: false,
      },
      yearOfStart: {
        el: this.$el.querySelector('#sortTableStuddingYears'),
        switcher: false,
      },
    }

    this.filterInputs = {
      fullName: document.querySelector('#filterName'),
      faculty: document.querySelector('#filterFac'),
      yearOfStart: document.querySelector('#filterStartYear'),
      yearOfEnd: document.querySelector('#filterEndYear'),
    }

    this.fillTable();
    this.getFilter();
    this.sort();
  }

  removeStudentFromData(id) {
    console.log(FETCH_URL , id);
    new Data({ fetchURL: FETCH_URL }).deleteDataItem(id);
  }

  btnRemove(parent, id) {
    const $td = document.createElement('td');
    const $btn = document.createElement('button');

    $btn.classList.add('btn', 'btn-danger');
    $btn.textContent = 'remove';
    $btn.type = 'button';
    $btn.title = 'remove student from table';

    if (id) {
      $btn.id = id;
    }

    $btn.addEventListener('click', (e) => {
      e.preventDefault();

      if (id) {
        this.removeStudentFromData(id);
      }

      this.updateData();
      this.fillTable();
    });

    $td.appendChild($btn);
    parent.appendChild($td);
  }

  initTableColContent(content, $tr) {
    const $col = document.createElement('td');

    $col.innerText = content;
    $tr.appendChild($col);
  }

  addStudentHTML(student) {
    const $tr = document.createElement('tr');

    this.$tableBody.appendChild($tr);


    for (const [key, value] of Object.entries(student)) {
      if (key === 'id') {
        this.btnRemove($tr, value);
      } else {
        this.initTableColContent(value, $tr);
      }
    }
  }

  clearTableBody() {
    this.$tableBody.innerHTML = '';
  }

  updateData() {
    this.data = STUDENTS_DATA;
  }

  calcAge(start) {
    const differenceMs = Date.now() - new Date(start);
    const ageDate = new Date(differenceMs);

    return Math.abs(ageDate.getFullYear() - 1970);
  }

  prepareForTable(studentObj) {
    return {
      id: studentObj.id,
      name: `${studentObj.name} ${studentObj.surname} ${studentObj.lastname}`,
      faculty: studentObj.faculty,
      birthdayAndAge: `${new Date(studentObj.birthday).getDay()}.${new Date(studentObj.birthday).getMonth()}.${new Date(studentObj.birthday).getFullYear()} - ${this.calcAge(studentObj.birthday)} лет`,
      studyPeriod: `${studentObj.studyStart}-${Number(studentObj.studyStart) + Number(YEARS_STUDDING)}`,
    }
  }

  fillTable(func = 'sort', callBackFunc) {
    this.updateData();
    if (!this.data) return;

    this.clearTableBody();

    this.data[func](callBackFunc).forEach((obj) => {
      const preparedObj = this.prepareForTable(obj);

      this.addStudentHTML(preparedObj);
    })
  }

  // sort
  toggleSort(key) {
    this.fillTable('sort', (a, b) => {
      const thatA = typeof a === 'string' ? a[key].toUpperCase() : a[key];
      const thatB = typeof b === 'string' ? b[key].toUpperCase() : b[key];

      if (this.sortButtons[key].switcher) {
        return thatA > thatB ? 1 : -1;
      } else {
        return thatA > thatB ? -1 : 1;
      }
    })

    this.sortButtons[key].switcher = !this.sortButtons[key].switcher;
  }

  sort() {
    for (const buttonKey in this.sortButtons) {
      if (Object.hasOwnProperty.call(this.sortButtons, buttonKey)) {
        const $button = this.sortButtons[buttonKey].el;

        $button.addEventListener('click', (e) => {
          e.preventDefault();

          this.toggleSort(buttonKey);
        })
      }
    }
  }

  // filter
  filterByKey(inputValue, key) {
    if (inputValue.length) {
      this.fillTable('filter', (student) => {
        return String(student[key]).includes(inputValue);
      });
    } else {
      this.fillTable();
    }
  }

  getFilter() {
    for (const inputKey in this.filterInputs) {
      if (Object.hasOwnProperty.call(this.filterInputs, inputKey)) {
        const $input = this.filterInputs[inputKey];

        $input.addEventListener('input', () => {
          this.filterByKey($input.value, inputKey);
        })
      }
    }
  }
}
