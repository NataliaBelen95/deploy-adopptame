import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './Pagination.css';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
}

const PaginationControlled: React.FC<Props> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    onPageChange(value);
  };

  

  return (
    <>
      {totalItems > 0 ? (
        <Stack spacing={2}>
          <Pagination className='paginado' count={totalPages} page={currentPage} onChange={handleChange} />
        </Stack>
      ) : (
        <Typography>No items found.</Typography>
      )}
    </>
  );

}

export default PaginationControlled;
