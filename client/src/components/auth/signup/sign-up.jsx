import z from 'zod'
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {Highlight} from "@/components/ui/bg-highlight.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Loader2Icon} from "lucide-react";
import {ADMIN_DASHBOARD_URL} from "@/constants/urls.js";
import googleLogo from "@/assets/google-icon.png";
import githubLogoLight from "@/assets/github-logo-white.png";
import githubLogoDark from "@/assets/github-logo-dark.png";
import {useTheme, useUser} from "@/context/index.jsx";


const formSchema = z.object({
    name: z.string().min(3, {
        message: "Please enter a value greater than or equal to 3"
    }).max(30, {
        message: "Please enter a value less than or equal to 30"
    }),
    email: z.string().email({
        message: "Please enter a valid email address."
    }).min(10).max(30),
    password: z.string().min(8, {
        message: "Please enter a value greater than or equal to 8 chars"
    }).max(30, {
        message: "Please enter a value less than or equal to 30"
    })
})
export default function SignUp({onLoad}) {
    const navigate = useNavigate();
    const {signup, setToken, setUser, setAuthenticated} = useUser()
    const {theme} = useTheme()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: 'yacer',
            email: 'yacer@gmail.com',
            password: '12345678'
        }
    })
    const {setError, formState: {isSubmitting}} = form

    const onSubmit = async (values) => {
        await signup(values)
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data.user)
                    setToken(res.data.token)
                    setAuthenticated(true)
                    navigate(ADMIN_DASHBOARD_URL)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        onLoad("signup")
    }, []);
    return (
        <div className="md:mx-auto grid md:shadow-2xl gap-6 backdrop-blur-sm mx-3 border py-8 px-7 md:px-16 rounded">
            <div className="grid gap-2">
                <h1 className="text-3xl font-bold underline">Sign Up</h1>
                <Highlight className="text-black dark:text-white">
                    {/*copy, of a copy, of a copy.*/}
                    Enter your personal data to create your account
                </Highlight>
                <Button className="bg-transparent border text-gray-800 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-slate-800">
                    <span>
                    Continue with Google
                </span>
                    <img src={googleLogo} className='w-5 mx-2' alt=""/>
                </Button>
                <Button className="bg-transparent border text-gray-800 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-slate-800">
                    <span>
                    Continue with Github
                </span>
                    <img src={theme === 'dark' ? githubLogoLight : githubLogoDark} className='w-5 mx-2' alt=""/>
                </Button>
            </div>
            <main className="grid gap-4">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button disabled={isSubmitting} type="submit" className="w-full">
                            {isSubmitting && <Loader2Icon className={'mx-2 my-2 animate-spin'}/>} Sign Up
                        </Button>
                    </form>
                </Form>

            </main>
            <footer>
                <div className="mt-4 text-center text-sm">
                    you have an account?{" "}
                    <span className="underline cursor-pointer" onClick={() => onLoad("signin")}>
                        Sign in
                    </span>
                </div>
            </footer>
        </div>

    )
}
