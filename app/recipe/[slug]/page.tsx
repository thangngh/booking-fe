import { IPrams } from '@/types/params.interface';

export default function RecipeDetailPage({ params, searchParams }: IPrams) {
    console.log(params, searchParams);
    return (
        <div>
            <h1>recipe details</h1>
        </div>
    );
}
