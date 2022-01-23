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
        - [ Editing a Template ](#EditTemplate)
        - [ Deleting a Template ](#DeleteTemplate)
        - [ Filtering Templates ](#FilterTemplates)
        - [ Favorite Template ](#FavoriteTemplate)
        - [ Quick Copy ](#QuickCopy)
    - [ Representatives ](#RepresentativeRequests)
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

```

Sample Response:
```

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

<a name="specificPost"></a>

#### GET /posts/:postId

Sample Request:
```

```

Sample Response:
```

```

**Navigating to Templates Feed**
![Home Options](src/images/homeOptions.png)

**Templates Feed**: Templates Feed displays all Templates from all Users and can be filtered (more on that later)
![Templates Feed](src/images/templatesFeed.png)

**Templates Created**
![Templates Created](src/images/templatesCreated.png)

**Post Details Create Related Template**
![Posts Details](src/images/postDetailsCreateTemplate.png)

The behavior is the same in all three locations, but to explain the process we will go through the 'Templates Feed'. Once on the Templates Feed (accessible to Users and non-Users, however the capability to create a Template is only available to logged in Users), the User will see the drop-down option to 'Create New Template'.

**Create New Template**
![Create Template](src/images/createTemplate.png)

The User fills in the fields, then clicks 'Create Template' at the bottom of the field. Form validation of the front-end will ensure all fields are within tolerance. The form data will then be sent to the [ GetVocalToGov API ](https://github.com/bbeckenb/GetVocalToGov) which will perform its own schema validation, then if all data is within tolerance, store the record in the database and pass back additional information (created_at). This instance will immediately be able for viewing on the 'Templates Feed', 'Templates Created', or The Post's Details page. 

<a name="EditTemplate"></a>

#### Editing a Template
To update a Template, the User has to have ownership (they must have created the Template to have ownership) of the Template in question. If they do, they will see an option to 'Edit' at the bottom of the Template:

**Owned Template Example**
![Owned Template](src/images/templateOwned.png)

If they do not, there will be no options.

**unOwned Template Example**
![Template](src/images/unownedTemplate.png)

If they click on 'Edit' on a Template they own, the User will be redirected to an Edit Template Portal for that particular Template. The form will be auto-populated with the current data of the Template in question. The User simply changes whichever fields they want to alter and clicks 'Edit Template' at the bottom of the form. Form validation of the front-end will ensure all fields are within tolerance. The form data will then be sent to the [ GetVocalToGov API ](https://github.com/bbeckenb/GetVocalToGov) which will perform its own schema validation, then if all data is within tolerance, store the record updates in the database. The updated instance will immediately be able for viewing on the 'Templates Feed', 'Templates Created', or The Post's Details page. 

**Edit Template Portal**
![Edit Template](src/images/editTemplate.png)

<a name="DeleteTemplate"></a>

#### Deleting a Template
To delete a Template, the User has to have ownership (they must have created the Template to have ownership) of the Template in question. If they do, they will see an option to 'Delete' at the bottom of the Template:

**Owned Template Example**
![Owned Template](src/images/templateOwned.png)

If they click this 'Delete' button, the Template id along with the user token (to check for ownership) will be sent to [ GetVocalToGov API ](https://github.com/bbeckenb/GetVocalToGov). If they have ownership and the record exists, it will be deleted from the database, the front-end will be informed and updated by removing the Template in question.

<a name="FilterTemplates"></a>

#### Filtering Templates
There are three Template Lists on the app that allow a User to filter the Templates. The first is by navigating to the Templates feed by clicking 'Templates' on the navbar or under the 'Options' drop-down on the home page. The second is by navigating to the 'Profile' page and selecting the 'Templates Created' tab on the secondary navbar. The third is by navigating to the 'Profile' page and selecting the 'Templates Favorited' tab on the secondary navbar. For the second two, you need to be logged in.

**Navigating to Templates Feed**
![Home Options](src/images/homeOptions.png)

**Templates Feed**: Templates Feed displays all Templates from all Users
![Templates Feed](src/images/templatesFeed.png)

**Templates Created**: Templates Created shows a logged in User all of the Templates they have personally created
![Templates Created](src/images/templatesCreated.png)

**Templates Favorited**: Templates Favorited shows a logged in User all of the Templates they have Favorited (more on that later)
![Templates Favorited](src/images/templatesFavorited.png)

The behavior is the same in all locations, but to explain the process we will go through the 'Templates Feed'. Once on the Templates Feed (accessible to Users and non-Users, as is the 'Search for Template' functionality), the User will see the drop-down option to 'Search for Template'. Once clicked, this will present a 'Search Templates' form where the User can select any and all of search criteria 'title' (matching phrase) and 'body' (matching phrase).

**Search Templates**
![Search Templates](src/images/searchTemplates.png)

Once the User enters their search criteria and selects 'Search Templates' at the bottom of the form, the request will be sent to the [ GetVocalToGov API ](https://github.com/bbeckenb/GetVocalToGov). The database will be queried for records that match all filters. The resulting list will be sent and displayed on the front-end along with the search criteria in the form's alert message box.

**Search Templates Success**
![Search Templates Success](src/images/searchTemplatesSuccess.png)

<a name="FavoritTemplate"></a>

#### Favoriting a Templates
Favoriting, in this context, is a Request meant to allow a User to tag a Template of interest to be more easily accessed when they want to find it again at a later time. This is a Request only accessible to a logged-in User. When logged-in viewing Templates, the User will see a yellow Favorite icon on all Templates. If it is outlined, the Template has not been tagged, if it is filled in, the Template has been tagged. The user can toggle Favorited status by clicking on the icon button.

**Template unFavorited**
![Template unFavorited](src/images/unFavorited.png)

**Template Favorited**
![Template Favorited](src/images/favorited.png)

For ease of finding a User's Favorited Templates, the User simply has to navigate to their 'Profile' page and select 'Templates Favorited' on the secondary navbar. This will show the User a list of their Favorited Templates from most recently created to least recently created.

**Templates Favorited List**
![Templates Favorited](src/images/templatesFavorited.png)

<a name="QuickCopy"></a>

#### QuickCopy Template Body
Logged in Users can also QuickCopy the Body of a Template. They click the Copy icon on the Template of interest, this will copy the body of that specific Template to their computer's clipboard along with an introductory part of the message and a sign-off containing theUser's first and last name on file.

**Template QuickCopy**
![Template QuickCopy](src/images/unFavorited.png)

Once the User has the message on their clipboard, they can paste it wherever they choose! 

**Templates QuickCopy Demo**
![Templates QuickCopy Demo](src/images/quickCopy.png)

**Templates QuickCopy Demo Continued**
![Templates QuickCopy Demo Continued](src/images/quickPaste.png)

The idea behind this is that Users can find Templates they like, copy the message, bring it to their Representative's Contact page, and deliver it very quickly.

<a name="RepresentativeRequests"></a>

### Representative Requests
When a User registers, they are required to enter their residential address. This address is verified through an external service before being stored in the database. The address is then used to retrieve the User's Government representatives, from the President of The United States to their local officials. The list of representatives along with their contact information can be found on the User's 'Profile' page under the 'Representatives' tab. There is variance in what contact information (address, phone #, email, web page) is available, but the maximum amount of contact information is displayed for each Representative.

**Representative**
![Representative](src/images/representative.png)

The representative's party affiliation informs the color of their title banner. (Democratic Party=blue, Republican Party=Red, Unknown=Purple). Simply QuickCopy the Template you want, navigate to the Representative you deem most appropriate for the situation and let your voice be heard!

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
