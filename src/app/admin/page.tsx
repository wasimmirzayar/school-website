export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-600">Total Students</h2>
          <p className="text-2xl font-bold text-blue-600">120</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-600">Total Teachers</h2>
          <p className="text-2xl font-bold text-green-600">15</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-600">Classes</h2>
          <p className="text-2xl font-bold text-purple-600">8</p>
        </div>
      </div>
    </div>
  );
}