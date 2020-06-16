const { I } = inject();
const signupPage = require("../pages/signupPage");
const loginPage = require("../pages/loginPage");
const dashboard = require("../pages/dashboardPage");
const { users } = require("../helpers/globals");
const { registerUser, deleteUser, loginUser } = require("../helpers/api/user");

const ELEMENT = signupPage.elements;
const FIELD = signupPage.fields;

Given("the user has browsed to signup page", () => {
  I.amOnPage(signupPage.url);
});

Given("the user with following details already exists:", (table) => {
  const data = table.parse().hashes()[0];
  registerUser(data.name, data.email, data.password);
});

When("the user signs up with the following data using the webUI:", async (table) => {
  const data = table.parse().hashes()[0];
  if (data.confirmPassword) await signupPage.signUp(data.name, data.email, data.password, data.confirmPassword);
  else await signupPage.signUp(data.name, data.email, data.password, data.password);
});

When("the user clicks go to login page button", () => {
  signupPage.goToLogin();
});

Then("the user should be redirected to login page", () => {
  I.seeInCurrentUrl(loginPage.url);
});

Then("the user should be redirected to dashboard", async () => {
  I.seeInCurrentUrl(dashboard.url);
  I.waitForText("Dashboard");
  I.see("Dashboard");
});

Then("the user should be able to login with email {string} and password {string}", (email, password) => {
  users.push({ email: email, password: password });
  loginUser(email, password);
});

Then("the input fields should have following values:", (table) => {
  const data = table.parse().hashes()[0];
  I.seeInField(FIELD.name, data.name);
  I.seeInField(FIELD.email, data.email);
  I.seeInField(FIELD.password, data.password);
  I.seeInField(FIELD.confirmPassword, data.confirmPassword);
});

Then("the user should not be created", () => {
  I.seeInCurrentUrl(signupPage.url);
  I.dontSee(ELEMENT.error_label);
});

Then("an error message {string} should be displayed", (message) => {
  I.waitForElement(ELEMENT.error_label);
  I.see(message, ELEMENT.error_label);
});

After(() => {
  deleteUser();
});
