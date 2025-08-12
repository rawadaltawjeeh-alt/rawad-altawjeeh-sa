
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// Simple hash function for password (in production, use bcrypt or similar)
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'salt_rawad_2024'); // Add salt
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Generate secure random token
const generateSecureToken = (): string => {
  const array = new Uint32Array(8);
  crypto.getRandomValues(array);
  return Array.from(array, dec => dec.toString(16)).join('');
};

// Verify password against stored hash
export const verifyPassword = async (password: string): Promise<boolean> => {
  try {
    const adminDoc = await getDoc(doc(db, 'admin_config', 'auth'));
    if (!adminDoc.exists()) {
      // First time setup - create admin with default password hash
      const defaultHash = await hashPassword('RawadAdmin2025!');
      await setDoc(doc(db, 'admin_config', 'auth'), {
        passwordHash: defaultHash,
        lastChanged: new Date(),
        loginAttempts: 0,
        lastLoginAttempt: null,
        isLocked: false
      });
      return await hashPassword(password) === defaultHash;
    }

    const adminData = adminDoc.data();
    
    // Check if account is locked
    if (adminData.isLocked) {
      throw new Error('Account is locked due to too many failed attempts');
    }

    const passwordHash = await hashPassword(password);
    const isValid = passwordHash === adminData.passwordHash;

    if (isValid) {
      // Reset failed attempts on successful login
      await updateDoc(doc(db, 'admin_config', 'auth'), {
        loginAttempts: 0,
        lastLogin: new Date()
      });
    } else {
      // Increment failed attempts
      const newAttempts = (adminData.loginAttempts || 0) + 1;
      await updateDoc(doc(db, 'admin_config', 'auth'), {
        loginAttempts: newAttempts,
        lastLoginAttempt: new Date(),
        isLocked: newAttempts >= 5 // Lock after 5 failed attempts
      });
    }

    return isValid;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
};

// Change admin password
export const changeAdminPassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
  try {
    const isCurrentValid = await verifyPassword(currentPassword);
    if (!isCurrentValid) {
      return false;
    }

    const newHash = await hashPassword(newPassword);
    await updateDoc(doc(db, 'admin_config', 'auth'), {
      passwordHash: newHash,
      lastChanged: new Date(),
      loginAttempts: 0
    });

    return true;
  } catch (error) {
    console.error('Password change error:', error);
    return false;
  }
};

// Generate and store secure session token
export const generateSessionToken = (): string => {
  const token = generateSecureToken();
  const expiry = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
  
  localStorage.setItem('admin_token', token);
  localStorage.setItem('admin_token_expiry', expiry.toString());
  
  return token;
};

// Validate session token
export const validateSessionToken = (): boolean => {
  const token = localStorage.getItem('admin_token');
  const expiry = localStorage.getItem('admin_token_expiry');
  
  if (!token || !expiry) {
    return false;
  }
  
  if (Date.now() > parseInt(expiry)) {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_token_expiry');
    return false;
  }
  
  return true;
};

// Clear session
export const clearSession = (): void => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_token_expiry');
};

// Unlock admin account (emergency function)
export const unlockAdminAccount = async (): Promise<void> => {
  await updateDoc(doc(db, 'admin_config', 'auth'), {
    isLocked: false,
    loginAttempts: 0
  });
};
