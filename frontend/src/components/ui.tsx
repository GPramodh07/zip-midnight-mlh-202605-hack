import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility to merge tailwind classes */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GlassCard({ children, className, glow = 'none' }: { children: React.ReactNode; className?: string, glow?: 'none' | 'cyan' | 'emerald' | 'indigo' }) {
  const glowClasses = {
    none: '',
    cyan: 'shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] border-zip-cyan/20',
    emerald: 'shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] border-zip-emerald/20',
    indigo: 'shadow-[0_0_30px_-5px_rgba(79,70,229,0.15)] border-zip-indigo/20',
  };

  return (
    <div className={cn("glass-panel rounded-2xl p-6", glowClasses[glow], className)}>
      {children}
    </div>
  );
}

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  color?: 'cyan' | 'emerald' | 'indigo';
  loading?: boolean;
}

export function NeonButton({ children, variant = 'primary', color = 'cyan', loading, className, ...props }: NeonButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center font-medium transition-all duration-300 overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeClasses = "px-6 py-3 text-sm";
  
  const colors = {
    cyan: {
      primary: "bg-zip-cyan hover:bg-cyan-400 text-obsidian shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]",
      secondary: "bg-zip-cyan/10 hover:bg-zip-cyan/20 text-zip-cyan border border-zip-cyan/20",
    },
    emerald: {
      primary: "bg-zip-emerald hover:bg-emerald-400 text-obsidian shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]",
      secondary: "bg-zip-emerald/10 hover:bg-zip-emerald/20 text-zip-emerald border border-zip-emerald/20",
    },
    indigo: {
      primary: "bg-zip-indigo hover:bg-indigo-400 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]",
      secondary: "bg-zip-indigo/10 hover:bg-zip-indigo/20 text-zip-indigo border border-zip-indigo/20",
    }
  };

  const currentStyle = colors[color][variant === 'outline' ? 'secondary' : variant];

  return (
    <button className={cn(baseClasses, sizeClasses, currentStyle, className)} disabled={loading || props.disabled} {...props}>
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
