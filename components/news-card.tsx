"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface NewsCardProps {
  id: string
  title: string
  excerpt: string
  image_url?: string
  category: string
  author_name?: string
  created_at: string
  featured?: boolean
}

export function NewsCard({
  id,
  title,
  excerpt,
  image_url,
  category,
  author_name,
  created_at,
  featured = false,
}: NewsCardProps) {
  const formatDateToNepali = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const year = date.getFullYear()
    
    const nepaliMonths = ["जन", "फे", "मार्च", "अप्रि", "मे", "जुन", "जुलाई", "अग", "सेप्ट", "अक्ट", "नोभ", "डिसे"]
    const month = nepaliMonths[date.getMonth()]
    
    // Convert numbers to Nepali numerals
    const nepaliNumbers = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"]
    const convertToNepali = (num: number) => {
      return String(num).split("").map(digit => nepaliNumbers[parseInt(digit)]).join("")
    }
    
    return `${convertToNepali(day)} ${month} ${convertToNepali(year)}`
  }
  
  const formattedDate = formatDateToNepali(created_at)

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <Link href={`/news/${id}`}>
          <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="relative h-[400px] md:h-[500px]">
              {image_url ? (
                <Image
                  src={image_url}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/70" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-3">
                <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/90 uppercase text-xs font-bold">
                  {category}
                </Badge>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
                  {title}
                </h2>
                <p className="text-gray-200 text-sm md:text-base line-clamp-2">
                  {excerpt}
                </p>
                <div className="flex items-center gap-4 text-gray-300 text-xs pt-2">
                  {author_name && (
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {author_name}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formattedDate}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/news/${id}`}>
        <Card className="overflow-hidden group cursor-pointer h-full border border-border hover:border-secondary/50 hover:shadow-2xl transition-all duration-300 bg-card">
          <div className="relative h-48 overflow-hidden bg-primary/10">
            {image_url ? (
              <Image
                src={image_url}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-primary/30" />
            )}
            <div className="absolute top-0 left-0 right-0 p-3">
              <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-xs font-bold uppercase">
                {category}
              </Badge>
            </div>
          </div>
          <CardContent className="p-5 space-y-3">
            <h3 className="font-serif font-bold text-lg leading-tight line-clamp-2 group-hover:text-secondary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
              <div className="flex items-center gap-2">
                {author_name && (
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {author_name}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formattedDate}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-secondary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
