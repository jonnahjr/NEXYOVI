import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Legal = () => {
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
 Legal Notice
 </h2>
 <p className="text-slate-500 text-lg font-medium max-w-2xl">
 Last updated: May 26, 2026
 </p>
 </motion.div>

 <div className="space-y-8 max-w-4xl">
 {/* Copyright Notice */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.2 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">Copyright Notice</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 © {new Date().getFullYear()} Nexyovi Technology Group. All rights reserved. No part of this website or any of its contents may be reproduced, copied, modified or adapted, without the prior written consent of Nexyovi Technology Group, unless otherwise indicated for stand-alone materials.
 </p>
 </motion.div>

 {/* Trademarks */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.3 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">Trademarks</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 All trademarks, service marks, trade names, trade dress, product names and logos appearing on the site are the property of their respective owners. Any rights not expressly granted herein are reserved.
 </p>
 </motion.div>

 {/* Limitation of Liability */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.4 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">Limitation of Liability</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 Under no circumstances shall Nexyovi Technology Group, its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the website; or (ii) any conduct or content of any third party on the website; or (iii) any content obtained from the website; or (iv) any alternative access to, or use of, the website whether or not authorized by Nexyovi Technology Group.
 </p>
 </motion.div>

 {/* Indemnification */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.5 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">Indemnification</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 You agree to indemnify, defend and hold harmless Nexyovi Technology Group, its officers, directors, employees, agents, licensors and suppliers from and against any losses, liabilities, claims, demands, damages, costs and expenses, including reasonable attorney's fees, arising out of or related to your use of the website.
 </p>
 </motion.div>

 {/* User Generated Content */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.6 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">User Generated Content</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 The website may include blogs, community forums, message boards, and/or news groups whereby you and other users of the website can post materials, which may include opinions, conclusions, recommendations, data and other information. Such postings do not necessarily reflect the views of Nexyovi Technology Group and are not endorsed by Nexyovi Technology Group in any manner. You post such materials at your own risk.
 </p>
 </motion.div>

 {/* Links to Other Sites */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.7 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">Links to Other Sites</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 The website may contain links to other websites ("Linked Sites"). The Linked Sites are not under the control of Nexyovi Technology Group and Nexyovi Technology Group is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site. Nexyovi Technology Group is not responsible for webcasting or any other form of transmission received from any Linked Site.
 </p>
 <p className="text-slate-500 text-[15px] leading-relaxed mt-4">
 Nexyovi Technology Group is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by Nexyovi Technology Group of the site or any association with its operators.
 </p>
 </motion.div>

 {/* Changes to Legal Notice */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.8 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">Changes to This Legal Notice</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 Nexyovi Technology Group reserves the right, at its sole discretion, to modify or replace any part of this Legal Notice. It is your responsibility to check this Legal Notice periodically for changes. Your continued use of or access to the website following the posting of any changes to this Legal Notice constitutes acceptance of those changes.
 </p>
 </motion.div>

 {/* Contact Information */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.9 }}
 className="bg-white rounded-[24px] p-8 border border-slate-200"
 >
 <h3 className="text-xl font-black text-slate-950 mb-4">Contact Information</h3>
 <p className="text-slate-500 text-[15px] leading-relaxed">
 If you have any questions about this Legal Notice, please contact us at: info@nexyovi.com
 </p>
 </motion.div>
 </div>

  <div className="mt-12 text-center">
  <Link to="/" className="group btn-dark text-[13px] px-8 py-3 uppercase tracking-widest">
  <span className="relative z-10">Return to Home</span>
  </Link>
  </div>
 </div>
 </div>
 );
};

export default Legal;