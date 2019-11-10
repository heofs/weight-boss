const admin = require('firebase-admin');

// Limit: X number of requests per X minutes
const requestAmount = 200;
const minuteRange = 1;

const limitRequests = async (req, res, next) => {
  const userId = req.user.uid;

  try {
    const unixNow = parseInt(new Date().getTime() / 1000);
    const queryTime = new admin.firestore.Timestamp(
      unixNow - minuteRange * 60,
      0
    );

    // Add request to db
    admin
      .firestore()
      .collection('requests')
      .add({ userId, dateTime: admin.firestore.Timestamp.now() });

    await admin
      .firestore()
      .collection('requests')
      .where('userId', '==', userId)
      .where('dateTime', '>', queryTime)
      .get()
      .then((snapshot) => {
        const data = [];
        if (snapshot.empty) {
          next();
          return;
        }
        snapshot.forEach((doc) => data.push({ id: doc.id }));
        if (data.length > requestAmount) {
          throw new Error('Too many requests');
        }
        next();
        return;
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  } catch (error) {
    console.log('Error: ', error.message);
    res.status(429).send('Too many requests');
  }
};

module.exports = limitRequests;
