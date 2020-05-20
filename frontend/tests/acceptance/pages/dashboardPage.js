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
    return '//header[contains(@class,"jTaSwn")]/span[contains(.,"'+jobStatus+'")]/ancestor::section/div[contains(@class,"sc-fzoLsD")]';
  }
};
