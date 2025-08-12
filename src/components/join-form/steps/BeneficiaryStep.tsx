// BeneficiaryStep.tsx
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { RegistrationFormData } from "../RegistrationStepper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const professionalOptions = ["طالب", "موظف", "باحث عن عمل"];
const supportOptions = [
  "تطوير مساري المهني",
  "تغيير مسار وظيفي", 
  "تحسين سيرتي الذاتية",
  "توجيه مهني عام",
];

type Props = {
  back: () => void;
};

export default function BeneficiaryStep({ back }: Props) {
  const { control, formState: { errors } } = useFormContext<RegistrationFormData>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: any) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("حجم الملف يجب أن يكون أقل من 5 ميجابايت");
        return;
      }
      onChange(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4"
    >
      <div className="text-center mb-2">
        <h3 className="font-bold text-xl text-gray-800">التسجيل كمستفيد</h3>
        <p className="text-sm text-gray-500">يرجى إكمال البيانات التالية للمتابعة</p>
      </div>

      <FormField
        control={control}
        name="fullName"
        rules={{ 
          required: "يرجى إدخال الاسم الكامل",
          minLength: { value: 2, message: "الاسم يجب أن يكون حرفين على الأقل" }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>الاسم الكامل *</FormLabel>
            <FormControl>
              <Input 
                placeholder="الاسم الكامل" 
                {...field} 
                className={errors.fullName ? "border-red-500" : ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="email"
        rules={{
          required: "يرجى إدخال البريد الإلكتروني",
          pattern: { 
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
            message: "صيغة البريد الإلكتروني غير صحيحة" 
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>البريد الإلكتروني *</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="example@email.com" 
                {...field}
                className={errors.email ? "border-red-500" : ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="phone"
        rules={{ 
          required: "يرجى إدخال رقم الجوال",
          pattern: {
            value: /^05[0-9]{8}$/,
            message: "رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام"
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>رقم الجوال *</FormLabel>
            <FormControl>
              <Input 
                type="tel" 
                placeholder="05xxxxxxxx" 
                {...field}
                className={errors.phone ? "border-red-500" : ""}
                maxLength={10}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="currentField"
        rules={{ required: "يرجى اختيار المجال المهني" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>المجال المهني أو الدراسي الحالي *</FormLabel>
            <FormControl>
              <select 
                {...field} 
                className={`w-full border rounded-md p-2 mt-1 bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                  errors.currentField ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">اختر المجال</option>
                {professionalOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="reason"
        rules={{ required: "يرجى اختيار ما تبحث عنه" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>ما أكثر ما تبحث عنه؟ *</FormLabel>
            <FormControl>
              <select 
                {...field} 
                className={`w-full border rounded-md p-2 mt-1 bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                  errors.reason ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">اختر الخيار المناسب</option>
                {supportOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="cvLink"
        rules={{ 
          required: "إرفاق السيرة الذاتية مطلوب",
          validate: (value) => {
            if (!value || !(value instanceof File)) return "يرجى اختيار ملف PDF";
            if (value.type !== "application/pdf") return "يجب أن يكون الملف من نوع PDF";
            if (value.size > 5 * 1024 * 1024) return "حجم الملف يجب أن يكون أقل من 5 ميجابايت";
            return true;
          }
        }}
        render={({ field: { onChange, onBlur, name, ref } }) => (
          <FormItem>
            <FormLabel>أرفق سيرتك الذاتية (ملف PDF) *</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".pdf"
                ref={ref}
                name={name}
                onBlur={onBlur}
                onChange={(e) => handleFileChange(e, onChange)}
                className={`w-full border rounded-md p-1 text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 ${
                  errors.cvLink ? "border-red-500" : ""
                }`}
              />
            </FormControl>
            <FormMessage />
            <p className="text-xs text-gray-500 mt-1">الحد الأقصى لحجم الملف: 5 ميجابايت</p>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="additionalNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ملاحظات إضافية (اختياري)</FormLabel>
            <FormControl>
              <Textarea
                rows={3}
                placeholder="اكتب أي ملاحظات إضافية هنا..."
                className="w-full border rounded-md p-2 mt-1 resize-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                maxLength={500}
                {...field}
              />
            </FormControl>
            <FormMessage />
            <p className="text-xs text-gray-500 mt-1">
              {field.value?.length || 0}/500 حرف
            </p>
          </FormItem>
        )}
      />
      
      <div className="flex justify-between items-center gap-4 mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={back} 
          className="w-1/3 hover:bg-gray-50"
        >
          السابق
        </Button>
        <Button 
          type="submit" 
          className="w-2/3 bg-brand-600 hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          إرسال الطلب
        </Button>
      </div>
    </motion.div>
  );
}