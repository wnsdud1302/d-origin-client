'use client'
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import './imageSlideShow.css';

const ImageSlideShow = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const fetcher = (url) => fetch(url).then((res) => res.json());

    const { data: images, error } = useSWR('/api/project/image', fetcher);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const previousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [images]);

    if (error) {
        console.error('Error fetching images:', error);
    }

    return (
        <div>
        <div className='relative mt-[30px] mx-[60px]'>
            <button className='slide-prev' onClick={previousImage}>&#10094;</button>
                {images && <Image className='slide-animation h-[60%]' src={`/images/${images[currentImageIndex]}/1.jpg`} alt="Slideshow Image" key={images[currentImageIndex]} width={2000} height={300} />}
                <button className='slide-next' onClick={nextImage}>&#10095;</button>
                <div className="dots h-[20px] text-center mt-[3px]">
                    {images && images.map((image, index) => (
                        <span
                            key={index}
                            className={`dot${index === currentImageIndex ? '-active' : ''}`}
                            active={index === currentImageIndex}
                            onClick={() => setCurrentImageIndex(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
        );
    };

export default ImageSlideShow;



