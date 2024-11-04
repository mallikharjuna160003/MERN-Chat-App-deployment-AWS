<a href="https://github.com/mallikharjuna160003/frontend-infra">frontend-infra</a>
<a href="https://github.com/mallikharjuna160003/backend-infra">backend-infra</a>

# Talk-A-Tive

Talk-a-tive is a Full Stack Chatting App.
Uses Socket.io for real time communication and stores user details in encrypted format in Mongo DB Database.
## Tech Stack

**Client:** React JS

**Server:** Node JS, Express JS

**Database:** Mongo DB
  
## Demo

[https://talk-a-tive.herokuapp.com/](https://talk-a-tive-7fgq.onrender.com)

![](https://github.com/piyush-eon/mern-chat-app/blob/master/screenshots/group%20%2B%20notif.PNG)
## Run Locally

Clone the project

```bash
  git clone https://github.com/piyush-eon/mern-chat-app
```

Go to the project directory

```bash
  cd mern-chat-app
```

Install dependencies

```bash
  npm install
```

```bash
  cd frontend/
  npm install
```

Start the server

```bash
  npm run start
```
Start the Client

```bash
  //open now terminal
  cd frontend
  npm start
```

  
# Features

### Authenticaton
![](https://github.com/piyush-eon/mern-chat-app/blob/master/screenshots/login.PNG)
![](https://github.com/piyush-eon/mern-chat-app/blob/master/screenshots/signup.PNG)
### Real Time Chatting with Typing indicators
![](https://github.com/piyush-eon/mern-chat-app/blob/master/screenshots/real-time.PNG)
### One to One chat
![](https://github.com/piyush-eon/mern-chat-app/blob/master/screenshots/mainscreen.PNG)
### Search Users
![](https://github.com/piyush-eon/mern-chat-app/blob/master/screenshots/search.PNG)
### Create Group Chats
![](https://github.com/piyush-eon/mern-chat-app/blob/master/screenshots/new%20grp.PNG)
### Notifications 
![](https://github.com/piyush-eon/mern-chat-app/blob/master/screenshots/group%20%2B%20notif.PNG)
### Add or Remove users from group
![](https://github.com/piyush-eon/mern-chat-app/blob/master/screenshots/add%20rem.PNG)
### View Other user Profile
![](https://github.com/piyush-eon/mern-chat-app/blob/master/screenshots/profile.PNG)

# load balancer health check endpoint

```js
//server.js
app.get('/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    console.log(dbState);
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date(),
      database: dbState === 1 ? 'connected' : 'disconnected',
      service: 'running'
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

// for cors
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  transports: ["websocket"],
  cors: {
    origin: "*",  // This allows all origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
  },
});

```



# Changes in Backend 
Updated the Backend DB code

```js
//config/db.js
   // Construct the connection string with database name 'chatapp'
    const conn = await mongoose.connect(`mongodb://${username}:${password}@${endpoint}:${port}/${databaseName}?tls=true&tlsCAFile=./global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&tlsAllowInvalidHostnames=true&directConnection=true`,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      sslValidate: false,
      connectTimeoutMS: 10000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000, // Increase the timeout to 20 seconds
    });

 config/db.js add these in the end.

// Listen for Mongoose connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
    dbConnected = true; // Ensure this is set when connected
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from DB');
    dbConnected = false; // Reset when disconnected
});

mongoose.connection.on('error', (error) => {
    console.error(`Mongoose connection error: ${error}`);
});
```
in server.js

```js
in server.js  below required  for health check
const mongoose = require("mongoose"); 

```
# environment variables backend
```
PORT=5000
#MONGO_URI="mongodb://localhost:27017/chatapp"
JWT_SECRET=piyush
username=monster
password=SecretPass123
CERT_PATH=global-bundle.pem
DOCDB_ENDPOINT=localhost
DB_DATABASE=BurgetKings
```


# Testing locally
register:
```sh
curl -X POST http://localhost:5000/api/user -H "Content-Type: application/json" -d '{"name":"test","email": "testuser@example.com", "password": "123456"}'

```
Login:
```sh
curl -X POST http://localhost:5000/api/user/login -H "Content-Type: application/json" -d '{"email": "testuser@example.com", "password": "123456"}'
```



