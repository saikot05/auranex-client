"use client";
import { getSuccessStories } from '@/lib/api/reviews';
import { useEffect, useState } from 'react';

const SuccessStoriesPage = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            const data = await getSuccessStories();
            if (data?.success) {
                setStories(data.stories);
            }
            setLoading(false);
        };
        fetchStories();
    }, []);

    if (loading) return (
        <div className="min-h-[60vh] flex justify-center items-center">
            <div className="h-8 w-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
    );

    return (
        <section className="relative w-full py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-[20%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide backdrop-blur-sm mb-4">
                        Patient Testimonials
                    </span>
                    
                    {/* গ্রেডিয়েন্ট এখন পুরো টেক্সটের ওপর */}
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                            Real Lives, Real Transformations
                        </span>
                    </h1>
                    
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                        Hear from those who have experienced our compassionate care and achieved their health goals.
                    </p>
                </div>

                {stories.length === 0 ? (
                    <div className="text-center py-20 text-zinc-500 dark:text-zinc-500">No success stories available yet.</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stories.map((story) => (
                            <div key={story._id} className="group bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                                <div className="text-blue-600 dark:text-blue-500 text-3xl mb-6 font-serif">“</div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">{story.title}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 mb-8 italic flex-grow line-clamp-4 leading-relaxed">
                                    {story.description}
                                </p>
                                
                                <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                    <p className="font-semibold text-zinc-800 dark:text-zinc-200">{story.patientName || "Anonymous"}</p>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-500 uppercase tracking-wider">
                                        {new Date(story.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SuccessStoriesPage;