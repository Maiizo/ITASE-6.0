import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Head, useForm } from '@inertiajs/react';
import { forum } from '@/routes'; // <-- Correct Import
import { Topic, Post } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { FormEvent } from 'react';

interface Props {
    topic: Topic & {
        user: { name: string };
        posts: (Post & { user: { name: string } })[];
    };
}

export default function ShowTopic({ topic }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        content: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(forum.posts.store(topic.slug).url, { // <-- Correct use
            onSuccess: () => setData('content', ''),
        });
    };

    return (
        <AppLayout>
            <Head title={topic.title} />
            <Heading title={topic.title} />

            <div className="mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{topic.user.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-line">{topic.posts[0]?.content}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                {topic.posts.slice(1).map((post: Post) => (
                    <Card key={post.id}>
                        <CardHeader>
                            <CardTitle>{post.user.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-line">{post.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <form onSubmit={submit} className="mt-8 space-y-4">
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Write a new post</label>
                    <Textarea
                        id="content"
                        name="content"
                        value={data.content}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('content', e.target.value)}
                    />
                    <InputError message={errors.content} className="mt-2" />
                </div>
                <div className="flex items-center justify-end">
                    <Button type="submit" disabled={processing}>
                        Post
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}