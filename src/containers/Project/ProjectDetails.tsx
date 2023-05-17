import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import useProjectAssignments from '@/hooks/useProjectAssignments';
import { Box, CircularProgress } from '@mui/material';

interface ProjectAssignments {
  projectAssignmentId: string;
  employee: {
    name: string;
  };
}

export default function projectDetail() {
  const { state } = useLocation();
  const {
    projectAssignmentLoading,
    projectAssignmentData,
    projectAssignmentError,
  } = useProjectAssignments(state.projectId, 1, 10);

  return (
    <Card sx={{ minWidth: 275 }}>
      {projectAssignmentLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          margin="auto"
        >
          <CircularProgress />
        </Box>
      ) : projectAssignmentError ? (
        <div>Error...=</div>
      ) : (
        <CardContent>
          <Typography
            sx={{ fontSize: 25, fontFamily: 'monospace', fontWeight: 'bold' }}
            color="text.secondary"
            gutterBottom
          >
            Name : {state.projectName}
          </Typography>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            Status : {state.status}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Description : {state.description}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Project Assignments :
          </Typography>
          <div>
            {projectAssignmentData?.data?.data?.data?.map(
              (projectAssignment: ProjectAssignments) => (
                <div key={projectAssignment.projectAssignmentId}>
                  <div>{projectAssignment?.employee?.name}</div>
                </div>
              )
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
