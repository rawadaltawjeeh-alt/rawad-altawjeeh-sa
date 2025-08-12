
export type Registration = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: 'mentor' | 'beneficiary';
  created_at: any; // Firestore Timestamp
  // Role-specific fields
  experience?: string;
  years_of_experience?: string;
  specializations?: string;
  cv_link?: string;
  current_field?: string;
  reason?: string;
  bio?: string;
  additional_notes?: string;
};

export type AuthUser = {
  token: string;
  isAuthenticated: boolean;
};
