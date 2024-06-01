import {BookmarkPlusIcon} from "lucide-react";
import React from "react";

const ReadingsListInfo = () => {
  return (
    <div>
      <h1 className="font-extralight underline">Reading list</h1>
      <p className="font-thin text-sm my-4 dark:text-gray-400 text-gray-800">
        Click the
        <BookmarkPlusIcon strokeWidth={1} className="w-5 h-5 mx-1 inline"/>
        on any story to easily add it to your reading list or a
        custom list that you can share.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ab beatae cupiditate dolor dolorem, esse et exercitationem facilis illo laudantium magni nisi,
        non perferendis porro possimus, repellat voluptate voluptatem. Aut, dicta.
      </p>
    </div>
  )
}
export default ReadingsListInfo
