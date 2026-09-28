import React,{useId} from 'react'

const Input=React.forwardRef(function Input({
    label,
    type='text',
    className="",
    ...props
},ref){
    const id=useId()
    return (
        <div className="w-full">
        {label && <label
            className="field-label"
            htmlFor={id}>
            {label}
          </label>
        }
        <input 
        type={type}
        className={`input-modern focus-visible:ring-2 focus-visible:ring-indigo-500/40 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-950 dark:file:text-indigo-200 ${className}`}
        ref={ref}
        {...props}
        id={id}
        />
        </div>
    )
})

export default Input