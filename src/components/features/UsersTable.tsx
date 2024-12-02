import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { AxiosError } from 'axios';
import { useUserStore } from '../../services/userService';
import { DataTable } from '../commons/DataTable';
import { ErrorDisplay } from '../commons/ErrorDisplay';
import { LoadingDisplay } from '../commons/LoadingDisplay';
import { showToast } from '../../utils/toast';
import { SectionHeader } from '../commons/SectionHeader';

interface User {
    _id: string;
    email: string;
    role: 'user' | 'expert' | 'admin';
}

const ROLES = ['user', 'expert', 'admin'] as const;

interface ApiResponse {
    success: boolean;
    result: {
        users: User[];
    };
}

export function UsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const currentUserEmail = useUserStore(state => state.email);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get<ApiResponse>('/users');
            const sortedUsers = [...response.data.result.users].sort((a, b) => 
                a.email.localeCompare(b.email)
            );
            setUsers(sortedUsers);
            setError(null);
        } catch (err) {
            const error = err as AxiosError;
            console.error('Error fetching users:', error);
            setError(error.response?.data?.message || 'Failed to fetch users');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: string, newRole: typeof ROLES[number], userEmail: string) => {
        if (userEmail === currentUserEmail) return;
        
        try {
            await api.put(`/update-role/${userId}`, { role: newRole });
            setUsers(users.map(user => 
                user._id === userId ? { ...user, role: newRole as 'user' | 'expert' | 'admin' } : user
            ));
            showToast.success('User role updated successfully');
        } catch (err) {
            const error = err as AxiosError;
            showToast.error(error.response?.data?.message || 'Failed to update user role');
        }
    };

    const columns = [
        { key: 'id', header: 'ID', width: 'w-48' },
        { key: 'email', header: 'Email' },
        { key: 'role', header: 'Role', width: 'w-48' }
    ];

    const CurrentUserCard = ({ user }: { user: User }) => (
        <div className="bg-gray-900/50 rounded-lg border border-gray-800/50 p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 rounded-full bg-purple-500/70"></div>
                    <div>
                        <div className="text-sm text-gray-300">{user.email}</div>
                        <div className="text-xs text-gray-400 font-mono mt-1">{user._id}</div>
                    </div>
                </div>
                <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 
                    text-purple-400 rounded-full text-xs font-medium capitalize">
                    {user.role}
                </div>
            </div>
        </div>
    );

    if (loading) {
        return <LoadingDisplay />;
    }

    if (error) {
        return <ErrorDisplay error={error} onRetry={fetchUsers} />;
    }

    const currentUser = users.find(user => user.email === currentUserEmail);
    const otherUsers = users.filter(user => user.email !== currentUserEmail);

    return (
        <div className="space-y-6">
            <SectionHeader
                title="Users Management"
                description="Manage user roles and permissions"
            />

            {currentUser && <CurrentUserCard user={currentUser} />}

            <div className="bg-gray-900/50 rounded-lg border border-gray-800/50 overflow-hidden">
                <DataTable columns={columns}>
                    {otherUsers.map((user) => (
                        <tr key={user._id} 
                            className="border-b border-gray-800/50 bg-gray-900/20 
                                hover:bg-gray-800/40 transition-colors duration-150">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400 font-mono">
                                {user._id}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-purple-500/70 mr-2"></div>
                                    {user.email}
                                </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                <div className="relative group">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value, user.email)}
                                        className="w-full px-3 py-1.5 rounded-md text-sm
                                            bg-gray-800 text-gray-200 cursor-pointer hover:bg-gray-700
                                            border border-gray-700
                                            focus:outline-none focus:ring-2 focus:ring-purple-500/40 
                                            focus:border-purple-500/40 
                                            transition-colors duration-150"
                                    >
                                        {ROLES.map((role) => (
                                            <option key={role} value={role} 
                                                className="bg-gray-800 text-gray-200">
                                                {role.charAt(0).toUpperCase() + role.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                        </tr>
                    ))}
                </DataTable>
            </div>
        </div>
    );
} 