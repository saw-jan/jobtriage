Feature: signup a user
  As a user
  I want to signup and create my account
  so that I can login to the application

  Background: user browses to signup page
    Given the user has browsed to signup page

  @validsignup
  Scenario Outline: signup a valid user
    When user tries to sign up with username "<username>", email "<mail>", password "<password>" and confirm password "<confirmPassword>"
    Then the user "<username>" with email "<mail>" should be redirected to Dashboard.
    Examples:
      | username  | mail               | password   | confirmPassword |
      | test      | test@gmail.com     | testpass   | testpass        |

  @emptyfields
  Scenario Outline: signup with empty input fields
    When user tries to sign up with username "<username>", email "<mail>", password "<password>" and confirm password "<confirmPassword>"
    Then user should be notified and entered username "<username>", email "<mail>", password "<password>" or confirm password "<confirmPassword>" should be preserved.
  Examples:
    | username  | mail               | password   | confirmPassword |
    |           |                    |            |                 |
    |           | test@mail.com      | testpass   | testpass        |
    | test      |                    | testpass   | testpass        |
    | test      | test@mail.com      |            | testpass        |
    | test      | test@mail.com      | testpass   |                 |
    
  @invalidmail
  Scenario Outline: signup invalid mail format
    When user tries to sign up with username "<username>", email "<mail>", password "<password>" and confirm password "<confirmPassword>"
    Then an email invalid message "Enter a valid email" should be displayed.
  Examples:
    | username  | mail          | password   | confirmPassword |
    | test      | user102.com   | testpass   | testpass        |
    | test      | user102@com   | testpass   | testpass        |
    | test      | user102@mail. | testpass   | testpass        |
    | test      | .mail         | testpass   | testpass        |
    | test      | @mail.com     | testpass   | testpass        |

  @unmatchedpass
  Scenario: signup user with unmatched password
    When user tries to sign up with following data:
      | username  | mail               | password   | confirmPassword   |
      | test      | test@mail.com      | testpass   | testpass2         |
    Then a password not matched message "Password and Confirm password is not same" should be displayed.
  
  @registeredmail
  Scenario: signup user with already registered email
    When user tries to sign up with following data:
      | username  | mail               | password   | confirmPassword   |
      | newuser   | test@mail.com      | testpass   | testpass          |
    Then an error message "Error occurred check inputs" should be displayed.

  @gotologin
  Scenario: Goto login page
    When user tries to go to login page using link
    Then user should be redirected to login page.