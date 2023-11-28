import { initializeApp, getApps, cert } from 'firebase-admin/app'
import * as admin from 'firebase-admin'

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENTEMAIL,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(
      /\\n/g,
      '\n',
    ),
  }),
}

// if (!admin.app.length) {
//   admin.initializeApp(firebaseAdminConfig)
// }

export function adminInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig)
  }
}

export { admin }
