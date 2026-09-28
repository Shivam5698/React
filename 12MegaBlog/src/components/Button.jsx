// import React from 'react'

function Button({
    children,
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',
    ...props
 }) {
  const colorVariants = {
    'bg-blue-600': 'btn-primary',
    'bg-green-500': 'btn-success',
    'bg-red-500': 'btn-danger',
  }
  const visualVariant = colorVariants[bgColor] || 'btn-primary'
  const legacyBg = colorVariants[bgColor] ? '' : bgColor
  const legacyText = textColor === 'text-white' && colorVariants[bgColor] ? '' : textColor
  const legacyColors = `${legacyBg} ${legacyText}`

  return (
    <button type={type} className={`${visualVariant} ${className} ${legacyColors}`} {...props}>{children}</button>
  )
}

export default Button