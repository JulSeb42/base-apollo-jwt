/*=============================================== ImageUploader ===============================================*/

import React from "react"
import { InputImage, CommonTypes } from "tsx-library-julseb"

import cloudinaryService from "../api/file-upload.service"

const ImageUploader = ({
    imageUrl,
    setImageUrl,
    setIsLoading,
    ...props
}: Props) => {
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const uploadData = new FormData()
        setIsLoading(true)

        // @ts-expect-error
        uploadData.append("imageUrl", e.target.files[0])

        cloudinaryService
            .uploadImage(uploadData)
            .then(res => {
                setImageUrl(res.secure_url)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

        // @ts-expect-error
        if (e.target.files[0]) {
            // @ts-expect-error
            setImageUrl(e.target.files[0])
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                // @ts-expect-error
                setImageUrl(reader.result)
            })
            // @ts-expect-error
            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <InputImage
            {...props}
            img={{
                src: imageUrl,
            }}
            onChange={(e: any) => handleImage(e)}
        />
    )
}

export default ImageUploader

interface Props {
    imageUrl: string
    setImageUrl: (imageUrl: string) => void
    setIsLoading: (isLoading: boolean) => void
    cover?: boolean
    id: string
    label?: string
    helper?: string
    helperBottom?:
        | undefined
        | string
        | {
              text: string | undefined
              icon?: string
              iconColor?: CommonTypes.AllColorsTypes
              color?: CommonTypes.AllColorsTypes
              style?: "default" | "italic"
          }
    disabled?: boolean
    validation?: CommonTypes.ValidationTypes
    width?: number | string
    height?: number | string
    iconSize?: number
    accentColor?: CommonTypes.ColorsHoverTypes
    borderRadius?: CommonTypes.RadiusesTypes

    icons?: {
        empty?: string
        hover?: string
    }
}
