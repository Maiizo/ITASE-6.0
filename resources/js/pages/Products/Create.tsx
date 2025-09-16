import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Textarea } from '@/components/ui/textarea'
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';


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
    })
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Product" />
            <div className='m-4'>
                <form className='w-8/12 p-4'>
                    <div className='gap-1.5'>
                        <Label htmlFor='product name'>Name</Label>
                        <input placeholder='Product Name' value={data.name}></input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor='product price'>Price</Label>
                        <input placeholder='Price'></input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor='product description'>Description</Label>
                        <Textarea placeholder='Description'/>
                    </div>
                    <Button type='submit'>Add Product</Button>
                </form>
            </div>
        </AppLayout>
    );
}
