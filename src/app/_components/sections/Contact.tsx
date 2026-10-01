"use client";

import { ChangeEvent, SubmitEvent, useState } from "react";
import Input from "@/app/_components/ui/Input";
import { Button } from "@/components/ui/button";
import { contact } from "@/constants/home";
import { MessageCircle } from "lucide-react";

interface inputDataType {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [inputData, setInputdata] = useState<inputDataType>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputdata({ ...inputData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert({ inputData });
  };
  return (
    <section id="contact" className="py-20 md:py-28 lg:py-32">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-primary">
            Contact Us
          </p>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Let&apos;s Stay
            <span className="text-primary"> Connected</span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg lg:text-xl md:leading-relaxed px-4">
            Have a question, suggestion, or want to know more about Anirban
            Business Fund? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Main Contact Area */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-5">
            <div className="h-full rounded-2xl border border-border bg-card p-6 md:p-8 lg:p-10">
              <div className="mb-7">
                <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <MessageCircle className="size-6" />
                </div>

                <h3 className="mt-5 text-2xl md:text-3xl font-semibold">
                  Contact Information
                </h3>

                <p className="mt-3 text-muted-foreground md:leading-7">
                  Reach out to us through any of the available contact channels.
                  We&apos;ll be happy to assist you.
                </p>
              </div>

              <div className="space-y-3">
                {contact.map((item) => (
                  <div
                    key={item.label}
                    className="group flex items-start gap-4 rounded-xl border border-border bg-background p-3 transition-colors hover:border-primary/40"
                  >
                    <div className="shrink-0 size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <item.icon />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.label}
                      </p>

                      <p className="mt-1 font-medium wrap-break-word">
                        {item.info}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 lg:p-10">
              <div className="mb-7">
                <h3 className="text-2xl md:text-3xl font-semibold">
                  Send Us a Message
                </h3>

                <p className="mt-3 text-muted-foreground leading-7">
                  Fill out the form below and send us your message. We&apos;ll
                  get back to you as soon as possible.
                </p>
              </div>

              <form className="space-y-6" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2.5">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>

                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="h-11 w-full"
                      value={inputData.name}
                      onChange={onInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="h-11 w-full"
                      value={inputData.email}
                      onChange={onInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>

                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="h-11 w-full"
                      value={inputData.phone}
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>

                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What is this about?"
                      className="h-11 w-full"
                      value={inputData.subject}
                      onChange={onInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Your Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Write your message here..."
                    className="flex min-h-28 w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    value={inputData.message}
                    onChange={onInputChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 text-sm md:text-base font-semibold"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 md:mt-16">
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
              Find Us
            </p>

            <h3 className="mt-2 text-2xl md:text-3xl font-semibold">
              Our Location
            </h3>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card p-2 md:p-3">
            <div className="h-72 md:h-96 lg:h-112.5 overflow-hidden rounded-xl">
              <iframe
                src="https://maps.google.com/maps?q=jatrabari&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                title="Anirban Business Fund Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
