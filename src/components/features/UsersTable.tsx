import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { AxiosError } from 'axios';
import { useUserStore } from '../../services/userService';
import { DataTable } from '../common/DataTable';
import { ErrorDisplay } from '../common/ErrorDisplay';
import { LoadingDisplay } from '../common/LoadingDisplay';
import { showToast } from '../../utils/toast';

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

    const handleRoleChange = async (userId: string, newRole: string, userEmail: string) => {
        if (userEmail === currentUserEmail) return;
        
        try {
            await api.put(`/users/${userId}/role`, { role: newRole });
            setUsers(users.map(user => 
                user._id === userId ? { ...user, role: newRole } : user
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

    if (loading) {
        return <LoadingDisplay />;
    }

    if (error) {
        return <ErrorDisplay error={error} onRetry={fetchUsers} />;
    }

    return (
        <div className="mx-2">
            <h2 className="text-lg font-semibold mb-4">Users</h2>
            <DataTable columns={columns}>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user._id, e.target.value, user.email)}
                                disabled={user.email === currentUserEmail}
                                className={`w-full px-2 py-1 border rounded ${
                                    user.email === currentUserEmail 
                                        ? 'border-gray-200 bg-gray-50' 
                                        : 'border-gray-300 bg-white'
                                } shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                            >
                                {ROLES.map((role) => (
                                    <option key={role} value={role}>
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </option>
                                ))}
                            </select>
                            {user.email === currentUserEmail && (
                                <p className="mt-1 text-xs text-gray-500 italic">
                                    Cannot modify own role
                                </p>
                            )}
                        </td>
                    </tr>
                ))}
            </DataTable>
        </div>
    );
} 