import React, {useEffect, useRef, useState} from 'react';
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.jsx";
import {ArrowUpFromLine, ShieldX} from "lucide-react";
import ReactQuill, {Quill} from "react-quill";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {storyApi} from "@/services/api/story-api.js";
import {toast} from "sonner";
import {HOME_URL} from "@/constants/urls.js";
import {useStory, useUser} from "@/context/index.jsx";

function EditStory() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const {id} = useParams();
  const {allStories} = useStory();
  const {user} = useUser();
  const [errors, setErrors] = useState("");
  const titleRef = useRef();
  const officialImageRef = useRef();
  const editorRef = useRef()

  const checkStoryOwnership = async () => {
    const story = allStories.find(e => e._id.toString() === id.toString());
    if (story) {
      if (story.user._id !== user._id) {
        navigate(HOME_URL);
      }
    } else {
      navigate(HOME_URL);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (allStories.length > 0) {
      checkStoryOwnership();
    }
  }, [allStories, id, user, navigate]);

  const handleSubmit = async (e) => {
    const content = editorRef.current.value;
    const title = titleRef.current.value;
    const official_photo = officialImageRef.current?.files[0];
    if (content.length < 10 && title.length < 5 && !officialImageRef) {
      setErrors("Post content so small");
    } else {
      const formData = new FormData();
      formData.append("user", user?._id);
      formData.append("content", content);
      formData.append("title", title);
      if (official_photo) {
        formData.append("official_photo", official_photo);
      }
      await storyApi.update(story?._id, formData)
        .then(res => {
          if (res.status === 200) {
            toast("Post has been updated ✅", {
              description: new Date().toDateString(),
            });
            navigate(HOME_URL);
          }
          if (res.status === 403) {
            toast(res.data.message, {
              description: new Date().toDateString(),
              icon: <ShieldX strokeWidth={1} className="w-4 h-4"/>
            });
          }
        })
        .catch(err => {
          navigate(HOME_URL)
          toast('internal server error')
        });
    }
  };

  if (isLoading) {
    return <></>;
  }

  const story = allStories.find(e => e._id === id.toString()) || {};

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
        value={story?.content}
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
                  className="absolute right-40 top-0 bg-[#129F5E] text-white hover:bg-[#129F7E]">
                        <span>
                            Continue
                        </span>
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
                defaultValue={story?.title}
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
            <Button type="submit" onClick={handleSubmit}>Publish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditStory;
