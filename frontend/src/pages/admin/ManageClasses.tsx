import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { Button } from "../../components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

interface SchoolClass {
    id: number;
    name: string;
    teacher_id: number | null;
    teacher?: {
        id: number;
        user: {
            name: string;
        }
    }
}

interface Teacher {
    id: number;
    user: {
        name: string;
    }
}

const formSchema = z.object({
    name: z.string().min(2, "Class name is required"),
    teacher_id: z.string().optional(),
});

export default function ManageClasses() {
    const [classes, setClasses] = useState<SchoolClass[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            teacher_id: "none",
        },
    });

    const fetchClasses = async () => {
        try {
            const { data } = await axiosClient.get('/api/classes');
            setClasses(data.data);
        } catch (error) {
            console.error("Failed to fetch classes", error);
        }
    };

    const fetchTeachers = async () => {
        try {
            const { data } = await axiosClient.get('/api/teachers');
            setTeachers(data.data); // Assuming paginated response or update controller to return all
        } catch (error) {
            console.error("Failed to fetch teachers", error);
        }
    };

    useEffect(() => {
        fetchClasses();
        fetchTeachers();
    }, []);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const payload = {
                name: values.name,
                teacher_id: values.teacher_id === "none" ? null : Number(values.teacher_id),
            };
            await axiosClient.post('/api/classes', payload);
            setIsOpen(false);
            form.reset();
            fetchClasses();
        } catch (error) {
            console.error("Failed to create class", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this class?")) {
            try {
                await axiosClient.delete(`/api/classes/${id}`);
                fetchClasses();
            } catch (error) {
                console.error("Failed to delete class", error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Manage Classes</h2>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Class
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Class</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Class Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Grade 10-A" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="teacher_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Assign Teacher (Optional)</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a teacher" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="none">None</SelectItem>
                                                    {teachers.map((teacher) => (
                                                        <SelectItem key={teacher.id} value={String(teacher.id)}>
                                                            {teacher.user.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">Create Class</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Class Name</TableHead>
                            <TableHead>Teacher</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {classes.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24">
                                    No classes found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            classes.map((cls) => (
                                <TableRow key={cls.id}>
                                    <TableCell>{cls.id}</TableCell>
                                    <TableCell className="font-medium">{cls.name}</TableCell>
                                    <TableCell>{cls.teacher?.user?.name || "Unassigned"}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(cls.id)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
