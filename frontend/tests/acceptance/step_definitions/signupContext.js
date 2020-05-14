const { I } = inject();
const axios = require('axios');
const signupPage = require('../pages/signupPage');

const apiUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

const FIELDS = signupPage.fields;
const UNMATCHED_ERR = "//form//p[contains(text(),'Password and Confirm password is not same')]";
const INVALID_MAIL_ERR = "//form//p[contains(text(),'Enter a valid email')]";

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
  fillFormAndSubmit(username,email,password,confirmpassword)
})
// @unmatchedpass , @validsignup
When('user tries to sign up with following data:',(table)=>{
  const data = table.parse().hashes()[0];
  fillFormAndSubmit(data.username,data.mail,data.password,data.confirmpassword);
})

// successful registration
Then('the user should be redirected to Dashboard.',()=>{
  I.amOnPage(apiUrl+"/dashboard");
})
// error with empty input fields
Then('a required message {string} should be displayed.',(message)=>{
  I.see(message);
})
// error with invalids mail formats 
Then('an email invalid message {string} should be displayed.',(message)=>{
  I.see(message,INVALID_MAIL_ERR);
})
// error with unmatched password
Then('a password not matched message {string} should be displayed.',(message)=>{
  I.see(message,UNMATCHED_ERR);
})

function fillFormAndSubmit(username,email,password,confirmpassword){
  I.fillField(FIELDS.name,username);
  I.fillField(FIELDS.email, email);
  I.fillField(FIELDS.password, password);
  I.fillField(FIELDS.confirmPassword, confirmpassword);
  I.click('Sign Up');
}