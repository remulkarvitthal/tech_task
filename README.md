# tech_task
The app is developed using React, Node.js, express, typescript and mongodb
Mongodb shoud be up and running on default port without any credentials as prerequisite.

Create a .env file and paste the following code 
```
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/node-ts-boilerplate
```

Run the below command to run the server
```
cd server
npm install
npm run start
```

Run the below command to run the client
```
cd client
npm install
npm run start
```

Below are the endpoint:
CRUD endpoint to get the property details:
Create:
```
curl --request POST \
  --url http://localhost:8989/v1/agents/manageAgent \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "vitthal4",
  "email": "vitthal4@gmail.com",
  "password": "password123",
  "companyName": "lodha"
}'

Get:
curl --request GET \
  --url http://localhost:8989/v1/property/manageProperty \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "Genesis Apartment 2",
  "description": "Shobha builder",
  "type": "Apartment",
  "bedrooms": 2,
  "bathrooms": 1,
  "price": 1000000,
  "squareFeet": 50,
  "location": "pu",
  "isAvailable": true,
  "agentId": "650ae6a5f0549858f40aeedc",
	"imageLink": "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg"
}'

curl --request GET \
  --url 'http://localhost:8989/v1/property/manageProperty?propertyId=650b33f6351598a8ca41dec5' \
  --header 'Content-Type: application/json'

Update:
curl --request PATCH \
  --url 'http://localhost:8989/v1/property/manageProperty?propertyId=650b6492bc08df0123242af6' \
  --header 'Content-Type: application/json' \
  --data '{
        "name": "RK builder",
        "description": "RK builder",
        "agentId": "650c11c0a437233927aefe82"
    }'

Delete: 
curl --location --request DELETE 'localhost:8989/v1/property/manageAgent?propertyId=650b6492bc08df0123242af6'

Below are the endpoint:
CRUD endpoint to get the Agent details:
Create agent
curl --request POST \
  --url http://localhost:8989/v1/agents/manageAgent \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "vitthal4",
  "email": "vitthal4@gmail.com",
  "password": "password123",
  "companyName": "lodha"
}'

Get

curl --request GET \
  --url 'http://localhost:8989/v1/agents/manageAgent?agentId=650b33f6351598a8ca41dec5' \
  --header 'Content-Type: application/json'

Update:
curl --request PATCH \
  --url 'http://localhost:8989/v1/agents/manageAgent?agentId=650b6492bc08df0123242af6' \
  --header 'Content-Type: application/json' \
  --data '{
       "companyName": "lodha"
    }'

Delete: 
curl --location --request DELETE 'localhost:8989/v1/agents/manageAgent?agentId=650b6492bc08df0123242af6'
```
