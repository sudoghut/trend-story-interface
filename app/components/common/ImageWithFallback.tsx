'use client';

import React, { useState } from 'react'
import { ERROR_IMG_SRC } from './imagePlaceholders'

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const { src, alt, style, className, onError, ...rest } = props

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setDidError(true)
    onError?.(event)
  }

  return didError ? (
    <div className={`inline-block text-center align-middle ${className ?? ''}`} style={style}>
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="" aria-hidden="true" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
