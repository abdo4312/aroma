import { FileText, ShoppingCart, CreditCard, RotateCcw, Truck, Lightbulb, AlertTriangle, RefreshCcw } from 'lucide-react';

const sections = [
    {
        icon: FileText,
        title: 'General Terms',
        content:
            'By accessing and using the Aroma Corner website, you agree to be bound by these Terms of Service. These terms apply to all visitors, users, and customers of the website. You must be at least 18 years old to create an account and make purchases. If you are using the website on behalf of a business, you represent that you have the authority to bind that business to these terms. We reserve the right to refuse service to anyone for any reason at any time.',
    },
    {
        icon: ShoppingCart,
        title: 'Orders & Availability',
        content:
            'All orders are subject to product availability and confirmation of the order price. We reserve the right to limit quantities and to refuse or cancel any orders for any reason, including pricing errors or suspected fraud. When you place an order, you agree to provide accurate and complete information. We will send you an order confirmation email with details of your purchase. That confirmation does not signify our acceptance of your order until the product has been shipped.',
    },
    {
        icon: CreditCard,
        title: 'Payment & Pricing',
        content:
            'We accept major credit cards, debit cards, and other payment methods as displayed at checkout. All prices are listed in Saudi Riyals (SAR) and include applicable taxes unless stated otherwise. Prices are subject to change without prior notice, but changes will not affect orders that have already been confirmed. In the event of a pricing error, we will notify you and offer the option to confirm at the correct price or cancel the order.',
    },
    {
        icon: RotateCcw,
        title: 'Returns & Refunds',
        content:
            'We accept returns within 14 days of delivery for unopened and undamaged products. To initiate a return, contact our support team with your order number and reason for return. Refunds will be processed to the original payment method within 7-10 business days after we receive the returned product. Perishable goods, customized items, and opened coffee bags are exempt from returns unless the product is defective or damaged upon arrival.',
    },
    {
        icon: Truck,
        title: 'Shipping & Delivery',
        content:
            'We ship to all cities within Saudi Arabia and select international destinations. Standard delivery takes 3-5 business days, while express delivery is available for same-day or next-day service in Cairo. Shipping costs are calculated at checkout based on your location and order weight. Orders over 100 SAR qualify for free standard shipping. We are not responsible for delays caused by shipping carriers, customs, or unforeseen circumstances.',
    },
    {
        icon: Lightbulb,
        title: 'Intellectual Property',
        content:
            'All content on the Aroma Corner website, including text, images, logos, product descriptions, and design elements, is the intellectual property of Aroma Corner or its content suppliers and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, modify, or use any content from our website without prior written consent. Our brand name, logo, and product names are trademarks of Aroma Corner and may not be used without permission.',
    },
    {
        icon: AlertTriangle,
        title: 'Limitation of Liability',
        content:
            'Aroma Corner shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our products or website. Our total liability for any claim arising from your use of the website or products shall not exceed the amount you paid for the specific product giving rise to the claim. We do not guarantee that the website will be error-free, uninterrupted, or free from harmful components.',
    },
    {
        icon: RefreshCcw,
        title: 'Changes to Terms',
        content:
            'We reserve the right to update or modify these Terms of Service at any time without prior notice. Changes will be effective immediately upon posting on the website. Your continued use of the website after any changes constitutes your acceptance of the revised terms. We encourage you to review these terms periodically. The latest version will always be available on this page with an updated revision date.',
    },
];

function TermsSection({
    icon: Icon,
    title,
    content,
    index,
}: {
    icon: typeof FileText;
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

export function TermsOfServicePage() {
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
                        <FileText className="text-[#8C6239]" size={18} />
                        <span className="text-xs font-bold tracking-[0.2em] text-[#8C6239] uppercase">
                            Legal
                        </span>
                    </div>
                    <h1 className="text-5xl font-black text-[#4A3B32] md:text-6xl">
                        Terms of <span className="text-[#8C6239]">Service</span>
                    </h1>
                    <p className="mt-6 text-[#6B4423]/70 max-w-2xl mx-auto text-lg leading-relaxed">
                        Please read these terms carefully before using our website and services.
                        By using Aroma Corner, you agree to these terms.
                    </p>
                    <p className="mt-3 text-sm text-[#6B4423]/50">
                        Last updated: May 2026
                    </p>
                </header>

                {/* Sections */}
                <div className="space-y-6">
                    {sections.map((section, index) => (
                        <TermsSection
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
                    <h2 className="text-2xl font-bold text-[#3f2518] mb-3">Questions About Our Terms?</h2>
                    <p className="text-[#5d3e2c]/80 mb-6 max-w-lg mx-auto">
                        If you have any questions about these Terms of Service, please contact
                        our team before using the website.
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