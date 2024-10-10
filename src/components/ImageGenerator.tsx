'use client'
import React, { useState } from 'react';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Crown, Sparkle } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';
import axios from 'axios';
// import { ImageSkeleton } from '@/components/skeletons/ImageSkeleton';
type Props = {};

const ImageGenerator = (props: Props) => {
    const [prompt, setPrompt] = useState<string>("");
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const generateImages = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/generate-image', { prompt }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 50000 // 50 seconds in milliseconds
            });

            setGeneratedImageUrl(response.data.image_url);
        } catch (err) {
            console.error('Error generating image:', err);
            setError('Failed to generate image.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (generatedImageUrl) {
            const link = document.createElement('a');
            link.href = generatedImageUrl;
            link.download = 'generated_image.png';
            link.click();
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex space-x-2 md:flex-row flex-col items-center md:space-y-0 space-y-5 relative">
                <Input
                    className='flex-grow focus:ring-0 border-none rounded-full'
                    type="text"
                    placeholder="What do you want to generate?"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <Button type="button" onClick={generateImages} className='absolute right-0 bottom-0 rounded-full' disabled={isLoading}>
                    Generate <Sparkle className='ml-1 h-4 w-4' />
                </Button>
            </div>
            <div className="flex justify-center items-center pt-10">
                {error && <p className="text-red-500">{error}</p>}
                {isLoading && <Skeleton className="h-[400px] w-[600px] rounded-xl my-24 shadow-xl text-center bg-transparent" />}
                {!isLoading && !error && generatedImageUrl ? (
                    <div className="flex flex-col items-center space-y-4 gap-4">
                        <Image
                            src={generatedImageUrl}
                            alt="Generated Image"
                            width={400}
                            height={400}
                            className="rounded-lg"
                        />
                        <Button
                            onClick={handleDownload}
                            disabled={!generatedImageUrl}
                            className='rounded-full'
                        >
                            Download Image
                        </Button>
                    </div>
                ) : <></>}
            </div>
        </div>
    );
};

export default ImageGenerator;
