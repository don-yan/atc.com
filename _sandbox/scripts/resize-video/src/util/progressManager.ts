// util/progressManager.ts
class ProgressManager {
    private progresses: Map<string, { message: string; line: number }> = new Map();
    private nextLine: number = 0;

    // Register a new file and assign it a line
    register(id: string, initialMessage: string): void {
        if (!this.progresses.has(id)) {
            this.progresses.set(id, { message: initialMessage, line: this.nextLine++ });
            this.render();
        }
    }

    // Update progress for a file
    update(id: string, message: string): void {
        const entry = this.progresses.get(id);
        if (entry) {
            entry.message = message;
            this.render();
        }
    }

    // Remove a file when done
    unregister(id: string): void {
        const line = this.progresses.get(id)?.line;
        this.progresses.delete(id);
        if (line !== undefined) {
            this.nextLine--;
            // Reassign lines to remaining entries
            for (const [key, value] of this.progresses) {
                if (value.line > line) value.line--;
            }
            this.render();
        }
    }

    // Render all progress lines
    private render(): void {
        // Move to top of progress area and clear below
        process.stdout.write('\x1B[?25l'); // Hide cursor
        process.stdout.write('\x1B[0f'); // Move to top-left
        process.stdout.write('\x1B[0J'); // Clear screen below cursor

        // Write each progress line
        for (const [id, { message, line }] of this.progresses) {
            process.stdout.write(`\x1B[${line + 1};0f`); // Move to line
            process.stdout.write(`${message.padEnd(80)}\n`); // Write message
        }

        process.stdout.write('\x1B[?25h'); // Show cursor
    }
}

export const progressManager = new ProgressManager();
