import { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { AxiosError } from 'axios';
import { FaCheck, FaPencilAlt, FaTrash, FaTimes, FaPlus } from 'react-icons/fa';
import { DataTable } from '../commons/DataTable';
import { ErrorDisplay } from '../commons/ErrorDisplay';
import { LoadingDisplay } from '../commons/LoadingDisplay';
import { showToast } from '../../utils/toast';
import { SectionHeader } from '../commons/SectionHeader';

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
    const cursorPositionRef = useRef<number | null>(null);

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

    const formatTerm = (term: string) => {
        const maxLineLength = 80; // Set your desired max line length
        if (term.length <= maxLineLength) return term;

        const regex = new RegExp(`(.{1,${maxLineLength}})(\\s|$)`, 'g');
        return term.match(regex)?.join('\n') || term;
    };

    const columns = [
        { key: 'term', header: 'Term' },
        { key: 'actions', header: 'Actions', width: 'w-24' }
    ];

    const handleTermEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cursorPosition = e.target.selectionStart;
        cursorPositionRef.current = cursorPosition;
        setEditingValue(e.target.value);
    };

    useEffect(() => {
        if (cursorPositionRef.current !== null) {
            const input = document.querySelector('input[type="text"][value="' + editingValue + '"]');
            if (input) {
                (input as HTMLInputElement).setSelectionRange(
                    cursorPositionRef.current,
                    cursorPositionRef.current
                );
            }
        }
    }, [editingValue]);

    const TermsTable = ({ type, title }: { type: 'fact' | 'rule'; title: string }) => (
        <div className="w-1/2 px-2">
            <SectionHeader
                title={title}
                description={type === 'fact' ? 'Basic knowledge statements' : 'Logical inference definitions'}
            />
            
            <div className="mt-4 bg-gray-900/50 rounded-lg border border-gray-800/50 overflow-hidden">
                <DataTable columns={columns}>
                    {terms.filter(term => term.type === type).map(term => (
                        <tr key={term._id} 
                            className="border-b border-gray-800/50 bg-gray-900/20 
                                hover:bg-gray-800/40 transition-colors duration-150">
                            <td className="px-4 py-2.5 whitespace-pre-wrap text-sm text-gray-300 w-full">
                                {editingId === term._id ? (
                                    <input
                                        type="text"
                                        value={editingValue}
                                        onChange={handleTermEdit}
                                        className="w-full px-3 py-1.5 bg-gray-800 border border-purple-500/50 
                                            rounded-md text-gray-200 focus:outline-none focus:ring-2 
                                            focus:ring-purple-500/40 focus:border-purple-500
                                            placeholder-gray-500"
                                        autoFocus
                                    />
                                ) : (
                                    <code className="block w-full font-mono text-gray-300 px-2 py-0.5">
                                        {formatTerm(term.term)}
                                    </code>
                                )}
                            </td>
                            <td className="px-4 py-2.5 whitespace-nowrap text-sm w-20">
                                <div className="flex items-center space-x-1.5">
                                    {editingId === term._id ? (
                                        <>
                                            <button
                                                onClick={() => handleEdit(term)}
                                                className="p-1.5 text-green-400 hover:text-green-300 
                                                    hover:bg-green-500/10 rounded-md transition-all"
                                                title="Save"
                                            >
                                                <FaCheck className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleCancel(term)}
                                                className="p-1.5 text-gray-400 hover:text-gray-300 
                                                    hover:bg-gray-500/10 rounded-md transition-all"
                                                title="Cancel"
                                            >
                                                <FaTimes className="w-3.5 h-3.5" />
                                            </button>
                                        </>
                                    ) : deletingId === term._id ? (
                                        <>
                                            <button
                                                onClick={() => handleDelete(term)}
                                                className="p-1.5 text-red-400 hover:text-red-300 
                                                    hover:bg-red-500/10 rounded-md transition-all"
                                                title="Confirm delete"
                                            >
                                                <FaCheck className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleCancel(term)}
                                                className="p-1.5 text-gray-400 hover:text-gray-300 
                                                    hover:bg-gray-500/10 rounded-md transition-all"
                                                title="Cancel"
                                            >
                                                <FaTimes className="w-3.5 h-3.5" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleEdit(term)}
                                                className="p-1.5 text-gray-400 hover:text-purple-400 
                                                    hover:bg-purple-500/10 rounded-md transition-all"
                                                title="Edit"
                                            >
                                                <FaPencilAlt className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(term)}
                                                className="p-1.5 text-gray-400 hover:text-red-400 
                                                    hover:bg-red-500/10 rounded-md transition-all"
                                                title="Delete"
                                            >
                                                <FaTrash className="w-3.5 h-3.5" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </DataTable>
            </div>
        </div>
    );

    if (loading) {
        return <LoadingDisplay />;
    }

    if (error) {
        return <ErrorDisplay error={error} onRetry={fetchTerms} />;
    }

    return (
        <div className="space-y-4">
            <div className="px-2">
                <div className="bg-gray-900/50 rounded-lg border border-gray-800/50 p-4">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={newTerm}
                            onChange={(e) => setNewTerm(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter new Prolog term..."
                            className="flex-1 px-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-lg
                                text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 
                                focus:ring-purple-500/40 focus:border-purple-500/40 font-mono"
                        />
                        <button
                            onClick={() => handleAddTerm()}
                            className="px-4 py-2.5 bg-purple-500/20 border border-purple-500/30 
                                text-purple-400 rounded-lg hover:bg-purple-500/30 
                                focus:outline-none focus:ring-2 focus:ring-purple-500/40 
                                transition-all duration-200 flex items-center gap-2
                                disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!newTerm.trim()}
                        >
                            <FaPlus className="w-3.5 h-3.5" />
                            <span>Add Term</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex">
                <TermsTable type="fact" title="Facts" />
                <TermsTable type="rule" title="Rules" />
            </div>
        </div>
    );
} 