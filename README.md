# GetVocalToGov

# GetVocalToGov
## Exchange your ideas on current events and let your thoughts be heard!

[![GetVocalToGov App](static/images/getVocalToGovDisplayView.png)](https://getvocaltogov.surge.sh/)


## Description:
This Node/Express RESTful API serves a frontend React App, [getvocaltogov-frontend](https://github.com/bbeckenb/getvocaltogov-frontend). The website acts as a vehicle lower barrier for citizens to petition their representatives and exchange ideas on current events. This readme provides information on the API portion of the service along with some context of the front-end app.
- This API:
    - Provides full CRUD for 3 resources (User, Post, Template)
    - Utilizes JSON Web Tokens to provide authorization
        - It checks this authorization using middleware
    - It provides Government Representatives based on User residential address
    - Has robust test coverage using Jest Testing Library
    - Utilizes Winston for event and error logging
- This was completed in approximately 60 hours as part of Springboard Software Engineering Program.

## Table of Contents
1. [ Tech Stack ](#Tech-Stack)
    - [ Front-end ](#Front-end)
    - [ Back-end ](#Back-end)
    - [ Database ](#Database)
    - [ APIs Integrated ](#APIs)
2. [ Database Schema ](#Schema)
3. [ Deployment ](#Deployment)
4. [ Developer ](#Developer)
5. [ Requests ](#Requests)
    - [ Auth Requests ](#AuthRequests)
        - [ POST /auth/register ](#Register)
        - [ POST /auth/token ](#Token)
    - [ User Requests ](#UserRequests)
        - [ GET /users/:username ](#GetUser)
        - [ PATCH /users/:username ](#EditUser)
        - [ DELETE /users/:username ](#DeleteUser)
        - [POST /users/:username/templates/:templateId](#createFavorite)
        - [ DELETE /users/:username/templates/:templateId ](#deleteFavorite)
        - [ POST /users/:username/posts/:postId ](#createBookmark)
        - [DELETE /users/:username/posts/:postId](#deleteBookmark)
    - [ Post Requests ](#PostRequests)
        - [ POST /posts ](#AddPost)
        - [ GET /posts ](#getPost)
        - [ GET /posts/:postId ](#specificPost)
        - [ PATCH /posts/:postId ](#UpdatePost)
        - [ DELETE /posts/:postId ](#deletePost)
    - [ Template Requests ](#TemplateRequests)
        - [ POST /templates ](#AddTemplate)
        - [ GET /templates ](#getTemplate)
        - [ GET /templates/:templateId ](#specificTemplate)
        - [ PATCH /templates/:templateId ](#EditTemplate)
        - [ DELETE /templates/:templateId ](#DeleteTemplate)
    - [ Representatives ](#RepresentativeRequests)
        - [ GET /representatives/:username ](#getRepresentative)
6. [ Running App Locally ](#RunningLocally)
    - [ Requirements ](#Requirements)
    - [ API Keys ](#APIKeys)
    - [ Import Projects to your Local Machine ](#ImportProj)
7. [ Testing ](#Testing) 
8. [ Additional Steps ](#AdditionalSteps)

<a name="Tech-Stack"></a>

## Tech Stack
<a name="Front-end"></a>

### Front-end
[ getvocaltogov-frontend React App Repo ](https://github.com/bbeckenb/getvocaltogov-frontend) - 
React, Axios, React-Bootstrap, React Router, React Hook Form, Yup schema validation

<a name="Back-end"></a>

### Back-end
Node.js, Express, Node-postgres, jsonwebtoken, jsonschema, bcrypt, winston, Axios, dotenv, colors, cors

<a name="Database"></a>

### Database
Postgres

<a name="APIs"></a>

### APIs integrated
- [ Google Civic Information API ](https://developers.google.com/civic-information/docs/v2)
- [ EasyPost ](https://www.easypost.com/docs/api)

<a name="Schema"></a>

## Schema
![Schema](static/images/schema.png)

<a name="Deployment"></a>

## Deployment
The Front-End React App is deployed on surge at [https://getvocaltogov.surge.sh/](https://getvocaltogov.surge.sh/)

<a name="Developer"></a>

## Developer
### Bryce Beckenbach
![Me](static/images/professional_shot.jpeg)

Please feel free to reach out!
- Email: [brycebeckenbach@gmail.com](mailto:brycebeckenbach@gmail.com)
- [ Linkedin ](https://www.linkedin.com/in/bryce-beckenbach-52a5276a/)

<a name="Requests"></a>

## Requests:

<a name="AuthRequests"></a>

### Auth Requests

<a name="Register"></a>

#### POST /auth/register

Request:
```
curl --request POST \
  --url https://getvocaltogov.herokuapp.com/auth/register \
  --header 'Content-Type: application/json' \
  --data '{
	    "firstName": String,
        "lastName": String,
        "username": String,
        "password": String,
        "email": String,
        "street": String,
        "city": String,
        "state": String,
        "zip": String
}'
```

Response:
```
{ "token": String }
```

Sample Request:
```
curl --request POST \
  --url https://getvocaltogov.herokuapp.com/auth/register \
  --header 'Content-Type: application/json' \
  --data '{
			"firstName": "testUser",
      "lastName": "test",
      "username": "user",
      "password": "passGood",
      "email": "testUser@test.com",
      "street": "2210 oceanwalk dr w",
      "city": "atlantic beach",
      "state": "FL",
      "zip": "32233"
}'
```

Sample Response:
```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjQyOTYzMzYwfQ.3dCWzXq60thKMTP3M_Pf37uR4GljqYOTjdRijNQEAII"
}
```

<a name="Token"></a>

#### POST /auth/token
Retrieves a token for existing Users

Request:
```
curl --request POST \
  --url https://getvocaltogov.herokuapp.com/auth/token \
  --header 'Content-Type: application/json' \
  --data '{
      "username": String,
      "password": String
}'
```

Response:
```
{ "token": String }
```

<a name="UserRequests"></a>

### User Requests

<a name="#GetUser"></a>

#### GET /users/:username

Example Request:
```
curl --request GET \
  --url https://getvocaltogov.herokuapp.com/users/demoUser \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW9Vc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MTkyOX0.mYkdokA8TbMD3qW9HbfnYR4wK9_aV6SYQ2yFUqnb8JQ'
```

Example Response:
```
{
	"user": {
		"username": "demoUser",
		"password": "$2b$12$s3NJiNz1bbT2DZ56rWenredu60wGddT0qNR5WblylReVgoreFttdu",
		"firstName": "Demo",
		"lastName": "User",
		"street": "2003 KLATTENHOFF DR",
		"city": "AUSTIN",
		"state": "TX",
		"zip": "78728",
		"email": "demoUser@demo.user",
		"isAdmin": false,
		"favorites": [
			14,
			11,
			12
		],
		"bookmarks": [
			4,
			8,
			5,
			6
		]
	}
}
```

<a name="EditUser"></a>

#### PATCH /users/:username

Sample Request:
```
curl --request PATCH \
  --url https://getvocaltogov.herokuapp.com/users/testUser \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g' \
  --data '{
			"firstName": "changedname",
      "lastName": "user",
      "username": "testUser",
      "password": "passGood",
      "email": "testUser@test.com",
      "street": "2210 oceanwalk dr w",
      "city": "atlantic beach",
      "state": "FL",
      "zip": "32233"
}'
```

Sample Response:
```
{
	"user": {
		"username": "testUser",
		"password": "$2b$12$A0CLfKS/wKKuu0TL5M9r5uWhb4EonWuQ9UydKhStPOl73K6lQzUuy",
		"firstName": "changedname",
		"lastName": "user",
		"street": "2210 OCEANWALK DR W",
		"city": "ATLANTIC BEACH",
		"state": "FL",
		"zip": "32233",
		"email": "testUser@test.com",
		"isAdmin": false,
		"favorites": [],
		"bookmarks": []
	}
}
```

<a name="DeleteUser"></a>

#### DELETE /users/:username

Sample Request:
```
curl --request DELETE \
  --url https://getvocaltogov.herokuapp.com/users/testUser \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g'
```

Sample Response:
```
{
	"deleted": "testUser"
}
```

<a name="createFavorite"></a>

#### POST /users/:username/templates/:templateId

Sample Request:
```
curl --request POST \
  --url https://getvocaltogov.herokuapp.com/users/testUser/templates/14 \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g'
```

Sample Response:
```{
	"favorited": 14
}
```

<a name="deleteFavorite"></a>

#### DELETE /users/:username/templates/:templateId

Sample Request:
```
curl --request DELETE \
  --url https://getvocaltogov.herokuapp.com/users/testUser/templates/14 \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g'
```

Sample Response:
```
{
	"unfavorited": 14
}
```

<a name="createBookmark"></a>

#### POST /users/:username/posts/:postId

Sample Request:
```
curl --request POST \
  --url https://getvocaltogov.herokuapp.com/users/testUser/posts/4 \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g'
```

Sample Response:
```
{
	"bookmarked": 4
}
```

<a name="deleteBookmark"></a>

#### DELETE /users/:username/posts/:postId

Sample Request:
```
curl --request DELETE \
  --url https://getvocaltogov.herokuapp.com/users/testUser/posts/4 \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g'
```

Sample Response:
```
{
	"unbookmarked": 4
}
```

<a name="PostRequests"></a>

### Post Requests
A Post, in this context, is a User generated record containing information and commentary about a current event. Users can create then edit and/or delete Posts they own. Any User can read or bookmark/unbookmark a Post from the main Post feed. Posts are meant to create awareness of current events and to inspire Users to generate Templates to petition their Representatives. They consist of a title, body (to assert whatever the Post is about), link to article/reference (nullable), tag (to mark category), created_at (timestamp), and location (what state the post is referencing or if it is a federal issue, use District of Columbia). 

<a name="AddPost"></a>

#### POST /posts

Sample Request:
```
curl --request POST \
  --url https://getvocaltogov.herokuapp.com/posts \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g' \
  --data '{
	 "title": "test title 2",
      "link": "https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/",
      "body": "we need to do q, r, s",
      "tag": "Health Care",
      "location": "FL",
      "userId": "JDean1"
     
}'
```

Sample Response:
```
{
	"post": {
		"id": 9,
		"title": "test title 2",
		"link": "https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/",
		"body": "we need to do q, r, s",
		"userId": "testUser",
		"tag": "Health Care",
		"location": "FL",
		"createdAt": "2022-01-23T19:10:50.989Z",
		"templates": []
	}
}
```

<a name="getPost"></a>

#### GET /posts

Sample Request:
```
curl --request GET \
  --url https://getvocaltogov.herokuapp.com/posts \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g'
```

Response:
```
{"posts": [Object]}
```

<a name="specificPost"></a>

#### GET /posts/:postId

Sample Request:
```
curl --request GET \
  --url https://getvocaltogov.herokuapp.com/posts/4 \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g'
```

Sample Response:
```
{
	"post": {
		"id": 4,
		"title": "Newsom backs away from single-payer health care pledge",
		"link": "https://calmatters.org/commentary/2022/01/newsom-single-payer-health-care/",
		"body": String,
		"userId": "demoUser",
		"tag": "Health Care",
		"location": "CA",
		"createdAt": "2022-01-18T19:40:36.143Z",
		"templates": [
			{
				"id": 8,
				"title": "Healthcare System needs change!",
				"body": String,
				"userId": "demoUser",
				"createdAt": "2022-01-18T19:44:21.624Z",
				"postId": 4
			}
		]
	}
}
```

<a name="UpdatePost"></a>

#### PATCH /posts/:postId

Sample Request:
```
curl --request PATCH \
  --url https://getvocaltogov.herokuapp.com/posts/9 \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g' \
  --data '{
	 "title": "test title 2",
      "link": "https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/",
      "body": "edited body",
      "tag": "Health Care",
      "location": "FL",
      "userId": "JDean1"
     
}'
```

Sample Response:
```
{
	"post": {
		"id": 9,
		"title": "test title 2",
		"link": "https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/",
		"body": "edited body",
		"userId": "testUser",
		"tag": "Health Care",
		"location": "FL",
		"templates": []
	}
}
```

<a name="deletePost"></a>

#### DELETE /posts/:postId

Sample Request:
```
curl --request DELETE \
  --url https://getvocaltogov.herokuapp.com/posts/9 \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g'
```

Sample Response:
```
{
	"deleted": 9
}
```

<a name="TemplateRequests"></a>

### Template Requests
A Template, in this context, is a User generated title and body of an email one would send to their Representative. Here is a sample [reference](https://www.nlacrc.org/home/showdocument?id=272) of how one could structure Template content. Users can create Templates  in relation to that Post or independently unattached to a Post. They can then update and/or delete Templates they own. All Users can read and favorite/unfavorite Templates from the Template feed. They consist of a title, body (to assert whatever the Post is about), and created_at (timestamp). 

<a name="AddTemplate"></a>

#### POST /templates

Sample Request:
```
curl --request POST \
  --url https://getvocaltogov.herokuapp.com/templates \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g' \
  --data '{
	 "title": "test title 2",
      "body": "we need to do q, r, s"  
}'
```

Sample Response:
```
{
	"template": {
		"id": 18,
		"title": "test title 2",
		"body": "we need to do q, r, s",
		"userId": "testUser",
		"postId": null,
		"createdAt": "2022-01-23T19:26:57.849Z"
	}
}
```

<a name="getTemplate"></a>

#### GET /templates

Sample Request:
```
curl --request GET \
  --url https://getvocaltogov.herokuapp.com/templates \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g'
```

Sample Response:
```
{ "templates": [Object] }
```

<a name="specificTemplate"></a>

#### GET /templates/:templateId

Sample Request:
```
curl --request GET \
  --url https://getvocaltogov.herokuapp.com/templates/18 \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g'
```

Sample Response:
```
{
	"template": {
		"id": 18,
		"title": "test title 2",
		"body": "we need to do q, r, s",
		"userId": "testUser",
		"postId": null,
		"createdAt": "2022-01-23T19:26:57.849Z"
	}
}
```

<a name="EditTemplate"></a>

#### PATCH /templates/:templateId

Sample Request:
```
curl --request PATCH \
  --url https://getvocaltogov.herokuapp.com/templates/18 \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g' \
  --data '{
	 "title": "edited title",
    "body": "we need to do q, r, s"
}'
```

Sample Response:
```
{
	"template": {
		"id": 18,
		"title": "edited title",
		"body": "we need to do q, r, s",
		"userId": "testUser",
		"postId": null,
		"createdAt": "2022-01-23T19:26:57.849Z"
	}
}
```

<a name="DeleteTemplate"></a>

#### DELETE /templates/:templateId

Sample Request:
```
curl --request DELETE \
  --url https://getvocaltogov.herokuapp.com/templates/18 \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MzQ4Mn0.mkzJDI5dAVOS2Gpa2aPek6pXVhfzazKcAMUducIvx9g'
```

Sample Response:
```
{
	"deleted": 18
}
```

<a name="RepresentativeRequests"></a>

### Representative Requests
When a User registers, they are required to enter their residential address. This address is verified through an external service before being stored in the database. The address is then used to retrieve the User's Government representatives, from the President of The United States to their local officials. The list of representatives along with their contact information can be found on the User's 'Profile' page under the 'Representatives' tab. There is variance in what contact information (address, phone #, email, web page) is available, but the maximum amount of contact information is displayed for each Representative.

<a name="getRepresentative"></a>

#### GET /representatives/:username

Sample Request:
```
curl --request GET \
  --url https://getvocaltogov.herokuapp.com/representatives/demoUser \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW9Vc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY0Mjk2MTkyOX0.mYkdokA8TbMD3qW9HbfnYR4wK9_aV6SYQ2yFUqnb8JQ'
```
This route utilizes a wrapper that communicates to [Google Civic Information API](https://developers.google.com/civic-information) under the hood. See the documentation on retrieving [representative information](https://developers.google.com/civic-information/docs/v2#Representatives) to understand more about what the 'Object' in the sample response below contains.

Sample Response:
```
{
	"representatives": Object
}
```

<a name="RunningLocally"></a>

### Running Apps ([getvocaltogov-frontend](https://github.com/bbeckenb/getvocaltogov-frontend) and backend) Locally

<a name="Requirements"></a>

#### Requirements
- Node.js, React
- PostgresSQL
- npm 

<a name="APIKeys"></a>

#### API Keys
Retrieve free API keys from:
- [ Google Civic Information API ](https://developers.google.com/civic-information)
- [ EasyPost ](https://www.easypost.com/?utm_source=google-brand2022&gclid=CjwKCAiA0KmPBhBqEiwAJqKK4330X7PmNnxWL5GROFLDAj5phtSVsAgmYcEpWrfyzaxktyG6iyDdFxoC4OMQAvD_BwE)

<a name="ImportProj"></a>

#### Import Project to your Local Machine
1. Clone the repositories:
    - `git clone https://github.com/bbeckenb/getvocaltogov-frontend.git`
        - this is the front-end server
    - `git clone https://github.com/bbeckenb/GetVocalToGov.git`
        -this is the backend API

2. Open two separate terminal windows, navigate to the two projects individually:
    - `cd getvocaltogov-frontend`
    - `cd GetVocalToGov`

3. Install requirements in each project directory:
    - `npm install`

4. Set up local database:
    - `createdb get_vocal_to_gov_db`

5. Set up .env file in GetVocalToGov:
    - `touch .env`

6. Add the following fields and enter your information (Requires API key retrieval step) where it says **YourInfo** 
    ```
    GOOGLE_API_KEY=YourInfo
    EASY_POST_API_KEY=YourInfo
    EASY_POST_API_TEST_KEY=YourInfo
    SECRET_KEY=YourInfo
    ```
    **NOTE:** `SECRET_KEY` can be whatever you want it to be, you can generate 16 random bytes of hex digits using `hexdump -n 16 -e '4/4 "%08X" 1 "\n"' /dev/urandom` in the command line.

7. Run Express API Application
- In terminal where you are in the 'GetVocalToGov' directory, type `npm start`
- This will be on port 3001

8. Run React front-end server
- In terminal where you are in the 'getvocaltogov-frontend' directory, type `npm start`
- This will be on port 3000


<a name="Testing"></a>

### Testing
- Testing for the Express API has pretty robust coverage, it uses [Jest Testing Library](https://jestjs.io/).
    - Inside of the GetVocalToGov directory, type ```jest -i``` to run through the test suites.
- Testing for the front-end React App utilizes the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [Jest Testing Library](https://jestjs.io/).
    - Each component has its own test file to ensure it renders and performs the intended core functionality.
    - To look at the test results of any individual component, inside of the getvocaltogov-frontend directory, type ```npm test NameOfComponent.test.jsx```

<a name="AdditionalSteps"></a>

### Additional Steps
I built this application as part of SpringBoard's Software Engineering curriculum and put in ~60 hours. If I were to continue developing it, there would be several steps I would take.

#### Add a news feed
I think it would be a much more well rounded app and more of a one-stop-shop if there was a news feed page that provided stories aligned with the categories you would create Posts for.

#### Administrative User functionality
I added an is_admin boolean to the User model, but have not gotten around to adding an Admin portal on the web app itself. It would be much easier to manage data on the app, both test and real. 
