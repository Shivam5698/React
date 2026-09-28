import React,{useId} from 'react'

function Select({
    options,
    label,
    className="",
    ...props
},ref) {
    const id=useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className="field-label">{label}</label>}
        <select 
        {...props}
        id={id}
        ref={ref}
        className={`input-modern focus-visible:ring-2 focus-visible:ring-indigo-500/40 ${className}`}
        >
            {options?.map((option)=> (
                <option key={option} value={option}>
                     {option}
                    </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)