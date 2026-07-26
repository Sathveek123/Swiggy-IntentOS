import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Swiggy LifeOS ErrorBoundary]:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/home';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-[430px] mx-auto min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center border-x border-[#E8E8E8] shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#FFF4EC] text-[#FC8019] flex items-center justify-center mb-4 border border-[#FC8019]/20">
            <AlertTriangle className="w-8 h-8" />
          </div>
          
          <h2 className="text-xl font-bold text-[#1C1C1E] tracking-tight">
            Something went wrong
          </h2>
          <p className="text-xs text-[#6B7280] font-normal mt-2 max-w-[280px] leading-relaxed">
            Swiggy LifeOS encountered a minor interface glitch. Your session state is safe.
          </p>

          <button
            onClick={this.handleReset}
            className="mt-6 bg-[#FC8019] hover:bg-[#E5700F] text-white font-bold text-xs py-3 px-6 rounded-full shadow-pill flex items-center gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload LifeOS</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
