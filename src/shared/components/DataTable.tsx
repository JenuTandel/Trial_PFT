import { Checkbox, Flex, Switch, Table, Text } from '@mantine/core';
import { formatDate } from '../../pages/admin/utility/functions/formatDate';
import { IUserData } from '../../pages/admin/utility/models/admin.model';
import { IColumn } from '../utility/models/shared.model';

interface IProps {
  data: IUserData[];
  columns: IColumn[];
  page: string;
  currentPage?: number;
  selectedData?: any;
  onSelectRow?: any;
  onSelectRows?: any;
  isResponse: boolean
}
const DataTable = ({
  data,
  columns,
  page,
  currentPage,
  selectedData,
  onSelectRow,
  onSelectRows,
  isResponse
}: IProps) => {
  return (
    // Start: Table
    <Table verticalSpacing="sm" horizontalSpacing="lg" miw={300} stickyHeader >
      {/* Start: Table header */}
      <Table.Thead bg="white">
        <Table.Tr>
          {/* Display checkbox on pending requests page */}
          {page === 'pending' && currentPage && (
            <Table.Th style={{ borderBottom: '3px solid #eeeff0' }} w={60}>
              <Checkbox
                name="select-all"
                aria-label="Select all rows on this page"
                checked={selectedData[currentPage]?.length === data?.length}
                onChange={onSelectRows}
              />
            </Table.Th>
          )}
          {columns && columns.map((column) => (
            <Table.Th
              key={column.key}
              py={20}
              fw={700}
              style={{ borderBottom: '3px solid #eeeff0', textWrap: 'nowrap' }}
              tt="uppercase"
            >
              {column.label}
            </Table.Th>
          ))}
          {/* Display switch on approved requests page */}
          {page == 'approval' && (
            <Table.Th tt="uppercase" ta="center">
              Account Status
            </Table.Th>
          )}
        </Table.Tr>
      </Table.Thead>
      {/* End: Table header */}
      {/* Start: Table body */}
      <Table.Tbody >
        {(isResponse && data) ?
          data.length > 0 && data.map((row: any) => (
            <Table.Tr
              key={row.emailId}
            >
              {page === 'pending' && currentPage && (
                <>
                  <Table.Td c="var(--mantine-color-secondary)" py={18}>
                    <Checkbox
                      name={`table-${row.emailId}`}
                      aria-label="Select row"
                      checked={
                        selectedData[currentPage]?.find(
                          (selectedUser: any) => selectedUser.emailId === row.emailId
                        )
                          ? true
                          : false
                      }
                      onClick={() => onSelectRow(row)}
                      onChange={() => null}
                    />
                  </Table.Td>
                </>
              )}
              {columns && columns.map((column) => (
                <Table.Td
                  key={column.key}
                  c="var(--mantine-color-secondary)"
                  py={18}
                >
                  <Text component='p' size="md">{renderCell(row, column)}</Text>
                </Table.Td>
              ))}

              {page == 'approval' && (
                <Table.Td c="var(--mantine-color-secondary)" py={18}>
                  <Flex justify="center">
                    <Switch color="green" />
                  </Flex>
                </Table.Td>
              )}
            </Table.Tr>
          ))
          : ''}
        {!data?.length && (
          <Table.Tr>
            <Table.Td colSpan={columns.length + 1} ta='center' fz='md'>No Data Found</Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
      {/* End: Table body */}
    </Table>
    // End: Table
  );
};

/**
 *
 * @param row - data object
 * @param column - column labels
 * @returns cell data to be displayed
 */
function renderCell(row: any, column: IColumn) {
  const value = row[column.key as keyof IUserData];

  if (column.key === 'phoneNumber' && !value) {
    return (
      <Text component='span' style={{ paddingLeft: "30px" }}>-</Text>
    )
  }
  if (column.key === 'lastName' && !value) {
    return (
      <Text component='span'>-</Text>
    )
  }
  if (column.key === 'modifiedDate' && value) {
    return formatDate(value);
  }
  return value;
}

export default DataTable;
