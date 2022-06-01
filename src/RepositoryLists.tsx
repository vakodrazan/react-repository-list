import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


import LoadingButton from '@mui/lab/LoadingButton';

import { useQuery } from 'graphql-hooks';
import { Search } from '@mui/icons-material';

type data = {
  nameWithOwner: string;
  description?: string;
  forkCount: number;
  stargazerCount: number;
  id: string;
};

const REPOSITORIES_QUERY = `query Repository($limit: Int, $searchTerm: String!) {
  search(query:$searchTerm, type:REPOSITORY, first:$limit ){
    repositoryCount,
		nodes {
			... on Repository{
				description,
				nameWithOwner,
				forkCount,
				stargazerCount,
				id
			}
		}
  }
}
`;

const DefaultSearchTerm = 'react';
const Limit = 10

export default function RepositoryLists() {
  const [searchTerm, setSearchTerm] = useState(DefaultSearchTerm);

  const { loading, error, data, refetch } = useQuery(REPOSITORIES_QUERY, {
    variables: {
      limit: Limit,
      searchTerm: DefaultSearchTerm,
    },
  });

  const handleSearch = () => {
    refetch({
      variables: {
        limit: Limit,
        searchTerm,
      },
    });
  };

  return (
    <>
    <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: "space-between",
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
      <TextField
        id='repository'
        label='Repository name'
        variant='outlined'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <LoadingButton
        loading={loading}
        loadingPosition='start'
        startIcon={<Search />}
        variant='outlined'
        onClick={handleSearch}
      >
        Search
      </LoadingButton>
      </Box>
      {error && <div>{JSON.stringify(error)}</div>}
      <div>
        {loading ? (
          <div>
            Loading...
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Stars</TableCell>
                  <TableCell>Forks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.search?.nodes?.map((node: data) => (
                  <TableRow
                    key={node.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {node.nameWithOwner}
                    </TableCell>
                    <TableCell>{node.stargazerCount}</TableCell>
                    <TableCell>{node.forkCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
}
