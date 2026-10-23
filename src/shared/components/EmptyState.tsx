import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    actionLink?: string;
    onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionLink, onAction }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-24 h-24 rounded-full bg-white/30 border border-white/40 flex items-center justify-center mb-6 text-[#8C6239]/50 backdrop-blur-sm">
                <Icon size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-[#4A3B32] mb-2">{title}</h3>
            <p className="text-[#6B4423]/70 max-w-sm mb-6">{description}</p>

            {actionLabel && (actionLink || onAction) && (
                actionLink ? (
                    <Link
                        to={actionLink}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#8C6239] to-[#5F3A26] text-white font-bold text-sm transition-all hover:shadow-lg hover:scale-105 active:scale-95"
                    >
                        {actionLabel}
                    </Link>
                ) : (
                    <button
                        onClick={onAction}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#8C6239] to-[#5F3A26] text-white font-bold text-sm transition-all hover:shadow-lg hover:scale-105 active:scale-95"
                    >
                        {actionLabel}
                    </button>
                )
            )}
        </div>
    );
}