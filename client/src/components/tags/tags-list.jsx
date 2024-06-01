import React from 'react';
import TagCard from "@/components/tags/tag-card.jsx";
import {useTag} from "@/context/index.jsx";


function TagsList({event}) {
  const {tags} = useTag()

    return (
            <div className="flex flex-wrap">
                {
                    tags?.map(e => (
                        <TagCard key={e?._id} name={e?.name} onClickEvent={(data)=> event(data)} />
                    ))
                }
            </div>
    );
}

export default TagsList;
