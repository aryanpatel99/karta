"use server"

import { unsplash } from "@/lib/unsplash"

export async function fetchUnsplashImages() {
    try {
        const { data, error } = await unsplash.GET("/photos/random", {
            params: {
                query: {
                    collections: ["317099"],
                    count: 9,
                }
            }
        })

        if (data && Array.isArray(data)) {
            return data
        }

        return null
    } catch {
        return null
    }
}
