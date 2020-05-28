const { I } = inject();
const axios = require('axios');
const signupPage = require('../pages/signupPage');
const verifyPage = require('../pages/mailNotVerifiedPage');
const loginPage = require('../pages/loginPage');
const dashboard = require('../pages/dashboardPage');
const { users } = require('../Globals');
const assert = require('assert');

const apiUrl = process.env.API_SERVER_URL || 'http://localhost:3000';

const ELEMENT = signupPage.elements;
const FIELD = signupPage.fields;

After( () => {
  if(users.length!=0){
    users.forEach(async (user) => {
      try{
        await axios.delete(`${apiUrl}/auth/deleteuser`, { params: { email: user.email, password: user.password }})
        .then(({data}) => console.log(data.message))
        .catch(err => console.log(`Cannot delete created user\nError: ${err.response.status}. ${err.response.statusText}\n<< Error Details >>${err.response.data.error}\n`))
        users.shift();
      }catch(e){
        console.log(e);
      }
    });
    users.length = 0;
  }
})

//Background Given
Given('the user has browsed to signup page',()=>{
  I.amOnPage(signupPage.url);
})

// @validsignup
When('user tries to sign up with username {string}, valid email {string}, password {string} and confirm password {string}', async (username, email, password, confirmPassword)=>{
  await signupPage.signUp(username, email, password, confirmPassword)
  await I.wait(5);
  await I.seeInCurrentUrl(dashboard.url.main);
  users.push({ email: email, password: password });
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
Then('the user should be able to login with email {string} and password {string}', async (email, password)=>{
  try{
    await axios.post(`${apiUrl}/auth/login`, { email, password })
    .then(({data}) => {
      console.log(`Login Successful\nToken:\n${data.message.token}`);
    })
    .catch(err => {
      console.log(`Cannot login\n${err}`);
    })
  }catch(e){
    console.log(e);
  }
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