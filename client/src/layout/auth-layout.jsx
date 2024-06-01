import React, {useState, useEffect} from 'react';
import SignIn from "@/components/auth/signin/sign-in.jsx";
import {motion} from "framer-motion";
import SignUp from "@/components/auth/signup/sign-up.jsx";
import LazyLoad from "react-lazyload"
import {ModeToggle} from "@/components/ui/mode-toggle.jsx";
import loginImage from "@/assets/login-image.jpg";
import {BgHighlight} from "@/components/ui/bg-highlight.jsx";
import {AUTH_URL, HOME_URL} from "@/constants/urls.js";
import {useNavigate} from "react-router-dom";
import {ArrowLeft} from "lucide-react";
import {userApi} from "@/services/api/user-api.js";
import {Button} from "@/components/ui/button.jsx";

function AuthLayout() {
  const [selectedPage, setSelectedPage] = useState("signin");
  const navigate = useNavigate()

  const handlePageChange = (data) => {
    if (data === "signin") {
      setSelectedPage("signin")
    } else setSelectedPage("signup")
  }

  const animation = () => ({
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0},
    transition: {duration: 0.3},
    layoutId: "form-container"
  })

  const isAuthenticated = async () => {
    const response = await userApi.me()
    if (response.status === 200 && response.data.user) {
      navigate(HOME_URL)
    }
  }

  useEffect(() => {
    isAuthenticated()
  }, []);
  return (
    <BgHighlight
      className="w-full h-screen lg:grid lg:grid-cols-2 "
    >
      <div
        className="absolute z-50 top-3 right-3 md:top-10 md:right-10"
      >
        <div className="flex justify-center items-center gap-2">
          <Button variant="outline" size="icon"
                  onClick={()=> navigate('/')} >

        <ArrowLeft className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all "   />
          </Button>
        <ModeToggle/>
        </div>
      </div>

      <motion.div
        initial={{opacity: 0, scale: 0.5}}
        animate={{
          opacity: 1, scale: 1
        }}
        transition={{duration: 0.3}}
        className="flex h-full w-full items-center justify-center "
      >
        {selectedPage === "signin" ? (
          <motion.div
            {...animation()}
          >
            <SignIn onLoad={handlePageChange}/>
          </motion.div>
        ) : (
          <motion.div
            {...animation()}

          >
            <SignUp onLoad={handlePageChange}/>
          </motion.div>
        )}
      </motion.div>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.3}}
        className="hidden lg:block md:h-screen p-5">
        <LazyLoad className="h-full">
          <img src={loginImage} className="h-full rounded w-full object-cover" alt="login"/>
        </LazyLoad>
      </motion.div>
    </BgHighlight>
  )
    ;

}

export default AuthLayout;
