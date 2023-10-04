import Image from 'next/image'
import LandingRight from '@/public/LandingRight.svg'
import { Hero } from '@/components/Hero'
import { Testimonial } from '@/components/Testimonial'
import { Statistic } from '@/components/Statistic'
import { ContactForm } from '@/components/ContactForm'
import { Feature } from '@/components/Feature'

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
        <section className='bg-white dark:bg-gray-900'>
            <Statistic />
        </section>
        <section className='bg-white dark:bg-gray-900'>
            <Feature />
        </section>
        <section className='bg-white dark:bg-gray-900'>
            <Testimonial />
        </section>
        <section className='relative overflow-hidden bg-white dark:bg-gray-900'>
            <ContactForm />
        </section>
    </main>        
    )
}
