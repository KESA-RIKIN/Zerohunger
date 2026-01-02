import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            return setError("Passwords do not match");
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create an account: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-row overflow-hidden bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white">
            {/* Left Side: Visual / Brand Area */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-background-dark items-center justify-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFpE276qGDhiHg2nXzJaAnJwhp0GI3K17CwygvMB1YAqZYdAMJtBzLQVYXhy5JzXF2fa2sxB3JfH5YCJFMqyjO7TZW7OlHrhOVkEkVTNx77-tTEOaHtyVsRjeAcKrRqvnVmJfax4lwHxhKdcNcG4REGH9edKE3FQdtVmE1oO5_T7rRFMtVHN57WnXmDM2rwoox0uSz_uTzuMNeGcZ1H6xxg9ImoN_ZXs-tf0KbZK991m2rNFxecqQdoinG2NNM7JbypUmy6ut2N-UP")' }}></div>
                <div className="absolute inset-0 bg-background-dark/60 bg-gradient-to-t from-background-dark/90 to-transparent"></div>
                <div className="relative z-10 p-12 max-w-xl text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-full mb-8">
                        <span className="material-symbols-outlined text-primary text-4xl">eco</span>
                    </div>
                    <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-6">
                        Redistributing abundance to end hunger.
                    </h2>
                    <p className="text-lg text-gray-200 leading-relaxed font-medium">
                        Join over 10,000 community members connecting surplus food with those who need it most.
                    </p>
                </div>
            </div>

            {/* Right Side: Form Area */}
            <div className="flex flex-1 flex-col justify-center px-4 py-8 sm:px-6 lg:px-20 xl:px-24 bg-white dark:bg-[#111713] h-screen overflow-y-auto">
                <div className="w-full max-w-md mx-auto space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-text-main dark:text-white text-4xl font-black leading-tight tracking-tight">
                            Join the Movement
                        </h1>
                        <p className="text-text-light dark:text-gray-400 text-base font-normal">
                            Create an account to help us achieve Zero Hunger.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-text-main dark:text-white text-base font-medium leading-normal" htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="jane@example.com"
                                className="block w-full rounded-lg border border-input-border bg-white dark:bg-[#1c2e24] dark:border-[#2a4536] dark:text-white h-12 px-4 text-base placeholder:text-text-light focus:border-primary focus:ring-primary focus:outline-none transition-shadow"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-text-main dark:text-white text-base font-medium leading-normal" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Create a password"
                                className="block w-full rounded-lg border border-input-border bg-white dark:bg-[#1c2e24] dark:border-[#2a4536] dark:text-white h-12 px-4 text-base placeholder:text-text-light focus:border-primary focus:ring-primary focus:outline-none transition-shadow"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-text-main dark:text-white text-base font-medium leading-normal" htmlFor="passwordConfirm">Confirm Password</label>
                            <input
                                type="password"
                                id="passwordConfirm"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                required
                                placeholder="Confirm your password"
                                className="block w-full rounded-lg border border-input-border bg-white dark:bg-[#1c2e24] dark:border-[#2a4536] dark:text-white h-12 px-4 text-base placeholder:text-text-light focus:border-primary focus:ring-primary focus:outline-none transition-shadow"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center rounded-lg bg-primary py-3.5 px-4 text-sm font-bold text-text-main hover:bg-[#1bc655] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="text-center space-y-4">
                        <p className="text-sm text-text-light">
                            Already have an account?
                            <Link to="/login" className="font-bold text-text-main dark:text-white hover:text-accent-orange transition-colors ml-1">Log In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
