# Backend
Backend Processing, API and DB

## Local Deploy:

`npm install`
update credentials.js and configure postgres DB
put email credentials into mailer.js
`npm install -g nodemon`
`nodemon`
visit localhost:8081

## Demo: 
https://backend4dvw.herokuapp.com

## Temporary Folders:
/public
/tempViews

To be replaced with React.js Redux front end

## API 

### User
```javascript
/api/user
```

Method: POST

with params email STRING, password STRING

```javascript
?email=&password=
```

registers a new user. 

Method: PUT

with params: password STRING
```javascript
?password=
```
Updates user password

Method: GET

with params: email STRING
``` javascript
?email=
```

Gets a single user entry

Method: DELETE

Deletes single user entry and all child project, unit, room and parking entries.

```javascript
/api/user/login?email=&password=
```
Method: GET

Logs user in

```javascript
/api/user/logout
```
Method: PUT
 
Logs user out

```javascript
/api/user/activate?email=&token=
```

Method: GET

with params: email STRING, token STRING


Activates user account

```javascript 
/api/user/recover?email=
```

Method: GET

with params: email STRING

Method: GET

sends an email with a password recovery url

```javascript
/api/user/passwordreset?email=&token=
```

Method: GET

with params: email STRING, token STRING

gets a new password in response

### Project

```javascript
/api/project
```

Method: POST

with params project_name STRING, latitude FLOAT (valid latitude), longitude FLOAT (valid longitude), address STRING 

```javascript
?project_name=&latitude=&longitude=&address=
```

Creates a single project entry

Method: PUT

with params uuid(project) STRING, project_name STRING, latitude FLOAT (valid latitude), longitude FLOAT (valid longitude), address STRING 

```javascript
?uuid=&project_name=&latitude=&longitude=&address=
```

Updates a single project entry

Method: GET

Gets all project entries for user

Method: DELETE

with params uuid(project)

```javascript
?uuid=
```

Deletes a single project entry and all dependant unit, room and parking entries

```javascript
/api/project/recent
```

Method: GET

Gets array of 3(or less) most recently created projects for a user

```javascript
/api/project/next
```

Method: GET

with params id (project) INT,

``` javascript
?id=
```

Gets array of 3(or less) next most recently created projects for a user


```javascript
/api/project/next
```

Method: GET

with params id (project) INT,

``` javascript
?id=
```

Gets array of 3 recently created projects for a user

### Units

```javascript
/api/unit
```
Method: POST

with params uuid(project) STRING, unit_name STRING, unit_type STRING (optional), description STRING (optional),  ac STRING (optional), heat STRING (optional), floor INT (optional), taxes STRING (optional), square_feet INT (optional)

``` javascript
?uuid=&unit_name= (...)
```

Creates a single unit entry

Method: PUT

with params uuid(unit) STRING, unit_name STRING, unit_type STRING, description STRING,  ac STRING, heat STRING, floor INT, taxes STRING, square_feet INT 

``` javascript
?uuid=&unit_name= (...)
```

Updates a sigle unit entry

Method: GET

with params uuid(project)

``` javascript
?uuid=
```

Gets unit entries belonging to a project

Method DELETE

with params uuid(unit)

``` javascript
?uuid=
```

Deletes a single unit entry and all dependant room and parking entries


```javascript
/api/unit/full?uuid=
```

Method: GET

with params uuid(unit)

gets single unit entry + # of rooms + # of parking + array of rooms + array of parking

```javascript
/api/unit/upload?uuid=
```

Method: POST

with params uuid(unit)

uploads a file (floorplan) to the AWS server. Access the file with URL:
https://s3.us-east-2.amazonaws.com/4dvwfloorplans/:uuid



### Parking

Method: POST

with params uuid(unit), parking_name, parking_type: 
``` javascript
?uuid=&parking_name=&parking_type= 
```

Creates single parking entry

```javascript
/api/parking
```
Method: PUT
with params uuid(parking), parking_name, parking_type: 
``` javascript
?uuid=&parking_name=&parking_type= 
```

updates single parking entry 

Method: GET

with params: uuid(unit)
``` javascript
?uuid=
```

Gets all parking entries for a certain unit

Method: DELETE

with params: uuid(parking)
``` javascript
?uuid=
```

Deletes single parking entry

### Rooms

```javascript
/api/room
```

Method: POST

with params uuid (unit) STRING, room_type (STRING), room_width (INT), room_length(INT): 
``` javascript
?uuid=&room_type=&room_width=&room_length 
```

Creates a single room entry

Method: PUT

with params uuid (room) STRING, room_type (STRING), room_width (INT), room_length(INT):
``` javascript
?uuid=&room_type=&room_width=&room_length 
```

Updates a single room entry

Method: GET

with params uuid(unit) STRING
``` javascript
?uuid=
```

Gets a room entries belonging to a unit

Method: DELETE

with params uuid(room) STRING
``` javascript
?uuid=
```

Deletes a single room entry


## Mailing
Setup email credentials in 
mailer.js

## AWS
Setup AWS upload functionality in
amazon_api.js

## PostgreSQL 9.6 Database
App requires connection to a PostgreSQL database 
Database should be empty on first run
fill in database credentials in:
credentials.js

## Sessions
express-session sessions stored in PostgreSQL database with KnexSessionStore






