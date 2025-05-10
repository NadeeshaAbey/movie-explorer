import React from 'react';
import { Box, Container, Typography, Link as MuiLink, IconButton } from '@mui/material';
import { GitHub, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.mode === 'light' 
          ? theme.palette.grey[200] 
          : theme.palette.grey[900]
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 2, sm: 0 } }}>
            © {new Date().getFullYear()} Movie Explorer. All rights reserved.
          </Typography>
          
          <Box>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
              Powered by{' '}
              <MuiLink 
                href="https://www.themoviedb.org/" 
                target="_blank" 
                rel="noopener"
                color="primary"
              >
                TMDb
              </MuiLink>
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton 
                size="small" 
                aria-label="github" 
                color="inherit"
                component="a"
                href="https://github.com"
                target="_blank"
                rel="noopener"
              >
                <GitHub fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                aria-label="twitter" 
                color="inherit"
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener"
              >
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                aria-label="linkedin" 
                color="inherit"
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
              >
                <LinkedIn fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;