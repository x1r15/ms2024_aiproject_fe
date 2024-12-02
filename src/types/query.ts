export interface QueryExample {
    code: string;
    description: string;
    category?: string;
}

export interface QueryExampleGroup {
    title: string;
    examples: QueryExample[];
} 