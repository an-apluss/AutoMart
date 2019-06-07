[![Build Status](https://travis-ci.org/an-apluss/AutoMart.svg?branch=develop)](https://travis-ci.org/an-apluss/AutoMart) [![Coverage Status](https://coveralls.io/repos/github/an-apluss/AutoMart/badge.svg)](https://coveralls.io/github/an-apluss/AutoMart) [![Test Coverage](https://api.codeclimate.com/v1/badges/1e3a63878399c50dff1c/test_coverage)](https://codeclimate.com/github/an-apluss/AutoMart/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/1e3a63878399c50dff1c/maintainability)](https://codeclimate.com/github/an-apluss/AutoMart/maintainability)

# AutoMart
Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.

## Pivotal Tracker

Project is currently being built with the Project Management Tool; Pivotal Tracker. You can find the stories at https://www.pivotaltracker.com/n/projects/2345980

## Template Link

Template is hosted at https://an-apluss.github.io/AutoMart/UI/index.html

### API Deployment

API is deployed at https://web-automart.herokuapp.com

## Built With

<ul>
<li><a href="https://nodejs.org/">NodeJS</a></li>
<li><a href="https://expressjs.com/">ExpressJS</a></li>
<li><a href="https://developer.mozilla.org/kab/docs/Web/HTML">HTML</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS</a></li>
<li><a href="https://developer.mozilla.org/bm/docs/Web/JavaScript">JavaScript</a></li>
</ul>

## Getting Started

### Installation

- Clone this repository using `git clone https://github.com/an-apluss/AutoMart.git .`
- Use the `.env.example` file to setup your environment variables and rename the file to `.env`
- Run `npm install` to install all dependencies
- Run `npm start` to start the server

### Supporting Packages

#### Linter

- [ESLint](https://eslint.org/) - Linter Tool

#### Compiler

- [Babel](https://babeljs.io/) - Compiler for Next Generation JavaScript

#### Test Tools

- [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests (Backend)
- [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
- [Chai-http](https://github.com/visionmedia/supertest) - A Chai plugin for testing node.js HTTP servers
- [Istanbul(nyc)](https://istanbul.js.org/) - Code Coverage Generator

<ul><li>Run Test</li></ul>
<pre><code>npm test</code></pre>
<br>
<ul><li>Run Coverage Report</li></ul>
<pre><code>npm run coverage</code></pre>
<br>

### API Routes

|        DESCRIPTION                            | HTTP METHOD | ROUTES                                  |
| :-------------------------------------------: | ----------- | --------------------------------------- |
| Sign up User                                  | POST        | /api/v1/auth/signup                     |
| Log in User                                   | POST        | /api/v1/auth/signin                     |
| Create a car sale ad                          | POST        | /api/v1/car                             |
| Create a purchase order                       | POST        | /api/v1/order                           |
| Update the price of a purchase order          | PATCH       | /api/v1/order/{order-id}/price          |
| Mark a posted car Ad as sold                  | PATCH       | /api/v1/car/{car-id}/status             |
| Update the price of a car                     | PATCH       | /api/v1/car/{car-id}/price              |
| View a specific car                           | GET         | /api/v1/car/{car-id}                    |
| View all unsold cars                          | GET         | /api/v1/car?status=available            |
| view all unsold cars within a price range     | GET         | /api/v1/car?status=available...         |
|                                               |             | ...&min_price=XXXValue...               |
|                                               |             | ...&max_price=XXXValue                  |
| Delete a specific car Ad                      | DELETE      | /api/v1/car/{car-id}                    |
| View all posted ads whether sold or available | GET         | /api/v1/car                             |
| flag/report a posted AD as fraudulent         | POST        | /api/v1/flag/                           |
| View all unsold cars which state reads new    | GET         | /api/v1/car?status=available&state=new  |
| View all unsold cars which state reads used   | GET         | /api/v1/car?status=available&state=used |

## Project References

- I learnt how to persist data and structure my project from a video tuturial by Bolaji Olajide - https://www.youtube.com/watch?v=WLIqvJzD9DE
- I learnt how to used bycrpt, jwt and Joi dependencies and how to capture the big picture of an application before writing code, from a video course created by Mosh Hamedani - Node.js: The Complete Guide to Build RESTful APIs (2018)
- Stackoverflow was also a blessing whenever I come across question I can't answer
- Google

## License

&copy; Anuoluwapo Akinseye

Licensed under the [MIT License](https://github.com/an-apluss/AutoMart/blob/develop/LICENSE)