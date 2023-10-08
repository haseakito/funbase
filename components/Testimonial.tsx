import Image from 'next/image'
import React from 'react'

export function Testimonial() {
    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm">
                <h2 id='testimonial' className="group flex justify-center gap-3 mb-4 text-4xl tracking-tight font-extrabold">
                    <span>Testimonials</span>
                    <a href='#testimonial' className='ml-2 text-blue-700 opacity-0 transition-opacity dark:text-blue-500 group-hover:opacity-100'>#</a>
                </h2>
                <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
                    Listen to what great creators and fans in this platform say about Funbase!
                </p>
            </div>
            <div className="grid mb-8 lg:mb-12 lg:grid-cols-2">
                <figure className="flex flex-col justify-center items-center p-8 text-center border-b border-gray-200 md:p-12 lg:border-r">
                    <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Speechless with how easy this was to use</h3>
                        <p className="my-4">"I recently got my hands on Funbase, and holy crap, I'm speechless with how easy this was to connect with fan. Most services are a pain, focus is more on money over community.</p>
                        <p className="my-4">Funbase has all in one place and I'm not joking when I say it took me a matter of minutes to deploy my work, customise it and play around with it.</p>
                        <p className="my-4">If you care for your time, I hands down would go with this."</p>
                    </blockquote>
                    <figcaption className="flex justify-center items-center space-x-3">
                        <Image
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                            unoptimized
                            width={9}
                            height={9}
                            alt="profile picture"
                            className="w-9 h-9 rounded-full"
                        />
                        <div className="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Bonnie Green</div>
                            <div className="text-sm font-light text-gray-500 dark:text-gray-400">Managa artist</div>
                        </div>
                    </figcaption>
                </figure>
                <figure className="flex flex-col justify-center items-center p-8 text-center border-b border-gray-200 md:p-12">
                    <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Solid foundation for any work</h3>
                        <p className="my-4">"Funbase provides a robust set of features and frameworks to get started with. From the moment I started using this app, I soon realize how boring and tiring other website is particularily because of the ads everywhere and design inconsistency.</p>
                        <p className="my-4">Posting on funbase and connecting with your fan seamlessly is a huge timesaver!"</p>
                    </blockquote>
                    <figcaption className="flex justify-center items-center space-x-3">
                        <Image 
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                            unoptimized
                            width={9}
                            height={9}
                            alt="profile picture"
                            className="w-9 h-9 rounded-full"
                        />

                        <div className="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Roberta Casas</div>
                            <div className="text-sm font-light text-gray-500 dark:text-gray-400">Porn star</div>
                        </div>
                    </figcaption>
                </figure>
                <figure className="flex flex-col justify-center items-center p-8 text-center border-b border-gray-200 lg:border-b-0 md:p-12 lg:border-r">
                    <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mindblowing workflow</h3>
                        <p className="my-4">"As someone who mainly designs in the browser, I've been a casual user of Figma, but as soon as I saw and started playing with Funbase my mind was 🤯.</p>
                        <p className="my-4">Everything is so well structured and simple to use (I've learnt so much about Figma by just using the toolkit).</p>
                        <p className="my-4">Aesthetically, the well designed components are beautiful and will undoubtedly level up your next experience."</p>
                    </blockquote>
                    <figcaption className="flex justify-center items-center space-x-3">
                        <Image 
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                            unoptimized
                            width={9}
                            height={9}
                            alt="profile picture"
                            className="w-9 h-9 rounded-full" 
                        />
                        <div className="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Jese Leos</div>
                            <div className="text-sm font-light text-gray-500 dark:text-gray-400">Illustrater and designer</div>
                        </div>
                    </figcaption>
                </figure>
                <figure className="flex flex-col justify-center items-center p-8 text-center border-gray-200 md:p-12">
                    <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pleasure and fun to use</h3>
                        <p className="my-4">"This is a very complex and beautiful set of elements. Under the hood it comes with the best things from creators and fan.</p>
                        <p className="my-4">Almost zero latency, ridiculously fast, and spur easy to use. You can have the best experience of all.</p>
                        <p className="my-4">You have many ways to generate revenue out of your work."</p>
                    </blockquote>
                    <figcaption className="flex justify-center items-center space-x-3">
                        <Image
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                            unoptimized
                            width={9}
                            height={9}
                            alt="profile picture"
                            className="w-9 h-9 rounded-full" 
                        />
                        <div className="space-y-0.5 font-medium dark:text-white text-left">
                            <div>Joseph McFall</div>
                            <div className="text-sm font-light text-gray-500 dark:text-gray-400">Musician</div>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </div>
    )
}
