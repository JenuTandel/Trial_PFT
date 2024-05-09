export interface IUserData {
  userId: 0;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: string;
  userStatusId: 0;
  isActive: true;
  roleId: 0;
  rejectionReason?: string;
  modifiedDate?: string;
}

export interface IRejectionModalForm {
  rejectionReason: string
}
