
import { db, storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { Registration } from '@/types/registration';

const REGISTRATIONS_COLLECTION = 'registrations';

export const addRegistration = async (registration: Omit<Registration, 'id' | 'created_at'>) => {
  try {
    const docRef = await addDoc(collection(db, REGISTRATIONS_COLLECTION), {
      ...registration,
      created_at: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding registration:', error);
    throw error;
  }
};

export const getRegistrations = async (): Promise<Registration[]> => {
  try {
    const q = query(collection(db, REGISTRATIONS_COLLECTION), orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Registration[];
  } catch (error) {
    console.error('Error fetching registrations:', error);
    throw error;
  }
};

export const deleteRegistration = async (id: string) => {
  try {
    await deleteDoc(doc(db, REGISTRATIONS_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting registration:', error);
    throw error;
  }
};

export const subscribeToRegistrations = (callback: (registrations: Registration[]) => void) => {
  const q = query(collection(db, REGISTRATIONS_COLLECTION), orderBy('created_at', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const registrations = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Registration[];
    callback(registrations);
  });
};

export const uploadFile = async (file, path, onProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(Math.round(progress));
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
