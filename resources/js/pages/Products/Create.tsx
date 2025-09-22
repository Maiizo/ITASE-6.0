import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Textarea } from '@/components/ui/textarea'
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { store } from '@/routes/products';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New Product',
        href: '/products/create',
    },
];

export default function Index() {

    const {data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url());
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Product" />
            <div className='m-4'>
                <form onSubmit={handleSubmit} className='w-8/12 p-4 space-y-4'>
                {/* Display error */}
                {Object.keys(errors).length > 0 && (
                    <Alert>
                        <Terminal className='h-4 w-4' />
                        <AlertTitle>Heads Up!</AlertTitle>
                        <AlertDescription>
                            You can add components and dependencies to your app using cli.
                        </AlertDescription>
                    </Alert>
                )}
                    <div className='space-y-2'>
                        <Label htmlFor='name'>Name</Label>
                        <input 
                            id='name'
                            type='text'
                            placeholder='Product Name' 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='price'>Price</Label>
                        <input 
                            id='price'
                            type='number'
                            step='0.01'
                            placeholder='Price' 
                            value={data.price} 
                            onChange={(e) => setData('price', e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        {errors.price && <p className='text-red-500 text-sm'>{errors.price}</p>}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='description'>Description</Label>
                        <Textarea 
                            id='description'
                            placeholder='Description' 
                            value={data.description} 
                            onChange={(e) => setData('description', e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        {errors.description && <p className='text-red-500 text-sm'>{errors.description}</p>}
                    </div>
                    <Button type='submit' disabled={processing}>
                        {processing ? 'Creating...' : 'Add Product'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
