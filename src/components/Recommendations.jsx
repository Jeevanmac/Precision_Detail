import { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/axiosInstance';
import ProjectCard from './ProjectCard';

const Recommendations = () => {
    const { recentlyViewed, user } = useAuthStore();
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const calculateHeuristics = async () => {
            try {
                const res = await api.get('/projects');
                if (!res.data.success) return;
                
                const allProjects = res.data.projects;
                
                // Exclude already bought blocks mapping dynamically
                const purchasedIds = user?.purchases?.map(p => p.projectId) || [];
                const availableCatalog = allProjects.filter(p => !purchasedIds.includes(p._id));

                if (recentlyViewed.length === 0 && (!user || user.wishlist.length === 0)) {
                    // Fallback: No vector data -> serve generic slices mapping strictly to most purchased architectures dynamically.
                    availableCatalog.sort((a, b) => b.purchaseCount - a.purchaseCount);
                    setSuggestions(availableCatalog.slice(0, 3));
                    setLoading(false);
                    return;
                }

                // AI Simulated Heuristic: Aggregate techStacks structurally
                let weightMap = {};
                
                // Map local tracking UI vector
                recentlyViewed.forEach(proj => {
                    proj.techStack?.forEach(tech => {
                        weightMap[tech] = (weightMap[tech] || 0) + 2;
                    });
                });
                
                // Extract Wishlist elements structurally for secondary weights
                if (user?.wishlist && Array.isArray(user.wishlist)) {
                    const wishlistProjects = allProjects.filter(p => user.wishlist?.includes(p._id));
                    wishlistProjects.forEach(proj => {
                        proj.techStack?.forEach(tech => {
                            weightMap[tech] = (weightMap[tech] || 0) + 5; // Wishlist holds highest heuristic weight: 5
                        });
                    });
                }

                // Extract Cart elements structurally 
                if (user?.cart && Array.isArray(user.cart)) {
                    const cartProjects = allProjects.filter(p => user.cart?.includes(p._id));
                    cartProjects.forEach(proj => {
                        proj.techStack?.forEach(tech => {
                            weightMap[tech] = (weightMap[tech] || 0) + 4; // Cart holds heavy heuristic weight: 4
                        });
                    });
                }

                // Sort and slice matching structural candidates
                const scoredCandidates = availableCatalog.map(proj => {
                    let score = 0;
                    proj.techStack?.forEach(tech => {
                        if (weightMap[tech]) score += weightMap[tech];
                    });
                    return { proj, score };
                });

                scoredCandidates.sort((a, b) => b.score - a.score);
                
                // Map the dominant top 3 results 
                const finalSet = scoredCandidates.slice(0, 3).map(obj => obj.proj);
                
                // If the scoring algorithm didn't map enough due to isolated tags, pad it natively utilizing Global Purchase Counts bounds
                if (finalSet.length < 3) {
                    const additional = availableCatalog.filter(p => !finalSet.some(fs => fs._id === p._id));
                    additional.sort((a, b) => b.purchaseCount - a.purchaseCount);
                    setSuggestions([...finalSet, ...additional.slice(0, 3 - finalSet.length)]);
                } else {
                    setSuggestions(finalSet);
                }

            } catch (err) {
                console.error('Core algorithm simulation failed', err);
            } finally {
                setLoading(false);
            }
        };

        calculateHeuristics();
    }, [recentlyViewed, user]);

    if (loading || suggestions.length === 0) return null;

    return (
        <div className="py-12 border-t border-[#343439]/30">
            <div className="flex items-center gap-2 mb-8">
                <span className="material-symbols-outlined text-purple-500">auto_awesome</span>
                <h2 className="text-xl font-black text-white tracking-tight">Algorithmic Heuristic Suggestions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map(project => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
