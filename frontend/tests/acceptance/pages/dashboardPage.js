const { I } = inject();

module.exports = {
  url: {
    main: '/dashboard',
    account: '/account'
  },
  dashboardContainer: '//span[contains(text(),"Dashboard")]',
  elements: {
    btn_addNewJob: '//button[contains(@class,"MuiButtonBase-root")]/span[contains(@class,"MuiFab-label")]',
    jobStatusBoardTitle: '//header[contains(@class,"jTaSwn")]'
  },
  getJobStatusContext(jobStatus){
    I.waitForElement(this.elements.jobStatusBoardTitle);
    return `${this.elements.jobStatusBoardTitle}/span[contains(.,"${jobStatus}")]/ancestor::section/div[contains(@class,"sc-fzoLsD")]`;
  }
};
