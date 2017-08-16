# Item Catalog - PHOTOBOMB

Photo sharing application that allows users to share photos in a variety of categories.

I split this project into 2 parts:

-  Python-Flask API (backend server)
  Endpoints: Categories, Photos, Session, Users
-  React-Redux (frontend application)

Please see the live project at:

https://photobombapp.herokuapp.com/

### Prerequisites

-  Python 2.7
-  Postgres
-  Node 5.12.0

## Contents

1. database/
  * contains the database files for the python application

2. public/
  * contains the compiled pages for the frontend react-app

3. react-app/
  * contains the source code for the Item Catalog frontend application

4. routes/
  * Python-Flask code for API endpoints

### Linux Server information:

  * IP Address: 34.209.35.255
  * URL: photobomb.courtneynoonan.com

  * Software Installed:
	* Finger
	* Apache2
	* git
	* ntp
	* postgresql
	* mod_wsgi

  * Configuration:
	* Apache2 configured to serve a Python mod_wsgi application

  * To access the server:

```
ssh grader@34.209.35.255 -p 2200 -i [RSA_KEY]
```

