import React from 'react';

const stats = [
    { label: 'Meals Saved', value: '150k+', color: 'text-emerald-600' },
    { label: 'People Fed', value: '45k+', color: 'text-blue-600' },
    { label: 'NGO Partners', value: '120+', color: 'text-purple-600' },
    { label: 'Cities Covered', value: '25+', color: 'text-orange-600' },
];

const Stats = () => {
    return (
        <div className="bg-white py-12 border-y border-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                                {stat.value}
                            </div>
                            <div className="text-gray-500 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;
