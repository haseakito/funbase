import Image from 'next/image'
import LandingRight from '@/public/LandingRight.svg'
import { Hero } from '@/components/Hero'
import { Testimonial } from '@/components/Testimonial'
import { Statistic } from '@/components/Statistic'
import { ContactForm } from '@/components/ContactForm'
import { Feature } from '@/components/Feature'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main>
        <section className='grid lg:grid-cols-2'>                
            <Hero />                
            <Image
                src={ LandingRight}
                alt=''
                className='w-[800px] mt-10 hidden lg:block'
            />
        </section>
        <section>
            <Statistic />
        </section>
        <section>
            <Feature />
        </section>
        <section>
            <Testimonial />
        </section>
        <section className='relative overflow-hidden'>
            <ContactForm />
        </section>
        <Footer />
    </main>        
    )
}
