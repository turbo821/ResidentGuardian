import { useState, useEffect } from "react";

const StatsSection = () => {
  const [stats, setStats] = useState({
    issuesResolved: 0,
    activeUsers: 0,
    activeIssues: 0
  });

  useEffect(() => {
    
    setStats({
      issuesResolved: 1245,
      activeUsers: 843,
      activeIssues: 76
    });
  }, []);

  return (
    <section className="bg-blue-500 bg-opacity-50 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-blue-600 bg-opacity-80 p-6 rounded-lg">
            <h3 className="text-4xl font-bold">{stats.issuesResolved}+</h3>
            <p className="mt-2">Проблем решено</p>
          </div>
          <div className="bg-blue-600 bg-opacity-80 p-6 rounded-lg">
            <h3 className="text-4xl font-bold">{stats.activeUsers}+</h3>
            <p className="mt-2">Активных пользователей</p>
          </div>
          <div className="bg-blue-600 bg-opacity-80 p-6 rounded-lg">
            <h3 className="text-4xl font-bold">{stats.activeIssues}</h3>
            <p className="mt-2">Активных проблем</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;