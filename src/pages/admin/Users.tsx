
import { useState } from 'react';
import { useRegistrations } from '@/hooks/useRegistrations';
import { RegistrationTable } from '@/components/admin/RegistrationTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users as UsersIcon, 
  UserCheck, 
  Search, 
  Download,
  Filter,
  Mail
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

export default function Users() {
  const { registrations, loading, deleteRegistration } = useRegistrations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<'all' | 'mentor' | 'beneficiary'>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch =
      reg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.includes(searchTerm);

    const matchesRole = selectedRole === 'all' || reg.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  const bulkExport = () => {
    const exportData = filteredRegistrations.map(reg => ({
      'الاسم الكامل': reg.full_name,
      'البريد الإلكتروني': reg.email,
      'رقم الهاتف': reg.phone,
      'الدور': reg.role === 'mentor' ? 'موجه' : 'باحث عن توجيه',
      'التخصص': reg.specializations || reg.current_field || '-',
      'سنوات الخبرة': reg.years_of_experience || '-',
      'تاريخ التسجيل': reg.created_at?.toDate ? 
        format(reg.created_at.toDate(), 'yyyy-MM-dd HH:mm') :
        format(new Date(reg.created_at), 'yyyy-MM-dd HH:mm')
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'المستخدمين');
    
    const fileName = `قائمة_المستخدمين_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const sendBulkEmail = () => {
    const emails = filteredRegistrations.map(reg => reg.email).join(',');
    window.open(`mailto:?bcc=${emails}&subject=رسالة من منصة رواد التوجيه`);
  };

  const mentorCount = filteredRegistrations.filter(r => r.role === 'mentor').length;
  const beneficiaryCount = filteredRegistrations.filter(r => r.role === 'beneficiary').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h1>
          <p className="text-gray-600">إدارة شاملة لجميع المستخدمين المسجلين</p>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={bulkExport} variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            تصدير الكل
          </Button>
          <Button onClick={sendBulkEmail} className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            إرسال إيميل جماعي
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-blue-100 p-3 rounded-full ml-4">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{filteredRegistrations.length}</p>
              <p className="text-gray-600">إجمالي المستخدمين</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-green-100 p-3 rounded-full ml-4">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mentorCount}</p>
              <p className="text-gray-600">موجهين</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-purple-100 p-3 rounded-full ml-4">
              <UsersIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{beneficiaryCount}</p>
              <p className="text-gray-600">باحثين عن توجيه</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-orange-100 p-3 rounded-full ml-4">
              <Filter className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {Math.round((mentorCount / Math.max(filteredRegistrations.length, 1)) * 100)}%
              </p>
              <p className="text-gray-600">نسبة الموجهين</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Registration Table */}
      <RegistrationTable 
        registrations={filteredRegistrations}
        onDelete={deleteRegistration}
        loading={loading}
      />
    </div>
  );
}
