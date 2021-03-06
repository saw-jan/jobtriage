const { I } = inject();
const { monthNames } = require('../helpers/calendarHelper');
const { elementWaitTime } = require('../helpers/globals');

module.exports = {
  fields: {
    type: '//label[contains(text(),"Type")]/parent::div//div[contains(@aria-labelledby, "Type")]',
    time: '//label[contains(text(),"Event time")]/parent::div//input',
    note: '//label[contains(text(),"Note")]/parent::div//textarea[contains(@class, "MuiInputBase-input")]',
  },

  elements: {
    timelog_title: '//h6[text()="Time Logs"]',
    empty_message: '//h5[text()="No timelogs added yet"]',
    openaddtimelog_dialog: '//button/span[contains(text(),"Add")]',
    openedittimelog_button: '//span[@aria-label="Edit time log"]',
    addtimelog_button: '//div[contains(@class,"MuiDialogContent-root")]//button/span[contains(text(),"Add")]',
    updatetimelog_button: '//div[contains(@class,"MuiDialogContent-root")]//button/span[contains(text(),"Update")]',
    deletetimelog_button: '//span[@aria-label="Delete time log"]',
    addtocalendar_button: '//span[@aria-label="Add to calender"]',
    select_options: '//div[contains(@class,"MuiPopover-paper")]//li',
    timelog_container: '//h6[text()="Time Logs"]/parent::div',
    timelog_dialog: '//div[@id="add-title"]',
    getSelectOption(type) {
      return `${this.select_options}[contains(.,"${type}")]`;
    },
    getTimeLogContext(type) {
      return `//p[text()="${type.toUpperCase()}"]/parent::div`;
    },
  },

  datePicker: {
    datePicker_container: '//div[contains(@class,"MuiPickersBasePicker-container")]',
    open_year: '//div[1]/button[contains(@class,"MuiPickersToolbarButton-toolbarBtn")]//h6',
    open_day_month: '//button[contains(@class,"MuiPickersToolbarButton-toolbarBtn")][1]//h4',
    open_hour: '//button[contains(@class,"MuiPickersToolbarButton-toolbarBtn")][1]//span/h3',
    open_minute: '//button[contains(@class,"MuiPickersToolbarButton-toolbarBtn")][2]//span/h3',
    month_container: '//div[contains(@class,"MuiPickersSlideTransition-transitionContainer")]/p',
    next_month: '//div[contains(@class,"MuiPickersCalendarHeader-switchHeader")]/button[2]',
    previous_month: '//div[contains(@class,"MuiPickersCalendarHeader-switchHeader")]/button[1]',
    getYear(year) {
      return `//div[contains(@class,"MuiPickersYearSelection-container")]/div[text()="${year}"]`;
    },
    getMonth(month) {
      return `//div[contains(@class,"MuiPickersClock-clock")]/span[text()="${month}"]`;
    },
    getDay(day) {
      return `//div[@role="presentation"]//p[text()="${day}"]`;
    },
    day: '',
    getHour(hour) {
      return `//div[contains(@class,"MuiPickersClock-clock")]/span[text()="${hour}"]`;
    },
    getMinute(minute) {
      return `//div[contains(@class,"MuiPickersClock-clock")]/span[text()="${minute}"]`;
    },
    getPeriod(period) {
      return `//button//h6[contains(text(),"${period}")]`;
    },
  },

  async addTimeLog(timeLog) {
    const { type, note } = timeLog;
    I.waitForElement(this.elements.openaddtimelog_dialog, elementWaitTime);
    await I.click(this.elements.openaddtimelog_dialog);
    await this.selectType(type);
    await this.selectEventTime(timeLog);
    await this.fillNote(note);
    await this.clickAdd();
  },

  async updateTimeLog(previousType, timeLog) {
    const { type, note } = timeLog;
    const el_update = `${this.elements.getTimeLogContext(previousType)}${this.elements.openedittimelog_button}`;

    I.waitForElement(el_update, elementWaitTime);
    await I.click(el_update);
    await this.selectType(type);
    await this.selectEventTime(timeLog);
    await this.fillNote(note);
    await this.clickUpdate();
  },

  async deleteTimeLog(type) {
    const el_delete = `${this.elements.getTimeLogContext(type)}${this.elements.deletetimelog_button}`;
    I.waitForElement(el_delete, elementWaitTime);
    await I.click(el_delete);
  },

  async addToCalendar(type) {
    const el_addtocalendar = `${this.elements.getTimeLogContext(type)}${this.elements.addtocalendar_button}`;
    I.waitForElement(el_addtocalendar, elementWaitTime);
    await I.click(el_addtocalendar);
  },

  async selectType(type) {
    if (type) {
      I.waitForElement(this.fields.type, elementWaitTime);
      await I.click(this.fields.type);
      await I.click(this.elements.getSelectOption(type));
      await I.dontSeeElement(this.elements.select_options);
    }
  },

  async selectEventTime(calendar) {
    await I.click(this.fields.time);
    I.waitForElement(this.datePicker.datePicker_container, elementWaitTime);
    await this.selectYear(calendar.year);
    await this.selectMonth(calendar.month);
    await this.selectDay(calendar.day);
    await this.selectHour(calendar.hour);
    await this.selectMinute(calendar.minute);
    await this.selectPeriod(calendar.period);
    await I.click(this.elements.timelog_dialog);
  },

  async selectYear(year) {
    I.waitForElement(this.datePicker.open_year, elementWaitTime);
    await I.click(this.datePicker.open_year);
    const el_year = this.datePicker.getYear(year);
    I.waitForElement(el_year, elementWaitTime);
    await I.scrollTo(el_year);
    await I.click(el_year);
  },

  async selectMonth(month) {
    I.waitForElement(this.datePicker.open_day_month, elementWaitTime);
    await I.click(this.datePicker.open_day_month);

    const selected = await I.waitForFunction(
      function recurse(month, monthNames) {
        const m_y = '//div[contains(@class,"MuiPickersSlideTransition-transitionContainer")]/p';
        const next = '//div[contains(@class,"MuiPickersCalendarHeader-switchHeader")]/button[2]';
        const previous = '//div[contains(@class,"MuiPickersCalendarHeader-switchHeader")]/button[1]';

        const el_m = document.evaluate(m_y, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        const el_next = document.evaluate(next, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
          .singleNodeValue;
        const el_previous = document.evaluate(previous, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
          .singleNodeValue;

        let cur_month = el_m.innerText.split(' ')[0];
        if (cur_month === month) {
          return true;
        } else {
          if (monthNames.indexOf(cur_month) < monthNames.indexOf(month)) {
            el_next.click();
            recurse(month, monthNames);
          } else if (monthNames.indexOf(cur_month) > monthNames.indexOf(month)) {
            el_previous.click();
            recurse();
          }
        }
      },
      [month, monthNames],
      100
    );
  },

  async selectDay(day) {
    const el_day = this.datePicker.getDay(day);
    I.waitForElement(el_day, elementWaitTime);
    await I.click(el_day);
  },

  async selectHour(hour) {
    I.waitForElement(this.datePicker.open_hour, elementWaitTime);
    await I.click(this.datePicker.open_hour);
    const el_hour = this.datePicker.getHour(hour);
    I.waitForElement(el_hour, elementWaitTime);
    await I.click(el_hour);
  },

  async selectMinute(minute) {
    I.waitForElement(this.datePicker.open_minute, elementWaitTime);
    await I.click(this.datePicker.open_minute);
    const el_minute = this.datePicker.getMinute(minute);
    I.waitForElement(el_minute, elementWaitTime);
    await I.click(el_minute);
  },

  async selectPeriod(period) {
    const el_period = this.datePicker.getPeriod(period);
    I.waitForElement(el_period, elementWaitTime);
    await I.click(el_period);
  },

  async fillNote(note) {
    I.waitForInvisible(this.datePicker.datePicker_container, elementWaitTime);
    I.waitForElement(this.fields.note, elementWaitTime);
    await I.click(this.fields.note);
    await I.pressKey(['CommandOrControl', 'A']);
    await I.pressKey('Backspace');
    await I.fillField(this.fields.note, note);
  },

  async clickAdd() {
    I.waitForElement(this.elements.addtimelog_button, elementWaitTime);
    await I.click(this.elements.addtimelog_button);
  },

  async clickUpdate() {
    I.waitForElement(this.elements.updatetimelog_button, elementWaitTime);
    await I.click(this.elements.updatetimelog_button);
  },
};
