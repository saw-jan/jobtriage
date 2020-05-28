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
 async signUp(username, email, password, confirmPassword) {
    await this.fillUsername(username);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillConfirmPassword(confirmPassword);
    await this.clickSignUp();
  },
  async fillUsername(username){
    await I.waitForElement(this.fields.username);
    await I.fillField(this.fields.username,username);
  },
  async fillEmail(email){
    await I.waitForElement(this.fields.email);
    await I.fillField(this.fields.email,email);
  },
  async fillPassword(password){
    await I.waitForElement(this.fields.password);
    await I.fillField(this.fields.password,password);
  },
  async fillConfirmPassword(confirmPassword){
    await I.waitForElement(this.fields.confirmPassword);
    await I.fillField(this.fields.confirmPassword, confirmPassword);
  },
  async clickSignUp(){
    await I.waitForElement(this.elements.signup_btn);
    await I.click(this.elements.signup_btn);
  },
  goToLogin(){
    I.waitForElement(this.elements.login_lbl);
    I.click(this.elements.login_lbl);
  }

};
