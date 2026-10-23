import { Shield, Eye, Lock, UserCheck, Share2, RefreshCcw } from 'lucide-react';

const sections = [
    {
        icon: Eye,
        title: 'Data Collection',
        content:
            'We collect information you provide directly, such as your name, email address, phone number, shipping address, and payment details when you place an order or create an account. We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and interactions with our pages through cookies and similar tracking technologies.',
    },
    {
        icon: Shield,
        title: 'How We Use Your Data',
        content:
            'Your data is used to process and fulfill your orders, communicate order status updates, send promotional offers and newsletters (with your consent), improve our website experience and product offerings, provide customer support, and prevent fraud or unauthorized access. We never sell your personal data to third parties for their own marketing purposes.',
    },
    {
        icon: Lock,
        title: 'Data Security',
        content:
            'We implement industry-standard security measures to protect your personal information, including SSL/TLS encryption for data in transit, secure storage for payment information handled by certified payment processors, regular security audits and vulnerability assessments, and restricted access to personal data on a need-to-know basis within our team. While we strive to protect your data, no method of transmission over the Internet is 100% secure.',
    },
    {
        icon: UserCheck,
        title: 'Your Rights',
        content:
            'You have the right to access, correct, or delete your personal data at any time. You may update your account information through your profile settings, opt out of marketing communications by clicking the unsubscribe link, request a copy of all data we hold about you, and request deletion of your account and associated data. To exercise any of these rights, please contact us at hello@aromacorner.shop.',
    },
    {
        icon: Share2,
        title: 'Third-Party Sharing',
        content:
            'We share your data only with trusted service providers who help us operate our business: shipping carriers for order delivery, payment processors for secure transactions, analytics providers for website improvement, and email service providers for communications. All third parties are contractually obligated to protect your data and use it only for the purposes we specify.',
    },
    {
        icon: RefreshCcw,
        title: 'Policy Updates',
        content:
            'We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. When we make significant changes, we will notify you via email or a prominent notice on our website before the changes take effect. Your continued use of our services after any such changes constitutes your acceptance of the updated policy. We encourage you to review this page periodically.',
    },
];

function PolicySection({
    icon: Icon,
    title,
    content,
    index,
}: {
    icon: typeof Shield;
    title: string;
    content: string;
    index: number;
}) {
    return (
        <div className="group relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/25 p-8 backdrop-blur-xl transition-all duration-500 hover:bg-white/35 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#5f3a26]/10 text-[#7d4930] transition-colors duration-300 group-hover:bg-[#5f3a26] group-hover:text-white">
                    <Icon size={22} />
                </div>
                <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6239]/60">
                            Section {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-[#3f2518]">{title}</h3>
                    <p className="text-sm leading-relaxed text-[#5d3e2c]/80">{content}</p>
                </div>
            </div>
        </div>
    );
}

export function PrivacyPolicyPage() {
    return (
        <div dir="ltr" className="relative min-h-screen overflow-hidden bg-[#FAF7F2] font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -right-20 top-0 h-[600px] w-[600px] animate-pulse rounded-full bg-[#8C6239]/10 blur-[120px]" />
                <div className="absolute -left-20 bottom-0 h-[600px] w-[600px] animate-bounce rounded-full bg-[#4A3B32]/5 blur-[150px]" />
                <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(#4A3B32_1px,transparent_1px)] [background-size:32px_32px]" />
            </div>

            <div className="container relative z-10 mx-auto px-4 py-20 max-w-4xl">
                {/* Header */}
                <header className="mb-16 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/40 px-6 py-2 border border-white/60 backdrop-blur-md">
                        <Shield className="text-[#8C6239]" size={18} />
                        <span className="text-xs font-bold tracking-[0.2em] text-[#8C6239] uppercase">
                            Legal
                        </span>
                    </div>
                    <h1 className="text-5xl font-black text-[#4A3B32] md:text-6xl">
                        Privacy <span className="text-[#8C6239]">Policy</span>
                    </h1>
                    <p className="mt-6 text-[#6B4423]/70 max-w-2xl mx-auto text-lg leading-relaxed">
                        Your privacy matters to us. This policy outlines how Aroma Corner collects,
                        uses, and protects your personal information.
                    </p>
                    <p className="mt-3 text-sm text-[#6B4423]/50">
                        Last updated: May 2026
                    </p>
                </header>

                {/* Sections */}
                <div className="space-y-6">
                    {sections.map((section, index) => (
                        <PolicySection
                            key={section.title}
                            icon={section.icon}
                            title={section.title}
                            content={section.content}
                            index={index}
                        />
                    ))}
                </div>

                {/* Contact */}
                <div className="mt-16 text-center rounded-[2.5rem] border border-white/50 bg-white/25 p-10 backdrop-blur-xl">
                    <h2 className="text-2xl font-bold text-[#3f2518] mb-3">Questions About Your Privacy?</h2>
                    <p className="text-[#5d3e2c]/80 mb-6 max-w-lg mx-auto">
                        If you have any questions or concerns about how we handle your data, please
                        don&apos;t hesitate to reach out to our team.
                    </p>
                    <a
                        href="mailto:hello@aromacorner.shop"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#5f3a26] px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#4a2e1f] hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        hello@aromacorner.shop
                    </a>
                </div>
            </div>
        </div>
    );
}