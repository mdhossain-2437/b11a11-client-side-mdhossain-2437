import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaGasPump, FaCogs } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const cars = [
    {
        id: 1,
        model: "Tesla Model S Plaid",
        price: 120,
        available: true,
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop",
        posted: "2 days ago"
    },
    {
        id: 2,
        model: "Porsche 911 GT3",
        price: 350,
        available: true,
        image: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop",
        posted: "1 day ago"
    },
    {
        id: 3,
        model: "Mercedes-AMG GT",
        price: 200,
        available: false,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
        posted: "3 days ago"
    },
     {
        id: 4,
        model: "Audi RS e-tron GT",
        price: 180,
        available: true,
        image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop",
        posted: "5 hours ago"
    },
     {
        id: 5,
        model: "BMW M4 Competition",
        price: 150,
        available: true,
        image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop",
        posted: "1 week ago"
    },
     {
        id: 6,
        model: "Lamborghini Huracan",
        price: 500,
        available: true,
        image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?q=80&w=2000&auto=format&fit=crop",
        posted: "Just now"
    }
];

const RecentListings = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const el = sectionRef.current;
        
        gsap.fromTo(cardsRef.current, 
            { y: 50, opacity: 0 },
            {
                y: 0, 
                opacity: 1, 
                duration: 0.6, 
                stagger: 0.1,
                scrollTrigger: {
                    trigger: el,
                    start: "top 75%",
                }
            }
        );
    }, []);

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="py-20 bg-background text-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">Recent Listings</h2>
                        <p className="text-secondary">Fresh additions to our premium fleet.</p>
                    </div>
                    <Link to="/available-cars" className="text-primary hover:text-white transition-colors underline underline-offset-4">
                        View All Cars
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((car, index) => (
                        <div 
                            key={car.id} 
                            ref={addToRefs}
                            className="group bg-surface rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                        >
                            <div className="relative h-60 overflow-hidden">
                                <img 
                                    src={car.image} 
                                    alt={car.model} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                                    {car.posted}
                                </div>
                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${car.available ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                    {car.available ? 'Available' : 'Booked'}
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-2xl font-display font-bold mb-2">{car.model}</h3>
                                <div className="flex justify-between items-center mb-6">
                                    <p className="text-secondary text-sm">Daily Rate</p>
                                    <p className="text-primary text-xl font-bold">${car.price}<span className="text-sm text-secondary font-normal">/day</span></p>
                                </div>
                                
                                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                                    <div className="flex gap-4 text-secondary text-sm">
                                         {/* Mock features */}
                                         <span className="flex items-center gap-1"><FaGasPump /> Petrol</span>
                                         <span className="flex items-center gap-1"><FaCogs /> Auto</span>
                                    </div>
                                    <Link 
                                        to={`/car/${car.id}`}
                                        className="text-white bg-white/10 hover:bg-primary hover:text-black px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
                                    >
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentListings;