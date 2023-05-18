import { LockOutlined, Password } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Card, CardContent } from '@mui/material';

import { useState } from 'react';
import LoginLayout from '@/layout/LoginLayout';
import useSendResetEmail from '@/hooks/useSendResetEmail';

const ResetPassowrdMailForm = () => {
  const navigate = useNavigate();

  const [enteredEmail, setEnteredEmail] = useState('');
  const { emailSendChangeAction, emailSendLoading } = useSendResetEmail();

  const handleSubmit = async () => {
    const sendEmailCredentials = {
      email: enteredEmail,
    };
    try {
      emailSendChangeAction(sendEmailCredentials, {
        onSuccess: () => {
          console.log('email sent');
        },
        onError: (data) => {
          console.log('err', data);
        },
      });
      setEnteredEmail('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LoginLayout>
      <Card
        variant="outlined"
        sx={{
          m: 'auto',
          mt: '10%',
          maxWidth: '400px',
          borderRadius: '20px',
          p: '30px',
        }}
      >
        <Box>
          <CardContent>
            <Box>
              <Box>
                <TextField
                  margin="normal"
                  id="email"
                  name="email"
                  label="Email Address"
                  autoComplete="email"
                  value={enteredEmail}
                  onChange={(e) => setEnteredEmail(e.target.value)}
                  fullWidth
                  required
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => handleSubmit()}
                >
                  Send Email
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </LoginLayout>
  );
};

export default ResetPassowrdMailForm;
