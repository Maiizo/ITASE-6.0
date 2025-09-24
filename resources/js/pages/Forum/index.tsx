import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Head, Link } from '@inertiajs/react';
import { Topic } from '@/types';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { forum } from '@/routes'; // <-- Correct Import

interface Props {
    topics: Topic[];
}

export default function ForumIndex({ topics }: Props) {
    return (
        <AppLayout>
            <Head title="Forum" />
            <Heading title="Forum" />

            <div className="flex justify-end mb-4">
                <Link href={forum.create().url}>
                    <Button>Create New Topic</Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {topics.map((topic: Topic) => (
                    <Card key={topic.id}>
                        <CardHeader>
                            <CardTitle>
                                <Link href={forum.show(topic.slug).url}>
                                    {topic.title}
                                </Link>
                            </CardTitle>
                            <CardDescription>
                                Created by {topic.user.name} on {new Date(topic.created_at).toLocaleDateString()}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}