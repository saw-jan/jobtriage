Feature: signup a user
  As a user
  I want to signup and create my account
  so that I can login to the application

  Background: user browses to signup page
    Given the user has browsed to signup page

  Scenario: signup a valid user
    When user tries to sign up with following data:
      | username        | user0            |
      | mail            | user0@gmail.com  |
      | password        | password         |
      | confirmpassword | password         |
    Then the user should be able to login with email "user0@gmail.com" and password "password"

  Scenario Outline: signup with empty input fields
    When user tries to sign up with username <username>, email <mail>, password <password> and confirm password <confirmpassword>
    Then a required message "Please fill out this field." should be shown at input fields.

  Examples:
    | username  | mail          | password   | cofirmpassword |
    |           | user102.com   | mypassword | mypassword     |
    | user102   |               |            | mypassword     |
    | user102   | user102@mail. | mypassword |                |
    

  Scenario Outline: signup invalid mail format
    When user tries to sign up with username <username>, email <mail>, password <password> and confirm password <confirmpassword>
    Then a error message "Enter a valid email" should be displayed.

  Examples:
    | username  | mail          | password   | cofirmpassword |
    | user102   | user102.com   | mypassword | mypassword     |
    | user102   | user102@com   | mypassword | mypassword     |
    | user102   | user102@mail. | mypassword | mypassword     |
    | user102   | .             | mypassword | mypassword     |

  Scenario: signup user with unmatched password
    When user tries to sign up with following data:
      | username        | loluser             |
      | mail            | loluser@mail.com    |
      | password        | lolpass             |
      | confirmpassword | userpass            |
    Then the error message "Password and Confirm password is not same" should be displayed.
