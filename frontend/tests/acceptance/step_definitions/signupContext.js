const { I } = inject();
const axios = require('axios');
const signupPage = require('../pages/signupPage');
const dashboard = require('../pages/dashboardPage');
const loginPage = require('../pages/loginPage');

const apiUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

const ELEMENT = signupPage.elements;
const FIELD = signupPage.fields;
// Given('the user has signed up with name {string}, email {string} password {string}', (name, email, password) => {
//   axios.post(`${apiUrl}/auth/register`, { name, email, password });
// });

// When('the user browses to the signup page using the webUI', () => I.amOnPage(signupPage.url));

// Then('the user should be able to login with email {string} and password {string}', async (email, password) => {
//   try {
//     await axios.post(`${apiUrl}/auth/login/`, { email, password });
//   } catch (error) {
//     throw new Error(`Cannot login user with email ${email}
//      Status code: ${error.response.status}
//      Stauts: ${error.response.statusText}`);
//   }
// });

//Background Given
Given('the user has browsed to signup page',()=>{
  I.amOnPage(signupPage.url);
})

// @emptyfields, @invalidmail, @validsignup
When('user tries to sign up with username {string}, email {string}, password {string} and confirm password {string}',(username, email, password, confirmPassword)=>{
  signupPage.signUp(username, email, password, confirmPassword)
})

// @unmatchedpass, @registeredmail
When('user tries to sign up with following data:',(table)=>{
  const data = table.parse().hashes()[0];
  signupPage.signUp(data.username, data.mail, data.password, data.confirmPassword);
})

// @gotologin
When('user tries to go to login page using link',()=>{
  signupPage.goToLogin();
})
Then('user should be redirected to login page',()=>{
  I.dontSee(ELEMENT.signup_btn);
  I.seeInCurrentUrl(loginPage.url);
})

// successful registration
Then('the user {string} with email {string} should be redirected to dashboard',(username, email)=>{
  I.waitForElement(dashboard.dashboardContainer, 30);
  I.seeInCurrentUrl(dashboard.url.main);
  I.amOnPage(dashboard.url.account);
  I.see(email);
  I.see(username);
})

// signup with empty input fields
Then('user entered username {string}, email {string}, password {string} or confirm password {string} should be preserved', (username, email, password, confirmPassword)=>{
  I.seeInField(FIELD.username, username);
  I.seeInField(FIELD.email, email);
  I.seeInField(FIELD.password, password);
  I.seeInField(FIELD.confirmPassword, confirmPassword);
})

// error with invalids mail formats 
Then('invalid email message {string} should be displayed',(message) => {
  I.waitForElement(ELEMENT.error_lbl);
  I.see(message, ELEMENT.error_lbl);
})

// error with unmatched password
Then('a password mis-match error message {string} should be displayed', (message) => {
  I.waitForElement(ELEMENT.error_lbl);
  I.see(message, ELEMENT.error_lbl);
})

// error with already registered email
Then('an already registered error message {string} should be displayed', (message) => {
  I.waitForElement(ELEMENT.error_lbl);
  I.see(message, ELEMENT.error_lbl);
})