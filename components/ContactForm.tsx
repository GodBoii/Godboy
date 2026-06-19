"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { contactOptions } from "@/data/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <OptionGroup number="01" title="What can we do for you?" name="service" options={contactOptions.services} />
      <OptionGroup number="02" title="Budget in USD" name="budget" options={contactOptions.budgets} />
      <Field number="03" label="Your Name" name="name" placeholder="Enter name" required />
      <Field number="04" label="Your Email" name="email" placeholder="Enter email" type="email" required />
      <label className="form-row">
        <span className="form-number">05</span>
        <span className="form-title">Project Details</span>
        <span className="form-helper">Your Project, Goals,<br />Success Criteria</span>
        <textarea name="details" placeholder="Your project, goals, success criteria" required />
      </label>
      <label className="form-row date-row">
        <span className="form-number">06</span>
        <span className="form-title">When would you like to start?</span>
        <span className="date-shell">Select Date...<input name="start" type="date" /></span>
      </label>
      <OptionGroup number="07" title="Deadline?" name="deadline" options={contactOptions.deadlines} />
      <OptionGroup number="08" title="Where did you hear about us?" name="source" options={contactOptions.sources} />
      <button className="submit-button" type="submit">
        Send Request <ArrowUpRight size={22} />
      </button>
      {sent && <p className="success">Request staged. For now this demo keeps the message local.</p>}
    </form>
  );
}

function OptionGroup({
  number,
  title,
  name,
  options,
}: {
  number: string;
  title: string;
  name: string;
  options: string[];
}) {
  return (
    <fieldset className="form-row">
      <legend>
        <span className="form-number">{number}</span>
        <span className="form-title">{title}</span>
      </legend>
      <div className="option-grid">
        {options.map((option) => (
          <label key={option} className="option-pill">
            <input type="checkbox" name={name} value={option} />
            <span><i />{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Field({
  number,
  label,
  name,
  placeholder,
  type = "text",
  required,
}: {
  number: string;
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="form-row">
      <span className="form-number">{number}</span>
      <span className="form-title">{label}</span>
      <input name={name} placeholder={placeholder} type={type} required={required} />
    </label>
  );
}
