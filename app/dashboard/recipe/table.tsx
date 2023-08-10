'use client';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSession } from 'next-auth/react';
import { ISession } from '@/lib/auth';
import { getRecipe } from '@/lib/recipe';
import Link from 'next/link';

interface ITable {
    recipe: {
        id: string;
        name: string;
        description: string;
        ingredient: string;
        createdAt: string;
    };
}

export default function BasicTable() {
    const session = useSession();
    const token = (session.data?.user as ISession)?.accessToken as string;
    const [data, setData] = React.useState<ITable[]>([]);

    React.useEffect(() => {
        (async () => {
            const res = await getRecipe(token);
            setData(res.userRecipes);
        })();
    }, [token]);

    return (
        <TableContainer component={Paper} className="font-mono">
            <Table sx={{ minWidth: 800 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell align="right">name</TableCell>
                        <TableCell align="right">description</TableCell>
                        <TableCell align="right">ingredient</TableCell>
                        <TableCell align="right">createdAt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.length > 0 &&
                        data?.map((row) => (
                            <TableRow
                                key={row.recipe.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    className="text-black"
                                    component="th"
                                    scope="row"
                                >
                                    <Link
                                        href={`/dashboard/recipe/${row.recipe.id}`}
                                    >
                                        <span>{row.recipe.id}</span>
                                    </Link>
                                    {row.recipe.id}
                                </TableCell>
                                <TableCell
                                    className="text-black"
                                    component="th"
                                    scope="row"
                                >
                                    {row.recipe.name}
                                </TableCell>
                                <TableCell align="right">
                                    {row.recipe.description}
                                </TableCell>
                                <TableCell align="right">
                                    {row.recipe.ingredient}
                                </TableCell>
                                <TableCell align="right">
                                    {row.recipe.createdAt}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
