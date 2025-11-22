import React from 'react';


import img5 from '../../assets/img/Rectangle 24 (1).png';
import img2 from '../../assets/img/Rectangle 24 (2).png';
import img3 from '../../assets/img/Rectangle 24 (3).png';
import img4 from '../../assets/img/Rectangle 24 (4).png';
import img1 from '../../assets/img/Rectangle 24.png'; 

const myImages = [img1, img2, img3, img4, img5];
function PropertyImageCollage() {
    const displayImages = myImages;

    const ImageItem = ({ src, alt, className = "" }) => (
        <div className={`overflow-hidden ${className}`}>
            <img
                src={src}
                alt={alt}
                className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
            />
        </div>
    );

    return (
        <div className='max-w-[1572px] h-[500px] mx-auto mt-10'>
            <div className="grid grid-cols-4 grid-rows-2 gap-1 rounded-2xl overflow-hidden w-full h-full">

                <ImageItem
                    src={displayImages[0]}
                    alt="Property view 1"
                    className="col-span-2 row-span-2"
                />

                <ImageItem
                    src={displayImages[1]}
                    alt="Property view 2"
                    className="col-span-1 row-span-1"
                />

                <ImageItem
                    src={displayImages[2]}
                    alt="Property view 3"
                    className="col-span-1 row-span-1"
                />

                <ImageItem
                    src={displayImages[3]}
                    alt="Property view 4"
                    className="col-span-1 row-span-1"
                />

                <ImageItem
                    src={displayImages[4]}
                    alt="Property view 5"
                    className="col-span-1 row-span-1"
                />
            </div>
        </div>
    );
}

export default PropertyImageCollage;