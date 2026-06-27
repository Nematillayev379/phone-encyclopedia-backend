import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#0a0a0f', color: '#fff', fontFamily: 'Inter, sans-serif', padding: 24,
        }}>
          <div style={{ textAlign: 'center', maxWidth: 400 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>&#x26A0;</div>
            <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Something went wrong</h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
              The app encountered an error. Try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '8px 20px', borderRadius: 8, border: 'none',
                background: '#22c55e', color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer',
              }}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
