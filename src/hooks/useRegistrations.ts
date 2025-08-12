
import { useState, useEffect } from 'react';
import { Registration } from '@/types/registration';
import { subscribeToRegistrations, deleteRegistration as deleteReg } from '@/lib/firebase-admin';
import { toast } from 'sonner';

export function useRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToRegistrations((data) => {
      setRegistrations(data);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  const deleteRegistration = async (id: string) => {
    try {
      await deleteReg(id);
      toast.success('تم حذف التسجيل بنجاح');
    } catch (error) {
      console.error('Error deleting registration:', error);
      toast.error('حدث خطأ أثناء حذف التسجيل');
    }
  };

  return {
    registrations,
    loading,
    error,
    deleteRegistration
  };
}
