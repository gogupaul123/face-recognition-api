const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');


app.use(express.json());
app.use(express.urlencoded());

const database = {
    users: [
        {
            id: '1',
            name: 'john',
            email: 'john@gmail.com',
            password: 'john',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'sally',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            has: '',
            email: 'john@gmail.com'
        }
    ]
}

app.listen(3000, () => {
    console.log('App is running on port 3000')
});

/*
/ ==> response=this is working
/signin ==> POST request-> success/fail
/register ==> POST request -> new user info object
/profile/:userId --> GET request -> user information
/image --> PUT request -> count of rank
*/



//ENTRIES

app.get('/', (request, response) => {
    response.send(database.users)
})

app.post('/signin', (req, resp) => {
    bcrypt.compare('ann', '$2a$10$1RvhxTptK5tNVZ2iM246SuerW8b/7dtEAPTpHYYNo4ak/alOpdZWO', (err, response) => {
        console.log('1 it matches', response)
    })
    bcrypt.compare('anna', '$2a$10$1RvhxTptK5tNVZ2iM246SuerW8b/7dtEAPTpHYYNo4ak/alOpdZWO', (err, response) => {
        console.log('2  ', response)
    })
    if (req.body.email === database.users[0].email
        && req.body.password === database.users[0].password) {
        resp.json('successfully logged in')
    }
    else {
        resp.status(404).json('User not found')
    }
})
app.post('/register', (req, resp) => {
    const { email, name, password } = req.body;
    bcrypt.hash(password, null, null, (err, hash) => {
        console.log(hash)
    });
    database.users.push({
        id: '3',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    resp.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, resp) => {
    const { id } = req.params;

    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return resp.json(user)
        }
    })
    if (!found) {
        resp.status(404).json('user not found')
    }
})

app.post('/image', (req, resp) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return resp.json(user.entries)
        }
    })
    if (!found) {
        resp.status(404).json('user not found')
    }
})



