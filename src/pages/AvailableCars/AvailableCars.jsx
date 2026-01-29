import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { Link } from 'react-router-dom';
import { FaTh, FaList, FaSearch, FaGasPump, FaCogs } from 'react-icons/fa';
import axiosSecure from '../../services/axios';

gsap.registerPlugin(Flip);

const AvailableCars = () => {
    const [view, setView] = useState('grid');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const containerRef = useRef(null);

    // Debounce search
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(handler);
    }, [search]);

    const { data: cars = [], isLoading, isError } = useQuery({
        queryKey: ['cars', debouncedSearch, sort],
        queryFn: async () => {
            const res = await axiosSecure.get(`http://localhost:5000/cars?search=${debouncedSearch}&sort=${sort}`);
            return res.data;
        }
    });

    // Handle Layout Toggle with GSAP Flip
    const toggleView = (newView) => {
        if (view === newView) return;
        
        const state = Flip.getState(".car-card");
        setView(newView);
        
        // Wait for React to update DOM
        setTimeout(() => {
            Flip.from(state, {
                duration: 0.6,
                ease: "power2.inOut",
                stagger: 0.05,
                absolute: true, // Crucial for grid-to-list transitions
                onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 }),
                onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.3 })
            });
        }, 0);
    };

    return (
        <div className="min-h-screen bg-background text-white pt-24 pb-10 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Available Cars</h1>
                    <p className="text-secondary text-lg">Choose from our premium collection.</p>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-surface p-4 rounded-xl border border-white/5">
                    
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                        <input 
                            type="text" 
                            placeholder="Search by model, brand, or location..." 
                            className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary text-white placeholder-gray-500 transition-colors"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {/* Sort */}
                        <select 
                            className="bg-background border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary text-white cursor-pointer"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="">Sort By: Default</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="date_desc">Newest First</option>
                            <option value="date_asc">Oldest First</option>
                        </select>

                        {/* View Toggle */}
                        <div className="flex bg-background rounded-lg p-1 border border-white/10">
                            <button 
                                onClick={() => toggleView('grid')}
                                className={`p-2 rounded-md transition-all ${view === 'grid' ? 'bg-primary text-black shadow-lg' : 'text-secondary hover:text-white'}`}
                            >
                                <FaTh />
                            </button>
                            <button 
                                onClick={() => toggleView('list')}
                                className={`p-2 rounded-md transition-all ${view === 'list' ? 'bg-primary text-black shadow-lg' : 'text-secondary hover:text-white'}`}
                            >
                                <FaList />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : isError ? (
                    <div className="text-center text-red-500 py-10">Error loading cars. Please try again later.</div>
                ) : cars.length === 0 ? (
                    <div className="text-center text-secondary py-10">No cars found matching your criteria.</div>
                ) : (
                    <div ref={containerRef} className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                        {cars.map((car) => (
                            <div 
                                key={car._id} 
                                className={`car-card bg-surface rounded-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] ${view === 'list' ? 'flex flex-col md:flex-row' : ''}`}
                            >
                                <div className={`relative overflow-hidden ${view === 'list' ? 'w-full md:w-1/3 h-48 md:h-auto' : 'h-56'}`}>
                                    <img 
                                        src={car.image || "https://via.placeholder.com/400x300?text=Car+Image"} 
                                        alt={car.model} 
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold ${car.available ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                        {car.available ? 'Available' : 'Booked'}
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-display font-bold">{car.model}</h3>
                                            {view === 'list' && <p className="text-primary text-xl font-bold">${car.dailyPrice}<span className="text-sm text-secondary font-normal">/day</span></p>}
                                        </div>
                                        {view === 'grid' && <p className="text-primary text-lg font-bold mb-3">${car.dailyPrice}<span className="text-sm text-secondary font-normal">/day</span></p>}
                                        
                                        <p className="text-secondary text-sm mb-4 line-clamp-2">{car.description || "Experience the ultimate driving machine."}</p>
                                        
                                        <div className="flex gap-4 text-xs text-secondary mb-4">
                                            <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded"><FaGasPump /> {car.fuelType || "Petrol"}</span>
                                            <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded"><FaCogs /> {car.transmission || "Auto"}</span>
                                        </div>
                                    </div>

                                    <Link 
                                        to={`/car/${car._id}`}
                                        className="block w-full text-center bg-white/10 hover:bg-primary hover:text-black py-2 rounded-lg transition-all duration-300 font-semibold"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailableCars;
