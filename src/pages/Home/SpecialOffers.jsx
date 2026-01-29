import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const offers = [
    {
        title: "Weekend Getaway",
        discount: "15% OFF",
        desc: "Book any luxury car for the weekend and get a special discount.",
        bg: "from-blue-900 to-black"
    },
    {
        title: "Holiday Special",
        discount: "$99/Day",
        desc: "Drive premium SUVs at an unbeatable price this holiday season.",
        bg: "from-primary/20 to-black"
    }
];

const SpecialOffers = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const marqueeRef = useRef(null);
    const marqueeInnerRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;

        // Marquee Animation
        const marqueeContent = marqueeInnerRef.current;
        if (marqueeContent) {
            gsap.to(marqueeContent, {
                xPercent: -50,
                ease: "none",
                duration: 20,
                repeat: -1
            });
        }

        gsap.fromTo(cardsRef.current,
            { x: -100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
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
        <section ref={sectionRef} className="py-20 bg-surface text-white overflow-hidden relative">
            {/* Marquee Section */}
            <div ref={marqueeRef} className="absolute top-0 left-0 w-full overflow-hidden py-4 bg-primary/10 border-y border-primary/20">
                <div ref={marqueeInnerRef} className="whitespace-nowrap flex gap-10 text-primary font-display font-bold text-2xl uppercase tracking-wider w-max">
                    {/* Duplicate content for seamless loop */}
                    {[1, 2, 3, 4].map((i) => (
                         <span key={i}>⚡ Limited Time Offer: Get 20% Off on Your First Ride! ⚡ Premium Cars at Economy Rates ⚡ Weekend Special: Rent 2 Days, Get 1 Free! ⚡</span>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-primary">Special Offers</h2>
                    <p className="text-secondary">Exclusive deals just for you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {offers.map((offer, index) => (
                        <div
                            key={index}
                            ref={addToRefs}
                            className={`relative p-10 rounded-3xl overflow-hidden bg-gradient-to-br ${offer.bg} border border-white/10 group`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                                <h1 className="text-9xl font-display font-bold text-white">%</h1>
                            </div>

                            <div className="relative z-10">
                                <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                                    Limited Time
                                </span>
                                <h3 className="text-4xl font-display font-bold mb-2">{offer.discount}</h3>
                                <h4 className="text-xl font-bold text-secondary mb-4">{offer.title}</h4>
                                <p className="text-gray-400 mb-8 max-w-sm">{offer.desc}</p>
                                <Link
                                    to="/available-cars"
                                    className="inline-block border border-white/20 hover:bg-white hover:text-black text-white px-8 py-3 rounded-full transition-all duration-300 font-semibold"
                                >
                                    Claim Offer
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SpecialOffers;
