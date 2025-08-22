import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"


const formSchema = z.object({
  email: z.string().email().min(2).max(30),
  password: z.string().min(8).max(20),
})

function studentLogin() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </>
  )
}

export default studentLogin
// "use client"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { Link } from "react-router-dom"

// import { Eye, EyeOff, GraduationCap,  Loader2 } from "lucide-react"
// import { useState } from "react"

// import { Button } from "../ui/button"
// import { Input } from "../ui/input"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
// import { Alert, AlertDescription } from "../ui/alert"

// // Zod validation schema
// const studentLoginSchema = z.object({
//   studentId: z
//     .string()
//     .min(1, "Student ID is required")
//     .min(3, "Student ID must be at least 3 characters")
//     .max(20, "Student ID must not exceed 20 characters")
//     .regex(/^[a-zA-Z0-9]+$/, "Student ID can only contain letters and numbers"),
//   password: z
//     .string()
//     .min(1, "Password is required")
//     .min(6, "Password must be at least 6 characters")
//     .max(100, "Password must not exceed 100 characters"),
//   rememberMe: z.boolean(),
// })

// type StudentLoginForm = z.infer<typeof studentLoginSchema>

// function StudentLogin() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [loginError, setLoginError] = useState<string | null>(null)

//   const form = useForm<StudentLoginForm>({
//     resolver: zodResolver(studentLoginSchema),
//     defaultValues: {
//       studentId: "",
//       password: "",
//       rememberMe: false,
//     },
//   })

//   const onSubmit = async (data: StudentLoginForm) => {
//     setIsLoading(true)
//     setLoginError(null)

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000))

//       // Mock authentication logic
//       if (data.studentId === "student123" && data.password === "password123") {
//         console.log("Login successful:", data)
//         // Redirect to student dashboard
//         // router.push('/student/dashboard')
//       } else {
//         setLoginError("Invalid student ID or password. Please try again.")
//       }
//     } catch {
//       setLoginError("An error occurred during login. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1 text-center">
//           <div className="flex items-center justify-center mb-4">
//             <div className="flex items-center space-x-2">
//               <GraduationCap className="h-8 w-8 text-primary" />
//               <span className="text-2xl font-bold">EduManage</span>
//             </div>
//           </div>
//           <CardTitle className="text-2xl font-semibold">Student Login</CardTitle>
//           <CardDescription>Enter your student credentials to access your account</CardDescription>
//         </CardHeader>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <CardContent className="space-y-4">
//               {loginError && (
//                 <Alert variant="destructive">
//                   <AlertDescription>{loginError}</AlertDescription>
//                 </Alert>
//               )}

//               <FormField
//                 control={form.control}
//                 name="studentId"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Student ID</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter your student ID" {...field} disabled={isLoading} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <Input
//                           type={showPassword ? "text" : "password"}
//                           placeholder="Enter your password"
//                           {...field}
//                           disabled={isLoading}
//                         />
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                           onClick={() => setShowPassword(!showPassword)}
//                           disabled={isLoading}
//                         >
//                           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                           <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
//                         </Button>
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="flex items-center mb-4 justify-between">
//                 <FormField
//                   control={form.control}
//                   name="rememberMe"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                       <FormControl>
//                         <input
//                           type="checkbox"
//                           checked={field.value}
//                           onChange={field.onChange}
//                           disabled={isLoading}
//                           className="mt-1"
//                         />
//                       </FormControl>
//                       <div className="space-y-1 leading-none">
//                         <FormLabel className="text-sm font-normal">Remember me</FormLabel>
//                       </div>
//                     </FormItem>
//                   )}
//                 />

//                 <Link to="/forgot-password" className="text-sm text-primary hover:underline">
//                   Forgot password?
//                 </Link>
//               </div>
//             </CardContent>

//             <CardFooter className="flex flex-col space-y-4">
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Signing in...
//                   </>
//                 ) : (
//                   "Sign In"
//                 )}
//               </Button>

//               <div className="text-center text-sm text-muted-foreground">
//                 {"Don't have an account? "}
//                 <Link to="/register" className="text-primary hover:underline font-medium">
//                   Register here
//                 </Link>
//               </div>

//               <div className="text-center text-xs text-muted-foreground">
//                 <p>Demo credentials:</p>
//                 <p>Student ID: student123</p>
//                 <p>Password: password123</p>
//               </div>
//             </CardFooter>
//           </form>
//         </Form>
//       </Card>
//     </div>
//   )
// }

// export default StudentLogin
