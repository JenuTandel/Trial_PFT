import { Container, Flex, Paper, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import DataTable from '../../../shared/components/DataTable';
import Pagination from '../../../shared/components/Pagination';
import { IUserData } from '../utility/models/admin.model';
import { useGetUserListDataQuery } from '../utility/services/admin.service';
import { approvedRequestTableDataColumns } from './TableDataColumns';

function ApprovedRequests() {
  const [approvedUserList, setApprovedUserList] = useState<IUserData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [isResponse, setIsResponse] = useState<boolean>(false)
  const pageSize = 10;

  console.log("Approved Requests");


  // get the approved userList
  const { data: res } = useGetUserListDataQuery({
    statusId: 2,
    pageNumber: currentPage,
    pageSize,
  });

  useEffect(() => {
    if (res) {
      setApprovedUserList(res.data);
      setTotalCount(res.totalRecordCount);
      setIsResponse(true);
    }
  }, [res]);

  return (
    <Container
      display="flex"
      size="var(--mantine-container-width)"
      pb={40}
      h="100%"
      style={{ overflow: 'hidden', flexDirection: 'column' }}
    >
      <Title order={2} my={20}>
        Approved Requests
      </Title>
      <Paper radius="md" withBorder shadow="md" style={{ overflow: 'auto' }}>
        {/* Display approved requests using table */}
        <DataTable
          columns={approvedRequestTableDataColumns}
          data={approvedUserList}
          page="approval"
          isResponse={isResponse}
        />
        <Flex align="center" justify="center">
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
          />
        </Flex>
      </Paper>
    </Container>
  );
}

export default ApprovedRequests;
