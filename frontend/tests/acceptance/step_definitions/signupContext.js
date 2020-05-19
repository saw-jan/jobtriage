const { I } = inject();
const axios = require('axios');
const signupPage = require('../pages/signupPage');

const apiUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

const ELEMENT = signupPage.elements;

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

// @emptyfields , invalidmail
When('user tries to sign up with username {string}, email {string}, password {string} and confirm password {string}',(username,email,password,confirmpassword)=>{
  signupPage.signUp(username,email,password,confirmpassword)
})

// @unmatchedpass , @validsignup
When('user tries to sign up with following data:',(table)=>{
  const data = table.parse().hashes()[0];
  signupPage.signUp(data.username,data.mail,data.password,data.confirmpassword);
})

// @gotologin
When('user tries to go to login page using link',()=>{
  I.click(ELEMENT.login_lbl);
})
Then('user should be redirected to login page.',()=>{
  I.waitForElement('//*[@id="root"]/div/div/div/div/form');
  I.see('LOGIN');
  I.see('Sign up here');
})

// successful registration
Then('the user should be redirected to Dashboard.',()=>{
  // I.amOnPage(apiUrl+"/dashboard");
})

// error with empty input fields
Then('a required message {string} should be displayed.',(message)=>{
  I.see(message);
})

// error with invalids mail formats 
Then('an email invalid message {string} should be displayed.',(message)=>{
  I.see(message,ELEMENT.error_lbl);
})

// error with unmatched password
Then('a password not matched message {string} should be displayed.',async (message)=>{
  I.see(message,ELEMENT.error_lbl);
})