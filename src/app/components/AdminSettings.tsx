import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DarajaApiSettings } from './DarajaApiSettings';
import { 
  Smartphone, 
  Calendar, 
  Users, 
  BarChart3,
  ArrowLeft,
  Shield,
  User
} from 'lucide-react';

interface AdminSettingsProps {
  onClose: () => void;
}

export function AdminSettings({ onClose }: AdminSettingsProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={onClose}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Website</span>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
                <p className="text-gray-600">Manage your barber shop's system settings</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-amber-600">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Admin Access</span>
            </div>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="payments" className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4" />
              <span>M-Pesa API</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Staff</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payments">
            <DarajaApiSettings />
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-amber-600" />
                  <span>Booking Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900">Today's Bookings</h3>
                    <p className="text-2xl font-bold text-blue-600">0</p>
                    <p className="text-sm text-blue-700">No appointments scheduled</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-medium text-green-900">This Week</h3>
                    <p className="text-2xl font-bold text-green-600">0</p>
                    <p className="text-sm text-green-700">Weekly bookings</p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h3 className="font-medium text-amber-900">Revenue (Week)</h3>
                    <p className="text-2xl font-bold text-amber-600">KSh 0</p>
                    <p className="text-sm text-amber-700">Weekly earnings</p>
                  </div>
                </div>
                
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No bookings found. Booking management features will appear here once customers start booking appointments.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-amber-600" />
                  <span>Staff Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Samson Wamocho</h3>
                        <p className="text-sm text-gray-600">Master Barber & Owner</p>
                        <p className="text-xs text-gray-500">12 years experience • All styles & dreadlocks</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">Active</div>
                      <div className="text-xs text-gray-500">Available Today</div>
                    </div>
                  </div>
                </div>

                <div className="text-center py-4 text-gray-500">
                  <p className="text-sm">Staff scheduling and management features will be available in future updates.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                  <span>Business Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4">
                    <h3 className="text-sm font-medium opacity-90">Total Bookings</h3>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-xs opacity-75">All time</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4">
                    <h3 className="text-sm font-medium opacity-90">Revenue</h3>
                    <p className="text-2xl font-bold">KSh 0</p>
                    <p className="text-xs opacity-75">Total earned</p>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg p-4">
                    <h3 className="text-sm font-medium opacity-90">Popular Service</h3>
                    <p className="text-sm font-bold">Signature Cut</p>
                    <p className="text-xs opacity-75">Most requested</p>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-4">
                    <h3 className="text-sm font-medium opacity-90">Customer Rating</h3>
                    <p className="text-2xl font-bold">5.0</p>
                    <p className="text-xs opacity-75">⭐⭐⭐⭐⭐</p>
                  </div>
                </div>

                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Analytics dashboard will populate with data as customers book appointments and make payments.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}