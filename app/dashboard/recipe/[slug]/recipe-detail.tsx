'use client';
import { DrawerHeader } from '@/components/Sidebar';
import { getOneRecipe } from '@/lib/recipe';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import ModalCustom from '@/components/ModalCustom';

export default function RecipeDataDetailPage({ params }: { params: number }) {
    const [data, setData] = React.useState<any[]>([]);

    React.useEffect(() => {
        (async () => {
            const res = await getOneRecipe(params);
            setData(res?.step);
        })();
    }, [params]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className=" pl-4">
            <DrawerHeader />
            <div className="px-3">
                <div className="flex justify-between">
                    <h1 className="text-black font-mono text-lg">
                        recipe details
                    </h1>
                    <button
                        onClick={handleOpen}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add
                    </button>
                    <ModalCustom
                        open={open}
                        handleClose={handleClose}
                        params={params}
                    />
                </div>
                <TableContainer component={Paper} className="font-mono">
                    <Table sx={{ minWidth: 800 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>stepId</TableCell>
                                <TableCell align="right">description</TableCell>
                                <TableCell align="right">image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.length > 0 &&
                                data?.map((row) => (
                                    <TableRow
                                        key={row?.stepRecipes?.stepId}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell
                                            className="text-black"
                                            component="th"
                                            scope="row"
                                        >
                                            {row?.stepRecipes?.stepId}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.stepRecipes?.description}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            className="relative"
                                        >
                                            <Image
                                                src={`http://localhost:3001/api/step-recipe/get-image/${row?.stepRecipes?.image}`}
                                                alt=""
                                                width={50}
                                                height={50}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
