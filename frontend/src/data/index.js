import { Data } from './Data.js';

// fetch
export const FETCH_URL = 'http://localhost:3000/api/students/';
export const VALID_YEAR_START = 2000;
export const VALID_START_DOB = '01.01.1900';
export const YEARS_STUDDING = 4;
export const MONTH_START_STUDDING = 8; // september

export const studentsData = new Data({ fetchURL: FETCH_URL });
export const STUDENTS_DATA = await studentsData.getData();
