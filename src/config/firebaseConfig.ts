import admin from 'firebase-admin';
import * as serviceAccount from '../../auth-and-facebook-firebase-adminsdk-2s27n-d7261c8bd1.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: 'gs://auth-and-facebook.appspot.com',
});

export default admin;
