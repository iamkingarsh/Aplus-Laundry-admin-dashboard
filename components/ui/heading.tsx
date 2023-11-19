
import { cn } from '@/lib/utils';
import React from 'react';

type HeadingProps = {
    title: string;
    className?: string;
};

const Heading: React.FC<HeadingProps> = ({ title, className }) => {
    return <h1 className={cn(' font-bold text-2xl  tracking-tight', className)}>{title}</h1>;
};

export default Heading;
