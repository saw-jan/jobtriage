const { I } = inject();

module.exports = {
    fields: {
        title: '//label[contains(text(),"Title")]/parent::div//input[contains(@class,"MuiInputBase-input")]',
        company: '//label[contains(text(),"Company")]/parent::div//input[contains(@class,"MuiInputBase-input")]',
        priority: '//label[contains(text(),"Priority")]/parent::div//div[contains(@class,"MuiSelect-select")]',
        status: '//label[contains(.,"Status")]/parent::div//div[contains(@class,"MuiSelect-select")]',
    },
    elements: {
        btn_add: '//button[contains(@class,"MuiButton-root")]/span[contains(.,"Add")]',
        selectOptions: '//div[contains(@class,"MuiPopover-paper")]//li',
        lbl_addJobError: '//div[contains(.,"Error in adding Job Application")]'
    },
    addNewJob(title, company, priority, status){
        this.fillTitle(title);
        this.fillCompany(company);
        this.selectPriority(priority);
        this.selectStatus(status);
        this.clickAdd();
    },
    addNewJobWithoutPriorityOption(title, company, status){
        this.fillTitle(title);
        this.fillCompany(company);
        this.selectStatus(status);
        this.clickAdd();
    },
    addNewJobWithoutStatusOption(title, company, priority){
        this.fillTitle(title);
        this.fillCompany(company);
        this.selectPriority(priority);
        this.clickAdd();
    },
    addNewJobWithoutOptions(title, company){
        this.fillTitle(title);
        this.fillCompany(company);
        this.clickAdd();
    },
    fillTitle(title){
        I.waitForElement(this.fields.title);
        I.fillField(this.fields.title, title);
    },
    fillCompany(company){
        I.waitForElement(this.fields.company);
        I.fillField(this.fields.company, company);
    },
    selectPriority(priority){
        I.waitForElement(this.fields.priority);
        I.click(this.fields.priority);
        I.click(this.elements.selectOptions+'[contains(.,"'+priority+'")]');
        I.dontSeeElement(this.elements.selectOptions);
    },
    selectStatus(status){
        I.waitForElement(this.fields.status);
        I.click(this.fields.status);
        I.click(this.elements.selectOptions+'[contains(.,"'+status+'")]');
        I.dontSeeElement(this.elements.selectOptions);
    },
    clickAdd(){
        I.waitForElement(this.elements.btn_add);
        I.click(this.elements.btn_add);
    }
}