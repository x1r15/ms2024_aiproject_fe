import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { AxiosError } from 'axios';
import { FaCheck, FaPencilAlt, FaTrash, FaTimes } from 'react-icons/fa';
import { DataTable } from '../common/DataTable';
import { ErrorDisplay } from '../common/ErrorDisplay';
import { LoadingDisplay } from '../common/LoadingDisplay';
import { showToast } from '../../utils/toast';

interface BodyTerm {
    head: string;
    args: string[];
}

interface Term {
    _id: string;
    term: string;
    head: string;
    args: string[];
    type: 'fact' | 'rule';
    body: BodyTerm[];
}

interface ApiResponse {
    success: boolean;
    result: {
        terms: Term[];
    };
}

export function KnowledgeBase() {
    const [terms, setTerms] = useState<Term[]>([]);
    const [newTerm, setNewTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState<string>('');

    useEffect(() => {
        fetchTerms();
    }, []);

    const fetchTerms = async () => {
        try {
            setLoading(true);
            const response = await api.get<ApiResponse>('/terms');
            setTerms(sortTerms(response.data.result.terms));
            setError(null);
        } catch (err) {
            const error = err as AxiosError;
            setError(error.response?.data?.message || 'Failed to fetch terms');
        } finally {
            setLoading(false);
        }
    };

    const sortTerms = (terms: Term[]) => {
        return [...terms].sort((a, b) => a.term.localeCompare(b.term));
    };

    const handleEdit = async (term: Term) => {
        if (editingId === term._id) {
            try {
                await api.put(`/terms/${term._id}`, { term: editingValue });
                await fetchTerms();
                setEditingId(null);
                setEditingValue('');
                showToast.success('Term updated successfully');
            } catch (err) {
                const error = err as AxiosError;
                showToast.error(error.response?.data?.message || 'Invalid Prolog term');
            }
        } else {
            setEditingId(term._id);
            setEditingValue(term.term);
            setDeletingId(null);
        }
    };

    const handleDelete = async (term: Term) => {
        if (deletingId === term._id) {
            try {
                await api.delete(`/terms/${term._id}`);
                await fetchTerms();
                setDeletingId(null);
                showToast.success('Term deleted successfully');
            } catch (err) {
                const error = err as AxiosError;
                showToast.error(error.response?.data?.message || 'Failed to delete term');
            }
        } else {
            setDeletingId(term._id);
            setEditingId(null);
            setEditingValue('');
        }
    };

    const handleCancel = (term: Term) => {
        if (editingId === term._id) {
            setEditingId(null);
            setEditingValue('');
        }
        if (deletingId === term._id) {
            setDeletingId(null);
        }
    };

    const handleAddTerm = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!newTerm.trim()) return;

        try {
            await api.post('/terms', { term: newTerm });
            await fetchTerms();
            setNewTerm('');
            showToast.success('Term added successfully');
        } catch (err) {
            const error = err as AxiosError;
            showToast.error(error.response?.data?.message || 'Invalid Prolog term');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddTerm();
        }
    };

    const columns = [
        { key: 'term', header: 'Term' },
        { key: 'actions', header: 'Actions', width: 'w-24' }
    ];

    const TermsTable = ({ type, title }: { type: 'fact' | 'rule'; title: string }) => (
        <div className="mt-8 mx-2 w-1/2">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <DataTable columns={columns}>
                {terms.filter(term => term.type === type).map(term => (
                    <tr key={term._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-full">
                            {editingId === term._id ? (
                                <input
                                    type="text"
                                    value={editingValue}
                                    onChange={(e) => setEditingValue(e.target.value)}
                                    className="w-full px-2 py-1 border rounded border-purple-500"
                                    autoFocus
                                />
                            ) : (
                                <span className="block w-full px-2 py-1">
                                    {term.term}
                                </span>
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-24">
                            <div className="flex space-x-2">
                                {editingId === term._id ? (
                                    <>
                                        <button
                                            onClick={() => handleEdit(term)}
                                            className="text-green-600 hover:text-green-800"
                                            title="Save"
                                        >
                                            <FaCheck className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleCancel(term)}
                                            className="text-gray-600 hover:text-gray-800"
                                            title="Cancel"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </button>
                                    </>
                                ) : deletingId === term._id ? (
                                    <>
                                        <button
                                            onClick={() => handleDelete(term)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Confirm delete"
                                        >
                                            <FaCheck className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleCancel(term)}
                                            className="text-gray-600 hover:text-gray-800"
                                            title="Cancel"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEdit(term)}
                                            className="text-gray-600 hover:text-purple-600"
                                            title="Edit"
                                        >
                                            <FaPencilAlt className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(term)}
                                            className="text-gray-600 hover:text-red-600"
                                            title="Delete"
                                        >
                                            <FaTrash className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
            </DataTable>
        </div>
    );

    if (loading) {
        return <LoadingDisplay />;
    }

    if (error) {
        return <ErrorDisplay error={error} onRetry={fetchTerms} />;
    }

    return (
        <div>
            <div className="mb-6 mx-2">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newTerm}
                        onChange={(e) => setNewTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter new term..."
                        className="flex-1 px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                        onClick={() => handleAddTerm()}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                        Add Term
                    </button>
                </div>
            </div>
            <div className="flex -mx-2">
                <TermsTable type="fact" title="Facts" />
                <TermsTable type="rule" title="Rules" />
            </div>
        </div>
    );
} 