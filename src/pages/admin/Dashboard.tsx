
import { useRegistrations } from '@/hooks/useRegistrations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  Calendar,
  Activity,
  Clock
} from 'lucide-react';
import { useMemo } from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const { registrations, loading } = useRegistrations();

  const dashboardData = useMemo(() => {
    if (!registrations.length) return null;

    const totalRegistrations = registrations.length;
    const mentorCount = registrations.filter(r => r.role === 'mentor').length;
    const beneficiaryCount = registrations.filter(r => r.role === 'beneficiary').length;

    // Recent registrations (last 7 days)
    const last7Days = registrations.filter(reg => {
      const regDate = reg.created_at?.toDate ? reg.created_at.toDate() : new Date(reg.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return regDate >= weekAgo;
    }).length;

    // Today's registrations
    const today = new Date();
    const todayRegistrations = registrations.filter(reg => {
      const regDate = reg.created_at?.toDate ? reg.created_at.toDate() : new Date(reg.created_at);
      return regDate.toDateString() === today.toDateString();
    }).length;

    // Role distribution for chart
    const roleDistribution = [
      { name: 'موجهين', value: mentorCount, color: '#0088FE' },
      { name: 'باحثين عن توجيه', value: beneficiaryCount, color: '#00C49F' }
    ];

    // Weekly trend
    const last7DaysData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const count = registrations.filter(reg => {
        const regDate = reg.created_at?.toDate ? 
          reg.created_at.toDate().toDateString() : 
          new Date(reg.created_at).toDateString();
        return regDate === date.toDateString();
      }).length;
      return {
        date: date.toLocaleDateString('ar-SA', { weekday: 'short' }),
        registrations: count
      };
    }).reverse();

    return {
      totalRegistrations,
      mentorCount,
      beneficiaryCount,
      last7Days,
      todayRegistrations,
      roleDistribution,
      last7DaysData
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
          {[1, 2].map(i => (
            <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">لا توجد بيانات للعرض</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
        <p className="text-gray-600">نظرة عامة على منصة رواد التوجيه</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-blue-100 p-3 rounded-full ml-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{dashboardData.totalRegistrations}</p>
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
              <p className="text-2xl font-bold">{dashboardData.mentorCount}</p>
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
              <p className="text-2xl font-bold">{dashboardData.beneficiaryCount}</p>
              <p className="text-gray-600">باحثين عن توجيه</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-orange-100 p-3 rounded-full ml-4">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{dashboardData.todayRegistrations}</p>
              <p className="text-gray-600">تسجيلات اليوم</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>اتجاه التسجيلات الأسبوعي</CardTitle>
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
              <LineChart data={dashboardData.last7DaysData}>
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
                  data={dashboardData.roleDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dashboardData.roleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>النشاط الأخير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <Activity className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">تسجيلات هذا الأسبوع</p>
                <p className="text-sm text-gray-600">{dashboardData.last7Days} تسجيل جديد</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">تسجيلات اليوم</p>
                <p className="text-sm text-gray-600">{dashboardData.todayRegistrations} تسجيل</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium">نسبة الموجهين</p>
                <p className="text-sm text-gray-600">
                  %{Math.round((dashboardData.mentorCount / dashboardData.totalRegistrations) * 100)} من إجمالي المستخدمين
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
