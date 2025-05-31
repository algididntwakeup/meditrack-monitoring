import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { User, Users, Clock, Activity, FileText, TrendingUp, Bell, Settings, LogOut, Eye, Download } from 'lucide-react';

const HealthcareMonitoringSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  // Mock data
  const performanceData = [
    { date: '2024-05-27', patients: 25, consultations: 20, waitTime: 15, satisfaction: 4.2 },
    { date: '2024-05-28', patients: 32, consultations: 28, waitTime: 12, satisfaction: 4.5 },
    { date: '2024-05-29', patients: 28, consultations: 25, waitTime: 18, satisfaction: 4.1 },
    { date: '2024-05-30', patients: 35, consultations: 30, waitTime: 10, satisfaction: 4.6 },
    { date: '2024-05-31', patients: 40, consultations: 35, waitTime: 8, satisfaction: 4.8 }
  ];

  const teamData = [
    { name: 'Dr. Sarah', patients: 156, consultations: 140, rating: 4.7, department: 'Umum' },
    { name: 'Dr. Ahmad', patients: 142, consultations: 128, rating: 4.5, department: 'Anak' },
    { name: 'Ns. Rina', patients: 98, consultations: 85, rating: 4.3, department: 'Kebidanan' },
    { name: 'Dr. Maya', patients: 134, consultations: 120, rating: 4.6, department: 'Gigi' }
  ];

  const departmentStats = [
    { name: 'Umum', value: 35, color: '#3B82F6' },
    { name: 'Anak', value: 25, color: '#10B981' },
    { name: 'Kebidanan', value: 20, color: '#F59E0B' },
    { name: 'Gigi', value: 20, color: '#EF4444' }
  ];

  const LoginForm = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleLogin = (e) => {
      e.preventDefault();
      setUser({
        name: 'Dr. Sarah Wijaya',
        role: 'Dokter Umum',
        id: 'DU001',
        avatar: '/api/placeholder/40/40'
      });
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Sistem Monitoring</h1>
            <p className="text-gray-600">Kinerja Tenaga Kesehatan</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  };

  const Sidebar = () => (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800">Puskesmas</h2>
            <p className="text-sm text-gray-600">Monitoring System</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {[
          { id: 'dashboard', icon: TrendingUp, label: 'Dashboard' },
          { id: 'performance', icon: Activity, label: 'Kinerja Individu' },
          { id: 'reports', icon: FileText, label: 'Laporan' },
          { id: 'team', icon: Users, label: 'Tim Medis' },
          { id: 'settings', icon: Settings, label: 'Pengaturan' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-blue-50 transition-colors ${
              activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-600'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  const Header = () => (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'performance' && 'Kinerja Individu'}
            {activeTab === 'reports' && 'Laporan'}
            {activeTab === 'team' && 'Tim Medis'}
            {activeTab === 'settings' && 'Pengaturan'}
          </h1>
          <p className="text-gray-600">Sistem Monitoring Kinerja Tenaga Kesehatan</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="font-medium text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-600">{user?.role}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <button 
              onClick={() => setUser(null)}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const StatCard = ({ title, value, unit, change, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            {unit && <span className="text-sm text-gray-600">{unit}</span>}
          </div>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% dari kemarin
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Pasien Hari Ini"
          value="40"
          change={14}
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Konsultasi Selesai"
          value="35"
          change={8}
          icon={Activity}
          color="bg-green-500"
        />
        <StatCard
          title="Rata-rata Waktu Tunggu"
          value="8"
          unit="menit"
          change={-20}
          icon={Clock}
          color="bg-orange-500"
        />
        <StatCard
          title="Rating Kepuasan"
          value="4.8"
          unit="/5.0"
          change={4}
          icon={TrendingUp}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Trend Kinerja Mingguan</h3>
            <select 
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="daily">Harian</option>
              <option value="weekly">Mingguan</option>
              <option value="monthly">Bulanan</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="patients" stroke="#3B82F6" strokeWidth={2} name="Pasien" />
              <Line type="monotone" dataKey="consultations" stroke="#10B981" strokeWidth={2} name="Konsultasi" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribusi Pasien per Departemen</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentStats}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {departmentStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center mt-4 space-x-4">
            {departmentStats.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full`} style={{backgroundColor: item.color}}></div>
                <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const PerformanceTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Kinerja Harian Saya</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">40</p>
            <p className="text-sm text-gray-600">Pasien Ditangani</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">35</p>
            <p className="text-sm text-gray-600">Konsultasi Selesai</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">8 min</p>
            <p className="text-sm text-gray-600">Avg. Waktu Tunggu</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Grafik Waktu Tunggu Pasien</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="waitTime" fill="#F59E0B" name="Waktu Tunggu (menit)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Target vs Pencapaian</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Pasien per Hari</span>
              <span className="text-sm font-medium">40/35 (114%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Waktu Tunggu Max</span>
              <span className="text-sm font-medium">8/15 menit (53%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: '53%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Rating Kepuasan</span>
              <span className="text-sm font-medium">4.8/4.5 (107%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ReportsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Generate Laporan</h3>
          <div className="flex space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>Laporan Harian</option>
              <option>Laporan Mingguan</option>
              <option>Laporan Bulanan</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Laporan Harian</h4>
            <p className="text-sm text-gray-600 mb-3">Ringkasan kinerja hari ini</p>
            <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center justify-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Lihat</span>
            </button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Laporan Mingguan</h4>
            <p className="text-sm text-gray-600 mb-3">Analisis trend mingguan</p>
            <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center justify-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Lihat</span>
            </button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Laporan Bulanan</h4>
            <p className="text-sm text-gray-600 mb-3">Evaluasi kinerja bulanan</p>
            <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center justify-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Lihat</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Riwayat Laporan</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-medium text-gray-600">Tanggal</th>
                <th className="text-left py-3 font-medium text-gray-600">Jenis Laporan</th>
                <th className="text-left py-3 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {[1,2,3,4,5].map(i => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-3">2024-05-{30-i}</td>
                  <td className="py-3">Laporan Harian</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Selesai</span>
                  </td>
                  <td className="py-3">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const TeamTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Kinerja Tim Medis</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-medium text-gray-600">Nama</th>
                <th className="text-left py-3 font-medium text-gray-600">Departemen</th>
                <th className="text-left py-3 font-medium text-gray-600">Pasien</th>
                <th className="text-left py-3 font-medium text-gray-600">Konsultasi</th>
                <th className="text-left py-3 font-medium text-gray-600">Rating</th>
                <th className="text-left py-3 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((member, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-800">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-600">{member.department}</td>
                  <td className="py-4 text-gray-600">{member.patients}</td>
                  <td className="py-4 text-gray-600">{member.consultations}</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-600">{member.rating}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Aktif</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Perbandingan Kinerja Tim</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={teamData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="patients" fill="#3B82F6" name="Pasien" />
            <Bar dataKey="consultations" fill="#10B981" name="Konsultasi" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan Profil</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              <input
                type="text"
                defaultValue="Dr. Sarah Wijaya"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jabatan</label>
              <input
                type="text"
                defaultValue="Dokter Umum"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="sarah.wijaya@puskesmas.id"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Simpan Perubahan
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan Notifikasi</h3>
        <div className="space-y-4">
          {[
            'Notifikasi laporan harian',
            'Pengingat evaluasi kinerja',
            'Update sistem antrian',
            'Notifikasi rating pasien'
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-700">{item}</span>
              <input
                type="checkbox"
                defaultChecked={index < 2}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Integrasi Sistem</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">Sistem Antrian</h4>
              <p className="text-sm text-gray-600">Sinkronisasi data antrian pasien</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Terhubung</span>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800">Rekam Medis</h4>
              <p className="text-sm text-gray-600">Integrasi dengan sistem EMR</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Terhubung</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'performance' && <PerformanceTab />}
          {activeTab === 'reports' && <ReportsTab />}
          {activeTab === 'team' && <TeamTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>
    </div>
  );
};

export default HealthcareMonitoringSystem;