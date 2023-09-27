import React from 'react'
import {
    FaTwitter,
    FaDiscord,
    FaLinkedinIn,
    FaGithub
} from 'react-icons/fa'

export function Footer() {

    const FooterData = [
        {
            icon: <FaGithub />,
            link: 'https://github.com/haseakito'
        },
        {
            icon: <FaLinkedinIn />,
            link: 'https://www.linkedin.com/in/haseakito'
        },
        {
            icon: <FaTwitter />,
            link: 'https://twitter.com/haseakito_dev'
        },
        {
            icon: <FaDiscord />,
            link: ''
        }
    ]

  return (
    <footer>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className='text-center lg:flex lg:justify-end p-4 px-10 gap-10'>            
            <p className='text-xs font-semibold hover:opacity-80 duration-300 dark:text-gray-400'>@2023 AKITO HASEGAWA. All Rights Reserved.</p>
            <div className='flex justify-center py-2 sm:py-0'>
                { FooterData.map((value, key) => {
                    return (
                        <a
                            key={ key }
                            href={ value.link }
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <p className='px-6 hover:scale-110 duration-300 text-gray-500 hover:text-gray-900 dark:hover:text-white'>{ value.icon }</p>
                        </a>
                    )
                })}
            </div>
        </div>
    </footer>
  )
}