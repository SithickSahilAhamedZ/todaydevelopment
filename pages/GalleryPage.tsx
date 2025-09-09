import React from 'react';
import { Image } from 'lucide-react';
import Card from '../components/Card';

const GalleryPage: React.FC = () => {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Image size={32} className="text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gallery</h1>
      </div>
      <Card>
        <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Under Construction</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
                This page is currently under development. Soon, you'll be able to browse a gallery of beautiful moments from the Ujjain Simhastha.
            </p>
        </div>
      </Card>
    </div>
  );
};
export default GalleryPage;
