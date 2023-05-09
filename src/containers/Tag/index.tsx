import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useTag from '@/hooks/useTag';
// import axios from '../../config/axios';
// import { useQuery } from '@tanstack/react-query';

interface Column {
  id: 'tag_name';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'tag_name', label: 'Tag Name', minWidth: 170 },
  //   {
  //     id: 'description',
  //     label: 'Description',
  //     minWidth: 150,
  //   },
];

interface Tag {
  tagId: string;
  tagName: string;
}

const Tag = () => {
  const { isSuccess, data /*, isLoading, isError */ } = useTag();

  if (isSuccess) {
    const TagDetail = data?.data.data.data;
    return (
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Tag Details</TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {TagDetail?.map((tag: Tag) => {
                return (
                  <TableRow hover role="checkbox" key={tag.tagId}>
                    <TableCell sx={{ minWidth: 170 }}>{tag?.tagName}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
};

export default Tag;
