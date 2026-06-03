"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

const categories = [
  { label: "राजनीति", href: "/?category=politics" },
  { label: "व्यापार", href: "/?category=business" },
  { label: "खेलकुद", href: "/?category=sports" },
  { label: "मनोरञ्जन", href: "/?category=entertainment" },
  { label: "प्रविधि", href: "/?category=technology" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t-4 border-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/images/logo.png"
                alt="Manthan Khabar"
                width={48}
                height={48}
                className="object-contain bg-white/10 p-2 rounded"
              />
              <div>
                <h3 className="text-lg font-bold tracking-tight">मन्थन खबर</h3>
                <p className="text-xs text-white/70 font-medium">नेपालको विश्वस्त समाचार</p>
              </div>
            </Link>
            <p className="text-sm text-white/80 mb-6 leading-relaxed">
              तपाईंलाई महत्त्वपूर्ण कुराहरूको बारेमा जानकारी राख्न सही र निष्पक्ष समाचार कभरेज प्रदान गर्दै।
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.15, backgroundColor: "rgba(211, 47, 47, 0.9)" }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 hover:bg-secondary rounded flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-base font-bold mb-6 text-secondary uppercase tracking-wider">विषयहरू</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    href={cat.href}
                    className="text-sm text-white/80 hover:text-secondary transition-colors font-medium"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-base font-bold mb-6 text-secondary uppercase tracking-wider">द्रुत लिंकहरू</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-white/80 hover:text-secondary transition-colors font-medium">
                  गृहपृष्ठ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/80 hover:text-secondary transition-colors font-medium">
                  हाम्रो बारेमा
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/80 hover:text-secondary transition-colors font-medium">
                  सम्पर्क गर्नुहोस्
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-white/80 hover:text-secondary transition-colors font-medium">
                  गोपनीयता नीति
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-base font-bold mb-6 text-secondary uppercase tracking-wider">सम्पर्क</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-white/80">
                <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">manthankhabarnepal@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/80">
                <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">+977 9744546105</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">पोखरा, नेपाल</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-center text-sm text-white/60 font-medium">
            &copy; {new Date().getFullYear()} मन्थन खबर। सर्वाधिकार सुरक्षित। | वेबसाइट डिजाइन र विकास: <span className="text-secondary">मन्थन टीम</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
