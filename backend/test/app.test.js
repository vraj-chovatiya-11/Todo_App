// let chai, chaiHttp, expect;

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// before(async () => {
//   const chaiModule = await import('chai');
//   const chaiHttpModule = await import('chai-http');

//   chai = chaiModule.default;
//   chaiHttp = chaiHttpModule.default;
//   expect = chai.expect;

//   chai.use(chaiHttp);
// });

// describe("API testing", () => {
//   it("User registered successfully...", async () => {
//     const res = await chai.request("http://localhost:5000")
//       .post("/api/auth/register")
//       .send({
//         username: "TestUser",
//         email: "testuser@gmail.com",
//         password: "Test@123"
//       });

//     console.log("res.body for register user: ", res.body);

//     if (res.status === 400) {
//       expect(res.body.message).to.equal("Username is already taken");
//     } else {
//       expect(res.status).to.equal(201); // success case
//     }
//   });
// });


// const chai = require('chai');
import chai from 'chai';
const expect = chai.expect;

describe('/First test collection', function() {
    it('should test values..', function() {

    })
})