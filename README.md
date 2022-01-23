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
        - [ Register ](#Register)
        - [ Token ](#Token)
    - [ User Requests ](#UserRequests)
        - [ User Get ](#GetUser)
        - [ User Editing ](#EditUser)
        - [ User Deletion ](#DeleteUser)
    - [ Post Requests ](#PostRequests)
        - [ Adding a Post ](#AddPost)
        - [ Updating a Post ](#UpdatePost)
        - [ Deleting Post](#DeletePost)
        - [ Filtering Posts ](#FilterPosts)
        - [ Bookmark Post ](#BookmarkPost)
        - [ Post Details ](#PostDetails)
    - [ Template Requests ](#TemplateRequests)
        - [ Adding a Template ](#AddTemplate)
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

<a name="LoginAndDemo"></a>

#### Login and Demo User
User Login operates very similarly to Registration. It uses a form to gather the username and password credentials to pass to the [ API ](https://github.com/bbeckenb/GetVocalToGov). The API runs the inputted password through a bcrypt compare function with the hash output stored in the database. If the compare returns bool True, the API returns a signed JSON Web Token (JWT). The JWT is stored in a piece of state (token using setToken) and on the GetVocalToGovApi class for further calls that require User authorization. A second call is then made to the [ GetVocalToGov API ](https://github.com/bbeckenb/GetVocalToGov) to get the User details which are stored in a piece of state (currUser using setCurrUser). 

To reduce barrier of entry of someone trying to experience the App, I integrated a 'Demo' button on the Login form. This automatically passes Demo User credentials to the API behind the scenes:
- Username: demoUser
- Password: passGood

**NOTE:** There is backend logic to protect demoUser from modification or deletion

![login](src/images/login.png)

<a name="EditUser"></a>

#### User Editing
Once a user is logged in, they can navigate to 'Profile' either through the navbar or from the homepage when they click on the 'Options' button.

**Home Options**
![Home Options](src/images/homeOptions.png)

Once on their Profile page, they will see drop-down options to 'Edit Profile' as 'User Options' is default on the 'Profile' page. When they expand it, they will see an 'Edit Profile' form auto-populated with their current User information. To edit their information, they simply need to change the information stored in the current fields, enter the correct password to confirm their changes, and click 'Edit User' at the bottom of the form. The form validation will operate the same as [ Registration ](#Registration). If the data is accepted, the [ API ](https://github.com/bbeckenb/GetVocalToGov) will authenticate the password provided with the original username, the address will be verified, and if all that passes, the database will be updated and an updated JWT will be provided. The JWT is stored in a piece of state (token using setToken) and on the GetVocalToGovApi class for further calls that require User authorization. A second call is then made to the [ GetVocalToGov API ](https://github.com/bbeckenb/GetVocalToGov) to get the User details which are stored in a piece of state (currUser using setCurrUser). 

![Edit Profile](src/images/editProfileForm.png)


<a name="DeleteUser"></a>

#### User Deletion
Once a User is logged in, they can navigate to 'Profile' either through the navbar or from the homepage when they click on the 'Options' button, same as navigating to [ User Editing ](#EditUser) above. They will see an option to 'Delete Profile' under 'User Options'. When they expand this drop-down, they will see the Delete User Portal.

Delete User Portal
![Delete User Portal](src/images/deleteUserPortal.png)

When they click 'Delete' once, they will see the warning text asking them to confirm they want to delete their profile:
![Delete User Portal Warning](src/images/deleteUserPortalWarning.png)

If they click 'Cancel', the prompt will revert back to the original intro message. If they click 'Delete' again, the front-end will send a command to the [ GetVocalToGov API ](https://github.com/bbeckenb/GetVocalToGov) to delete that User instance. If it is the demoUser, the API will send a message to the front-end that the demoUser profile 'cannot be deleted or modified'. If it is not the demoUser, that User instance will be removed from the database and the front-end will clear the token and currUser pieces of state, then redirect to the no-user version of the home page.

<a name="PostRequests"></a>

### Post Requests
A Post, in this context, is a User generated record containing information and commentary about a current event. Users can create then edit and/or delete Posts they own. Any User can read or bookmark/unbookmark a Post from the main Post feed. Posts are meant to create awareness of current events and to inspire Users to generate Templates to petition their Representatives. They consist of a title, body (to assert whatever the Post is about), link to article/reference (nullable), tag (to mark category), created_at (timestamp), and location (what state the post is referencing or if it is a federal issue, use District of Columbia). 

**Post Example**
![Post](src/images/Post.png)

<a name="AddPost"></a>

#### Adding a Post
There are two locations that allow a User to create a new Post. The first is by navigating to the Posts feed by clicking 'Posts' on the navbar or under the 'Options' drop-down on the home page. The second is by navigating to the 'Profile' page and selecting the 'Posts Created' tab on the secondary navbar.

**Navigating to Posts Feed**
![Home Options](src/images/homeOptions.png)

**Posts Feed**
Posts Feed displays all Posts from all Users and can be filtered (more on that later)
![Posts Feed](src/images/postsFeed.png)

**Posts Created**
![Posts Created](src/images/postsCreated.png)

The behavior is the same in both locations, but to explain the process we will go through the 'Posts Feed'. Once on the Posts Feed (accessible to Users and non-Users, however the capability to create a post is only available to logged in Users), the User will see the drop-down option to 'Create New Post'.

**Create New Post**
![Create Post](src/images/createPost.png)

The User fills in the fields ('Location' and 'Tag' are drop-down select fields, Link is nullable), then clicks 'Create Post' at the bottom of the field. Form validation of the front-end will ensure all fields are within tolerance. The form data will then be sent to the [ GetVocalToGov API ](https://github.com/bbeckenb/GetVocalToGov) which will perform its own schema validation, then if all data is within tolerance, store the record in the database and pass back additional information (created_at). This instance will immediately be able for viewing on the 'Posts Feed' or 'Posts Created' list. 

#### Updating Post
To update a Post, the User has to have ownership (they must have created the Post to have ownership) of the Post in question. If they do, they will see an option to 'Edit' at the bottom of the Post:

**Owned Post Example**
![Owned Post](src/images/postOwned.png)

If they do not, they will only see an option to view 'Details'.

**unOwned Post Example**
![Post](src/images/Post.png)

If they click on 'Edit' on a Post they own, the User will be redirected to an Edit Post Portal for that particular Post. The form will be auto-populated with the current data of the Post in question. The User simply changes whichever fields they want to alter and clicks 'Edit Post' at the bottom of the form. Form validation of the front-end will ensure all fields are within tolerance. The form data will then be sent to the [ GetVocalToGov API ](https://github.com/bbeckenb/GetVocalToGov) which will perform its own schema validation, then if all data is within tolerance, store the record updates in the database. The updated instance will immediately be able for viewing on the 'Posts Feed' or 'Posts Created' list. 

**Edit Post Portal**
![Edit Post](src/images/editPost.png)

<a name="DeletePost"></a>

#### Deleting Post
To delete a Post, the User has to have ownership (they must have created the Post to have ownership) of the Post in question. If they do, they will see an option to 'Delete' at the bottom of the Post:

**Owned Post Example**
![Owned Post](src/images/postOwned.png)

If they click this 'Delete' button, the Post id along with the user token (to check for ownership) will be sent to [ GetVocalToGov API ](https://github.com/bbeckenb/GetVocalToGov). If they have ownership and the record exists, it will be deleted from the database, the front-end will be informed and updated by removing the Post in question.

<a name="FilterPosts"></a>

#### Filtering Posts
There are three Post Lists on the app that allow a User to filter the Posts. The first is by navigating to the Posts feed by clicking 'Posts' on the navbar or under the 'Options' drop-down on the home page. The second is by navigating to the 'Profile' page and selecting the 'Posts Created' tab on the secondary navbar. The third is by navigating to the 'Profile' page and selecting the 'Posts Bookmarked' tab on the secondary navbar. For the second two, you need to be logged in.

**Navigating to Posts Feed**
![Home Options](src/images/homeOptions.png)

**Posts Feed**: Posts Feed displays all Posts from all Users
![Posts Feed](src/images/postsFeed.png)

**Posts Created**: Posts Created shows a logged in User all of the Posts they have personally created
![Posts Created](src/images/postsCreated.png)

**Posts Bookmarked**: Posts Bookmarked shows a logged in User all of the Posts they have bookmarked (more on that later)
![Posts Bookmarked](src/images/postsBookmarked.png)

The behavior is the same in all locations, but to explain the process we will go through the 'Posts Feed'. Once on the Posts Feed (accessible to Users and non-Users, as is the 'Search for Post' functionality), the User will see the drop-down option to 'Search for Post'. Once clicked, this will present a 'Search Posts' form where the User can select any and all of search criteria 'title' (matching phrase), 'body' (matching phrase), 'location' (select field), and 'tag' (select field).

**Search Posts**
![Search Posts](src/images/searchPosts.png)

Once the User enters their search criteria and selects 'Search Posts' at the bottom of the form, the request will be sent to the [ GetVocalToGov API ](https://github.com/bbeckenb/GetVocalToGov). The database will be queried for records that match all filters. The resulting list will be sent and displayed on the front-end along with the search criteria in the form's alert message box.

**Search Posts Success**
![Search Posts Success](src/images/searchPostsSuccess.png)

<a name="BookmarkPost"></a>

#### Bookmarking a Posts
Bookmarking, in this context, is a Request meant to allow a User to tag a Post of interest to be more easily accessed when they want to find it again at a later time. This is a Request only accessible to a logged-in User. When logged-in viewing Posts, the User will see a yellow bookmark icon on all Posts. If it is outlined, the Post has not been tagged, if it is filled in, the Post has been tagged. The user can toggle bookmarked status by clicking on the icon button.

**Post unbookmarked**
![Post unbookmarked](src/images/unBookmarked.png)

**Post bookmarked**
![Post bookmarked](src/images/bookmarked.png)

For ease of finding a User's bookmarked Posts, the User simply has to navigate to their 'Profile' page and select 'Posts Bookmarked' on the secondary navbar. This will show the User a list of their Bookmarked posts from most recently created to least recently created.

**Posts Bookmarked List**
![Posts Bookmarked](src/images/postsBookmarked.png)

<a name="PostDetails"></a>

#### Post Details
Post Details are available to logged-in Users and non logged-in visitors. When viewing a Post, there will always be a 'Details' button available at the bottom. Clicking upon this will bring the User to a Post Details page for that particular Post. This will show the Post in question, a Template Creation Portal for that particular Post, and a list of all Templates (more on these shortly) currently associated with that Post. 

**Post Details**
![Posts Details](src/images/postDetails.png)

You can create a new Template you want associated to the Post you are viewing the details of by expanding the 'Create New Template For This Post' drop-down, filling out and submitting the form! Probably a helpful time to explain what a Template is, Template Requests section is right below this.

**Post Details Create Related Template**
![Posts Details](src/images/postDetailsCreateTemplate.png)

<a name="TemplateRequests"></a>

### Template Requests
A Template, in this context, is a User generated title and body of an email one would send to their Representative. Here is a sample [reference](https://www.nlacrc.org/home/showdocument?id=272) of how one could structure Template content. Users can create Templates on a [Post's details page](#PostDetails) in relation to that Post or independently unattached to a Post. They can then update and/or delete Templates they own. All Users can read and favorite/unfavorite Templates from the Template feed. They consist of a title, body (to assert whatever the Post is about), and created_at (timestamp). 

**Template Example**
![Template](src/images/Template.png)

<a name="AddTemplate"></a>

#### Adding a Template
There are three locations that allow a User to create a new Template. The first is by navigating to the Templates feed by clicking 'Templates' on the navbar or under the 'Options' drop-down on the home page. The second is by navigating to the 'Profile' page and selecting the 'Templates Created' tab on the secondary navbar. The third is on a [Post's details page](#PostDetails).

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
