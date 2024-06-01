import {RouterProvider} from "react-router-dom";
import router from "@/routes/index.jsx";
import ContextProvider from "@/context/index.jsx";
import {Toaster} from "@/components/ui/sonner.jsx";


function App() {
    return (
        <ContextProvider>
            <RouterProvider {...router}/>
            <Toaster/>
        </ContextProvider>
    )
}

export default App
