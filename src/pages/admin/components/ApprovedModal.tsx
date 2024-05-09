import { Flex, Modal, Text, Image, Group, Button } from '@mantine/core';
import greenTickImage from './../../../assets/images/green-tick.svg';
import { usePostApproveRejectUserListMutation } from '../utility/services/admin.service';

interface IProps {
    opened: boolean;
    close: () => void;
    adminSelectedData: any;
}
export const ApprovedModal = ({ close, opened, adminSelectedData }: IProps) => {
    const [approveUserList] = usePostApproveRejectUserListMutation();

    // Approves a list of users by updating their status
    const handleApproveUserList = async () => {
        close();
        await approveUserList(
            adminSelectedData.map((data: any) => ({
                userId: data.userId,
                userStatusId: 2,
                emailId: data.emailId,
            }))
        );
    };
    return (
        <>
            {/* start: modal */}
            <Modal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                centered
                radius="md"
                size="sm"
                overlayProps={{
                    backgroundOpacity: 0.5,
                    blur: 3,
                }}
            >
                <Flex align="center" justify="center" direction="column" p="24px">
                    <Image src={greenTickImage} h={100} w={100}></Image>
                    <Text
                        ta="center"
                        mt="xs"
                        mb="lg"
                        lh="normal"
                        style={{ fontSize: '22px', fontWeight: '600' }}
                    >
                        Are you sure you want to approve the user?
                    </Text>
                    {/* start: button group */}
                    <Group mt="lg" gap="md" grow w="100%">
                        <Button
                            radius="sm"
                            fw={500}
                            lts={2}
                            size="md"
                            onClick={handleApproveUserList}
                        >
                            APPROVE
                        </Button>
                        <Button
                            variant="outline"
                            radius="sm"
                            fw={500}
                            lts={2}
                            size="md"
                            onClick={close}
                        >
                            CANCEL
                        </Button>
                    </Group>
                    {/* end: button group */}
                </Flex>
            </Modal>
            {/* end: modal */}
        </>
    )
}
