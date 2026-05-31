import React from 'react';

interface Category {
 _id: string;
 title: string;
 slug: { current: string | null };
}

interface CategoryNavProps {
 categories?: Category[];
 activeCategory?: string | null;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ 
 categories = [
 { _id: 'engineering', title: 'Engineering', slug: { current: 'engineering' } },
 { _id: 'product', title: 'Product', slug: { current: 'product' } },
 { _id: 'release-notes', title: 'Release Notes', slug: { current: 'releases' } },
 { _id: 'community', title: 'Community', slug: { current: 'community' } }],
 activeCategory = null 
}) => {
 const allCategories = [
 { _id: 'id-all-posts', title: 'All Posts', slug: { current: null } },
 ...categories
 ];

 return (
 <section className="container order-2 mt-12 flex items-center justify-between gap-x-2 overflow-hidden lg:mt-8 lg:max-w-5xl md:mt-6 sm:mt-10">
 <h2 className="sr-only">Categories</h2>
 <nav className="no-scrollbars w-full overflow-x-auto border-t border-white/10 pt-12 lg:pt-8 md:pt-6 sm:-mx-5 sm:w-[calc(100%+40px)] sm:border-none sm:px-5">
 <ul className="flex items-center gap-x-0.5 ml-0">
 {allCategories.map((cat, idx) => {
 const isActive = cat.slug.current === activeCategory;
 return (
 <li key={cat._id} className="inline-flex gap-x-0.5">
 <a
 href="#"
 title={cat.title}
 className={`
 whitespace-nowrap rounded-full px-[10px] py-[6px] text-[13px] font-medium leading-none tracking-tight 
 before:invisible before:block before:h-0 before:overflow-hidden before:font-semibold before:content-[attr(title)]
 transition-all duration-200
 ${isActive 
 ? 'text-black bg-[#ff6b00] font-semibold md:mx-0' 
 : 'text-white/60 hover:text-white border-transparent'
 }
 ${idx === 0 && isActive ? 'ml-0' : ''}
 `}
 >
 <span className="sr-only">Category:</span> {cat.title}
 </a>
 </li>
 );
 })}
 </ul>
 </nav>
 
 {/* The arrow icon from module 10344 */}
 <div className="hidden lg:block shrink-0">
 <svg 
 xmlns="http://www.w3.org/2000/svg" 
 fill="none" 
 viewBox="0 0 6 9" 
 className="w-1.5 h-[9px] text-white/40 rotate-180"
 >
 <path stroke="currentColor" strokeWidth="1.2" d="m5 8.5-4-4 4-4" />
 </svg>
 </div>
 </section>
 );
};

export default CategoryNav;

