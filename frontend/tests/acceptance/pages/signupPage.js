const { I } = inject();

module.exports = {
  url: '/signup',
  fields: {
    username: '//label[contains(text(),"Name")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    email: '//label[contains(text(),"Email")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    password: '//label[contains(text(),"Password")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
    confirmPassword: '//label[contains(text(),"Confirm password")]/parent::div//input[contains(@class, "MuiInputBase-input")]',
  },
  elements: {
    error_lbl: '//form/p[@class="makeStyles-error-5"]',
    login_lbl: '//form/p/span[contains(@class,"makeStyles-span-7")]',
    signup_btn: '//form/button/span[contains(.,"Sign Up")]'
  },
  signUp(username, email, password, confirmPassword) {
    this.fillUsername(username);
    this.fillEmail(email);
    this.fillPassword(password);
    this.fillConfirmPassword(confirmPassword);
    this.clickSignUp();
  },
  fillUsername(username){
    I.waitForVisible(this.fields.username);
    I.fillField(this.fields.username,username);
  },
  fillEmail(email){
    I.waitForVisible(this.fields.email);
    I.fillField(this.fields.email,email);
  },
  fillPassword(password){
    I.waitForVisible(this.fields.password);
    I.fillField(this.fields.password,password);
  },
  fillConfirmPassword(confirmpassword){
    I.waitForVisible(this.fields.confirmPassword);
    I.fillField(this.fields.confirmPassword, confirmpassword);
  },
  clickSignUp(){
    I.waitForElement(this.elements.signup_btn);
    I.click(this.elements.signup_btn);
  },
  goToLogin(){
    I.waitForVisible(this.elements.login_lbl);
    I.click(this.elements.login_lbl);
  }

};
