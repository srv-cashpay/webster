import { useState } from "react";
import "./FAQ.css";

export default function FAQ({ faqRef, t }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: t.faqQ1,
      answer: t.faqA1,
    },
    {
      question: t.faqQ2,
      answer: t.faqA2,
    },
    {
      question: t.faqQ3,
      answer: t.faqA3,
    },
    {
      question: t.faqQ4,
      answer: t.faqA4,
    },
    {
      question: t.faqQ5,
      answer: t.faqA5,
    },
  ];

  return (
    <section ref={faqRef} className="section faq">
      <h2 className="faq-title">{t.faqTitle}</h2>

      <div className="faq-list">
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span>{item.question}</span>
              <span className="faq-icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
