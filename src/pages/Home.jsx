import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-text-main">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[#f0f4f2]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-10 bg-primary/20 rounded-full text-primary">
                                <span className="material-symbols-outlined !text-2xl">eco</span>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-text-main">Zero Hunger</h2>
                        </div>
                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#about" className="text-sm font-semibold text-text-main hover:text-primary transition-colors">About Us</a>
                            <a href="#how-it-works" className="text-sm font-semibold text-text-main hover:text-primary transition-colors">How It Works</a>
                            <a href="#faq" className="text-sm font-semibold text-text-main hover:text-primary transition-colors">FAQ</a>
                            <a href="#contact" className="text-sm font-semibold text-text-main hover:text-primary transition-colors">Contact Us</a>
                        </div>
                        {/* Buttons */}
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="hidden sm:flex h-10 items-center justify-center rounded-lg px-5 text-sm font-bold text-text-main hover:bg-gray-100 transition-colors">
                                Login
                            </Link>
                            <Link to="/signup" className="flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-text-main shadow-sm hover:bg-green-400 transition-colors">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative w-full overflow-hidden bg-gray-900">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10"></div>
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKgizFXSKbMoWjiNVtf0LkVeZEHbuFAB5m4sBrrUcSGKVoFlsVYp5pjYGEh_P2rUNtvQY9DMxhMuqwtiE0NWatG3_S5kuVX5L8Yilnk8bnXocFTuJISzlGe5isgENZdusIDc_wR6iDlQ0i4TZotbj2n5eWe4d-tf57gBehPG2Fizd7Jgo_rfARZEwaEYJAsd4Cr3p0DLaDT17SUsryxoGTlxUq-a6v4PvaUq02QzdKnBmc9a6i9ZGs-TLpxSxtCxH1L9x6SL7n-QCn"
                        alt="Volunteers sharing fresh food"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
                            Reducing Food Waste. <span className="text-primary">Feeding the Hungry.</span>
                        </h1>
                        <p className="mt-6 text-lg text-gray-300 sm:text-xl max-w-lg leading-relaxed">
                            Join our mission to bridge the gap between abundance and need. Connect surplus food from restaurants to local shelters instantly.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link to="/signup" className="flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-text-main shadow-lg hover:bg-green-400 hover:scale-105 transition-all">
                                Donate Food
                            </Link>
                            <button className="flex h-12 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 px-8 text-base font-bold text-white hover:bg-white/20 transition-all">
                                Partner With Us
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Donated Restaurants */}
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">Top Donated Restaurants</h2>
                            <p className="mt-2 text-text-muted text-lg">Local heroes making a difference in your community.</p>
                        </div>
                        <a href="#" className="text-primary font-bold hover:underline flex items-center gap-1">
                            View all partners <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqYX3mFnYC43vBVrlba7bL2waYmkF5_F4YEBweNwSKJfGrPAdPZHlXKuivztdBz0MiQqQlpbV-jrhIt4WUtWNTxMEZOnU13L3h6gqd7v9r3jf2KCpeCmv2Ym3f5YBHyUQBTjRnr4Rfo-jR6KS0aV9aYI2FbwH2I6M6jEamfBYDWGoBTAv82ot3JJsc5Vxx-hfQ_GZwp2e8qFAzDsOEkiFW4CbSfxAV7I_XqK93s7WA3wlI0p--jFplV1eVqJ8VJyhsu0TFVf0E7NAn" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Restaurant interior" />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-text-main shadow-sm flex items-center gap-1">
                                    <span className="material-symbols-outlined text-accent text-sm">star</span> 4.9
                                </div>
                            </div>
                            <div className="px-2 pb-2">
                                <h3 className="text-lg font-bold text-text-main">The Green Bowl</h3>
                                <div className="mt-2 flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-text-muted text-sm">
                                        <span className="material-symbols-outlined text-lg">location_on</span>
                                        New York, NY
                                    </div>
                                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-green-700">
                                        500+ meals
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* More cards can be added here following the same pattern */}
                    </div>
                </div>
            </section>
            {/* About Us Section */}
            <section id="about" className="py-20 bg-background-light">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="flex-1 flex flex-col gap-6">
                            <div className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
                                <span className="w-8 h-[2px] bg-primary"></span>
                                Our Mission
                            </div>
                            <h2 className="text-3xl font-black text-text-main sm:text-4xl lg:text-5xl leading-tight">
                                Bridging the gap between <span className="text-accent">abundance</span> and need.
                            </h2>
                            <p className="text-lg text-text-muted leading-relaxed">
                                Zero Hunger is dedicated to solving two problems at once: food waste and hunger.
                                We facilitate the seamless redistribution of surplus food from restaurants, events,
                                and cafeterias to local shelters and community centers.
                            </p>
                            <p className="text-lg text-text-muted leading-relaxed">
                                Our platform ensures that perfectly good meals don't end up in landfills, but instead
                                nourish those who need it most. Join our community of donors and volunteers today.
                            </p>
                            <div className="pt-4">
                                <a href="#" className="inline-flex items-center justify-center font-bold text-text-main border-b-2 border-primary pb-1 hover:text-primary transition-colors">
                                    Learn more about our story
                                </a>
                            </div>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-1 pt-12">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOHY9VrUhur3-GHd_tsjOJAy7Ptn63MTVr35QkHtQfMr1d_xtCQmlwwgseglDJO1zrOiZ8nTo-vigijInmvqZls0SwuuXHB16u3nH-_h23vKcznVdcWf6kxZsi2JlmDx2HgjX3-1f6qx8fDAPJ6a4xBt3gxz6BU7vOvB1sDjCOtIEIzXzFdz6UT36wsFslVnhYUHj1iEsGNxEPxgHuHgjKtbz8h56T7TnGS1zZTXkuS8r-SBc4Xg0DGzlzF1aoY2erYPz7Gb3oLsAj" className="w-full h-64 object-cover rounded-2xl shadow-lg" alt="Volunteer handing food" />
                                </div>
                                <div className="col-span-1">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxoxFPPQbDoiIEi0RKvLpF9Rwm0pYTtSMfU2WGRlam5RaZzklfna_YFVR26FFYMqGhVRiVa4kIvnMbseeoOM6jRDDIRKqxYQ1pnYp5TjxaKordUfOAycIYq_K5kkiAkJHGK5q0BPJqDbKBF7Ax0yqCQ6KS9yeSfnZ-Sqi7a0x7hF8L7TFXuP1wHFnNurY9GxW3CwbTF36zoX5Aq9CvQq1SsUwyAGdqyp3v4AUf1NhVwSeBLTeB-0F2inRnDAF6IpenSOHJD3NVofbz" className="w-full h-64 object-cover rounded-2xl shadow-lg" alt="Fresh fruits" />
                                </div>
                                <div className="col-span-2">
                                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6Of9EE1r8DKM4k7Av-KfiNe7Ux3zKmUP4gHnBNy_4NaECTjwolGLIbKlRB0nh5yu990MVYMBpAXWmeq9DLKbSWWQ_AaoeR2gdUEA0NbpfZNwS7vzy8wIZW-8qysei1n85tZEOfdvXhS6TELz5fsfW58Ysila1PlZH1VO9sJAyvyRDdrJGt8spzLRhiOAuZyxY7Q6FL2lzaX1mLoN0AGLe-93gLCuChJUbtx-4JiJNI_oXWMcQWkXNRalTs1PPe5lsLtD4eABnSOtt" className="w-full h-48 object-cover rounded-2xl shadow-lg" alt="Community volunteers" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">How It Works</h2>
                        <p className="mt-4 text-lg text-text-muted">A simple process to make a massive impact. Here is how we connect donors with those in need.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line for Desktop */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-10"></div>
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="flex items-center justify-center size-24 rounded-full bg-primary/10 mb-6 group-hover:bg-primary transition-colors duration-300">
                                <span className="material-symbols-outlined text-4xl text-green-700 group-hover:text-black">restaurant_menu</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-3">1. List Surplus Food</h3>
                            <p className="text-text-muted leading-relaxed max-w-xs">
                                Restaurants and partners list available surplus food items through our easy-to-use dashboard.
                            </p>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="flex items-center justify-center size-24 rounded-full bg-primary/10 mb-6 group-hover:bg-primary transition-colors duration-300">
                                <span className="material-symbols-outlined text-4xl text-green-700 group-hover:text-black">pedal_bike</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-3">2. Volunteers Collect</h3>
                            <p className="text-text-muted leading-relaxed max-w-xs">
                                Nearby verified volunteers receive a notification and pick up the food packages promptly.
                            </p>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="flex items-center justify-center size-24 rounded-full bg-primary/10 mb-6 group-hover:bg-primary transition-colors duration-300">
                                <span className="material-symbols-outlined text-4xl text-green-700 group-hover:text-black">volunteer_activism</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-3">3. Food is Distributed</h3>
                            <p className="text-text-muted leading-relaxed max-w-xs">
                                Food is delivered to local shelters and community centers, feeding those who need it most.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-20 bg-background-light">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">Frequently Asked Questions</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <details className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-bold text-text-main transition-colors group-open:bg-gray-50">
                                <span className="text-lg">What kind of food can be donated?</span>
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">keyboard_arrow_down</span>
                            </summary>
                            <div className="px-6 pb-6 pt-2 text-text-muted leading-relaxed">
                                We accept surplus prepared food that has been kept at safe temperatures, fresh produce, canned goods, and packaged items that are before their expiration date. We strictly adhere to food safety guidelines.
                            </div>
                        </details>
                        <details className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-bold text-text-main transition-colors group-open:bg-gray-50">
                                <span className="text-lg">Is there any cost for the service?</span>
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">keyboard_arrow_down</span>
                            </summary>
                            <div className="px-6 pb-6 pt-2 text-text-muted leading-relaxed">
                                No, our platform is completely free for both food donors and recipient organizations. We operate through the generous support of grants and public donations.
                            </div>
                        </details>
                        <details className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-bold text-text-main transition-colors group-open:bg-gray-50">
                                <span className="text-lg">How do I become a volunteer?</span>
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">keyboard_arrow_down</span>
                            </summary>
                            <div className="px-6 pb-6 pt-2 text-text-muted leading-relaxed">
                                Simply click the "Sign Up" button and choose "Volunteer" as your account type. After a quick verification and background check process, you can start accepting delivery tasks in your area.
                            </div>
                        </details>
                        <details className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-bold text-text-main transition-colors group-open:bg-gray-50">
                                <span className="text-lg">What about food safety and liability?</span>
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">keyboard_arrow_down</span>
                            </summary>
                            <div className="px-6 pb-6 pt-2 text-text-muted leading-relaxed">
                                Donors are protected by the Bill Emerson Good Samaritan Food Donation Act. We also provide guidelines and thermal bags to volunteers to ensure food remains at safe temperatures during transport.
                            </div>
                        </details>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section id="contact" className="py-24 bg-white relative overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        {/* Contact Info */}
                        <div className="flex flex-col justify-center">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl mb-4">Get in Touch</h2>
                                <p className="text-lg text-text-muted">
                                    Have questions or want to partner with us at a corporate level? Send us a message and we'll get back to you within 24 hours.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-green-800">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-text-main">Email Us</h3>
                                        <p className="text-text-muted">hello@zerohunger.org</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-green-800">
                                        <span className="material-symbols-outlined">call</span>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-text-main">Call Us</h3>
                                        <p className="text-text-muted">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-green-800">
                                        <span className="material-symbols-outlined">location_on</span>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-text-main">Visit Us</h3>
                                        <p className="text-text-muted">123 Green Street, Sustainability City, 90210</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-900/5">
                            <form action="#" method="POST" className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold leading-6 text-text-main">Name</label>
                                    <div className="mt-2.5">
                                        <input type="text" name="name" id="name" placeholder="John Doe" className="block w-full rounded-md border-0 px-3.5 py-2 text-text-main ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-gray-50" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-text-main">Email</label>
                                    <div className="mt-2.5">
                                        <input type="email" name="email" id="email" placeholder="john@example.com" className="block w-full rounded-md border-0 px-3.5 py-2 text-text-main ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-gray-50" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-text-main">Message</label>
                                    <div className="mt-2.5">
                                        <textarea name="message" id="message" rows="4" placeholder="How can we help you?" className="block w-full rounded-md border-0 px-3.5 py-2 text-text-main ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-gray-50"></textarea>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <button type="submit" className="w-full flex justify-center rounded-md bg-primary px-3.5 py-3 text-sm font-bold text-text-main shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center size-8 bg-primary/20 rounded-full text-primary">
                            <span className="material-symbols-outlined !text-xl">eco</span>
                        </div>
                        <span className="text-lg font-bold text-text-main">Zero Hunger</span>
                    </div>
                    <div className="text-sm text-text-muted text-center md:text-right">
                        © 2023 Zero Hunger Initiative. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
