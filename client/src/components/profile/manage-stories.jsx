import React from 'react';
import {Tabs} from "@radix-ui/react-tabs";
import {TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import {useStory} from "@/context/index.jsx";
import UserCardInfo from "@/components/profile/user-card-info.jsx";
import PublishedStories from "@/components/profile/published-stories.jsx";

function ManageStories() {
    const {myStories} = useStory()
    return (
        <div className="container mx-10 flex justify-center gap-16">
            <div className="ls w-2/3 my-20">
                <h1 className="text-4xl mb-12 font-semibold dark:text-gray-300 underline">
                    Your stories
                </h1>
                <Tabs defaultValue="published">
                    <TabsList className="bg-transparent m-0 p-0">
                        <TabsTrigger value="published"
                                     className='me-10 font-light'>Published {myStories?.length} </TabsTrigger>
                    </TabsList>
                    <TabsContent value="published">
                        <PublishedStories/>
                    </TabsContent>
                </Tabs>
            </div>
            <UserCardInfo/>
        </div>
    );
}

export default ManageStories;
