import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCarSide, FaDollarSign, FaMousePointer, FaHeadset } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: <FaCarSide className="text-4xl text-primary mb-4" />,
        title: "Wide Variety",
        desc: "From budget-friendly options to luxury vehicles, we have it all."
    },
    {
        icon: <FaDollarSign className="text-4xl text-primary mb-4" />,
        title: "Affordable Prices",
        desc: "Competitive daily rates you can count on without hidden fees."
    },
    {
        icon: <FaMousePointer className="text-4xl text-primary mb-4" />,
        title: "Easy Booking",
        desc: "Seamlessly book your ride in just a few clicks. Fast & Secure."
    },
    {
        icon: <FaHeadset className="text-4xl text-primary mb-4" />,
        title: "24/7 Support",
        desc: "We are here to assist you anytime, anywhere for your queries."
    }
];

const WhyChooseUs = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const el = sectionRef.current;
        
        gsap.fromTo(cardsRef.current, 
            { y: 50, opacity: 0 },
            {
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
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
        <section ref={sectionRef} className="py-20 bg-surface text-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Why Choose Us?</h2>
                    <p className="text-secondary max-w-xl mx-auto">We prioritize your comfort and safety above all else.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            ref={addToRefs}
                            className="bg-background p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors duration-300 group"
                        >
                            <div className="group-hover:scale-110 transition-transform duration-300 inline-block">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-display">{feature.title}</h3>
                            <p className="text-secondary text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;