import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Privacy = () => {
 return (
 <div className="bg-slate-50 min-h-screen text-slate-900">
 <div className="container mx-auto px-6 lg:px-12 py-20">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="mb-16"
 >
 <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-950 mb-6">
 Privacy Policy
 </h2>
 <p className="text-slate-500 text-lg font-medium max-w-2xl">
 Last updated: May 26, 2026
 </p>
 </motion.div>

 <div className="space-y-8 max-w-4xl">
 {/* Introduction */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.2 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">Information We Collect</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 We collect information from you when you visit our website, register on our site, place an order, subscribe to our newsletter, respond to a survey or fill out a form.
 </p>
 </motion.div>

 {/* How we use information */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.3 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">How We Use Your Information</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 Any of the information we collect from you may be used in one of the following ways:
 </p>
 <ul className="space-y-2 mt-4 text-slate-500 text-[15px] leading-relaxed list-disc pl-5">
 <li>To personalize your experience</li>
 <li>To improve our website</li>
 <li>To improve customer service</li>
 <li>To process transactions</li>
 <li>To administer a contest, promotion, survey or other site feature</li>
 <li>To send periodic emails</li>
 </ul>
 </motion.div>

 {/* How we protect information */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.4 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">How We Protect Your Information</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
 </p>
 </motion.div>

 {/* Cookies */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.5 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">Cookies</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.
 </p>
 <p className="text-white/60 text-[15px] leading-relaxed mt-4">
 We may contract with third-party service providers to assist us in better understanding our site visitors. These service providers are not permitted to use the information collected on our behalf except to help us conduct and improve our business.
 </p>
 </motion.div>

 {/* Disclosure to third parties */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.6 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">Disclosure to Third Parties</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide you with advance notice.
 </p>
 </motion.div>

 {/* Online Privacy Policy Only */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.7 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">Online Privacy Policy Only</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 This online privacy policy applies only to information collected through our website and not to information collected offline.
 </p>
 </motion.div>

 {/* Terms and Conditions */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.8 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">Terms and Conditions</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 Please also visit our Terms of Service section establishing the use, disclaimers, and limitations of liability governing the use of our website.
 </p>
 </motion.div>

 {/* Your Consent */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.9 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">Your Consent</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 By using our site, you consent to our privacy policy.
 </p>
 </motion.div>

 {/* Changes to our Privacy Policy */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 1.0 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">Changes to Our Privacy Policy</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 If we decide to change our privacy policy, we will post those changes on this page.
 </p>
 </motion.div>
 </div>

 <div className="mt-12 text-center">
 <Link to="/" className="px-8 py-3 bg-slate-950 border border-slate-200 text-white font-black text-[13px] uppercase tracking-widest rounded-full hover:bg-[#F5A800] transition-all">
 Return to Home
 </Link>
 </div>
 </div>
 </div>
 );
};

export default Privacy;