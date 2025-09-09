import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { axiosClient } from "../../api/axios"
import type { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"
import { STUDENT_DASHBOARD_ROUTE } from "../../router/index"
import { Loader } from "lucide-react"


const formSchema = z.object({
  email: z.string().email().min(2).max(30),
  password: z.string().min(8).max(20),
})

export default function StudentLogin() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "yousef@gmail.com",
            password: "123456789",
        },
    })

     const {setError, formState: {isSubmitting}} = form
     const navigate = useNavigate()
     const onSubmit = async (values: z.infer<typeof formSchema>) => {
       await axiosClient.get('/sanctum/csrf-cookie');
        // const data = await axiosClient.post('/login', values)
        await axiosClient.post('/login', values)
        .then(
          (value : AxiosResponse): void => {
          
          if (value.status === 204) {
          navigate(STUDENT_DASHBOARD_ROUTE)
        }
        }
        ) .catch( ({response}) => {
          console.log(response)
          const errorMessage = response?.data?.errors?.email?.join() || 'An unexpected error occurred';
          form.setError('email', {message: errorMessage})
        }
          
        )}
      
  

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>  
          )}
        />
        <Button disabled={isSubmitting} type="submit">
            {isSubmitting && <Loader className={'mx-2 my-2 animate-spin'}/>} {' '} Login</Button>
     
      </form>
    </Form>
    </>
  )
}
