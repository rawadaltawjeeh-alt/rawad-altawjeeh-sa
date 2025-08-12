import { Registration } from '@/types/registration';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, Briefcase, Calendar, FileText, MapPin, Clock, ExternalLink, Star, Send,Copy } from 'lucide-react';
import { toast } from "@/hooks/use-toast"; // إن كنت تستخدم Toast

interface RegistrationModalProps {
  registration: Registration;
}
import { useState } from "react";

function useCopyFeedback() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast({ title: `${label} تم نسخه بنجاح!` });

    setTimeout(() => setCopiedField(null), 2000);
  };

  return { copiedField, handleCopy };
}

export function RegistrationModal({ registration }: RegistrationModalProps) {
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);

    
  };
const { copiedField, handleCopy } = useCopyFeedback();

  const isMentor = registration.role === 'mentor';


  const handleSendEmail = () => {
    const subject = encodeURIComponent(`التواصل من منصة التوجيه - ${registration.full_name}`);
    const body = encodeURIComponent(`السلام عليكم ${registration.full_name},\n\nأتواصل معك من خلال منصة التوجيه...\n\nأطيب التحيات`);
    const mailtoLink = `mailto:${registration.email}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  };

  function getExperienceLabel(years_of_experience: string): React.ReactNode {
  const years = parseInt(years_of_experience, 10);
  if (isNaN(years)) return '';

  const arabicNumber = years.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);

  let label = '';
  if (years === 1) label = 'سنة';
  else if (years === 2) label = 'سنتين';
  else if (years > 2 && years <= 10) label = 'سنوات';
  else label = 'سنة'; // 10 أو أكثر

  return `${arabicNumber} ${label}`;
}

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header with gradient background */}
      <div className={`${isMentor ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700' : 'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700'} text-white p-8`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="bg-white/25 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{registration.full_name}</h2>
              <div className="flex items-center gap-3">
                <Badge 
                  variant="secondary" 
                  className={`${isMentor ? 'bg-white/25 text-white hover:bg-white/35 border-white/30' : 'bg-white/25 text-white hover:bg-white/35 border-white/30'} px-4 py-2 text-sm font-medium backdrop-blur-sm`}
                >
                  {isMentor ? '🎯 موجه' : '🔍 باحث عن توجيه'}
                </Badge>
                {isMentor && (
                  <div className="flex items-center gap-1 text-amber-300">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">خبير</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(registration.created_at)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Contact Information Card */}
<div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-6 border border-gray-200">
  <div className="flex items-center gap-3 mb-8">
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg shadow-md">
      <Mail className="w-5 h-5 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900">معلومات الاتصال</h3>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Email Card */}
    <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md w-full">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-full shadow-md mb-4">
        <Mail className="w-6 h-6 text-white" />
      </div>
      <p className="text-sm text-gray-500 font-medium mb-1">البريد الإلكتروني</p>
      <p
        className="font-semibold text-gray-900 break-all text-sm max-w-full text-center mb-3 cursor-help"
        title={registration.email}
      >
        {registration.email}
      </p>
      <button
        onClick={() =>
          handleCopy(registration.email, "البريد الإلكتروني", "email")
        }
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm transition-all"
        title="نسخ البريد الإلكتروني"
      >
        {copiedField === "email" ? (
          <span className="text-green-600 font-semibold">✅ تم النسخ</span>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            نسخ البريد
          </>
        )}
      </button>
    </div>

    {/* Phone Card */}
    <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md w-full">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-full shadow-md mb-4">
        <Phone className="w-6 h-6 text-white" />
      </div>
      <p className="text-sm text-gray-500 font-medium mb-1">رقم الهاتف</p>
      <p
        className="font-semibold text-gray-900 break-all text-sm max-w-full text-center mb-3 cursor-help"
        title={registration.phone}
      >
        {registration.phone}
      </p>
      <button
        onClick={() =>
          handleCopy(registration.phone, "رقم الهاتف", "phone")
        }
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-sm transition-all"
        title="نسخ رقم الهاتف"
      >
        {copiedField === "phone" ? (
          <span className="text-green-600 font-semibold">✅ تم النسخ</span>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            نسخ الرقم
          </>
        )}
      </button>
    </div>
  </div>
</div>


        {/* Professional Information - Mentor */}
        {isMentor && (
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg shadow-md">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">المعلومات المهنية</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {registration.years_of_experience && (
                <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-2 rounded-lg shadow-md">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">سنوات الخبرة</p>
                    <p className="font-semibold text-gray-900">  {getExperienceLabel(registration.years_of_experience)}</p>
                  </div>
                </div>
              )}
              {registration.specializations && (
                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                  <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-2 rounded-lg shadow-md">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">التخصصات</p>
                    <p className="font-semibold text-gray-900">{registration.specializations}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Beneficiary Information */}
        {!isMentor && (
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-xl p-6 border border-emerald-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-lg shadow-md">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">معلومات الباحث عن توجيه</h3>
            </div>
            <div className="space-y-4">
              {registration.current_field && (
                <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-2 rounded-lg shadow-md">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">المجال الحالي</p>
                    <p className="font-semibold text-gray-900">{registration.current_field}</p>
                  </div>
                </div>
              )}
              {registration.reason && (
                <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                  <p className="text-sm text-gray-600 font-medium mb-2">السبب</p>
                  <p className="text-gray-900 leading-relaxed">{registration.reason}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Additional Information */}
        {(registration.bio || registration.additional_notes || registration.cv_link) && (
          <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-slate-500 to-gray-600 p-2 rounded-lg shadow-md">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">معلومات إضافية</h3>
            </div>
            <div className="space-y-6">
              {registration.bio && (
                <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-gradient-to-b from-blue-500 to-indigo-600">
                  <p className="text-sm text-gray-600 font-medium mb-3">النبذة الشخصية</p>
                  <p className="text-gray-900 leading-relaxed">{registration.bio}</p>
                </div>
              )}
              {registration.additional_notes && (
                <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-gradient-to-b from-amber-500 to-orange-600">
                  <p className="text-sm text-gray-600 font-medium mb-3">ملاحظات إضافية</p>
                  <p className="text-gray-900 leading-relaxed">{registration.additional_notes}</p>
                </div>
              )}
              {registration.cv_link && (
                <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-gradient-to-b from-emerald-500 to-teal-600">
                  <p className="text-sm text-gray-600 font-medium mb-3">السيرة الذاتية</p>
                  <a 
                    href={registration.cv_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text hover:from-blue-700 hover:to-indigo-700 font-medium transition-all duration-200 group"
                  >
                    <ExternalLink className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                    عرض السيرة الذاتية
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer with registration date */}
        <div className="border-t border-gray-300 pt-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">تم التسجيل في {formatDate(registration.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}