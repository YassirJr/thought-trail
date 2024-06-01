import React, {useState, useRef} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.bubble.css'; // Import Quill styles
import {ArrowUpFromLine, LoaderIcon} from "lucide-react"
import ImageResize from 'quill-image-resize-module-react';
import {ImageDrop} from 'quill-image-drop-module'
import {ShieldX} from "lucide-react"
import {Button} from "@/components/ui/button.jsx";
import {storyApi} from "@/services/api/story-api.js";
import {toast} from "sonner"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {HOME_URL} from "@/constants/urls.js";
import {useNavigate} from "react-router-dom";
import {notificationSocket} from "@/services/socket/notification-socket.js";
import {useUser} from "@/context/index.jsx";

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop)


const CreateStory = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const {user} = useUser()
    const [errors, setErrors] = useState("");
    const titleRef = useRef()
    const officialImageRef = useRef()
    const contentDefaultValue = `<h3><em>Tell your story ...</em></h3>`
    const editorRef = useRef();

    const handleSubmit = async (e) => {
        setIsLoading(true)
        const content = editorRef.current.value
        const title = titleRef.current.value
        const official_photo = officialImageRef.current?.files[0]
        if (content.length < 10 && title.length < 5 && !officialImageRef) {
            setErrors("Post content so small")
        } else {
            const formData = new FormData()
            formData.append("user", user?._id)
            formData.append("content", content)
            formData.append("title", title)
            formData.append("official_photo", official_photo)
            await storyApi.store(formData)
                .then(res => {
                    if (res.status === 200) {
                        notificationSocket.newStory(title)
                        toast("Post has been created ✅", {
                            description: new Date().toDateString(),
                        })
                        setIsLoading(false)
                        navigate(HOME_URL)
                    }
                })
                .catch(err => console.log(err));
        }
    }


    return (
        <div className="container my-10 w-full mx-10 relative">
            {
                errors.length > 0 ? (
                    <Alert variant="destructive" className="w-1/2">
                        <ShieldX strokeWidth={1} className="h-4 w-4"/>
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>
                            {errors}
                        </AlertDescription>
                    </Alert>
                ) : null
            }
            <ReactQuill
                theme="bubble"
                value={contentDefaultValue}
                ref={editorRef}
                modules={{
                    imageDrop: true,
                    imageResize: {
                        parchment: Quill.import('parchment'),
                        modules: ['Resize', 'DisplaySize']
                    },
                    toolbar: {

                        container: [
                            [{'header': [1, 2, 3, 4, 5, 6, false]}, {'font': []}],
                            [{size: []}],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{'list': 'ordered'}, {'list': 'bullet'},
                                {'indent': '-1'}, {'indent': '+1'}],
                            ['link', 'image', 'video'],
                            ['clean'],
                            [{'align': []}],
                        ],
                    },
                    clipboard: {
                        matchVisual: false,
                    },
                }}
                formats={[
                    'header', 'font',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'ordered', 'indent',
                    'link', 'image', 'video',
                    'clean', 'align'
                ]}

            />
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline"
                            className="absolute right-12 md:right-20  -top-0 bg-[#129F5E] rounded-full py-7 text-white hover:bg-[#129F7E]">

                        <ArrowUpFromLine strokeWidth={1}/>

                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Complete the story publishing</DialogTitle>
                        <DialogDescription>
                            Make the story has a title and an official image
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                defaultValue="Php Native"
                                className="col-span-3"
                                name="title"
                                ref={titleRef}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Image
                            </Label>
                            <Input
                                id="image"
                                type='file'
                                name="image"
                                className="col-span-3"
                                ref={officialImageRef}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSubmit} type="submit">
                            {
                                isLoading && <LoaderIcon className='animate-spin w-5 h-5 mr-2' strokeWidth={0.75}/>
                            }
                            Publish
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default CreateStory;
