import React, {useState} from 'react';
import {Badge} from "@/components/ui/badge.jsx";


function TagCard({name, onClickEvent}) {
  const handleClick = () => {
    onClickEvent(name.toLowerCase())
  }
  return (

    <Badge variant="outline"
           onClick={handleClick}
           className="cursor-pointer snap-center mx-2 my-2 hover:bg-gray-300 dark:hover:bg-slate-800">
      {name}
    </Badge>
  );
}

export default TagCard;
