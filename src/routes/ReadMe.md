# API Endpoints

# HandyMen Routes

1. GET all handymen
> Get a list of all handymen.

GET  /handymen/handymen

2. GET handymen by specific genre ID
> Get a list of handymen by a specific genre ID.

GET  /handymen/genre/:genreId

3. GET a specific handyman by ID
> Get details of a specific handyman by ID.

GET  /handymen/:id




> GET http://localhost:3000/dashboard/personalData?role=user&id=1

> GET http://localhost:3000/dashboard/personalData?role=handyman&id=2

> GET http://localhost:3000/dashboard/personalData?role=company&id=3

```
PATCH http://localhost:3000/dashboard/personalData?role=user&id=1
 Content-Type: application/json
  {
  "firstName": "John",
  "lastName": "Doe",
  "age": 30
}
```
```
PATCH http://localhost:3000/dashboard/personalData?role=handyman&id=2
Content-Type: application/json

{
  "firstName": "Mike",
  "lastName": "Smith",
  "hourlyRate": 50.5
}
```
```

PATCH http://localhost:3000/dashboard/personalData?role=company&id=3
Content-Type: application/json

{
  "name": "New Company Name",
  "numberOfEmployes": "1000"
}
```
When using the `PATCH` request to update personal data for users, handymen, or companies, the users can update specific fields of their profiles. The exact fields that can be updated depend on the data model and the API design. Based on the provided models, here are the fields that can be updated for each role:

1. **User:**
   - `username`
   - `password`
   - `phoneNumber`
   - `languages`
   - `alt`
   - `long`

Example `PATCH` request to update user data:
```json
PATCH http://localhost:3000/dashboard/personalData?role=user&id=1
Content-Type: application/json

{
  "username": "new_username",
  "password": "new_password",
  "phoneNumber": "9876543210",
  "languages": "English, Spanish",
  "alt": "12.3456",
  "long": "-98.7654"
}
```

2. **Handyman:**
   - `firstName`
   - `lastName`
   - `password`
   - `age`
   - `email` (Not recommended to be updated as it's used as the primary key)
   - `phoneFLOAT`
   - `yearsOfExperience`
   - `hourlyRate`
   - `alt`
   - `long`
   - `rating`
   - `description`
   - `languages`

Example `PATCH` request to update handyman data:
```json
PATCH http://localhost:3000/dashboard/personalData?role=handyman&id=2
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "age": 35,
  "phoneFLOAT": "9876543210",
  "yearsOfExperience": 7,
  "hourlyRate": 60.0,
  "alt": "12.3456",
  "long": "-98.7654",
  "rating": 4.5,
  "description": "Experienced handyman",
  "languages": "English, French"
}
```

3. **Company:**
   - `name`
   - `password`
   - `numberOfEmployes`
   - `rating`
   - `email` (Not recommended to be updated as it's used as the primary key)
   - `phoneNumber`
   - `alt`
   - `long`
   - `description`

Example `PATCH` request to update company data:
```json
PATCH http://localhost:3000/dashboard/personalData?role=company&id=3
Content-Type: application/json

{
  "name": "New Company Name",
  "numberOfEmployes": "5000",
  "rating": 4.8,
  "phoneNumber": "9876543210",
  "alt": "12.3456",
  "long": "-98.7654",
  "description": "A leading company in the industry"
}
```


