import { useState } from 'react';
import { showNotification } from '../stores/notificationStore';
import { isContactPopupOpen, closeContactPopup } from '../stores/popupStore';
import { useStore } from '@nanostores/react';
import emailjs from '@emailjs/browser';

export default function ContactPopup() {
  const [loading, setLoading] = useState(false);
  const isOpen = useStore(isContactPopupOpen);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        message: formData.get('message'),
        to_email: 'raminda5575@gmail.com'
      };

      await emailjs.send(
        'service_e2sgigh',
        'template_9ydxvbc',
        templateParams,
        'TIL9dq1KX2fl8m1tN'
      );

      showNotification({ type: 'success', message: 'Message sent successfully!' });
      closeContactPopup();
      form.reset();
    } catch (error) {
      showNotification({ type: 'error', message: 'Failed to send message.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={() => closeContactPopup()}>×</button>
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .popup-content {
          background: var(--glass-background);
          border: var(--glass-border);
          border-radius: 16px;
          padding: 2rem;
          width: 90%;
          max-width: 500px;
          position: relative;
          animation: slideUp 0.3s ease;
        }

        .close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: var(--accent);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          line-height: 1;
        }

        h2 {
          color: var(--accent);
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--accent);
        }

        input, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--accent);
          background: rgba(0, 0, 0, 0.2);
          color: white;
          border-radius: 8px;
        }

        textarea {
          min-height: 120px;
          resize: vertical;
        }

        .submit-button {
          background: var(--accent);
          color: black;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          width: 100%;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: var(--neon-glow);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
