import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { User, GraduationCap, Check } from "lucide-react";
import { motion } from "framer-motion";

const ROLES = [
  { 
    value: "beneficiary", 
    label: "باحث عن توجيه",
    description: "سجل كـ باحث عن توجيه للاستفادة من خدمات المنصة",
    icon: User
  },
  { 
    value: "mentor", 
    label: "موجّه",
    description: "سجل كـ موجّه لتقديم الدعم والاستشارات",
    icon: GraduationCap
  },
];

export default function RoleStep({ next }: { next: () => void }) {
  const { watch, setValue } = useFormContext();
  const selected = watch("role");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <CardDescription className="mb-6 text-center text-brand-700">
        اختر دورك للتسجيل في المنصة
      </CardDescription>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {ROLES.map((role) => {
          const Icon = role.icon;
          const isSelected = selected === role.value;
          
          return (
            <motion.div
              key={role.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setValue("role", role.value)}
              className={`
                border-2 rounded-xl p-5 flex flex-col items-center text-center cursor-pointer
                transition-all duration-200 group relative overflow-hidden
                ${isSelected 
                  ? 'border-brand-500 bg-brand-50 shadow-md ring-2 ring-brand-100' 
                  : 'border-gray-200 hover:border-brand-300 hover:bg-brand-50'
                }
              `}
              aria-pressed={isSelected}
              aria-label={`تسجيل كـ ${role.label}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setValue("role", role.value);
                }
              }}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 bg-brand-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                  محدَد
                </div>
              )}
              
              <div className="relative mb-4">
                <div className={`
                  p-3 rounded-full mb-3 transition-colors
                  ${isSelected 
                    ? 'bg-brand-100 text-brand-600' 
                    : 'bg-gray-100 text-gray-500 group-hover:bg-brand-100 group-hover:text-brand-600'
                  }
                `}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                {isSelected && (
                  <div className="absolute -top-1 -right-1 bg-brand-500 text-white rounded-full p-1 shadow-sm">
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
              </div>
              
              <h3 className={`
                font-bold text-lg mb-1
                ${isSelected ? 'text-brand-700' : 'text-gray-800'}
              `}>
                {role.label}
              </h3>
              
              <p className="text-sm text-gray-600 mt-1">
                {role.description}
              </p>
            </motion.div>
          );
        })}
      </div>
      
      <Button
        type="button"
        disabled={!selected}
        className="w-full mt-2 py-6 text-lg font-bold"
        onClick={next}
        aria-disabled={!selected}
      >
        التالي
      </Button>
    </motion.div>
  );
}