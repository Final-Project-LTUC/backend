
# Skilify

<!-- [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) -->

## Team members

- Rama Al-Momani  😊

- Laith Abdullah Saleem 😎
- Mohammed Abdeen 😁
- Alaa Nsirat 🤩
- Bashar Alirani 😈
🤔
## Description

>In a fast-paced world where skilled handymen are in high demand, finding reliable and qualified professionals can be challenging. Skilify is a cutting-edge freelancing application designed to revolutionize the way handymen and users connect and collaborate. Our platform aims to create a seamless and efficient experience, allowing users to find the perfect handyman for their problems

## UML digram

![License](./assets/Screenshot_2023-07-31_143644.png)
![License](./assets/Screenshot_2023-07-31_143651.png)

# HandyMan Event Flowchart

![uml3](./assets/API%20flowchart%20example.jpeg)


# Client Events Workflow

![uml1](./assets/UML1)

# Handyman EventWorkFlow

![uml2](./assets/UML2)

# Database Modeling

![database modeling](./assets/database%20modeling)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

**Dashboard** 
1. For handymen so they can manage their profile 
2. see their monthly income 
3. see requests from customers.
4. ability to upload video and images.
5. Search client history and credibility.


**For users and visitors**
1. users and visitors can search for handy men based on their problem domain.
2. filtering handymen based on price and rating.
3. the ability to  sign up and signin as a freelancer or as a normal user or as a vistor.
4. For users that authinticate using phone number or email they get extra credibility.

**Joint**

4. users and handmen can chat with each other to agree on specific details.
**payment and transactions**
1. all payment details are handled in the application using stripe.
**API**
1.  Email Notifications
2. Error Handling and Logging
3. Third-Party Integrations we can use third party API to support chatting or payment.
4. Security Measures encryption using bycrypt and base-64 



## Installation

1.  Clone the repo to your local machine
2. Create an .env file and add your DBURL as required
3. Start your Database server  
4. then Install all the dependiencies
5. Run **NODEMON**

## Usage

No usage yet

## API Documentation

[If your backend project offers an API, provide a link to its detailed documentation here.] not yet

## Configuration

[If your backend project requires any configuration or environment setup, describe it here.]

## Contributing

We will work togather using github be sure to pull from main when you start working and to push your branch when you finish.
Never push to the main


# STORIES FOR EVENT DRIVEN

# User Story 1

## As a Client, I want to request information about a Handyman's rating, number of previous customers, and price before requesting their service, so I can make an informed decision.
 
# User Story 2

## As a Client, I want to request a service from a Handyman, providing details like my location, problem description, picture, phone number, and credibility, along with the desired completion time, so that the Handyman can review and accept my request
 
# User Story 3

## As a Handyman, I want to review the service requests from Clients and choose a client I want to serve. Once selected, I will set a schedule and estimate the time needed to finish the task, sending the details to the daily tasks list
 
# User Story 4

## As a Client, I want to be notified once a Handyman accepts my service request. I also want to be informed about the scheduled time and receive a notification when the service is accepted, along with the deduction of money from my wallet for the first stage expenses.

# User Story 5

## As a Handyman, upon arrival at the job location, I will assess the problem and provide the cost of stage 2 and stage 3 payments to the Client.
 
# User Story 6

## As a Client, if I agree with the cost provided by the Handyman for stage 2 and 3, I will pay for the services.
 
# User Story 7

## As a Handyman, I will proceed to do the job after receiving the payment for stage 1 and any additional payments required.

# User Story 8

## As a Client, after the completion of the job, I will review the Handyman and provide feedback based on the service received.
# 
# User Story 9

## As a Handyman, if a Client declines the service request, I will receive payment only for stage 1 and then proceed to the next client.
 
# User Story 10

## As a Client, if a Handyman is late for the service by more than 30 minutes, I will receive a refund along with an additional $2 compensation. Alternatively, I can choose to proceed with the service and still receive $2 compensation.
 
# User Story 11

## As a Handyman, if I am late for the service by more than 30 minutes, I will automatically refund the stage 1 payment along with $2 as an apology.
 
# User Story 12

# As a Handyman, if I reject a service request from a Client, I will recommend other available Handymen and send an apology for being busy.
 
# User Story 13

## As a Handyman, if a service request expires, I will automatically reject it and send an apology to the Client for being busy.
 
# User Story 14

## As a Handyman, if the queue is at its maximum capacity and I am too busy, I will pick a new client and inform them that the queue is full, encouraging them to try again later.

# User Story 15

## As a Client, I can request to reschedule the service without incurring stage 1 expenses if I do it at least 2 hours in advance.
 
# User Story 16

## As a Handyman, if a Client requests a reschedule during the 2-hour window, the Client will be charged with stage 1 expenses again, and their service will be moved to the next day's queue.
 
# User Story 17

## As a Handyman, I will update the schedule of the Client to the next day if they request a reschedule within the 2-hour window. I will also send a notification to the Client with the updated schedule

## Stories For SignIn & SignUp

1. As a user ,I will signup and expect to have an account and  to  be logged in after that
2. as a user ,I will signin and expect to stay logged in after that till the token expires
3. as a company ,I will register and add my employees and expect to have the ability to manage them .
4. as a freelancer ,I expect to register and have the ability to control  my tasks  
5. as a freelancer ,I expect to have the ability to change my hourly payment 
6. as  a user ,I expect to have the ability to search for certain handymen genres and be able to book one of them 


