const request = require('supertest')
const chai = require('chai')
const app = require('../App')
const users = require('../models/users')
const sinon = require('sinon')
const nodemailer = require('nodemailer')

const expect = chai.expect

describe('Authentication test cases', function() {
    
    describe('POST /register', function() {

        before('Drop collection', function(done) {
            users.deleteMany({})
            .then(() => {
                const transport = {
                    sendMail:() => Promise.resolve()
                }
                mailerStub = sinon.stub(nodemailer,'createTransport').returns(transport)
            })
            .then(() => done())
            .catch((error) => done(error))
        })

        it('should register successful', function(done) {
            request(app).post('/api/auth/register')
            .send({
                email:'testabc@gmail.com',
                username:"testuser",
                password:'12345678'
            })
            .end((err,res) => {
                console.log(err)
                console.log(res.body)
                expect(res.body.message).equal('registered successful')
                expect(res.body.data.email).equal('testabc@gmail.com')
                expect(res.body.data.username).equal('testuser')
                expect(res.body.data).not.have.property('password')
                done(err)
            })
        })
        it('should register failed when email is not provided', function(done) {
            request(app).post('/api/auth/register')
            .send({
                username:"123",
                password:'1234'
            })
            .end((err,res) => {
                expect(res.body.message).equal('register failed')
                expect(res.body.error).equal('email, username or password is not found')
                done(err)
            })
        })
    })

    describe('POST /login', function() {

        it('should login successfully', function(done) {
            request(app).post('/api/auth/login')
            .send({
                email:'testabc@gmail.com',
                password:'12345678'
            })
            .end((err,res) => {
                console.log(err)
                console.log(res.body)
                expect(res.body.message).equal('login successful')
                expect(res.body).have.property('access_token')
                expect(res.body).not.have.property('password')
                done(err)
            })
        })
        it('should login fail when invalid password is provided', function (done) {
            request(app).post('/api/auth/login')
              .send({
                email: 'testabc@gmail.com',
                password: 'invalid'
              })
              .end((err, res) => {
                expect(res.body.message).equal('login failed')
                expect(res.body.error).equal('invalid password')
                done(err)
              })
          })
        })
      })