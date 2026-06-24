"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

export default function ContactUsPage() {
  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 overflow-hidden">
          <motion.h1 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"
          >
            Get in Touch
          </motion.h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Have questions or need assistance? Our support team is here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
          
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Office Location</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">123 Health Lane, Tech City, Digital District, BD</p>
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Email Support</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">support@auranex.com</p>
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Call Us</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">+880 123 456 7890</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <textarea 
              rows={4} 
              placeholder="How can we help you?" 
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <Button 
              className="w-full font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
              size="lg"
            >
              Send Message
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}