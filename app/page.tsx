import { FeaturedArticleHero } from "@/components/featured-article-hero"
import { NewsGrid } from "@/components/news-grid"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const revalidate = 60

export async function generateMetadata() {
  return {
    title: "मन्थन खबर - नेपालको विश्वस्त समाचार स्रोत",
    description: "नेपाल र विश्वका ताजा समाचार, विश्लेषण र प्रतिवेदन",
  }
}

// Demo articles for design showcase
const demoArticles = [
  {
    id: "1",
    title: "नेपालको अर्थनीति बढ्दै, विदेशी लगानी आकर्षण गरिँदै",
    excerpt: "नेपालको अर्थनीति पछिल्लो तीन वर्षमा उल्लेखनीय वृद्धि देखाइरहेको छ र विदेशी लगानीकर्ताहरू देशमा आउन शुरु गरेका छन्।",
    image_url: "https://images.unsplash.com/photo-1590283033100-9f60a05a9d82?w=1200&h=600&fit=crop",
    category: "व्यापार",
    author_name: "राज कुमार",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "साफ फुटबल च्याम्पियनशिप: नेपाल सेमिफाइनलमा प्रवेश गर्यो",
    excerpt: "नेपाली राष्ट्रिय फुटबल टीमले साफ च्याम्पियनशिपमा भारतलाई हराएर सेमिफाइनलमा स्थान सुरक्षित गरेको छ।",
    image_url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=600&fit=crop",
    category: "खेलकुद",
    author_name: "विजय शर्मा",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    title: "काठमाडौंमा नयाँ टेक हब उद्घाटन, स्टार्टअपहरूको लागि छ अवसर",
    excerpt: "काठमाडौंमा एक आधुनिक टेक हब उद्घाटन गरिएको छ जसले स्थानीय स्टार्टअपहरूलाई विश्वव्यापी बजारमा पहुँचन मद्दत गर्नेछ।",
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop",
    category: "प्रविधि",
    author_name: "सुनिल पोखरेल",
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "4",
    title: "नेपालको सिनेमा अन्तर्राष्ट्रिय बजारमा आउँदैछ",
    excerpt: "नेपाली फिल्मस्टुडिएहरू अब अन्तर्राष्ट्रिय स्ट्रिमिङ प्ल्याटफर्ममा आफ्ना फिल्महरू प्रदर्शन गरिरहेका छन्।",
    image_url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=600&fit=crop",
    category: "मनोरञ्जन",
    author_name: "प्रिया महर्जन",
    created_at: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "5",
    title: "राजनीति: प्रधानमन्त्री नयाँ नीति घोषणा गर्न लाग्नुभएको",
    excerpt: "प्रधानमन्त्री आगामी हप्तामा देशको विकासका लागि नयाँ र व्यापक नीति घोषणा गर्न लाग्नुभएको छ।",
    image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    category: "राजनीति",
    author_name: "अनिल बस्नेत",
    created_at: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: "6",
    title: "पर्यावरण: हिमाल संरक्षण परियोजना शुरु हुँदै",
    excerpt: "नेपालको हिमाल संरक्षणका लागि एक नयाँ अन्तर्राष्ट्रिय परियोजना शुरु हुन लाग्दैछ।",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
    category: "व्यापार",
    author_name: "रिता पाण्डे",
    created_at: new Date(Date.now() - 432000000).toISOString(),
  },
]

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  
  let articles = demoArticles
  
  // Filter by category if needed
  if (params.category) {
    articles = articles.filter(
      (article: any) => article.category.toLowerCase() === params.category?.toLowerCase()
    )
  }

  const featuredArticle = articles[0]
  const gridArticles = articles.slice(1)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Featured Hero Section */}
      {featuredArticle && (
        <FeaturedArticleHero article={featuredArticle} />
      )}

      {/* News Grid Section */}
      <main className="flex-1">
        {gridArticles.length > 0 && (
          <NewsGrid articles={gridArticles} />
        )}

        {/* No Articles Fallback */}
        {articles.length === 0 && (
          <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-5xl font-serif font-bold mb-4 text-foreground">
                समाचार शीघ्रै आउँदैछ
              </h1>
              <p className="text-lg text-muted-foreground">
                हामीले तपाईंको लागि सर्वोत्तम गुणस्तरको समाचार तयार गरिरहेका छौँ।
              </p>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
