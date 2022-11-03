const {faker} = require("@faker-js/faker");
const express = require("express");
const app = express();
const port = 8000;
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

const createUser = () => {
    const newUser = {
        password: faker.internet.password(),
        email: faker.internet.email(),
        phone_number: faker.phone.number("###-###-###"),
        last_name: faker.name.lastName(),
        first_name: faker.name.firstName(),
        id: faker.database.uuid
    }
    return newUser
}

const createCompany = () => {
    const newCompany = {
        id: faker.database.uuid,
        name: faker.company.name(),
        address: {
            street: faker.address.street(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipcode: faker.address.zipCode("#####"),
            country: faker.address.country()
        }
    }
    return newCompany
}

app.get("/api/users/new", (req, res) => {
    res.json({
        user: createUser()
    });
});

app.get("/api/companies/new", (req,res) => {
    res.json({
        company: createCompany()
    })
})

app.get("/api/user/company", (req, res) => {
    res.json({
        user: createUser(),
        company: createCompany()
    })
})

// this needs to be below the other code blocks
app.listen( port, () => console.log(`Listening on port: ${port}`) );
