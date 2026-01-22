import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is available based on App.tsx

export const FeedbackDialog = ({ trigger }: { trigger: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [message, setMessage] = useState("");

    const wordCount = message.trim().split(/\s+/).filter(Boolean).length;
    const maxWords = 50;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (wordCount > maxWords) {
            toast.error(`Please limit your feedback to ${maxWords} words.`);
            return;
        }

        if (rating === 0 && message.trim() === "") {
            toast.error("Please provide a rating or a message.");
            return;
        }

        // Simulate submission
        console.log({ rating, message });
        toast.success("Thank you for your feedback!");
        setIsOpen(false);
        setRating(0);
        setMessage("");
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newMessage = e.target.value;
        const currentWords = newMessage.trim().split(/\s+/).filter(Boolean).length;

        if (currentWords <= maxWords || newMessage.length < message.length) {
            setMessage(newMessage);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center font-serif text-2xl">We Value Your Feedback</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    {/* Star Rating */}
                    <div className="flex flex-col items-center gap-2">
                        <label className="text-sm font-medium text-muted-foreground">Rate your experience</label>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                >
                                    <Star
                                        className={`h-8 w-8 transition-colors ${star <= (hoverRating || rating)
                                                ? "fill-accent text-accent"
                                                : "text-muted-foreground/30"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">
                            Share your thoughts (Optional)
                        </label>
                        <Textarea
                            placeholder="Tell us what you liked or how we can improve..."
                            value={message}
                            onChange={handleMessageChange}
                            className="min-h-[120px] resize-none focus-visible:ring-accent"
                        />
                        <div className="flex justify-end">
                            <span className={`text-xs ${wordCount >= maxWords ? 'text-destructive' : 'text-muted-foreground'}`}>
                                {wordCount}/{maxWords} words
                            </span>
                        </div>
                    </div>

                    <Button type="submit" className="w-full gap-2 bg-primary hover:bg-primary/90">
                        Submit Feedback
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
