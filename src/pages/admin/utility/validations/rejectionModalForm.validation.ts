import * as yup from "yup";
import { rejectionModalFormValidationMessages } from "../constants/admin.constant";

export const rejectionModalFormValidationSchema = yup.object({
    rejectionReason: yup.string().min(2, rejectionModalFormValidationMessages.rejectionReasonMinMax)
        .max(30, rejectionModalFormValidationMessages.rejectionReasonMinMax)
        .required(rejectionModalFormValidationMessages.required),
})