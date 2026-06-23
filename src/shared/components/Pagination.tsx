import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = (): (number | 'dots')[] => {
        const pages: (number | 'dots')[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('dots');
            for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(totalPages - 1, currentPage + 1);
                i++
            ) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push('dots');
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-10">
            {/* Prev Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                    'flex items-center gap-1 px-4 py-2 rounded-full font-[Cairo] text-sm font-medium transition-all duration-300',
                    currentPage === 1
                        ? 'bg-white/15 text-[#5d3a27]/30 cursor-not-allowed'
                        : 'bg-white/25 backdrop-blur-xl border border-white/40 text-[#5d3a27] hover:bg-white/40 active:scale-95'
                )}
            >
                <ChevronLeft className="w-4 h-4" />
                Prev
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, idx) =>
                page === 'dots' ? (
                    <span
                        key={`dots-${idx}`}
                        className="px-2 text-[#5d3a27]/50 font-[Cairo] text-sm"
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={cn(
                            'w-10 h-10 rounded-full font-[Cairo] text-sm font-semibold transition-all duration-300',
                            page === currentPage
                                ? 'bg-[#5d3a27] text-white shadow-lg shadow-[#5d3a27]/30'
                                : 'bg-white/25 backdrop-blur-xl border border-white/40 text-[#5d3a27] hover:bg-white/40 active:scale-95'
                        )}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                    'flex items-center gap-1 px-4 py-2 rounded-full font-[Cairo] text-sm font-medium transition-all duration-300',
                    currentPage === totalPages
                        ? 'bg-white/15 text-[#5d3a27]/30 cursor-not-allowed'
                        : 'bg-white/25 backdrop-blur-xl border border-white/40 text-[#5d3a27] hover:bg-white/40 active:scale-95'
                )}
            >
                Next
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}