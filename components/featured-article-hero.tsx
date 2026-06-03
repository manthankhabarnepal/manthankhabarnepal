"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User } from "lucide-react"

interface FeaturedArticleProps {
  id: string
  title: string
  excerpt: string
  image_url?: string
  category: string
  author_name?: string
  created_at: string
}

export function FeaturedArticleHero({ article }: { article: FeaturedArticleProps }) {
  const formatDateToNepali = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const year = date.getFullYear()
    
    const nepaliMonths = ["जन", "फे", "मार्च", "अप्रि", "मे", "जुन", "जुलाई", "अग", "सेप्ट", "अक्ट", "नोभ", "डिसे"]
    const month = nepaliMonths[date.getMonth()]
    
    const nepaliNumbers = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"]
    const convertToNepali = (num: number) => {
      return String(num).split("").map(digit => nepaliNumbers[parseInt(digit)]).join("")
    }
    
    return `${convertToNepali(day)} ${month} ${convertToNepali(year)}`
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-foreground"
    >
      {/* Background Image with Overlay */}
      {article.image_url && (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        <div className="space-y-6">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block bg-secondary text-secondary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider">
              {article.category}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight"
          >
            {article.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed"
          >
            {article.excerpt}
          </motion.p>

          {/* Article Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/20"
          >
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{formatDateToNepali(article.created_at)}</span>
            </div>
            {article.author_name && (
              <div className="flex items-center gap-2 text-gray-300">
                <User className="h-4 w-4" />
                <span className="text-sm">{article.author_name}</span>
              </div>
            )}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href={`/news/${article.id}`}>
              <motion.button
                whileHover={{ x: 10 }}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-3 group"
              >
                पूरा लेख पढ्नुहोस्
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="text-white text-xs uppercase tracking-widest">स्क्रोल गर्नुहोस्</div>
        <div className="w-0.5 h-8 bg-white/50 mx-auto mt-2"></div>
      </motion.div>
    </motion.section>
  )
}
