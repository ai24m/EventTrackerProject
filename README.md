# EventTrackerProject 🌐

## Overview
The More Practice, Algorithm Practice application was designed to track the performance of studious developers, or fresh graduates from a Coding Bootcamp, on their algorithmic questions skills. Furthermore, the format of the questions are designed to be answered in multiple programming languages of the users choice. Registered users are able to track their performance on one or multiple algorithm questions and update as they please. Sample solutions are provided by the admin, however, users are also encouraged to post their solutions and describe if they so desire.

The end goal of the EventTrackerProject was to become more comfortable creating JPA projects joined with Spring Boot apps to publish a working REST API (Application Programming Interface) via the web. The first phase consisted of configuring the database with MySQL workbench, mapping the entities and testing within the JPA, creating the controller logic with basic CRUD operators with Spring Data JPA repository and service, and finally testing the REST API routes with Postman before deployment. The second phase would be implementation of HTML and JavaScript Front End, followed by Angular to build the framework of the web application.

<img height="400" width="600" src="https://github.com/ai24m/EventTrackerProject/blob/main/DB/algorithmpracticedbschema.png"/>


## REST API Reference
| Return Type      | HTTP Method | URI                  | Purpose            |
|------------------|-------------|----------------------|----------------------------------|
| User            | GET         | /api/users/{userId}  |         Retrieve User      |
| List Algorithm            | GET         | /api/users/{userId}/algorithms  |        Retrieve User Algorithms      |
| List Solution            | GET         | /api/users/{userId}/solutions  |        Retrieve User Solutions      |
| User            | PUT         | /api/users/{userId}  |        Update User      |
| List Tracker            | GET         | /api/users/{userId}/trackers  |         Retrieve User Trackers      |
| Tracker            | GET         | /api/users/{userId}/trackers/{tId}  |         Retrieve a Tracker      |
| Tracker            | POST         | /api/users/{userId}/algorithms/{id}/trackers  <br> RequestBody: Tracker, userId, id  |   Create Tracker     |
| Tracker            | PUT         | /api/users/{userId}/algorithms/{id}/trackers/{tId}  <br> RequestBody: Tracker, userId, id, tId  |    Update Tracker     |
| Tracker            | DELETE         | /api/users/{userId}/algorithms/{id}/trackers/{tId}  |        Update Tracker      |
| List Algorithm            | GET         | /api/algorithms |           Retrieve Algorithms      |
| Algorithm            | GET         | /api/algorithms/{id} |           Retrieve a Algorithm      |
| List Algorithm            | GET       | /api/algorithms/search/{keyword} |          Search Algorithm  with keyword    |
| Algorithm            | POST         | /api/users/{userId}/algorithms <br> RequestBody: Algorithm, userId |   Create a Algorithm     |
| Algorithm            | PUT         | /api/users/{userId}/algorithms/{id} <br> RequestBody: Algorithm, id, userId |  Update a Algorithm     |
| Algorithm            | DELETE       | /api/users/{userId}/algorithms/{id} |   Delete a Algorithm      |
| List Solution             | GET       | /api/algorithms/{id}/solutions |   Retrieve Algorithm Solutions     |
| List Solution             | GET       | /api/algorithms/{id}/solutions/search/language/{lId} |   Retrieve Algorithm Solutions by Language    |
| Solution            | GET       | /api/algorithms/{id}/solutions/{sId} | Retrieve a Algorithm Solution    |
| Solution            | POST       | /api/algorithms/{id}/solutions  <br> RequestBody: Solution, id |  Create a Algorithm Solution   |
| Solution            | PUT       | /api/algorithms/{id}/solutions/{sId}  <br> RequestBody: Solution, id, sId |  Update a Algorithm Solution   |
| Solution            | DELETE       | /api/algorithms/{id}/solutions/{sId} |  Delete a Algorithm Solution    |
| List Language             | GET       | algorithms/{id}/solutions/search/language |  Retrieve Languages of Algorithm Solution   |



## Technologies Used
* RESTful Services
* Spring Data JPA / JPA repository
* Spring Boot
* MAMP
* MySQL/MySQL Workbench
