"use client";

import { CldImage } from "next-cloudinary";

export default function BlogCardImage({ publicId, postTitle }: { publicId: string; postTitle: string }) {
    return <CldImage
        src={publicId}
        alt={postTitle}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
    />
}