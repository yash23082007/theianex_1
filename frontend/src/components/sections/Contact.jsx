import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { profile, socials } from '../../data/profile';
import MagneticButton from '../ui/MagneticButton';

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.from_name || !formData.from_email || !formData.message) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields.');
      return;
    }

    setStatus('sending');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
            console.warn('EmailJS environmental keys are missing. Simulating successful mail transmission.');
      setTimeout(() => {
        setStatus('success');
        setStatusMessage('Demo Success! Your message was submitted successfully (Simulated transmission). To activate live messaging, provide your EmailJS environmental keys.');
        setFormData({ from_name: '', from_email: '', subject: '', message: '' });
      }, 1400);
      return;
    }

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );
      setStatus('success');
      setStatusMessage('Thank you! Your message has been sent successfully. Yash will get back to you shortly.');
      setFormData({ from_name: '', from_email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setStatusMessage(err.text || 'An error occurred while sending your message. Please try connecting via LinkedIn or email directly.');
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-container">
        {/* Section Heading */}
        <div className="section-header" data-animate>
          <span className="section-eyebrow">07           <h2 className="section-title">Get In Touch</h2>
          <div className="section-underline" />
        </div>

        <div className="contact-grid">
          {/* Left Column - Channel info cards */}
          <motion.div
            className="contact-info-column"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-card-intro">
              <h3 className="contact-column-title">Let's build something together.</h3>
              <p className="contact-column-desc">
                If you have an internship opportunity, a project to collaborate on, or just want to chat about AI/ML or web development, feel free to drop a message or reach out on socials.
              </p>
            </div>

            <div className="contact-channels">
              {/* Direct email card */}
              <a href={`mailto:${profile.email}`} className="channel-card clickable">
                <div className="channel-icon-box email">
                  <Mail size={20} />
                </div>
                <div className="channel-details">
                  <span className="channel-label">Email Directly</span>
                  <span className="channel-value">{profile.email}</span>
                </div>
              </a>

              {/* GitHub connection card */}
              <a href={socials.github} target="_blank" rel="noreferrer" className="channel-card clickable">
                <div className="channel-icon-box github">
                  <FaGithub size={20} />
                </div>
                <div className="channel-details">
                  <span className="channel-label">Follow Code</span>
                  <span className="channel-value">github.com/yash23082007</span>
                </div>
              </a>

              {/* LinkedIn connection card */}
              <a href={socials.linkedin} target="_blank" rel="noreferrer" className="channel-card clickable">
                <div className="channel-icon-box linkedin">
                  <FaLinkedin size={20} />
                </div>
                <div className="channel-details">
                  <span className="channel-label">Connect Professional</span>
                  <span className="channel-value">linkedin.com/in/yash-vijay</span>
                </div>
              </a>

              {/* Instagram connection card */}
              <a href={socials.instagram} target="_blank" rel="noreferrer" className="channel-card clickable">
                <div className="channel-icon-box instagram">
                  <FaInstagram size={20} />
                </div>
                <div className="channel-details">
                  <span className="channel-label">Say Hello</span>
                  <span className="channel-value">@yash_vj23</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column - EmailJS Contact form */}
          <motion.div
            className="contact-form-column"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="form-card">
              <form ref={formRef} onSubmit={handleFormSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="from_name" className="form-label">Name <span className="req">*</span></label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    required
                    value={formData.from_name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="from_email" className="form-label">Email <span className="req">*</span></label>
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    required
                    value={formData.from_email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What project are you building?"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message <span className="req">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi Yash, let's collaborate on..."
                    className="form-textarea"
                  />
                </div>

                {/* Status Banners */}
                {status === 'success' && (
                  <div className="form-status success">
                    <CheckCircle size={18} className="status-icon" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="form-status error">
                    <AlertTriangle size={18} className="status-icon" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Submit trigger */}
                <div className="form-submit-container">
                  <MagneticButton
                    type="submit"
                    disabled={status === 'sending'}
                    className="form-submit-btn"
                  >
                    {status === 'sending' ? (
                      'Transmission Launch...'
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={15} className="btn-icon" />
                      </>
                    )}
                  </MagneticButton>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
