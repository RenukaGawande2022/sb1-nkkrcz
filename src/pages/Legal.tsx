import React from 'react';
import { Helmet } from 'react-helmet-async';

interface LegalProps {
  type: 'privacy' | 'terms' | 'dmca' | 'about';
}

const Legal: React.FC<LegalProps> = ({ type }) => {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      text: `At MovieRush, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.

We only collect information that is necessary to provide our services, including:
- Basic account information
- Usage data
- Device information

We use this information to:
- Provide and improve our services
- Personalize your experience
- Communicate with you about our services

We do not sell your personal information to third parties.

Contact us at renukagawande2022@gmail.com for any privacy-related concerns.`,
    },
    terms: {
      title: 'Terms of Service',
      text: `Welcome to MovieRush. By using our service, you agree to these terms.

Our service provides movie information and reviews. You agree to:
- Use the service legally and responsibly
- Not misuse or attempt to harm our service
- Respect intellectual property rights

We reserve the right to:
- Modify or terminate the service
- Remove content that violates our terms
- Update these terms as needed

Contact us at renukagawande2022@gmail.com for any questions about these terms.`,
    },
    dmca: {
      title: 'DMCA Notice & Takedown Policy',
      text: `MovieRush respects intellectual property rights. If you believe your work has been copied in a way that constitutes copyright infringement, please provide:

- Description of the copyrighted work
- Location of the material on our site
- Your contact information
- A statement of good faith belief
- A statement of accuracy

Send DMCA notices to: renukagawande2022@gmail.com`,
    },
    about: {
      title: 'About Us',
      text: `MovieRush is your premier destination for movie information and reviews. We provide comprehensive coverage of Hindi, Telugu, Tamil, and Hollywood cinema.

Our mission is to help movie enthusiasts discover and learn about great films across different languages and genres.

Contact us at renukagawande2022@gmail.com for any inquiries.`,
    },
  };

  const { title, text } = content[type];

  return (
    <>
      <Helmet>
        <title>{`${title} - MovieRush`}</title>
        <meta name="description" content={`${title} for MovieRush - Your premier destination for movie information and reviews.`} />
      </Helmet>

      <div className="max-w-3xl mx-auto prose prose-indigo">
        <h1>{title}</h1>
        <div className="whitespace-pre-line">{text}</div>
      </div>
    </>
  );
};

export default Legal;