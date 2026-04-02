import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ChevronRight, 
  Calendar, 
  Tag, 
  ArrowRight, 
  Github, 
  Twitter, 
  Linkedin, 
  Cpu, 
  Zap, 
  Shield, 
  Brain, 
  Bot,
  X,
  Menu
} from 'lucide-react';
import { BLOG_NAME, BLOG_TAGLINE, BLOG_DESCRIPTION, CATEGORIES, BLOG_POSTS, SEO_KEYWORDS } from './constants';
import { BlogPost } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.content.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-purple-500/30">
      {/* SEO Keywords (Hidden) */}
      <div className="hidden">
        {SEO_KEYWORDS.join(', ')}
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white uppercase">{BLOG_NAME}</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'Categories', 'Trends', 'About'].map((item) => (
                <a key={item} href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                  {item}
                </a>
              ))}
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-64 transition-all"
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#0a0a0a] border-b border-white/5 px-4 py-6 space-y-4"
          >
            {['Home', 'Categories', 'Trends', 'About'].map((item) => (
              <a key={item} href="#" className="block text-lg font-medium text-gray-300 hover:text-white">
                {item}
              </a>
            ))}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-gray-200 focus:outline-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-20 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-purple-600/10 blur-[120px] rounded-full -z-10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase mb-6">
              The Future is Here
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              {BLOG_NAME} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Insights</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {BLOG_DESCRIPTION}
            </p>
          </motion.div>
        </section>

        {/* Categories Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'All' 
                ? 'bg-white text-black' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
              }`}
            >
              All Posts
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.name 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-500"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={post.imagePlaceholder} 
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-purple-400">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-4 text-gray-500 text-xs mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {post.content[0]}
                  </p>
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-2 text-sm font-bold text-white group/btn"
                  >
                    Read Insight
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </section>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No insights found</h3>
            <p className="text-gray-500">Try adjusting your search or category filters.</p>
          </div>
        )}
      </main>

      {/* Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-full bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                <img 
                  src={selectedPost.imagePlaceholder} 
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] hidden md:block" />
              </div>

              <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
                    {selectedPost.category}
                  </span>
                  <span className="text-gray-500 text-xs">{selectedPost.date}</span>
                </div>
                
                <h2 className="text-3xl font-extrabold text-white mb-8 leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="space-y-6 text-gray-300 leading-relaxed">
                  {selectedPost.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Visual Concept Prompt</h4>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-sm text-gray-400 italic leading-relaxed">
                    "{selectedPost.imagePrompt}"
                  </div>
                </div>

                <div className="mt-12 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                      WK
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">WAX KIDS Editorial</p>
                      <p className="text-xs text-gray-500">AI Strategy Team</p>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
                    Share Insight
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tighter text-white uppercase">{BLOG_NAME}</span>
              </div>
              <p className="text-gray-500 max-w-md leading-relaxed mb-8">
                {BLOG_TAGLINE}. We provide deep dives into the technologies shaping our tomorrow, today.
              </p>
              <div className="flex items-center gap-4">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Categories</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                {CATEGORIES.map(cat => (
                  <li key={cat.id}>
                    <a href="#" className="hover:text-purple-400 transition-colors">{cat.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Newsletter</h4>
              <p className="text-sm text-gray-500 mb-4">Get the latest AI trends delivered to your inbox.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 w-full"
                />
                <button className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>© 2026 {BLOG_NAME}. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
