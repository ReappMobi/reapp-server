import admin from 'firebase-admin';
import * as serviceAccount from '../../auth-and-facebook-firebase-adminsdk-2s27n-c9588b416b.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: 'gs://auth-and-facebook.appspot.com',
});

export default admin;
