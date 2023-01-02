export type News = {
    id: number;
    slug: string;
    title: string;
    description: string;
    content: string;
    category: Category;
    thumbnail: string | File;
    created_at: string;
    updated_at?: string;
};

export type ResponseOneNews = {
    statusCode: number;
    message: string;
    news: News;
};