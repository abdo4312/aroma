import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Coffee } from 'lucide-react';
import { EmptyState } from '../EmptyState';
import { describe, it, expect, vi } from 'vitest';

describe('EmptyState Component', () => {
  it('renders title and description', () => {
    render(
      <MemoryRouter>
        <EmptyState
          icon={Coffee}
          title="No Coffee Found"
          description="Try searching for something else."
        />
      </MemoryRouter>
    );

    expect(screen.getByText('No Coffee Found')).toBeInTheDocument();
    expect(screen.getByText('Try searching for something else.')).toBeInTheDocument();
  });

  it('renders action button when onAction is provided', () => {
    const onAction = vi.fn();
    render(
      <MemoryRouter>
        <EmptyState
          icon={Coffee}
          title="No Coffee Found"
          description="Try searching for something else."
          actionLabel="Add Coffee"
          onAction={onAction}
        />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: 'Add Coffee' });
    expect(button).toBeInTheDocument();
    button.click();
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders action link when actionLink is provided', () => {
    render(
      <MemoryRouter>
        <EmptyState
          icon={Coffee}
          title="No Coffee Found"
          description="Try searching for something else."
          actionLabel="Go Home"
          actionLink="/"
        />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: 'Go Home' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
