"use client"

import { motion } from "framer-motion"
import { NewsCard } from "./news-card"

interface NewsGridProps {
  articles: any[]
}

export function NewsGrid({ articles }: NewsGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-16 md:py-24 px-6 md:px-12 bg-background"
    >
      {/* Section Header */}
      <motion.div
        variants={itemVariants}
        className="max-w-5xl mx-auto mb-16"
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 bg-secondary mb-6"
        />
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
          ताजा समाचार
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          नेपाल र विश्वका सबै भेरी समाचार एक ठाउँमा
        </p>
      </motion.div>

      {/* News Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <NewsCard {...article} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Load More Button */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center mt-16"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 border-2 border-primary text-primary font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          थप समाचार हेर्नुहोस्
        </motion.button>
      </motion.div>
    </motion.section>
  )
}
