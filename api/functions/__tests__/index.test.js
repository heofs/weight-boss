const request = require('supertest');
const functions = require('firebase-functions-test');
const admin = require('firebase-admin');
const firebase = require('firebase');

require('dotenv').config();

describe('API', () => {
  let idToken;
  const mockSet = jest.fn();
  mockSet.mockReturnValue(true);
  functions(
    {
      apiKey: process.env.API_KEY,
      databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
      projectId: `${process.env.PROJECT_ID}`,
      storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
    },
    process.env.SERVICE_KEY_LOCATION
  );
  const { api } = require('../index');

  beforeAll(async () => {
    await firebase.initializeApp({
      apiKey: process.env.API_KEY,
      authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
      databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
      projectId: `${process.env.PROJECT_ID}`,
      storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
    });
    const token = await admin.auth().createCustomToken('testUid');
    await firebase.auth().signInWithCustomToken(token);
    idToken = await firebase.auth().currentUser.getIdToken();
  });

  // it("", async () => {})
  it('should return status OK from /status', async () => {
    const res = await request(api).get('/status');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toEqual('OK');
  });

  describe('Authentication', () => {
    it('should return status 200 when authenticated', async () => {
      const res = await request(api)
        .get('/getData')
        .set('authorization', `Bearer ${idToken}`);
      expect(res.statusCode).toBe(200);
    });

    it('should return 403 when no auth headers are set', async () => {
      const res = await request(api).get('/getData');
      expect(res.statusCode).toBe(403);
    });

    it('should return status 403 when invalid token', async () => {
      const invalidToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBE\
        b2UifQ.DjwRE2jZhren2Wt37t5hlVru6Myq4AhpGLiiefF69u8`;
      const res = await request(api)
        .get('/getData')
        .set('authorization', `Bearer ${invalidToken}`);
      expect(res.statusCode).toBe(403);
      expect(res.text).toBe('Unauthorized: Invalid token.');
    });
  });

  describe.only('Inserting and deleting data', () => {
    let newWeightId;
    it('should be able to insert a new weight', async () => {
      const timeStamp = Math.round(new Date().getTime() / 1000);
      const newWeight = 76.8;
      const res = await request(api)
        .post('/addWeight')
        .send({ weight: newWeight, dateTime: timeStamp })
        .set('authorization', `Bearer ${idToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toBe(201);
      expect(res.body.weight).toEqual(newWeight);
      expect(res.body.dateTime).toEqual(timeStamp);
      newWeightId = res.body.id;
    });

    it('should return status 400 when weight is missing', async () => {
      const timeStamp = Math.round(new Date().getTime() / 1000);
      const res = await request(api)
        .post('/addWeight')
        .send({ dateTime: timeStamp })
        .set('authorization', `Bearer ${idToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toBe(400);
    });

    it('should return status 400 when date is missing', async () => {
      const newWeight = 76.8;
      const res = await request(api)
        .post('/addWeight')
        .send({ weight: newWeight })
        .set('authorization', `Bearer ${idToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toBe(400);
    });

    it('should delete given weight document when given id', async () => {
      const res = await request(api)
        .delete('/deleteWeight')
        .send({ id: newWeightId })
        .set('authorization', `Bearer ${idToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toBe(204);
    });
  });

  // describe('Getting data', () => {

  // });

  // it("should be able to add new weight", () => {
  //   const res = await request(api)
  //   .get('/getData')
  //   .set('authorization', `Bearer ${idToken}`);
  // })
});
