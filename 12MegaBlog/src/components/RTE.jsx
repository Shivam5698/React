import { useEffect, useState } from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'
import conf from "../conf/conf"
export default function RTE({name,control,label,defaultValue=""}) {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    const root = document.documentElement
    const observer = new MutationObserver(() => {
      setIsDarkMode(root.classList.contains('dark'))
    })

    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <div className='w-full'>
    {label && <label className='field-label'>{label}</label>}
   
    {/* UI-TODO: Sync TinyMCE iframe skin and content colors with class-based theme changes. */}
    <div className="min-h-[31rem] overflow-hidden rounded-2xl border border-(--border) bg-[#ffffff] shadow-sm dark:bg-[#141721] [&_.tox-tinymce]:!rounded-none [&_.tox-tinymce]:!border-0">
   <Controller
    name={name||'content'}
    control={control}
    render={({field:{onChange}})=>(
        <Editor
        key={isDarkMode ? 'dark' : 'light'}
        apiKey={conf.tinymceApiKey}
         initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
          skin: isDarkMode ? 'oxide-dark' : 'oxide',
          content_css: isDarkMode ? 'dark' : 'default',
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: isDarkMode
              ? "body { background-color:#141721; color:#f1f5f9; font-family:'Inter Variable',Inter,Arial,sans-serif; font-size:14px; line-height:1.6; padding:12px }"
              : "body { background-color:#ffffff; color:#0f172a; font-family:'Inter Variable',Inter,Arial,sans-serif; font-size:14px; line-height:1.6; padding:12px }"
        }}
        onEditorChange={onChange}
        />
    )}
   />
   </div>


    </div>
  )
}