// MentorStep.tsx
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { RegistrationFormData } from "../RegistrationStepper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  back: () => void;
};

export default function MentorStep({ back }: Props) {
  const { control, formState: { errors } } = useFormContext<RegistrationFormData>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: any) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("حجم الملف يجب أن يكون أقل من 5 ميجابايت");
        return;
      }
      onChange(file);
    }
  };

  return (
    <motion.div
      dir="rtl"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 text-right"
    >
      <div className="text-center mb-2">
        <h3 className="font-bold text-xl text-gray-800">التسجيل كموجّه</h3>
        <p className="text-sm text-gray-500">شاركنا خبراتك لتساعد الآخرين</p>
      </div>

      {/* الاسم الكامل */}
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
              <Input placeholder="الاسم الكامل" {...field} className={errors.fullName ? "border-red-500" : ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* البريد الإلكتروني */}
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
              <Input type="email" placeholder="example@email.com" {...field} className={errors.email ? "border-red-500" : ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* رقم الجوال */}
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
              <Input type="tel" placeholder="05xxxxxxxx" {...field} maxLength={10} className={errors.phone ? "border-red-500" : ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* سنوات الخبرة */}
      <FormField
        control={control}
        name="yearsOfExperience"
        rules={{ required: "يرجى إدخال سنوات الخبرة" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>سنوات الخبرة *</FormLabel>
            <FormControl>
              <input
                type="number"
                min="0"
                {...field}
                className={`w-full border rounded-md p-2 mt-1 bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                  errors.yearsOfExperience ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="أدخل عدد سنوات الخبرة"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* النبذة التعريفية */}
      <FormField
        control={control}
        name="bio"
        rules={{
          required: "النبذة التعريفية مطلوبة",
          minLength: { value: 50, message: "النبذة التعريفية يجب أن تكون 50 حرف على الأقل" }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>نبذة تعريفية عنك *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="اذكر خبراتك، مجالات اهتمامك، وكيف يمكنك مساعدة الآخرين."
                rows={4}
                className={`resize-none focus:ring-2 focus:ring-brand-500 focus:border-transparent ${errors.bio ? "border-red-500" : ""}`}
                maxLength={800}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* التخصصات */}
      <FormField
        control={control}
        name="specializations"
        rules={{
          required: "يرجى كتابة تخصصاتك",
          minLength: { value: 20, message: "يرجى كتابة تفاصيل أكثر عن تخصصاتك" }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>ما هي التخصصات التي يمكنك الإرشاد فيها؟ *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="مثال: التسويق الرقمي، تطوير الواجهات الأمامية، إدارة المشاريع..."
                rows={3}
                className={`resize-none focus:ring-2 focus:ring-brand-500 focus:border-transparent ${errors.specializations ? "border-red-500" : ""}`}
                maxLength={500}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* السؤال الجديد نعم / لا */}
      <FormField
        control={control}
        name="hrExperience"
        rules={{ required: "يرجى اختيار أحد الخيارين" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>هل تعمل حالياً بالموارد البشرية أو استقطاب الموظفين؟ *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value ={field.value}
                className="flex gap-4 mt-2 flex-row-reverse"  // أضفنا flex-row-reverse لعكس الاتجاه
>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="yes" id="yes" />
    <label htmlFor="yes" className="text-sm">نعم</label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="no" id="no" />
    <label htmlFor="no" className="text-sm">لا</label>
  </div>
</RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* السيرة الذاتية */}
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
          </FormItem>
        )}
      />

      {/* أزرار التحكم */}
      <div className="flex flex-row-reverse justify-between items-center gap-4 mt-6">
        <Button type="button" variant="outline" onClick={back} className="w-1/3 hover:bg-gray-50">
          السابق
        </Button>
        <Button type="submit" className="w-2/3 bg-brand-600 hover:bg-brand-700">
          إرسال الطلب
        </Button>
      </div>
    </motion.div>
  );
}