import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

describe('Login Component', () => {
  it('renders the login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Check if the main heading exists
    expect(screen.getByText(/Sign in to your AgriSmart account/i)).toBeInTheDocument();
    
    // Check if inputs exist
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
    
    // Check if button exists
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });
});
