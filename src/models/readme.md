http://localhost:3000/experties    first step- post 
{ "name": "electrican" }
output {
  "id": 4,
  "name": "electrican",
  "updatedAt": "2023-08-10T09:51:05.369Z",
  "createdAt": "2023-08-10T09:51:05.369Z"
}

step 2 http://localhost:3000/signuphandyman step- post 
{
  "username": "alaa",
  "email": "alla@gmail.com",
  "password": "123",
  "phoneNumber": "1234567890",
  "role": "handyman",
   "genreId": "4", ::::::::::::::::::
  "firstName": "laith",
  "lastName": "Saleem",
  "age": "24",
  "phoneFLOAT": "0796817792",
  "hourlyRate": "15",
  "alt": "213123123123123",
  "long": "123123123123123",
  "rating": "5",
  "description": "likes elctricity ",
  "languages": "arabic"

}
http://localhost:3000/dashupdate?role=handyman&id=2 patch

{
 "lastName": "Saleem",
  "age": 24,
  "email": "asdad@gmail.com",
  "phoneFLOAT": 796817792,
  "yearsOfExperience": 1,
  "hourlyRate": 15,
  "alt": "213123123123123",
  "long": "123123123123123",
  "rating": 5,
  "description": "likes elctricity ",
  "genreId": 2,
  "languages": "arabic",
  "role": "handyman"
}
http://localhost:3000/dashboard?role=handyman&id=2 get

http://localhost:3000/experties/:id/handymen    get 
output {
  "experty": {
    "id": 2,
    "name": "carpenter",
    "createdAt": "2023-08-10T09:50:29.503Z",
    "updatedAt": "2023-08-10T09:50:29.503Z"
  },
  "handymenInGenre": [
    {
      "capabilities": [
        "read",
        "create",
        "update",
        "delete"
      ],
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbWEiLCJpYXQiOjE2OTE2NjMzOTl9.lzHj53dGyzaLgRvvMtgY_2l1SZip67j10X8iJMEWuog",
      "id": 4,
      "username": "rama",
      "firstName": "laith",
      "password": "$2b$10$L2cw.LHuYdWPNAiMoshRHu/vPp4cH1f51dm7F9C2oiYsCxBq3/tvy",
      "lastName": "Saleem",
      "age": 24,
      "email": "asdadads@gmail.com",
      "phoneFLOAT": 796817792,
      "yearsOfExperience": 1,
      "hourlyRate": 15,
      "alt": "213123123123123",
      "long": "123123123123123",
      "rating": 5,
      "description": "likes elctricity ",
      "genreId": 2,
      "languages": "arabic",
      "role": "handyman",
      "createdAt": "2023-08-10T09:54:36.509Z",
      "updatedAt": "2023-08-10T09:54:36.509Z"
    },
    {
      "capabilities": [
        "read",
        "create",
        "update",
        "delete"
      ],
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhc2hhciIsImlhdCI6MTY5MTY2MzM5OX0.YAPDO-tYMUWwWczQ25loD6SrfM3uFEeFv1fEKXVC5xM",
      "id": 5,
      "username": "bashar",
      "firstName": "laith",
      "password": "$2b$10$1eLNBuwREzB5r2DiSwRKyOaJTME3s41xQ79rOq62oPWTrsaOXP/Ly",
      "lastName": "Saleem",
      "age": 24,
      "email": "sadasd@gmail.com",
      "phoneFLOAT": 796817792,
      "yearsOfExperience": 1,
      "hourlyRate": 15,
      "alt": "213123123123123",
      "long": "123123123123123",
      "rating": 5,
      "description": "likes elctricity ",
      "genreId": 2,
      "languages": "arabic",
      "role": "handyman",
      "createdAt": "2023-08-10T09:54:50.949Z",
      "updatedAt": "2023-08-10T09:54:50.949Z"
    },
    {
      "capabilities": [
        "read",
        "create",
        "update",
        "delete"
      ],
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhaXRoIiwiaWF0IjoxNjkxNjYzMzk5fQ.8u7H7R9YNp-KI9dNifVm1aWk8TLpL6DVlWQMunZjj1c",
      "id": 2,
      "username": "laith",
      "firstName": null,
      "password": "$2b$10$8fxPlVhJ48cqigGU961vpO/ZzmEOU39CrnBg8ESNqv7Vdccdquw9q",
      "lastName": "Saleem",
      "age": 24,
      "email": "asdad@gmail.com",
      "phoneFLOAT": 796817792,
      "yearsOfExperience": 1,
      "hourlyRate": 15,
      "alt": "213123123123123",
      "long": "123123123123123",
      "rating": 5,
      "description": "likes elctricity ",
      "genreId": 2,
      "languages": "arabic",
      "role": "handyman",
      "createdAt": "2023-08-10T09:52:23.572Z",
      "updatedAt": "2023-08-10T10:01:41.106Z"
    }
  ]
}
  
http://localhost:3000/handymen/genre/:id     get 
output  "capabilities": [
      "read",
      "create",
      "update",
      "delete"
    ],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxhaXRoIiwiaWF0IjoxNjkxNjYzNDUwfQ.81Wp3N_gfto3aDs1bbjPYv6VKHitwReB23XhgxcIsPk",
    "id": 3,
    "username": "Laith",
    "firstName": "laith",
    "password": "$2b$10$r7/dwJWsb3quA3zm9/MQe.v2GrsunBiqiyJORHfRQhKpxQN7NLNNK",
    "lastName": "Saleem",
    "age": 24,
    "email": "asd@gmail.com",
    "phoneFLOAT": 796817792,
    "yearsOfExperience": 1,
    "hourlyRate": 15,
    "alt": "213123123123123",
    "long": "123123123123123",
    "rating": 5,
    "description": "likes elctricity ",
    "genreId": 4,
    "languages": "arabic",
    "role": "handyman",
    "createdAt": "2023-08-10T09:54:20.112Z",
    "updatedAt": "2023-08-10T09:54:20.112Z"
  }