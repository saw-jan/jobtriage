const { I } = inject();
const newJob = require('../pages/addNewJobApplication');
const axios = require('axios');
const loginPage = require('../pages/loginPage');
const dashboard = require('../pages/dashboardPage');
const {users} = require('../Globals');

const apiUrl = process.env.API_SERVER_URL || 'http://localhost:3000';

const ELEMENT =  newJob.elements;

Given('user has registered with following data:', async (table) => {
    const newUser = table.parse().hashes()[0];
    users.push({ email: newUser.email, password: newUser.password });
    try{
        await axios.post(`${apiUrl}/auth/register`, newUser)
        .then(({data}) => {
            // users.push({ email: newUser.email, password: newUser.password });
            console.log(data.message)
        })
        .catch(err=>{
            console.log('Cannot register new user');
        })
    }catch(e){
        console.log(e)
    }
})

Given('logged in to dashboard with email {string} and password {string}', (email, password) => {
    I.amOnPage(loginPage.url);
    loginPage.login(email, password);
})

Given('the user has opened new job application dialog from dashboard', () => {
    I.waitForElement(dashboard.elements.btn_addNewJob, 30);
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