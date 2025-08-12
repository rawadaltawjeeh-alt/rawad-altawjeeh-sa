import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, ArrowRight } from "lucide-react";

const Contact = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl text-center shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-center mb-5">
            <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center shadow-md">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-3">
            تواصل معنا
          </h1>
          <div className="w-24 h-1 bg-brand-500 mx-auto rounded-full"></div>
        </CardHeader>
        
        <CardContent className="pb-10 px-6">
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-brand-700">
            <p className="font-medium">
              نسعد دائمًا بالتعاون مع من يشاركونّا الرؤية،
            </p>
            
            <p>
              لا تتردد في مراسلتنا عبر البريد الإلكتروني:
            </p>
            
            <div className="bg-brand-50 p-4 rounded-lg border border-brand-200 shadow-sm">
              <a 
                href="mailto:rawadaltawjeeh@gmail.com"
                className="text-brand-600 font-bold text-xl hover:text-brand-700 transition-all underline decoration-dotted hover:decoration-solid"
              >
                rawadaltawjeeh@gmail.com
              </a>
            </div>
            
            <p className="text-brand-600 font-medium">
              وسنرد عليك في أقرب وقت ممكن.
            </p>
          </div>
          
          <div className="mt-10">
            <Button 
              onClick={handleBackClick}
              className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 text-base md:text-lg rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <ArrowRight className="w-5 h-5 ml-2" />
              العودة للرئيسية
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
