const { I } = inject();
const newJob = require('../pages/addNewJobApplication');
const loginPage = require('../pages/loginPage');
const dashboard = require('../pages/dashboardPage');

const ELEMENT =  newJob.elements;

Given('user has logged in to dashboard with following data:', (table) => {
    const user = table.parse().hashes()[0];
    I.amOnPage(loginPage.url);
    loginPage.login(user.email, user.password);
})
Given('the user has opened new job application dialog from dashboard', () => {
    I.waitForElement(dashboard.elements.btn_addNewJob);
    I.click(dashboard.elements.btn_addNewJob);
})

When('user tries to add new job application with title {string}, company {string}, priority {string} and status {string}', (title, company, priority, status) => {
    if(priority == '' && status == ''){
        newJob.addNewJobWithoutOptions(title, company);
    }else if(priority == ''){
        newJob.addNewJobWithoutPriorityOption(title, company, status);
    }else if(status == ''){
        newJob.addNewJobWithoutStatusOption(title, company, priority);
    }else{
        newJob.addNewJob(title, company, priority, status);
    }

})
When('user cancels adding new job application', () => {
    I.click(dashboard.elements.btn_addNewJob);
})
Then('{string} dialog should be invisible', (dialog) => {
    I.dontSee(dialog);
})
Then('a success message {string} should pop up', (message) => {
    I.see(message);
})
Then('new job application for {string} should be added under {string} heading including priority tag {string} and company name {string} on dashboard', (title, status, priority, company) => {
    within(dashboard.getJobStatusContext(status),() => {
        I.see(title);   
        I.see(priority);
        I.see(company);
    })
})

Then('an error message {string} should pop up', (message) => {
    I.waitForElement(ELEMENT.lbl_addJobError);
    I.see(message, ELEMENT.lbl_addJobError);
})