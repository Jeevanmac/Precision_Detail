import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CustomSelect = ({ 
    options, 
    value, 
    onChange, 
    placeholder = 'Select Option', 
    label,
    className = "" 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const containerRef = useRef(null);

    const selectedOption = options.find(opt => opt.value === value) || options.find(opt => opt.label === value);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange(option.value || option.label);
        setIsOpen(false);
    };

    return (
        <div className={`space-y-2 relative ${className}`} ref={containerRef}>
            {label && (
                <label className="text-[11px] uppercase font-black text-on-surface tracking-widest ml-1">
                    {label}
                </label>
            )}
            
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-surface-container-highest border border-outline-variant/20 dark:border-white/20 rounded-2xl px-5 py-4 text-left flex justify-between items-center transition-all hover:border-primary/40 focus:ring-2 focus:ring-primary/20 ${isOpen ? 'ring-2 ring-primary/40 border-primary/40' : ''}`}
            >
                <span className={`text-sm font-medium ${selectedOption ? 'text-on-surface' : 'text-on-surface-variant opacity-50'}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-on-surface-variant"
                >
                    <ChevronDown size={18} />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute z-[100] w-full mt-2 bg-surface-container-low border border-white/20 dark:border-white/20 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
                    >
                        <div className="max-h-64 overflow-y-auto py-2 custom-scrollbar" onMouseLeave={() => setHoveredIndex(null)}>
                            <LayoutGroup id="select-hover">
                                {options.map((option, index) => {
                                    const isSelected = (option.value === value) || (option.label === value);
                                    const isHovered = hoveredIndex === index;
                                    const Icon = option.icon;
                                    
                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onClick={() => handleSelect(option)}
                                            className={`w-full px-5 py-3.5 flex items-center gap-4 text-left transition-all relative group
                                                ${isSelected 
                                                    ? 'text-primary' 
                                                    : 'text-on-surface hover:text-primary'
                                                }`}
                                        >
                                            {isHovered && (
                                                <motion.div 
                                                    layoutId="hover-bg"
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="absolute inset-0 bg-primary/10 z-0 rounded-xl"
                                                    transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                                                />
                                            )}

                                            {(isSelected || isHovered) && (
                                                <motion.div 
                                                    initial={{ scaleY: 0, opacity: 0 }}
                                                    animate={{ scaleY: 1, opacity: 1 }}
                                                    exit={{ scaleY: 0, opacity: 0 }}
                                                    className="absolute left-0 w-1 h-2/3 bg-primary rounded-r-full z-10 origin-center"
                                                    transition={{ 
                                                        type: "spring", 
                                                        bounce: 0.1, 
                                                        duration: 0.7
                                                    }}
                                                />
                                            )}
                                            
                                            {Icon && (
                                                <div className={`shrink-0 relative z-20 transition-colors ${isSelected || isHovered ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>
                                                    <Icon size={18} />
                                                </div>
                                            )}
                                            
                                            <span className={`text-sm font-bold tracking-tight relative z-20 transition-colors ${isSelected || isHovered ? 'text-primary' : 'group-hover:text-primary'}`}>
                                                {option.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </LayoutGroup>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomSelect;
