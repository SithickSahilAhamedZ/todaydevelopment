import React from 'react';
import { BarChart3 } from 'lucide-react';
import Card from '../components/Card';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 size={32} className="text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Analytics</h1>
      </div>
      <Card>
        <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Under Construction</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
                This page is currently under development. Soon, organizers will be able to view analytics and insights related to the event here.
            </p>
        </div>
      </Card>
    </div>
  );
};
export default AnalyticsPage;
