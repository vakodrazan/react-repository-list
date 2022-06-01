import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

describe('Initial load of the page', () => {
  test('renders loading', () => {
    render(<App />);
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();
  });

  test('Page loaded', async () => {
    render(<App />);
  
    await waitFor(() => {
      const name = screen.getByText("Name");
      expect(name).toBeInTheDocument();
    }, {
      timeout: 6000
    });
  
  });
});

describe('Search functionality', () => {
  test('Search initialization', () => {
    render(<App />);

    const searchButton = screen.getByText("Search");
    expect(searchButton).toBeInTheDocument();

    fireEvent(
      searchButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
      )
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();
  });

  // checks similarily to the intialization 
  // after pressing the search and waiting for the result
});

