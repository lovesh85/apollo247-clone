import { NextRequest, NextResponse } from 'next/server';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, limit, startAfter } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const pageSize = parseInt(searchParams.get('pageSize') || '10');
        const specialization = searchParams.get('specialization') || undefined;
        const city = searchParams.get('city') || undefined;

        let q = query(collection(db, 'doctors'));

        if (specialization) {
            q = query(q, where('specialization', '==', specialization));
        }
        if (city) {
            q = query(q, where('city', '==', city));
        }

        let lastVisible:any = null;
        if (page > 1) {
            const previousQuery = query(q, limit((page - 1) * pageSize));
            const previousDocs = await getDocs(previousQuery);
            const previousDocsArray = previousDocs.docs;
            if(previousDocsArray.length > 0){
                lastVisible = previousDocsArray[previousDocsArray.length - 1];
            }
        }

        if(lastVisible){
            q = query(q, startAfter(lastVisible), limit(pageSize))
        }else{
            q = query(q, limit(pageSize));
        }

        const querySnapshot = await getDocs(q);
        const doctors = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return new NextResponse(JSON.stringify(doctors), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error getting doctors:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}




export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse(JSON.stringify({ message: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const { id, name, specialization, address, city, state, pincode, contactNumber, about } = body;

    const docRef = await addDoc(collection(db, 'doctors'), {
      id,
      name,
      specialization,
      address,
      city,
      state,
      pincode,
      contactNumber,
      about,
    });

    return new NextResponse(JSON.stringify({ message: 'Doctor added successfully', id: docRef.id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding doctor:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}