
import { CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ConfirmationStep() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 text-center py-8">
      <div className="text-3xl text-brand-500 font-bold animate-fade-in">شكرًا لتسجيلك!</div>
      <CardDescription className="text-lg">
        تم استلام بياناتك بنجاح، سنقوم بالتواصل معك عبر البريد الإلكتروني أو الجوال قريبًا.<br />
        يسعدنا انضمامك لمنصة روّاد التوجيه.
      </CardDescription>
      <Button
        type="button"
        className="mt-2"
        onClick={() => window.location.reload()}
      >
        تسجيل طلب جديد
      </Button>
    </div>
  );
}
