// screens/note/validation.ts
import * as yup from 'yup';

export const validationSchema = () => {
  return yup.object().shape({
    date: yup.string().required('Vui lòng chọn ngày'),
    title: yup.string().required('Vui lòng nhập tiêu đề'),
    content: yup.string().required('Vui lòng nhập nội dung'),
  });
};