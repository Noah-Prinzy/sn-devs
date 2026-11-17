"use client";

import { useRef, useState } from "react";
import { MESSAGE_MAX, type ContactFields } from "@/data/contact";
import { Field, INPUT, SendRow, described, focusFirst, type Errors } from "@/components/contact/fields";

// Path 02, "Quick question": one line, sent on WhatsApp (or by email if they'd rather).

export function QuestionForm() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<Errors>({});
    const root = useRef<HTMLDivElement>(null);

    const attempt = () => {
        const next: Errors = { message: message.trim() ? undefined : "Type your question first" };
        setErrors(next);
        if (next.message) focusFirst(["message"], next, root.current);
        return !next.message;
    };

    const fields: ContactFields = { name, email: "", phone: "", type: "Quick question", service: "", message };

    return (
        <div ref={root} className="grid gap-7">
            <Field id="question-name" label="Your name" optional>
                <input {...described("question-name")} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={`${INPUT} md:max-w-sm`} />
            </Field>
            <Field id="question-message" label="Your question" error={errors.message}>
                <textarea
                    {...described("question-message", errors.message)}
                    rows={3}
                    maxLength={MESSAGE_MAX}
                    placeholder="Can you add online booking to my current site?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${INPUT} resize-y`}
                />
            </Field>
            <SendRow
                fields={fields}
                primary="whatsapp"
                attempt={attempt}
                whatsappLabel="Ask on WhatsApp"
                emailLabel="Email it instead"
                footnote="WhatsApp goes to Noah's business line. We answer within one working day, often sooner."
            />
        </div>
    );
}
