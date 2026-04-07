declare module 'date-holidays' {
  export interface Holiday {
    date: string;
    name: string;
    type?: string;
  }

  export default class Holidays {
    constructor(country?: string, state?: string, region?: string);
    getHolidays(year: number): Holiday[];
  }
}
