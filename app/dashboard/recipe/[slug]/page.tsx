import { DrawerHeader } from '@/components/Sidebar';
import { getOneRecipe } from '@/lib/recipe';
import { IPrams } from '@/types/params.interface';
import RecipeDataDetailPage from './recipe-detail';

export default function RecipeDetailPage({ params, searchParams }: IPrams) {
    return (
        <div className=" pl-4">
            <DrawerHeader />
            <div className="px-3">
                <RecipeDataDetailPage params={+params.slug} />
            </div>
        </div>
    );
}
