"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "गृहपृष्ठ", href: "/" },
  { label: "राजनीति", href: "/?category=politics" },
  { label: "व्यापार", href: "/?category=business" },
  { label: "खेलकुद", href: "/?category=sports" },
  { label: "मनोरञ्जन", href: "/?category=entertainment" },
  { label: "प्रविधि", href: "/?category=technology" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-md"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Image
                src="/images/logo.png"
                alt="Manthan Khabar Logo"
                width={45}
                height={45}
                className="object-contain"
              />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary tracking-tight">मन्थन खबर</h1>
              <p className="text-xs text-muted-foreground font-medium">समाचार • विश्लेषण • प्रतिवेदन</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Staff Login Button */}
          <div className="flex items-center gap-3">
            <Link href="/staff/login">
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
              >
                कर्मचारी लगइन
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-border space-y-1"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-sm font-semibold text-foreground hover:text-primary hover:bg-muted transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/staff/login" onClick={() => setMobileMenuOpen(false)}>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3 border-primary text-primary font-semibold"
              >
                कर्मचारी लगइन
              </Button>
            </Link>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
