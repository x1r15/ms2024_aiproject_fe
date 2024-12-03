import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { AxiosError } from 'axios';
import { showToast } from '../../utils/toast';
import { Tabs } from '../commons/Tab';
import { GenreResultCard } from './query/GenreResultCard';
import { QueryExamplesSection } from './query/QueryExamplesSection';
import { AnalysisInfoSection } from './query/AnalysisInfoSection';
import { FeaturesChecklist } from './query/FeaturesChecklist';
import { SectionHeader } from '../commons/SectionHeader';
import { AdvancedQueryForm } from './query/AdvancedQueryForm';
import { commonStyles } from '../../styles/commonStyles';

interface Feature {
    Feature: string;
}

interface FeaturesResponse {
    success: boolean;
    result: Feature[];
}

interface ParsedResult {
    genre: string;
    matchedFeatures: string[];
    missingFeatures: string[];
    similarity: number;
}

const AdvancedQuery = ({ 
    query, 
    setQuery, 
    handleQuery, 
    querying, 
    answer 
}: {
    query: string;
    setQuery: (query: string) => void;
    handleQuery: () => void;
    querying: boolean;
    answer: string;
}) => (
    <div className={commonStyles.queryContainer}>
        <SectionHeader
            title="Advanced Mode"
            description="Write custom Prolog queries to explore game genres and features"
        />

        <div className={commonStyles.queryGrid}>
            <div className="col-span-2 space-y-4">
                <AdvancedQueryForm
                    query={query}
                    setQuery={setQuery}
                    handleQuery={handleQuery}
                    querying={querying}
                    answer={answer}
                />
            </div>

            <div className="space-y-4">
                <QueryExamplesSection />
            </div>
        </div>
    </div>
);

export function QueryInterface() {
    const [query, setQuery] = useState('');
    const [answer, setAnswer] = useState('');
    const [querying, setQuerying] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');
    const [features, setFeatures] = useState<Feature[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [loadingFeatures, setLoadingFeatures] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [parsedResults, setParsedResults] = useState<ParsedResult[]>([]);

    useEffect(() => {
        fetchFeatures();
    }, []);

    const fetchFeatures = async () => {
        try {
            setLoadingFeatures(true);
            const response = await api.post<FeaturesResponse>('/query', {
                query: 'feature(Feature)'
            });
            setFeatures(response.data.result);
        } catch (err) {
            const error = err as AxiosError;
            showToast.error('Failed to fetch features');
        } finally {
            setLoadingFeatures(false);
        }
    };

    const formatFeatureName = (feature: string): string => {
        return feature
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleFeatureToggle = (feature: string) => {
        setSelectedFeatures(prev => {
            if (prev.includes(feature)) {
                return prev.filter(f => f !== feature);
            }
            return [...prev, feature];
        });
    };

    const handleQuery = async () => {
        if (!query.trim()) return;
        
        try {
            setQuerying(true);
            const response = await api.post('/query', { query });
            setAnswer(JSON.stringify(response.data, null, 2));
        } catch (err) {
            const error = err as AxiosError;
            setAnswer('');
            showToast.error('Failed to execute query');
        } finally {
            setQuerying(false);
        }
    };

    const parseResults = (matched: any, missing: any, similarity: any): ParsedResult[] => {
        const results: ParsedResult[] = [];
        
        matched.result.forEach((genreResult: any) => {
            const genre = genreResult.Genre;
            const matchedFeatures: string[] = [];
            
            if (genreResult.MatchedFeatures && genreResult.MatchedFeatures !== '[]') {
                let current = genreResult.MatchedFeatures;
                while (current && current.head) {
                    matchedFeatures.push(current.head);
                    current = current.tail;
                }
            }

            const missingData = missing.result.find((m: any) => m.Genre === genre);
            const missingFeatures: string[] = [];
            if (missingData && missingData.MissingFeatures) {
                let current = missingData.MissingFeatures;
                while (current && current.head) {
                    missingFeatures.push(current.head);
                    current = current.tail;
                }
            }

            const similarityData = similarity.result.find((s: any) => s.Genre === genre);
            const similarityPercentage = similarityData ? similarityData.Percentage : 0;

            results.push({
                genre,
                matchedFeatures,
                missingFeatures,
                similarity: similarityPercentage
            });
        });

        return results.sort((a, b) => b.similarity - a.similarity);
    };

    const scrollToResults = () => {
        document.getElementById('results-section')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };

    const handleCheck = async () => {
        if (selectedFeatures.length === 0) {
            showToast.error('Please select at least one feature');
            return;
        }

        setIsChecking(true);
        try {
            const featureList = `[${selectedFeatures.map(f => f).join(', ')}]`;
            
            const [matchedResponse, missingResponse, similarityResponse] = await Promise.all([
                api.post<QueryResult>('/query', {
                    query: `matched_features(${featureList}, Genre, MatchedFeatures)`
                }),
                api.post<QueryResult>('/query', {
                    query: `missing_features(${featureList}, Genre, MissingFeatures)`
                }),
                api.post<QueryResult>('/query', {
                    query: `similarity_percentage(${featureList}, Genre, Percentage)`
                })
            ]);

            const results = parseResults(
                matchedResponse.data,
                missingResponse.data,
                similarityResponse.data
            );
            setParsedResults(results);
            setTimeout(() => scrollToResults(), 100);
        } catch (err) {
            const error = err as AxiosError;
            showToast.error('Failed to check features');
        } finally {
            setIsChecking(false);
        }
    };

    const BasicQuery = () => (
        <div className="space-y-6 mt-4">
            <SectionHeader
                title="Basic Mode"
                description="Select game features to find matching genres and get recommendations"
            />

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    <FeaturesChecklist
                        features={features}
                        selectedFeatures={selectedFeatures}
                        onFeatureToggle={handleFeatureToggle}
                        formatFeatureName={formatFeatureName}
                        isLoading={loadingFeatures}
                        onAnalyze={handleCheck}
                        isAnalyzing={isChecking}
                    />
                </div>

                <div className="space-y-4">
                    <AnalysisInfoSection />
                </div>
            </div>

            {parsedResults.length > 0 && (
                <div id="results-section" className="bg-gray-900/50 p-6 rounded-lg shadow-lg border border-gray-800/50">
                    <h3 className="text-lg font-medium text-gray-200 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Analysis Results
                    </h3>
                    <ResultsTable results={parsedResults} />
                </div>
            )}
        </div>
    );

    const ResultsTable = ({ results }: { results: ParsedResult[] }) => {
        const filteredResults = results.filter(result => result.similarity > 0);

        return (
            <div className="space-y-4">
                {filteredResults.length > 0 ? (
                    <>
                        <div className="space-y-4">
                            {filteredResults.map((result, index) => (
                                <GenreResultCard
                                    key={result.genre}
                                    genre={result.genre}
                                    similarity={result.similarity}
                                    matchedFeatures={result.matchedFeatures}
                                    missingFeatures={result.missingFeatures}
                                    isTopResult={index === 0}
                                    formatFeatureName={formatFeatureName}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className={commonStyles.noResults}>
                        <div className={commonStyles.noResultsText}>No matching genres found</div>
                    </div>
                )}
            </div>
        );
    };

    const tabs = [
        { id: 'basic', label: 'Basic' },
        { id: 'advanced', label: 'Advanced' }
    ];

    return (
        <div>
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            {activeTab === 'basic' ? <BasicQuery /> : <AdvancedQuery 
                query={query}
                setQuery={setQuery}
                handleQuery={handleQuery}
                querying={querying}
                answer={answer}
            />}
        </div>
    );
} 