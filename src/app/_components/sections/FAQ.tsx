"use client";

import { faqs } from "@/constants/home";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className="py-6 md:py-16 lg:py-26">
      <div className="container">
        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-primary">
            FAQ
          </p>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Frequently Asked
            <span className="text-primary"> Questions</span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg lg:text-xl md:leading-relaxed">
            Find answers to some of the most common questions about Anirban
            Business Fund.
          </p>
        </div>

        {/* FAQ */}
        <div className="max-w-7xl mx-auto mt-12 md:mt-16">
          <Accordion multiple className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border"
              >
                <AccordionTrigger className="md:text-lg font-semibold hover:no-underline hover:text-primary">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-sm md:text-base leading-7 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-5xl mx-auto mt-10 md:mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-semibold">
            Still have questions?
          </h3>

          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Our team is here to help you understand ABF and its membership
            process.
          </p>

          <a
            href="#contact"
            className="inline-flex mt-5 font-semibold text-primary hover:underline"
          >
            Contact ABF →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
