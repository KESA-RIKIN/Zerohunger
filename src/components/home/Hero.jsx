import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-emerald-50 to-teal-50" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-100/30 rounded-bl-[100px] -z-10 blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
                        <HeartHandshake className="w-4 h-4 mr-2" />
                        Connecting Surplus to Scarcity
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
                        Share a Meal, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                            Change a Life.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                        Join our mission to eliminate food waste and hunger.
                        Whether you have food to give or need a helping hand,
                        we bridge the gap instantly.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/donate" className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center group">
                            Donate Food
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/receive" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-100 hover:border-emerald-200 font-bold rounded-xl transition-all flex items-center justify-center">
                            Request Food
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center justify-center space-x-6 text-sm text-gray-500">
                        <div className="flex -space-x-2">
                            {/* Placeholder Avatars */}
                            <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
                            <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
                            <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
                        </div>
                        <p>Trusted by 10,000+ donors/NGOs</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
