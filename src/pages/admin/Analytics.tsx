
import { useMemo } from 'react';
import { useRegistrations } from '@/hooks/useRegistrations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Calendar, Users, UserCheck, TrendingUp, Clock, MapPin } from 'lucide-react';
import { Registration } from '@/types/registration';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Analytics() {
  const { registrations, loading } = useRegistrations();

  const analytics = useMemo(() => {
    if (!registrations.length) return null;

    // Basic stats
    const totalRegistrations = registrations.length;
    const mentorCount = registrations.filter(r => r.role === 'mentor').length;
    const beneficiaryCount = registrations.filter(r => r.role === 'beneficiary').length;

    // Registration trends by day
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const dailyRegistrations = last30Days.map(date => {
      const count = registrations.filter(reg => {
        const regDate = reg.created_at?.toDate ? 
          reg.created_at.toDate().toISOString().split('T')[0] : 
          new Date(reg.created_at).toISOString().split('T')[0];
        return regDate === date;
      }).length;
      return {
        date: new Date(date).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' }),
        registrations: count
      };
    });

    // Role distribution
    const roleDistribution = [
      { name: 'موجهين', value: mentorCount, color: '#0088FE' },
      { name: 'باحثين عن توجيه', value: beneficiaryCount, color: '#00C49F' }
    ];

    // Specializations analysis (for mentors)
    const specializationCounts = registrations
      .filter(r => r.role === 'mentor' && r.specializations)
      .reduce((acc, reg) => {
        const specs = reg.specializations?.split(',').map(s => s.trim()) || [];
        specs.forEach(spec => {
          acc[spec] = (acc[spec] || 0) + 1;
        });
        return acc;
      }, {} as Record<string, number>);

    const topSpecializations = Object.entries(specializationCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([spec, count]) => ({ specialization: spec, count }));

    // Experience levels (for mentors)
    const experienceLevels = registrations
      .filter(r => r.role === 'mentor' && r.years_of_experience)
      .reduce((acc, reg) => {
        const years = reg.years_of_experience!;
        acc[years] = (acc[years] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const experienceData = Object.entries(experienceLevels)
      .map(([years, count]) => ({ years, count }));

    // Growth rate calculation
    const lastWeekCount = registrations.filter(reg => {
      const regDate = reg.created_at?.toDate ? reg.created_at.toDate() : new Date(reg.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return regDate >= weekAgo;
    }).length;

    const previousWeekCount = registrations.filter(reg => {
      const regDate = reg.created_at?.toDate ? reg.created_at.toDate() : new Date(reg.created_at);
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return regDate >= twoWeeksAgo && regDate < weekAgo;
    }).length;

    const growthRate = previousWeekCount > 0 ? 
      ((lastWeekCount - previousWeekCount) / previousWeekCount * 100).toFixed(1) : 
      '0';

    return {
      totalRegistrations,
      mentorCount,
      beneficiaryCount,
      dailyRegistrations,
      roleDistribution,
      topSpecializations,
      experienceData,
      growthRate,
      lastWeekCount
    };
  }, [registrations]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">لا توجد بيانات للتحليل</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">التحليلات المتقدمة</h1>
        <p className="text-gray-600">تحليل شامل لبيانات منصة رواد التوجيه</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-blue-100 p-3 rounded-full ml-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{analytics.totalRegistrations}</p>
              <p className="text-gray-600">إجمالي التسجيلات</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-green-100 p-3 rounded-full ml-4">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{analytics.mentorCount}</p>
              <p className="text-gray-600">موجهين</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-purple-100 p-3 rounded-full ml-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{analytics.beneficiaryCount}</p>
              <p className="text-gray-600">باحثين عن توجيه</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-orange-100 p-3 rounded-full ml-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">%{analytics.growthRate}</p>
              <p className="text-gray-600">نمو أسبوعي</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Trends */}
        <Card>
          <CardHeader>
            <CardTitle>اتجاه التسجيلات (آخر 30 يوم)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                registrations: {
                  label: "التسجيلات",
                  color: "#0088FE",
                },
              }}
              className="h-[300px]"
            >
              <LineChart data={analytics.dailyRegistrations}>
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="registrations" 
                  stroke="#0088FE" 
                  strokeWidth={2}
                  dot={{ fill: '#0088FE' }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Role Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>توزيع الأدوار</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                mentors: { label: "موجهين", color: "#0088FE" },
                beneficiaries: { label: "باحثين عن توجيه", color: "#00C49F" },
              }}
              className="h-[300px]"
            >
              <PieChart>
                <Pie
                  data={analytics.roleDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.roleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Specializations */}
        {analytics.topSpecializations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>أهم التخصصات</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "العدد",
                    color: "#00C49F",
                  },
                }}
                className="h-[300px]"
              >
                <BarChart data={analytics.topSpecializations} layout="horizontal">
                  <XAxis type="number" />
                  <YAxis dataKey="specialization" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="#00C49F" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        {/* Experience Levels */}
        {analytics.experienceData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>مستويات الخبرة</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "العدد",
                    color: "#FFBB28",
                  },
                }}
                className="h-[300px]"
              >
                <BarChart data={analytics.experienceData}>
                  <XAxis dataKey="years" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="#FFBB28" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>النشاط الأخير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">تسجيلات هذا الأسبوع</p>
                <p className="text-sm text-gray-600">{analytics.lastWeekCount} تسجيل جديد</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">معدل النمو</p>
                <p className="text-sm text-gray-600">%{analytics.growthRate} مقارنة بالأسبوع السابق</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
