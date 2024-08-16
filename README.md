# Spacefy
## Project Description
* Spacefy is a platform that bring people together to meet, create, and celebrate.Its an online marketplace will make it easier than ever to find and book unique spaces for any activity.

* A platform that enable people to meet, create (collaborate with colleagues ) and celebrate (a major milestone). 
Space owners around the country can lease their property and make it available for rent by the hour/ day for people seeking a location for their next meeting, event or activity

##  MVP features
1. Admin Module
   * Add spaces
   * View all added spaces (more information about the added space for edits)
   * Add Users based on roles and permissions
2. Client Module
   * View available spaces
   * View more details about a space
   * Login to platform
      1. Social Auth
      2. Local Auth
   * Book space
   * Duration specified
   * Amount will be calculated depending on the duration
   * Status of the booked space changes (Meaning it can't be booked till status changes to available )
   * Agreement incubator 
   * Simulate a payment process i.e billing and invoicing of any space booked
## Technologies Used
* `GIT`
* `HTML`
* `REACT.JS`
* `JSX`
* `PYTHON`
* `REDUX`
* `POSTGRESQL`
## Project Stack Overview

| Component         | Technology / Tool         |
|-------------------|---------------------------|
| **Backend**       | Flask                     |
| **Database**      | PostgreSQL                |
| **Wireframes**    | Figma (Mobile Friendly)   |
| **Testing**       | Jest & Minitest            |
| **Frontend**      | ReactJs                   |
| **State Management** | Redux Toolkit          |

## Installations
* Fork and Clone this repo and run the below commands:
### backend server
$ `pipenv install`
$ `pipenv shell`
$ `cd server`
$ `python seed.py`
$ `python app.py`

### frontend server
$ `cd client` 
$`npm install`
$ `npm start`
