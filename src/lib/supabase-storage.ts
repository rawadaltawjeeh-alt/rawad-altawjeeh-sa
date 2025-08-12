// In your supabase-storage.ts file
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabase = createClient(
//    process.env.REACT_APP_SUPABASE_URL!,
//    process.env.REACT_APP_SUPABASE_ANON_KEY!
"https://ordomowptcdxjamplnuo.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yZG9tb3dwdGNkeGphbXBsbnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyODc4MTgsImV4cCI6MjA2Njg2MzgxOH0.NBnM3iKVnd5jD4qMOv8tfDZ4fJeKU_B3wvhT-khQhcc"
);

export const uploadFile = async (file: File, path: string, onProgress?: (progress: number) => void) => {
  try {
    // Create a signed URL for upload
    const { data: uploadData, error: urlError } = await supabase.storage
      .from('cvs')
      .createSignedUploadUrl(path);
    
    if (urlError) throw urlError;
    if (!uploadData) throw new Error('Failed to create signed upload URL');

    const formData = new FormData();
    formData.append('file', file);

    // Upload file using Axios for progress tracking
    const response = await axios.put(uploadData.signedUrl, formData, {
      headers: {
        'Content-Type': file.type,
        'x-upsert': 'true'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!
          );
          onProgress(percentCompleted);
        }
      }
    });

    if (response.status !== 200) {
      throw new Error(`Upload failed with status ${response.status}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('cvs')
      .getPublicUrl(path);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error(`فشل تحميل الملف: ${error.message}`);
  }
};