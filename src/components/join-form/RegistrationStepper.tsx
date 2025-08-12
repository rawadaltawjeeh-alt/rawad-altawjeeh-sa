import { useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addRegistration, } from '@/lib/firebase-admin';
import { uploadFile } from '@/lib/supabase-storage';

// Import the step components
import RoleStep from "./steps/RoleStep";
import BeneficiaryStep from "./steps/BeneficiaryStep";
import MentorStep from "./steps/MentorStep";
import ConfirmationStep from "./steps/ConfirmationStep";

// --- DATA TYPES ---
export type Role = "beneficiary" | "mentor";

export type RegistrationFormData = {
  role?: Role;
  fullName?: string;
  email?: string;
  phone?: string;
  experience?: string;
  yearsOfExperience?: string;
  specializations?: string;
  cvLink?: File; // Changed to File type
  additionalNotes?: string;
  bio?: string;
  currentField?: string;
  reason?: string;
};

// Validation helper functions
const validateRequiredFields = (data: RegistrationFormData): string[] => {
  const errors: string[] = [];
  
  if (!data.fullName?.trim()) errors.push("الاسم الكامل مطلوب");
  if (!data.email?.trim()) errors.push("البريد الإلكتروني مطلوب");
  if (!data.phone?.trim()) errors.push("رقم الجوال مطلوب");
  if (!data.role) errors.push("يرجى اختيار نوع التسجيل");
  if (!data.cvLink) errors.push("إرفاق السيرة الذاتية مطلوب");
  
  if (data.role === "mentor") {
    if (!data.bio?.trim()) errors.push("النبذة التعريفية مطلوبة");
    if (!data.specializations?.trim()) errors.push("التخصصات مطلوبة");
    if (!data.yearsOfExperience) errors.push("سنوات الخبرة مطلوبة");
  }
  
  if (data.role === "beneficiary") {
    if (!data.currentField) errors.push("المجال المهني مطلوب");
    if (!data.reason) errors.push("سبب التسجيل مطلوب");
  }
  
  return errors;
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^05[0-9]{8}$/;
  return phoneRegex.test(phone);
};

export default function RegistrationStepper() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const formStorage = useRef<RegistrationFormData>({});

  const methods = useForm<RegistrationFormData>({
    mode: "onTouched",
    defaultValues: formStorage.current,
  });

  const role = methods.watch("role");
  const formData = methods.watch();

  // Persist form data
  useEffect(() => {
    if (step < 2) {
      formStorage.current = formData;
    }
  }, [formData, step]);

  // Auto-reset after success
  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        resetForm();
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [step]);

  /**
   * Upload CV file to Firebase Storage
   */
  // const uploadCVFile = async (file: File, userEmail: string): Promise<string> => {
  //   try {
  //     // Create a unique filename
  //     const timestamp = new Date().getTime();
  //     const fileExtension = file.name.split('.').pop();
  //     const fileName = `cv_${userEmail.replace('@', '_at_')}_${timestamp}.${fileExtension}`;
      
  //     // Upload file (you'll need to implement this in your firebase-admin)
  //     const downloadURL = await uploadFile(file, `cvs/${fileName}`, (progress) => {
  //       setUploadProgress(progress);
  //     });
      
  //     return downloadURL as string;
  //   } catch (error) {
  //     console.error("File upload error:", error);
  //     throw new Error("فشل في رفع ملف السيرة الذاتية");
  //   }
  // };

// In your component
const handleFileUpload = async (file: File) => {
  try {
    const filePath = `cv_uploads/${Date.now()}_${file.name}`;
    const publicUrl = await uploadFile(
      file,
      filePath,
      (progress) => {
        console.log(`Upload progress: ${progress}%`);
        // Update progress bar in UI
      }
    );
    
    console.log('File uploaded to:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

  /**
   * Submits form data to Firebase
   */
  const submitRegistrationForm = async (data: RegistrationFormData) => {
    try {
      let cvDownloadURL = '';
      
      // Upload CV file if present
      if (data.cvLink && data.email) {
  toast.loading("جاري رفع السيرة الذاتية...");
  
  const filePath = `cv_uploads/${Date.now()}_${data.cvLink.name
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_.]/g, "")}`;

  cvDownloadURL = await uploadFile(data.cvLink, filePath, (progress) => {
    setUploadProgress(progress);
  });
}

      // Prepare registration data
      const registrationData = {
        full_name: data.fullName?.trim() || '',
        email: data.email?.trim().toLowerCase() || '',
        phone: data.phone?.trim() || '',
        role: data.role as 'mentor' | 'beneficiary',
        cv_link: cvDownloadURL,
        bio: data.bio?.trim() || '',
        additional_notes: data.additionalNotes?.trim() || '',
        created_at: new Date().toISOString(),
        status: 'pending',
        
        // Mentor-specific fields
        ...(data.role === 'mentor' && {
          years_of_experience: data.yearsOfExperience,
          specializations: data.specializations?.trim(),
        }),
        
        // Beneficiary-specific fields
        ...(data.role === 'beneficiary' && {
          current_field: data.currentField,
          reason: data.reason,
        }),
      };

      toast.loading('جاري حفظ البيانات...');
      await addRegistration(registrationData);
      
      return { status: "success" };
    } catch (error) {
      console.error("Submission error:", error);
      throw new Error("فشل إرسال البيانات. يرجى المحاولة مرة أخرى.");
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    // Validate required fields
    const fieldErrors = validateRequiredFields(data);
    if (fieldErrors.length > 0) {
      toast.error(`يرجى ملء الحقول التالية: ${fieldErrors.join(', ')}`);
      return;
    }

    // Validate email format
    if (data.email && !validateEmail(data.email)) {
      toast.error('صيغة البريد الإلكتروني غير صحيحة');
      return;
    }

    // Validate phone format
    if (data.phone && !validatePhone(data.phone)) {
      toast.error('رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام');
      return;
    }

    // Validate file
    if (data.cvLink) {
      if (data.cvLink.type !== 'application/pdf') {
        toast.error('يجب أن يكون ملف السيرة الذاتية من نوع PDF');
        return;
      }
      if (data.cvLink.size > 5 * 1024 * 1024) {
        toast.error('حجم ملف السيرة الذاتية يجب أن يكون أقل من 5 ميجابايت');
        return;
      }
    }

    setLoading(true);
    setUploadProgress(0);
    
    try {
      await submitRegistrationForm(data);
      toast.success('تم التسجيل بنجاح! شكرًا لتسجيلك. سنتواصل معك قريبًا.');
      setStep(2); 
    } catch (err: any) {
      console.error("Submission process error:", err);
      toast.error(err.message || "يرجى المحاولة مرة أخرى لاحقًا أو التواصل معنا مباشرة.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    setStep(0);
    formStorage.current = {};
    methods.reset({});
    setUploadProgress(0);
  };

  const nextStep = () => {
    // Validate role selection before proceeding
    if (step === 0 && !role) {
      toast.error('يرجى اختيار نوع التسجيل أولاً');
      return;
    }
    setStep(step + 1);
  };
  
  const prevStep = () => setStep(step - 1);

  const getStepTitle = () => {
    switch (step) {
      case 0: return "اختيار الدور";
      case 1: return role === "mentor" ? "بيانات الموجّه" : "بيانات المستفيد";
      case 2: return "تم إرسال الطلب";
      default: return "";
    }
  };

  return (
    <FormProvider {...methods}>
      <Card className="w-full max-w-lg text-right animate-fade-in relative overflow-hidden shadow-lg">
        <CardHeader className="bg-gradient-to-r from-brand-50 to-indigo-50">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              منصة روّاد التوجيه
            </h2>
            <p className="text-sm text-gray-600">
              منصة سعودية رقمية تربطك بموجّهين مهنيين
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="w-full flex items-center gap-2 mb-4">
            {["اختيار الدور", "المعلومات الأساسية", "تم إرسال الطلب"].map((label, i) => (
              <div key={label} className="flex-1 text-center">
                <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center transition-all duration-300 ${
                  i === step 
                    ? "bg-brand-600 text-white font-bold ring-4 ring-brand-200 shadow-lg" :
                  i < step 
                    ? "bg-green-500 text-white shadow-md" 
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <div className="text-xs mt-2 text-gray-700 font-medium">{label}</div>
              </div>
            ))}
          </div>

          {/* Current Step Title */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              {getStepTitle()}
            </h3>
          </div>
        </CardHeader>

        <CardContent className="pb-8">
          <form 
            onSubmit={methods.handleSubmit(onSubmit)} 
            className="flex flex-col gap-4" 
            autoComplete="off" 
            dir="rtl"
          >
            {/* Step Content */}
            {step === 0 && <RoleStep next={nextStep} />}
            {step === 1 && (
              role === "beneficiary" 
                ? <BeneficiaryStep back={prevStep} />
                : role === "mentor"
                  ? <MentorStep back={prevStep} />
                  : null
            )}
            {step === 2 && <ConfirmationStep />}
            
            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="text-brand-600 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-lg font-semibold">جاري المعالجة...</span>
                  </div>
                  
                  {/* Upload Progress */}
                  {uploadProgress > 0 && (
                    <div className="w-64 mx-auto">
                      <div className="flex justify-between text-sm mb-1">
                        <span>رفع السيرة الذاتية</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-brand-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
}