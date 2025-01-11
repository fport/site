import AnimatedTitle from '@/components/animated-title'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto px-4 py-24">
      <div className="space-y-12">
        <div className="space-y-4">
          <AnimatedTitle />
          <h2 className="text-xl text-gray-500">Frontend Developer at{" "}
            <Link 
              href="https://www.linkedin.com/company/sans-technology/posts/?feedView=all" 
              target="_blank"
              className="text-orange-500 hover:underline"
            >
              Sanstech
            </Link>
          </h2>
        </div>
        
        <p className="text-gray-600 text-lg leading-relaxed">
          I focus on WebSocket implementations and performance optimizations, always exploring ways to make things better. Currently diving into generative AI research and building side projects. I&apos;m driven by curiosity and the constant question of &quot;why not better?&quot;
        </p>

        <div className="flex gap-6 text-gray-500">
          <Link href="mailto:furkanportakalx@gmail.com" className="hover:text-orange-500">
            Mail
          </Link>
          <Link href="https://github.com/fport" className="hover:text-orange-500">
            GitHub
          </Link>
          <Link href="https://www.linkedin.com/in/furkanportakal/" className="hover:text-orange-500">
            LinkedIn
          </Link>
          <Link href="https://twitter.com/getporti" className="hover:text-orange-500">
            Twitter
          </Link>
          <Link href="https://youtube.com/@getporti" className="hover:text-orange-500">
            YouTube
          </Link>
        
        </div>
      </div>
    </main>
  )
}
