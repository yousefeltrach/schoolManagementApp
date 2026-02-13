import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, Trash2, User as UserIcon } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

export default function ManageUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(false);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const params = {
                search: search,
                role: roleFilter !== "all" ? roleFilter : undefined,
            };
            const { data } = await axiosClient.get('/api/users', { params });
            setUsers(data.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchUsers();
        }, 300);
        return () => clearTimeout(debounce);
    }, [search, roleFilter]);

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            try {
                await axiosClient.delete(`/api/users/${id}`);
                fetchUsers();
            } catch (error: any) {
                console.error("Failed to delete user", error);
                alert(error?.response?.data?.message || "Failed to delete user");
            }
        }
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-red-500 hover:bg-red-600';
            case 'teacher': return 'bg-blue-500 hover:bg-blue-600';
            case 'student': return 'bg-green-500 hover:bg-green-600';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">User Directory</h2>
                    <p className="text-muted-foreground">Manage all accounts in the system.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setRoleFilter}>
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="student">Students</TabsTrigger>
                        <TabsTrigger value="teacher">Teachers</TabsTrigger>
                        <TabsTrigger value="admin">Admins</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or email..."
                        className="pl-8"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="border rounded-md bg-white dark:bg-gray-800">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                    {isLoading ? "Loading..." : "No users found matching your criteria."}
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                <UserIcon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            disabled={user.role === 'admin'} // Prevent deleting admins for safety, or check current user ID
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
