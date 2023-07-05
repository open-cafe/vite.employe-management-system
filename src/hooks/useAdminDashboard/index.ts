import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchEmployeeApplyLeaveToday,
  fetchEmployeeCount,
  fetchEmployeeOnLeaveToday,
  fetchProjectByStatus,
} from './request';

const useAdminDashboard = () => {
  const {
    isSuccess: projectBystatusSuccess,
    data: projectBystatusData,
    isLoading: projectBystatusLoading,
    isError: projectBystatusError,
  } = useQuery({
    queryKey: ['allprojectbystatus'],
    queryFn: () => fetchProjectByStatus(),
    enabled: true,
  });

  const {
    isSuccess: employeeOnLeaveTodaySuccess,
    data: employeeOnLeaveTodayData,
    isLoading: employeeOnLeaveTodayLoading,
    isError: employeeOnLeaveTodayError,
  } = useQuery({
    queryKey: ['employeeOnLeaveToday'],
    queryFn: () => fetchEmployeeOnLeaveToday(),
    enabled: true,
  });
  const {
    isSuccess: employeeApplyLeaveTodaySuccess,
    data: employeeApplyLeaveTodayData,
    isLoading: employeeApplyLeaveTodayLoading,
    isError: employeeApplyLeaveTodayError,
  } = useQuery({
    queryKey: ['employeeApplyLeaveToday'],
    queryFn: () => fetchEmployeeApplyLeaveToday(),
    enabled: true,
  });

  const {
    isSuccess: employeeCountSuccess,
    data: employeeCountData,
    isLoading: employeeCountLoading,
    isError: employeeCountError,
  } = useQuery({
    queryKey: ['employeeCount'],
    queryFn: () => fetchEmployeeCount(),
    enabled: true,
  });

  return {
    projectBystatusSuccess,
    projectBystatusData,
    projectBystatusLoading,
    projectBystatusError,
    employeeOnLeaveTodaySuccess,
    employeeOnLeaveTodayData,
    employeeOnLeaveTodayLoading,
    employeeOnLeaveTodayError,
    employeeApplyLeaveTodaySuccess,
    employeeApplyLeaveTodayData,
    employeeApplyLeaveTodayLoading,
    employeeApplyLeaveTodayError,
    employeeCountSuccess,
    employeeCountData,
    employeeCountLoading,
    employeeCountError,
  };
};

export default useAdminDashboard;
