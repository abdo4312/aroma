import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // TODO: Replace with proper error reporting service (e.g. Sentry)
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  private reloadPage = (): void => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-coffee-50 p-6">
          <div className="max-w-md w-full bg-white/25 backdrop-blur-xl rounded-[2.5rem] border border-white/40 shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-50/80 backdrop-blur-md text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-coffee-900 mb-2">
              Something Went Wrong
            </h1>
            <p className="text-coffee-700/70 mb-8 text-sm leading-relaxed">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={this.reloadPage}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-coffee-700 to-coffee-900 text-white font-bold hover:shadow-xl transition-all active:scale-[0.98]"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}