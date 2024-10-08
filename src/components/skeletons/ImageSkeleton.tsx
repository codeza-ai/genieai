import Image from 'next/image';
import react from 'react';

const ImageSkeleton = ()=>{
    return (
        <Image
            src='#'
            alt="Skeleton Image"
            width={400}
            height={400}
            className="rounded-lg"
        />
    );
}

export {ImageSkeleton};