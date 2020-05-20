Feature: Add a new job application
    As a user
    I want to add new job application
    So that I can keep record and manage my applications
    
    Background: User has access to dashboard
        Given user has logged in to dashboard with following data:
            | email          | password |
            | user1@mail.com | user1    |
        And the user has opened new job application dialog from dashboard

    @addJob
    Scenario Outline: Add a new job application
        When user tries to add new job application with title "<title>", company "<company>", priority "<priority>" and status "<status>"
        Then a success message "Job Application added successfully" should pop up
        And new job application for "<title>" should be added under "<status>" heading including priority tag "<priority>" and company name "<company>" on dashboard
        Examples: 
        | title          | company     | priority | status       |
        | Office Manager | ABC Company | Medium   | Yet to Apply |
        | Web Developer  | XYZ Company | Low      | Applied      |
        | Web Designer   | PQR Company | Medium   | In Progress  |
        | Sales Officer  | YXZ Company | High     | Accepted     |
        | Designer       | AAA Company | Low      | Rejected     |
     
    @unselected
    Scenario Outline: Try to add new job application with unselected options
       When user tries to add new job application with title "<title>", company "<company>", priority "<priority>" and status "<status>"
       Then an error message "Error in adding Job Application" should pop up
      Examples: 
        | title          | company     | priority | status       |
        | Office Manager | ABC Company |          |              |
        | Office Manager | ABC Company | Low      |              |
        | Office Manager | ABC Company |          | In Progress  |
      
    @canceladd
    Scenario: Cancel adding new job application
      When user cancels adding new job application
      Then "Add new Job Application" dialog should be invisible
     