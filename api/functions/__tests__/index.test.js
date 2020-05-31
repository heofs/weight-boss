const request = require('supertest');
const functions = require('firebase-functions-test');
const admin = require('firebase-admin');
const firebase = require('firebase');

require('dotenv').config();

const testUserUid = 'testUid';

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

  const purgeWeightsCollection = async () => {
    const docs = await request(api)
      .get('/getData')
      .set('authorization', `Bearer ${idToken}`);
    const promises = docs.body.map((obj) =>
      request(api)
        .delete('/deleteWeight')
        .set('authorization', `Bearer ${idToken}`)
        .set('Accept', 'application/json')
        .send({ id: obj.id })
    );
    await Promise.all(promises);
  };

  beforeAll(async () => {
    await firebase.initializeApp({
      apiKey: process.env.API_KEY,
      authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
      databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
      projectId: `${process.env.PROJECT_ID}`,
      storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
    });
    const token = await admin.auth().createCustomToken(testUserUid);
    await firebase.auth().signInWithCustomToken(token);
    idToken = await firebase.auth().currentUser.getIdToken();
  });

  afterAll(async () => {
    await purgeWeightsCollection();
  });

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

  describe('Inserting and deleting data', () => {
    let newWeightId;
    it('should be able to insert a new weight', async () => {
      const timeStamp = Math.round(new Date().getTime() / 1000);
      const newWeight = 76.8;
      const res = await request(api)
        .post('/addWeight')
        .set('authorization', `Bearer ${idToken}`)
        .set('Accept', 'application/json')
        .send({ weight: newWeight, dateTime: timeStamp });

      expect(res.statusCode).toBe(201);
      expect(res.body.weight).toEqual(newWeight);
      expect(res.body.dateTime).toEqual(timeStamp);
      newWeightId = res.body.id;
    });

    it('should return status 400 when weight is missing', async () => {
      const timeStamp = Math.round(new Date().getTime() / 1000);
      const res = await request(api)
        .post('/addWeight')
        .set('authorization', `Bearer ${idToken}`)
        .set('Accept', 'application/json')
        .send({ dateTime: timeStamp });

      expect(res.statusCode).toBe(400);
    });

    it('should return status 400 when date is missing', async () => {
      const newWeight = 76.8;
      const res = await request(api)
        .post('/addWeight')
        .set('authorization', `Bearer ${idToken}`)
        .set('Accept', 'application/json')
        .send({ weight: newWeight });

      expect(res.statusCode).toBe(400);
    });

    it('should delete given weight document when given id', async () => {
      const res = await request(api)
        .delete('/deleteWeight')
        .set('authorization', `Bearer ${idToken}`)
        .set('Accept', 'application/json')
        .send({ id: newWeightId });

      expect(res.statusCode).toBe(204);
    });
  });

  describe('Getting data', () => {
    beforeEach(async () => {
      await purgeWeightsCollection();
    });

    it('should return an empty array when no data is present', async () => {
      const res = await request(api)
        .get('/getData')
        .set('authorization', `Bearer ${idToken}`)
        .set('Accept', 'application/json');

      console.log(res.body);
      expect(res.body).toEqual([]);
    });

    it('should return an array with data when data is present', async () => {
      const dateTime = new Date(2010, 5, 17).getTime();
      const weight = 76.8;
      await request(api)
        .post('/addWeight')
        .set('authorization', `Bearer ${idToken}`)
        .set('Accept', 'application/json')
        .send({ weight, dateTime });

      const res = await request(api)
        .get('/getData')
        .set('authorization', `Bearer ${idToken}`);

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            weight,
            dateTime,
          }),
        ])
      );
    });
  });
});
