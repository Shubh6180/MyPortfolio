// Global transition state manager for Chromatic Depth Transitions
type TransitionListener = (targetId: string, label: string) => void;

class TransitionManager {
  private listeners: TransitionListener[] = [];
  private isTransitioning: boolean = false;

  public subscribe(listener: TransitionListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public navigate(targetHref: string, label: string = 'SECTION') {
    if (this.isTransitioning) return;

    // Check if target is an anchor link on this page
    if (targetHref.startsWith('#')) {
      const targetId = targetHref.substring(1);
      this.isTransitioning = true;

      // Broadcast to active chromatic depth transition overlay
      this.listeners.forEach((listener) => listener(targetId, label));

      // Reset transitioning flag after duration
      setTimeout(() => {
        this.isTransitioning = false;
      }, 950);
    } else {
      // External link
      window.open(targetHref, '_blank', 'noopener,noreferrer');
    }
  }

  public getIsTransitioning(): boolean {
    return this.isTransitioning;
  }
}

export const transitionManager = new TransitionManager();

