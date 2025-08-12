
import { useState, useMemo } from 'react';
import { useRegistrations } from '@/hooks/useRegistrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Download, FileText, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { Registration } from '@/types/registration';

export default function Reports() {
  const { registrations, loading } = useRegistrations();
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [roleFilter, setRoleFilter] = useState<'all' | 'mentor' | 'beneficiary'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    let filtered = [...registrations];

    // Date filter
    if (dateFrom || dateTo) {
      filtered = filtered.filter(reg => {
        const regDate = reg.created_at?.toDate ? reg.created_at.toDate() : new Date(reg.created_at);
        if (dateFrom && regDate < dateFrom) return false;
        if (dateTo && regDate > dateTo) return false;
        return true;
      });
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(reg => reg.role === roleFilter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(reg =>
        reg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [registrations, dateFrom, dateTo, roleFilter, searchTerm]);

  const exportToExcel = () => {
    const exportData = filteredData.map(reg => ({
      'الاسم الكامل': reg.full_name,
      'البريد الإلكتروني': reg.email,
      'رقم الهاتف': reg.phone,
      'الدور': reg.role === 'mentor' ? 'موجه' : 'باحث عن توجيه',
      'التخصص': reg.specializations || reg.current_field || '-',
      'سنوات الخبرة': reg.years_of_experience || '-',
      'السبب': reg.reason || '-',
      'ملاحظات إضافية': reg.additional_notes || '-',
      'تاريخ التسجيل': reg.created_at?.toDate ? 
        format(reg.created_at.toDate(), 'yyyy-MM-dd HH:mm') :
        format(new Date(reg.created_at), 'yyyy-MM-dd HH:mm')
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'التسجيلات');
    
    const fileName = `تقرير_التسجيلات_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const exportToCSV = () => {
    const headers = ['الاسم الكامل', 'البريد الإلكتروني', 'رقم الهاتف', 'الدور', 'التخصص', 'سنوات الخبرة', 'تاريخ التسجيل'];
    const csvData = [
      headers.join(','),
      ...filteredData.map(reg => [
        reg.full_name,
        reg.email,
        reg.phone,
        reg.role === 'mentor' ? 'موجه' : 'باحث عن توجيه',
        reg.specializations || reg.current_field || '-',
        reg.years_of_experience || '-',
        reg.created_at?.toDate ? 
          format(reg.created_at.toDate(), 'yyyy-MM-dd HH:mm') :
          format(new Date(reg.created_at), 'yyyy-MM-dd HH:mm')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `تقرير_التسجيلات_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  const generateSummaryReport = () => {
    const summary = {
      totalRegistrations: filteredData.length,
      mentors: filteredData.filter(r => r.role === 'mentor').length,
      beneficiaries: filteredData.filter(r => r.role === 'beneficiary').length,
      dateRange: {
        from: dateFrom ? format(dateFrom, 'yyyy-MM-dd') : 'غير محدد',
        to: dateTo ? format(dateTo, 'yyyy-MM-dd') : 'غير محدد'
      }
    };

    return summary;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-gray-200 animate-pulse rounded-lg" />
        <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />
      </div>
    );
  }

  const summary = generateSummaryReport();

  return (
    <div  dir="rtl" className="space-y-6 text-right">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">التقارير والتصدير</h1>
        <p className="text-gray-600">إنشاء وتصدير التقارير المخصصة</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            المرشحات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <Input
              placeholder="البحث بالاسم أو الإيميل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">جميع الأدوار</option>
              <option value="mentor">موجه</option>
              <option value="beneficiary">باحث عن توجيه</option>
            </select>

            {/* Date From */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-right">
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, 'yyyy-MM-dd') : 'من تاريخ'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Date To */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-right">
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {dateTo ? format(dateTo, 'yyyy-MM-dd') : 'إلى تاريخ'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{summary.totalRegistrations}</div>
            <p className="text-gray-600">إجمالي النتائج</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{summary.mentors}</div>
            <p className="text-gray-600">موجهين</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{summary.beneficiaries}</div>
            <p className="text-gray-600">باحثين عن توجيه</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {Math.round((summary.mentors / Math.max(summary.totalRegistrations, 1)) * 100)}%
            </div>
            <p className="text-gray-600">نسبة الموجهين</p>
          </CardContent>
        </Card>
      </div>

      {/* Export Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            تصدير البيانات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={exportToExcel} className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              تصدير Excel
            </Button>
            <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              تصدير CSV
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            سيتم تصدير {filteredData.length} سجل من إجمالي {registrations.length} سجل
          </p>
        </CardContent>
      </Card>

      {/* Preview Data */}
      <Card>
        <CardHeader>
          <CardTitle>معاينة البيانات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-2">الاسم</th>
                  <th className="text-right p-2">الإيميل</th>
                  <th className="text-right p-2">الدور</th>
                  <th className="text-right p-2">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, 5).map((reg) => (
                  <tr key={reg.id} className="border-b">
                    <td className="p-2">{reg.full_name}</td>
                    <td className="p-2">{reg.email}</td>
                    <td className="p-2">
                      <Badge variant={reg.role === 'mentor' ? 'default' : 'secondary'}>
                        {reg.role === 'mentor' ? 'موجه' : 'باحث عن توجيه'}
                      </Badge>
                    </td>
                    <td className="p-2 text-gray-500">
                      {reg.created_at?.toDate ? 
                        format(reg.created_at.toDate(), 'yyyy-MM-dd') :
                        format(new Date(reg.created_at), 'yyyy-MM-dd')
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredData.length > 5 && (
              <p className="text-center text-gray-500 py-4">
                و {filteredData.length - 5} سجل آخر...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
