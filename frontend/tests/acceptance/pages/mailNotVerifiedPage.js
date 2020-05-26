const { I } = inject();

module.exports = {
    elements: {
        heading: '//div[contains(@class,"makeStyles-verifyEmail-4")]/h5',
        resendmail: '//div[contains(@class,"makeStyles-buttons-5")]//span[contains(.,"Resend mail")]',
        logout: 'div[contains(@class,"makeStyles-buttons-5")]//span[contains(.,"Logout")]',
    }
}