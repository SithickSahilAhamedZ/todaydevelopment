import React, { useState } from 'react';
import { REPORT_ROLES, REPORT_ISSUES, REPORT_PRIORITIES, PRIORITY_COLORS } from '../constants';
import { FileWarning, Send, MapPin, MessageSquare, Camera, X } from 'lucide-react';
import Card from '../components/Card';

const ReportPage: React.FC = () => {
    const [role, setRole] = useState('Visitor');
    const [issue, setIssue] = useState('');
    const [priority, setPriority] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Incident report submitted successfully! ${imagePreview ? 'An image was attached.' : ''}`);
        // Reset form state here if needed
        setRole('Visitor');
        setIssue('');
        setPriority('');
        setImagePreview(null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        e.target.value = ''; // Reset file input
      }
    };

    const RoleCard: React.FC<{role: {name: string, desc: string, icon: React.ElementType}, selected: boolean, onClick: () => void}> = ({ role, selected, onClick }) => {
        const {name, desc, icon: Icon} = role;
        return (
            <button type="button" onClick={onClick} className={`p-3 rounded-xl border-2 text-left transition-all w-full ${selected ? 'bg-white dark:bg-gray-700 border-orange-500 shadow-lg' : 'bg-gray-50 dark:bg-gray-700/50 border-transparent'}`}>
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${selected ? 'bg-orange-100 text-orange-500' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'}`}><Icon size={20}/></div>
                    <div>
                        <p className="font-bold text-gray-800 dark:text-gray-200">{name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                    </div>
                </div>
            </button>
        )
    }

    const OptionButton: React.FC<{option: string, selected: boolean, onClick: () => void, className?: string}> = ({ option, selected, onClick, className }) => (
         <button type="button" onClick={onClick} className={`px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-all ${selected ? 'bg-orange-500 text-white border-orange-500' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'} ${className}`}>
            {option}
        </button>
    );

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
             <div className="flex items-center space-x-3 mb-6">
                <FileWarning size={32} className="text-orange-500" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Incident Report</h1>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <Card>
                    <label className="font-bold text-gray-800 dark:text-white">Your Role</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {REPORT_ROLES.map(r => <RoleCard key={r.name} role={r} selected={role === r.name} onClick={() => setRole(r.name)}/>)}
                    </div>
                </Card>
                <Card>
                    <label className="font-bold text-gray-800 dark:text-white">Issue Type</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {REPORT_ISSUES.map(option => <OptionButton key={option} option={option} selected={issue === option} onClick={() => setIssue(option)}/>)}
                    </div>
                </Card>
                 <Card>
                    <label className="font-bold text-gray-800 dark:text-white">Priority Level</label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                        {REPORT_PRIORITIES.map(option => <OptionButton key={option} option={option} selected={priority === option} onClick={() => setPriority(option)} className={`!w-full ${priority === option ? PRIORITY_COLORS[option] : ''}`}/>)}
                    </div>
                </Card>
                
                <Card>
                    <label htmlFor="location" className="font-bold text-gray-800 dark:text-white">Report Details</label>
                     <div className="relative mt-2">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" id="location" placeholder="e.g., Main Stage Area, Section A, Booth 3" className="w-full pl-10 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-gray-200" required/>
                    </div>
                     <div className="relative mt-2">
                        <MessageSquare className="absolute left-3 top-4 text-gray-400" size={20} />
                        <textarea id="description" rows={4} placeholder="Please describe the issue in detail..." className="w-full pl-10 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-gray-200" required></textarea>
                        <span className="absolute bottom-3 right-3 text-xs text-gray-400">0/500 characters</span>
                    </div>
                </Card>

                <Card>
                    <label className="font-bold text-gray-800 dark:text-white">Attach a Photo (Optional)</label>
                    <div className="mt-2">
                        {!imagePreview ? (
                        <label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Camera size={32} className="text-gray-500 dark:text-gray-400 mb-2" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, or GIF</p>
                            </div>
                            <input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                        ) : (
                        <div className="relative">
                            <img src={imagePreview} alt="Incident preview" className="w-full h-auto max-h-60 object-contain rounded-lg bg-gray-100 dark:bg-gray-800" />
                            <button type="button" onClick={() => setImagePreview(null)} className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 transition-colors" aria-label="Remove image">
                            <X size={16} />
                            </button>
                        </div>
                        )}
                    </div>
                </Card>
                
                <button type="submit" className="w-full py-4 bg-blue-500 text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-lg">
                    <Send className="mr-2" size={20} /> Submit Report
                </button>
            </form>
        </div>
    );
};

export default ReportPage;
