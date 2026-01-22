

import { FeedbackDialog } from "./FeedbackDialog";

export const FloatingActions = () => {
    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
            <FeedbackDialog trigger={
                <button className="bg-primary hover:bg-primary/90 text-white px-2 py-4 rounded-l-lg shadow-lg transition-transform hover:-translate-x-1 duration-300 flex items-center justify-center">
                    <span className="[writing-mode:vertical-lr] rotate-180 text-xs font-bold uppercase tracking-widest">
                        Feedback
                    </span>
                </button>
            } />
        </div>
    );
};
