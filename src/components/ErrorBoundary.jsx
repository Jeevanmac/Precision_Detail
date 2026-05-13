import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Critical Runtime Fault Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-surface-container-high rounded-3xl p-10 border border-error/20 shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto text-error">
              <span className="material-symbols-outlined text-4xl">warning</span>
            </div>
            <h2 className="text-2xl font-black text-on-surface uppercase tracking-tighter">Architecture Breach</h2>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              A critical runtime exception has compromised the monolith. Our automated systems are currently attempting restoration.
            </p>
            <div className="bg-surface-dim p-4 rounded-xl text-left overflow-auto max-h-32 border border-outline-variant/10">
              <code className="text-[10px] text-error font-mono break-all">
                {this.state.error?.message || "Unknown segment fault"}
              </code>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              Initialize Hot-Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
