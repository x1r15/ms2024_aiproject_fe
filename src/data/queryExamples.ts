import { QueryExampleGroup } from '../types/query';

export const PROLOG_QUERY_EXAMPLES: QueryExampleGroup[] = [
    {
        title: "Query Examples",
        examples: [
            {
                code: "feature(Feature)",
                description: "Lists all available game features"
            },
            {
                code: "genre_features(rpg, Features)",
                description: "Retrieves features associated with a specific genre"
            },
            {
                code: "similarity_percentage([combat, magic], Genre, Percentage)",
                description: "Calculates genre similarity based on feature set"
            }
        ]
    }
]; 