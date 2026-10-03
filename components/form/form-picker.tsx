"use client"

import { fetchUnsplashImages } from "@/actions/fetch-unsplash-images";
import { defaultImages } from "@/constants/images";
import { cn } from "@/lib/utils";
import { IconCheck, IconLoader } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FormError } from "./form-error";

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[]> | undefined;
};

export const FormPicker = ({
    id,
    errors
}: FormPickerProps) => {
    const { pending } = useFormStatus()

    const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedImg, setSelectedImg] = useState(null)

    useEffect(() => {

        const fetchImages = async () => {
            try {
                const data = await fetchUnsplashImages()

                if (data) {
                    setImages(data)
                }
            } catch {
                setImages(defaultImages)
            } finally {
                setIsLoading(false)
            }
        }

        fetchImages();

    }, [])


    if (isLoading) {
        return (
            <div className="p-6 flex item-center justify-center">
                <IconLoader className="animate-spin h-6 w-6 text-muted-foreground" />
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-2 mb-2">
                {images.map((image, index) => (
                    <div key={image.id} className={cn(
                        "cursor-pointer group relative h-20 w-full overflow-hidden rounded-sm bg-muted hover:opacity-75 transition-opacity",
                        pending && "opacity-50 hover:opacity-50 cursor-not-allowed"
                    )}
                        onClick={() => {
                            if (pending) return;
                            setSelectedImg(image.id);
                        }}
                    >
                        <input
                            type="radio"
                            name={id}
                            id={image.id}
                            className="hidden"
                            checked={selectedImg === image.id}
                            disabled={pending}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}|${image.user.username}`}
                        />
                        <Image
                            src={image.urls.thumb}
                            alt="Unsplash Img"
                            className="object-cover rounded-sm"
                            fill
                            />
                            {selectedImg === image.id && (
                                <div className="absolute inset-y-0 h-full w-full bg-black/30 rounded-sm flex items-center justify-center">
                                    <IconCheck className="h-4 w-4 text-white" />
                                </div>
                            )}

                        <Link
                            href={image.links.html}
                            target="_blank"
                            className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
                        >
                            {image.user.name}
                        </Link>


                    </div>
                ))}

            </div>
                <FormError
                id={id}
                errors={errors}
                />
        </div>
    )
}