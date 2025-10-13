export class Breadcrumb {
    label: BreadcrumbLabel = new BreadcrumbLabel();
    url: string = '';
    params?: any;
}

export class BreadcrumbLabel {
    title: string = '';
    icon?: string;
}