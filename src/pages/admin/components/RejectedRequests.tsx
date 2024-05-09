import { Container, Flex, Paper, Title } from '@mantine/core';
import DataTable from '../../../shared/components/DataTable';
import { useGetUserListDataQuery } from '../utility/services/admin.service';
import { useEffect, useState } from 'react';
import Pagination from '../../../shared/components/Pagination';
import { IUserData } from '../utility/models/admin.model';
import { rejectedRequestTableDataColumns } from './TableDataColumns';


function RejectedRequests() {
  const [rejectedUserList, setRejectedUserList] = useState<IUserData[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [isResponse, setIsResponse] = useState<boolean>(false)
  const pageSize = 10;

  // get the rejected userList
  const { data: res } = useGetUserListDataQuery({
    statusId: 3,
    pageNumber: currentPage,
    pageSize
  })

  useEffect(() => {
    if (res) {
      setRejectedUserList(res.data)
      setTotalCount(res.totalRecordCount)
      setIsResponse(true)
    }
  }, [res])

  return (
    <Container
      display="flex"
      size="var(--mantine-container-width)"
      pb={40}
      h="100%"
      style={{ overflow: 'hidden', flexDirection: 'column' }}
    >
      <Title order={2} my={20}>
        Rejected Requests
      </Title>
      <Paper radius="md" withBorder shadow="md" style={{ overflow: 'auto' }}>
        {/* Display rejected requests using table */}
        <DataTable
          columns={rejectedRequestTableDataColumns}
          data={rejectedUserList}
          page="rejected"
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

export default RejectedRequests;
