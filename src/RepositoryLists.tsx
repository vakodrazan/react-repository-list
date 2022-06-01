import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import { useQuery } from 'graphql-hooks';

type data = {
  nameWithOwner: string;
  description?: string;
  forkCount: number;
  stargazerCount: number;
  id: string;
};

const REPOSITORIES_QUERY = `query Repository($limit: Int) {
  search(query:"react", type:REPOSITORY, first:$limit ){
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

export default function RepositoryLists() {
  const { loading, error, data } = useQuery(REPOSITORIES_QUERY, {
    variables: {
      limit: 10,
      searchTerm: 'react',
    },
  });

  return (
    <>
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
