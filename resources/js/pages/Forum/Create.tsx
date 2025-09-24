import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Head, useForm } from '@inertiajs/react';
import { forum } from '@/routes'; // <-- Correct Import
import { FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

export default function CreateTopic() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(forum.store().url); // <-- Correct use
    };

    return (
        <AppLayout>
            <Head title="Create Topic" />
            <Heading title="Create New Topic" />

            <form onSubmit={submit} className="max-w-xl mx-auto space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Topic Title</label>
                    <Input
                        id="title"
                        type="text"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full"
                        autoFocus
                        onChange={(e) => setData('title', e.target.value)}
                    />
                    <InputError message={errors.title} className="mt-2" />
                </div>
                <div className="flex items-center justify-end">
                    <Button type="submit" disabled={processing}>
                        Create Topic
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}