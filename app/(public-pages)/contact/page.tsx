import { ContactPage } from "@/components/contact/contact-page";
import { EMAIL, PEOPLE, WHATSAPP_NUMBER, waLink } from "@/data/contact";

export const metadata = {
    title: "Talk to us · S&N Devs",
    description:
        "Tell us what you're building. A rough idea is enough. Email or WhatsApp, reply within one working day, Kampala.",
};

// LocalBusiness structured data, built from the same contact data the page renders.
const telephone = PEOPLE[0].tel.replace(/^tel:/, "");
const LOCAL_BUSINESS = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "S&N Devs",
    url: "https://sn-devs.vercel.app/contact",
    email: EMAIL,
    telephone,
    areaServed: { "@type": "City", name: "Kampala" },
    address: { "@type": "PostalAddress", addressLocality: "Kampala", addressCountry: "UG" },
    founder: PEOPLE.map((p) => ({ "@type": "Person", name: p.name })),
    contactPoint: [
        {
            "@type": "ContactPoint",
            contactType: "sales",
            email: EMAIL,
            telephone,
            url: waLink(WHATSAPP_NUMBER),
            availableLanguage: "en",
        },
    ],
};

export default function Contact() {
    return (
        <>
            <script
                type="application/ld+json"
                // JSON-LD is data, not markup; "<" is escaped so no tag can close the script early.
                dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS).replace(/</g, "\\u003c") }}
            />
            <ContactPage />
        </>
    );
}
