import { Button } from '@/components/ui/button'
import AppLayout from '@/layouts/app-layout';
import { create } from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export default function index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div>
                <Link href={create.url()}><Button>Create a Product</Button></Link>
                {/* <Link href={route('products.create')}><Button>Create a Product</Button></Link> */}
            </div>
        </AppLayout>
    );
}
