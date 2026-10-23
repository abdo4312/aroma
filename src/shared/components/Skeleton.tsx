import { cn } from '@/shared/utils/cn'

// Base Skeleton Component (no changes)
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-neutral-200",
        className
      )}
    />
  )
}

// ✅ Product Card Skeleton — Premium 2026 version (exactly matches the real card)
export function ProductCardSkeleton() {
   return (
     <div className="bg-white/95 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/60 shadow-xl">
       {/* Image Container — same aspect-square + glass effect */}
       <div className="relative aspect-square overflow-hidden bg-neutral-100">
         <Skeleton className="w-full h-full rounded-none" />

         {/* Discount Badge Skeleton */}
         <div className="absolute top-4 left-4 px-4 py-1 bg-white/90 backdrop-blur-xl rounded-2xl">
           <Skeleton className="h-4 w-12" />
         </div>

         {/* Wishlist Heart Skeleton */}
         <div className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/70">
           <Skeleton className="w-5 h-5 rounded-full" />
         </div>

         {/* Quick View Button Skeleton (same position and size) */}
         <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
           <Skeleton className="h-11 w-40 rounded-2xl" />
         </div>
       </div>

       {/* Content Section — p-6 same as Card */}
       <div className="p-6">
         {/* Category + 5-Star Rating */}
         <div className="flex items-center justify-between mb-3">
           <Skeleton className="h-3 w-24" /> {/* Category */}

           {/* 5 Stars Skeleton */}
           <div className="flex items-center gap-px">
             {Array.from({ length: 5 }, (_, i) => (
               <Skeleton key={i} className="w-4 h-4 rounded" />
             ))}
           </div>
         </div>

         {/* Product Name (line-clamp simulation) */}
         <div className="space-y-2.5 mb-6">
           <Skeleton className="h-[22px] w-full" />
           <Skeleton className="h-[22px] w-4/5" />
         </div>

         {/* Price + Add to Cart Button */}
         <div className="flex items-center justify-between">
           <div className="space-y-1">
             <Skeleton className="h-9 w-32" /> {/* Current Price */}
             <Skeleton className="h-4 w-24" />  {/* Original Price (if present) */}
           </div>

           {/* Floating Add Button — same size h-14 w-14 */}
           <Skeleton className="w-14 h-14 rounded-2xl" />
         </div>
       </div>
     </div>
   )
}