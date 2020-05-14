Feature: signup a user
  As a user
  I want to signup and create my account
  so that I can login to the application

  Background: user browses to signup page
    Given the user has browsed to signup page

  @validsignup
  Scenario: signup a valid user
    When user tries to sign up with following data:
      | username  | mail               | password   | confirmpassword |
      | user0     | user0@gmail.com    | mypassword | mypassword      |
    Then the user should be redirected to Dashboard.

  @emptyfields
  Scenario Outline: signup with empty input fields
    When user tries to sign up with username "<username>", email "<mail>", password "<password>" and confirm password "<confirmpassword>"
    Then a required message "Please fill out this field." should be displayed.
  Examples:
    | username  | mail          | password   | confirmpassword |
    |           | user102.com   | mypassword | mypassword      |
    | user102   |               |            | mypassword      |
    | user102   | user102@mail. | mypassword |                 |
    
  @invalidmail
  Scenario Outline: signup invalid mail format
    When user tries to sign up with username "<username>", email "<mail>", password "<password>" and confirm password "<confirmpassword>"
    Then an email invalid message "Enter a valid email" should be displayed.
  Examples:
    | username  | mail          | password   | confirmpassword |
    | user102   | user102.com   | mypassword | mypassword      |
    | user102   | user102@com   | mypassword | mypassword      |
    | user102   | user102@mail. | mypassword | mypassword      |
    | user102   | .mail         | mypassword | mypassword      |
    | user102   | @mail.com     | mypassword | mypassword      |

  @unmatchedpass
  Scenario: signup user with unmatched password
    When user tries to sign up with following data:
      | username  | mail               | password   | confirmpassword   |
      | user102   | user102@mail.com   | mypassword | yourpassword      |
    Then a password not matched message "Password and Confirm password is not same" should be displayed.
