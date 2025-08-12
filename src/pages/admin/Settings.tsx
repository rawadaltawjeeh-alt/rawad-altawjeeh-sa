
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ChangePasswordModal } from '@/components/admin/ChangePasswordModal';
import { 
  Settings as SettingsIcon, 
  Save, 
  Shield, 
  Bell, 
  Database,
  Download,
  Upload,
  Trash2,
  Key,
  Activity,
  Server
} from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'منصة رواد التوجيه',
    adminEmail: 'admin@rawadaltawjeeh.com',
    enableNotifications: true,
    enableAutoBackup: true,
    backupFrequency: 'daily',
    maxRegistrations: 1000,
    enablePublicStats: false,
    sessionTimeout: 24, // hours
    enableTwoFactor: false,
    enableActivityLog: true,
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleSave = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    toast.success('تم حفظ الإعدادات بنجاح');
  };

  const handleExportData = () => {
    toast.info('سيتم تصدير جميع البيانات بشكل آمن...');
  };

  const handleImportData = () => {
    toast.info('يرجى اختيار ملف مشفر للاستيراد...');
  };

  const handleClearData = () => {
    if (confirm('هل أنت متأكد من حذف جميع البيانات؟ هذا الإجراء لا يمكن التراجع عنه.')) {
      toast.error('تم حذف جميع البيانات بشكل آمن');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">إعدادات النظام الآمنة</h1>
        <p className="text-gray-600">إدارة إعدادات المنصة والتحكم الآمن في النظام</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              الإعدادات العامة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">اسم الموقع</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail">إيميل الإدارة المشفر</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxRegistrations">الحد الأقصى للتسجيلات</Label>
              <Input
                id="maxRegistrations"
                type="number"
                value={settings.maxRegistrations}
                onChange={(e) => setSettings({...settings, maxRegistrations: parseInt(e.target.value)})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="publicStats">عرض الإحصائيات للعامة</Label>
              <Switch
                id="publicStats"
                checked={settings.enablePublicStats}
                onCheckedChange={(checked) => setSettings({...settings, enablePublicStats: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              إعدادات الأمان المتقدمة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2"
              onClick={() => setShowPasswordModal(true)}
            >
              <Key className="w-4 h-4" />
              تغيير كلمة المرور
            </Button>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">مهلة الجلسة (ساعات)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                min="1"
                max="72"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="twoFactor">المصادقة الثنائية</Label>
              <Switch
                id="twoFactor"
                checked={settings.enableTwoFactor}
                onCheckedChange={(checked) => setSettings({...settings, enableTwoFactor: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="activityLog">تفعيل سجل الأنشطة</Label>
              <Switch
                id="activityLog"
                checked={settings.enableActivityLog}
                onCheckedChange={(checked) => setSettings({...settings, enableActivityLog: checked})}
              />
            </div>

            <Button variant="outline" className="w-full flex items-center gap-2">
              <Activity className="w-4 h-4" />
              مراجعة سجل الأنشطة
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              إعدادات التنبيهات الآمنة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">تفعيل التنبيهات المشفرة</Label>
              <Switch
                id="notifications"
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => setSettings({...settings, enableNotifications: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="autoBackup">النسخ الاحتياطي المشفر</Label>
              <Switch
                id="autoBackup"
                checked={settings.enableAutoBackup}
                onCheckedChange={(checked) => setSettings({...settings, enableAutoBackup: checked})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backupFrequency">تكرار النسخ الاحتياطي</Label>
              <select
                id="backupFrequency"
                value={settings.backupFrequency}
                onChange={(e) => setSettings({...settings, backupFrequency: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="hourly">كل ساعة</option>
                <option value="daily">يومي</option>
                <option value="weekly">أسبوعي</option>
                <option value="monthly">شهري</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              إدارة البيانات الآمنة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleExportData} variant="outline" className="w-full flex items-center gap-2">
              <Download className="w-4 h-4" />
              تصدير البيانات مشفرة
            </Button>
            
            <Button onClick={handleImportData} variant="outline" className="w-full flex items-center gap-2">
              <Upload className="w-4 h-4" />
              استيراد بيانات مشفرة
            </Button>

            <Button variant="outline" className="w-full flex items-center gap-2">
              <Server className="w-4 h-4" />
              فحص سلامة البيانات
            </Button>

            <Separator />

            <Button 
              onClick={handleClearData} 
              variant="destructive" 
              className="w-full flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              حذف البيانات بشكل آمن
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          حفظ الإعدادات الآمنة
        </Button>
      </div>

      <ChangePasswordModal 
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
}
