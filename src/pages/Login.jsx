import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to log in: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col lg:flex-row overflow-hidden bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white">
            {/* Left Section: Hero Image & Mission */}
            <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-end p-16 bg-cover bg-center group"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfa-uz8I-Q3AHIciy7MWYqWs3UDgzw723Cwl-AjtfrXd5LQzFaUDkJqyTWtO-ohcJ5fimDIRMPSki0LoA9iNOS-jRSaz4kyqp5TIMN1ZELtTyjGv9d_WxaEE5zSrGyK1h9fmNvIV9-yDxhxT30pg25LVuoQ91TylAH8j84Ya2EzltBYqfyRD9AE819f00bwrwRAHBtRT3ygD7pKFQmMPCVrwZ1sHlGiOEQOVkziD9Nf61T4U82VCXDlY9D2J3fEVJZn4YrSN1_uUPO")' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-transparent"></div>
                <div className="relative z-10 max-w-xl">
                    <div className="mb-6 inline-flex items-center justify-center size-14 rounded-xl bg-primary/20 backdrop-blur-md border border-white/10 shadow-lg">
                        <span className="material-symbols-outlined text-primary text-3xl">volunteer_activism</span>
                    </div>
                    <h2 className="text-4xl font-extrabold leading-tight text-white mb-4 tracking-tight drop-shadow-md">
                        Feeding Communities,<br />
                        <span className="text-primary">Together.</span>
                    </h2>
                    <p className="text-lg text-gray-200 font-medium leading-relaxed opacity-90">
                        Join our global network of food banks, donors, and volunteers working everyday to achieve zero hunger.
                    </p>
                </div>
            </div>

            {/* Right Section: Login Form */}
            <div className="flex w-full flex-col justify-center items-center px-6 py-12 lg:w-1/2 bg-white dark:bg-background-dark relative">
                <div className="w-full max-w-[440px] flex flex-col gap-8">
                    {/* Header */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3 mb-6">
                            <Link to="/" className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">eco</span>
                            </Link>
                            <h2 className="text-xl font-bold tracking-tight text-text-main dark:text-white">Zero Hunger</h2>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em] text-text-main dark:text-white">Welcome Back</h1>
                        <p className="text-base text-gray-500 dark:text-gray-400 mt-2">Please enter your details to access the redistribution dashboard.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
                        {/* Email */}
                        <div className="flex flex-col gap-2 group/input">
                            <label className="text-text-main dark:text-white text-sm font-bold leading-normal" htmlFor="email">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within/input:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">mail</span>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full rounded-lg border border-input-border dark:border-gray-700 bg-background-light dark:bg-gray-800/50 h-12 pl-11 pr-4 text-base placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2 group/input">
                            <div className="flex justify-between items-center">
                                <label className="text-text-main dark:text-white text-sm font-bold leading-normal" htmlFor="password">Password</label>
                                <a href="#" className="text-sm font-bold text-accent-orange hover:text-accent-orange-hover transition-colors">Forgot Password?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within/input:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="block w-full rounded-lg border border-input-border dark:border-gray-700 bg-background-light dark:bg-gray-800/50 h-12 pl-11 pr-12 text-base placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-primary-hover text-text-main text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 mt-2 disabled:opacity-50"
                        >
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>

                    <div className="text-center mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Don't have an account?
                            <Link to="/signup" className="font-bold text-accent-orange hover:text-accent-orange-hover transition-colors inline-flex items-center gap-1 ml-1">
                                Sign Up <span className="material-symbols-outlined text-[16px] font-bold">arrow_forward</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
