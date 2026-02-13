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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";

interface Subject {
    id: number;
    name: string;
    code: string;
    description: string | null;
}

const formSchema = z.object({
    name: z.string().min(2, "Subject name is required"),
    code: z.string().min(2, "Subject code is required"),
    description: z.string().optional(),
});

export default function ManageSubjects() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            code: "",
            description: "",
        },
    });

    const fetchSubjects = async () => {
        try {
            const { data } = await axiosClient.get('/api/subjects');
            setSubjects(data.data);
        } catch (error) {
            console.error("Failed to fetch subjects", error);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axiosClient.post('/api/subjects', values);
            setIsOpen(false);
            form.reset();
            fetchSubjects();
        } catch (error) {
            console.error("Failed to create subject", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this subject?")) {
            try {
                await axiosClient.delete(`/api/subjects/${id}`);
                fetchSubjects();
            } catch (error) {
                console.error("Failed to delete subject", error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Manage Subjects</h2>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Subject
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Subject</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subject Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Mathematics" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subject Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="MATH101" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Basic mathematics..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">Create Subject</Button>
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
                            <TableHead>Code</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subjects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">
                                    No subjects found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            subjects.map((subject) => (
                                <TableRow key={subject.id}>
                                    <TableCell>{subject.id}</TableCell>
                                    <TableCell className="font-medium">{subject.code}</TableCell>
                                    <TableCell>{subject.name}</TableCell>
                                    <TableCell>{subject.description || "-"}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(subject.id)}
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
