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

## Contents

1. database/
  * contains the database files for the python application

2. public/
  * contains the compiled pages for the frontend react-app

3. react-app/
  * contains the source code for the Item Catalog frontend application

4. routes/
  * Python-Flask code for API endpoints

### To Run locally:

Clone the repo in your terminal

```
git clone https://github.com/Courtney2511/item_catalogue.git
```

create the database and role

```
createuser -l photobomb
createdb -O photobomb photobomb
```

create and seed the schema

```
python database/database_seed.py
```

run the backend

```
python photobomb.py
```

open a new terminal window and run the frontend

```
cd react-app
npm start
```

open your browser to http://localhost:8888
