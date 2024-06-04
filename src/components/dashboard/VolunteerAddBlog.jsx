import React, { useContext, useRef, useState } from 'react'
import SectionTitle from '../SectionTitle'
import { imageUpload } from '../../imageAPI';
import JoditEditor from 'jodit-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { AuthContext } from '../../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const VolunteerAddBlog = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
  
    const {data: currentUser = []} = useQuery({
      queryKey: ["profileUser", user?.email],
      queryFn: async() => {
          const res = await axiosSecure.get(`/users?email=${user?.email}`)
          console.log(res.data)
          return res.data;
      }
  })
  console.log(currentUser)

    const editor = useRef(null);
    const [content, setContent] = useState("");

    const handleBlog = async(e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const image = form.image.files[0];
        const blogContent = content;

        try {

            // upload image and get image url
            const thumbnail = await imageUpload(image);

            const blog = {
                title,
                thumbnail,
                blogContent,
                status: "draft"
            }
            console.log(blog)

            const res = await axiosSecure.post("/blog", blog)
            console.log(res.data)
            if(res.data.insertedId){
                toast.success("Blog has created as draft");
                form.reset();
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

  return (
    <>
      <SectionTitle heading={"Add Blog"} />
      
      <section className="max-w-4xl p-6 mx-auto bg-white">

    <form onSubmit={handleBlog}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="title">Title</label>
                <input id="title" name='title' type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" required />
            </div>

            <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="image">Thumbnail</label>

                            <input required
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*' className="block w-full py-3 ml-1 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                        </div>

        </div>

        <div className='mt-7'>
            <JoditEditor ref={editor} value={content} onChange={(newContent) => setContent(newContent)} ></JoditEditor>
        </div>

        <div className="flex justify-end mt-6">
            
            <input disabled={currentUser?.role === "user" ? true : false} className='bg-red-600 border-none hover:bg-red-500 text-white btn btn-sm' type="submit" value="Create" />
        </div>
    </form>
</section>
    </>
  )
}

export default VolunteerAddBlog
