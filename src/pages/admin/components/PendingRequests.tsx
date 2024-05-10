import { Button, Container, Flex, Paper, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import DataTable from '../../../shared/components/DataTable';
import Pagination from '../../../shared/components/Pagination';
import { IUserData } from '../utility/models/admin.model';
import {
  useGetUserListDataQuery
} from '../utility/services/admin.service';
import { ApprovedModal } from './ApprovedModal';
import { RejectedModal } from './RejectedModal';
import { pendingRequestTableDataColumns } from './TableDataColumns';

function PendingRequests() {
  const [selectedData, setSelectedData] = useState<{ [key: number]: any[] }>(
    {}
  );
  const [pendingUserList, setPendingUserList] = useState<IUserData[]>([]);
  const [ApprovedModalOpened, { open: openApprovedModal, close: closeApprovedModal }] = useDisclosure(false);
  const [RejectedModalopened, { open: openRejectedModal, close: closeRejectedModal }] = useDisclosure(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [isResponse, setIsResponse] = useState<boolean>(false)
  const pageSize = 10;
  console.log("Pending Requests");

  // for total number of selected user
  const adminSelectedData: any = Object.values(selectedData).flat();

  // get the pending userList
  const { data: res } = useGetUserListDataQuery({
    statusId: 1,
    pageNumber: currentPage,
    pageSize,
  });

  // for getting pendingUserList
  useEffect(() => {
    if (res) {
      setPendingUserList(res.data);
      setTotalCount(res.totalRecordCount);
      setIsResponse(true);
    }
  }, [res]);

  /**
   * Toggles selection of a row in the table
   * @param user
   */
  const handleRowClick = (user: any) => {
    const isSelected = selectedData[currentPage]?.find(
      (selectedUser) => selectedUser.emailId === user.emailId
    );
    if (isSelected) {
      setSelectedData((prevSelectedData) => ({
        ...prevSelectedData,
        [currentPage]: prevSelectedData[currentPage].filter(
          (selectedUser) => selectedUser.emailId !== user.emailId
        ),
      }));
    } else {
      setSelectedData((prevSelectedData) => ({
        ...prevSelectedData,
        [currentPage]: [...(prevSelectedData[currentPage] || []), user],
      }));
    }
  };

  // Handles the selection of rows on the current page.
  const handleSelectPageRows = () => {
    if (selectedData[currentPage]?.length === pendingUserList?.length) {
      setSelectedData((prevSelectedData) => {
        delete prevSelectedData[currentPage];
        return { ...prevSelectedData };
      });
    } else {
      // If not all rows on the current page are selected, select all rows on the current page
      setSelectedData((prevSelectedData) => ({
        ...prevSelectedData,
        [currentPage]: pendingUserList || [],
      }));
    }
  };

  return (
    <Container
      display="flex"
      size="var(--mantine-container-width)"
      pb={40}
      h="100%"
      style={{ overflow: 'hidden', flexDirection: 'column' }}
    >
      <Flex justify="space-between">
        <Title order={2} my={20}>
          Pending List
        </Title>
        {adminSelectedData.length > 0 && (
          <Flex align="center">
            <Button mx="10px" lts="3px" onClick={openApprovedModal}>
              APPROVE
            </Button>
            <Button lts="3px" variant="outline" onClick={openRejectedModal}>
              REJECT
            </Button>
          </Flex>
        )}
      </Flex>
      <Paper radius="md" withBorder shadow="md" style={{ overflow: 'auto' }}>
        {/* Display pending requests using table */}
        <DataTable
          columns={pendingRequestTableDataColumns}
          data={pendingUserList}
          page="pending"
          currentPage={currentPage}
          selectedData={selectedData}
          onSelectRow={handleRowClick}
          onSelectRows={handleSelectPageRows}
          isResponse={isResponse}
        />
        <Flex align="center" justify="center">
          {
            pendingUserList &&
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={pageSize}
              setCurrentPage={setCurrentPage}
            />
          }
        </Flex>
      </Paper>
      {/* rejected requests modal */}
      {RejectedModalopened && (
        <RejectedModal
          opened={RejectedModalopened}
          close={closeRejectedModal}
          adminSelectedData={adminSelectedData}
        />
      )}
      {/* approved requests modal */}
      {ApprovedModalOpened && (
        <ApprovedModal
          opened={ApprovedModalOpened}
          close={closeApprovedModal}
          adminSelectedData={adminSelectedData}
        />
      )}
    </Container>
  );
}

export default PendingRequests;
