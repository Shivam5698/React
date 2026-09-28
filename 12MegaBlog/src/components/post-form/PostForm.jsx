import {useEffect,useCallback} from 'react'
import { useForm} from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import appwriteService from "../../appwrite/config";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({post}) {
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
        defaultValues:{
            title:post?.title || '',
           slug:post?.slug || '',
           content:post?.content || '',
           status:post?.status || "active",
        },
    }) 

    const navigate=useNavigate()
    // ✅ Humara slice 'auth' ke naam se saved hai
    const userData = useSelector((state) => state.auth.userData);
    
    const submit=async(data)=>{
        if(post){
            const file=data.image[0]?await appwriteService.uploadFile(data.image[0]):null

            if(file){
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost=await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage:file?file.$id:undefined,
            })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
        }

        else{
            const file=await appwriteService.uploadFile(data.image[0]);

            if(file){
                const fileId=file.$id
                data.featuredImage=fileId
                const dbPost=await appwriteService.createPost({
                    ...data,
                    userId:userData.$id,
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }
   const slugTransform=useCallback((value)=>{
    if(value && typeof value==='string'){
        return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
    }
        return '';
   },[]);

  
   useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]); 

  return (
    <form onSubmit={handleSubmit(submit)} className="card-modern grid grid-cols-1 gap-8 p-5 sm:p-8 lg:grid-cols-3 lg:gap-10">
                <div className="min-w-0 space-y-5 lg:col-span-2">
                <Input
                    label="Title"
                    placeholder="Title"
                   className="input-modern"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug"
                    placeholder="Slug"
                    className="input-modern"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="min-w-0 space-y-5 lg:col-span-1">
                <div>
                    <p className="field-label">Featured image</p>
                    {/* UI-TODO: Add drag-and-drop handling and a newly selected image preview when file-input event behavior is approved. */}
                    <label className="group flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-(--border) bg-indigo-500/[0.03] px-5 py-6 text-center hover:border-(--primary) hover:bg-indigo-500/[0.06] focus-within:ring-2 focus-within:ring-indigo-500/40">
                        <span className="mb-3 grid size-11 place-items-center rounded-xl bg-indigo-500/10 text-(--primary)">
                            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 16V4m0 0L7 9m5-5 5 5" />
                                <path d="M4 16.5v2A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5v-2" />
                            </svg>
                        </span>
                        <span className="text-sm font-semibold text-(--text-h)">Choose an image</span>
                        <span className="mt-1 text-xs text-(--text-muted)">PNG, JPG, or GIF</span>
                        <input
                            type="file"
                            className="peer sr-only"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                    </label>
                </div>
                {post && (
                    <div className="w-full overflow-hidden rounded-2xl border border-(--border) bg-(--surface-solid) p-2">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            loading="lazy"
                            decoding="async"
                            className="aspect-video w-full rounded-xl object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="capitalize"
                    {...register("status", { required: true })}
                />
                <Button type="submit" className="w-full lg:mt-2">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm