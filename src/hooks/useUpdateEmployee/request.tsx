import axios from '@/config/axios';
interface UpdateEmployee {
  name: string;
  designation: string;
  phone: string;
}
export const updateEmployee = async (body: UpdateEmployee) => {
  const data = await axios.patch(`/employees/update`, body);
  return data;
};
