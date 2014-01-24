var app = require("../app")
, should = require('should')
, request = require('supertest')(app)

describe('Translator controller', function(){
  it('should respond to /{locale} by GET', function(done){
    request.get('/en').expect(200, done)
  })

  it('should respond to /{locale} by POST', function(done){
    request.post('/en').expect(200, done)
  })

  it('should return a JSON by GET', function(done){
    request.get('/en').expect(200).expect('Content-Type', /json/, done)
  })

  it('should return a JSON by POST', function(done){
    request.post('/en').expect(200).expect('Content-Type', /json/, done)
  })

  it('should translate "hello" by GET', function(done){
    request.get('/en?l=hello').expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res){
      data = res.body
      data.should.have.property('hello')
      done()
    })
  })
  
  it('should translate "hello" by POST', function(done){
    request.post('/en').send({ l : "hello"})
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res){
      data = res.body
      data.should.have.property('hello')
      done()
    })
  })

  it('should translate "hello" and "bye" in the same request by GET', 
      function(done){
        request.get('/en?l=hello,bye').expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          data = res.body
          data.should.have.property('hello')
          data.should.have.property('bye')
          done()
        })
      })

  it('should translate "hello" and "bye" in the same request by POST',
      function(done){
        request.post('/en').send({ l : ["hello", "bye"]})
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res){
            data = res.body
            data.should.have.property('hello')
            data.should.have.property('bye')
            done()
          })
      })

  it('should respond with a part of locale by GET', function(done){
    request.get('/en?l=views.partials.navbar').expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          data = res.body['views.partials.navbar']
          data.should.have.property('title')
          done()
        })
  })

  it('should respond with a part of locale by POST', function(done){
    request.post('/en').send({l: "views.partials.navbar"}).expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          data = res.body['views.partials.navbar']
          data.should.have.property('title')
          done()
        })
  })

  it('should respond with 404 for invalid locale', function(done){
    request.get('/xyz').expect(404, done)
  })
})
