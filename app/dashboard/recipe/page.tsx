import { DrawerHeader } from '@/components/Sidebar';
import { IPrams } from '@/types/params.interface';
import BasicTable from './table';

export default function RecipeDetailPage() {
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    return (
        <div className=" pl-4">
            <DrawerHeader />
            <div className="px-3">
                <h1 className="text-black font-mono text-lg">recipe details</h1>
                {/* <button
                    onClick={handleOpen}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add
                </button> */}
            </div>
            <BasicTable />
        </div>
    );
}
