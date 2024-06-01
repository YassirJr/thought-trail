import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandInput,
    CommandSeparator,
    CommandEmpty,
    CommandDialog
} from "@/components/ui/command.jsx"
import {useEffect, useState} from "react";
import {READ_STORY} from "@/constants/urls.js";
import {useNavigate} from "react-router-dom";

const AutoComplete = ({
                          options,
                          isOpen,
                          setOpen
                      }) => {

    const navigate = useNavigate()

    const handleClick = (storyId) => {
        navigate(READ_STORY(storyId));
        setOpen(false);
    };

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <CommandDialog open={isOpen} onOpenChange={()=> setOpen(!isOpen)}>
            <CommandInput placeholder="Type a command or search..."/>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    {options.map((e ,i) => (
                        <div
                            key={i}
                            onClick={() => handleClick(e?._id)}
                        >
                            <CommandItem>
                                <span>{e.title}</span>
                            </CommandItem>
                        </div>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}

export default AutoComplete
