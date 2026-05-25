import './AboutPage.css';

const TEAM = [
  {
    name: 'Fiona Estella',
    role: 'Project Manager',
    icon: '📋',
    desc: 'Led the team, managed timelines, coordinated tasks, and ensured project delivery.',
    color: 'amber',
  },
  {
    name: 'Prince Christian Parnada',
    role: 'Developer / Technical Lead',
    icon: '⚙️',
    desc: 'Built the full-stack architecture, REST API, backend logic, 3D globe, and UI system.',
    color: 'indigo',
  },
  {
    name: 'Samantha Cortes',
    role: 'Developer / Technical',
    icon: '💻',
    desc: 'Co-developed frontend components, authentication flows, favorites system, and responsive layout.',
    color: 'indigo',
  },
  {
    name: 'Sean Xymoun Boniel',
    role: 'UI/UX & Frontend',
    icon: '🎨',
    desc: 'Designed the user interface, visual direction, and frontend experience across all pages.',
    color: 'emerald',
  },
  {
    name: 'Alexa Shane Adolfo',
    role: 'QA & Testing',
    icon: '🧪',
    desc: 'Conducted quality assurance testing, identified bugs, and validated app functionality.',
    color: 'rose',
  },
  {
    name: 'Mild Disuyo',
    role: 'Documentation & Presentation',
    icon: '📝',
    desc: 'Wrote technical documentation, prepared project reports, and handled presentation materials.',
    color: 'purple',
  },
];

const TECH = [
  { name: 'React 18',         icon: '⚛️',  desc: 'Frontend framework' },
  { name: 'Vite',             icon: '⚡',  desc: 'Build tool' },
  { name: 'Node.js + Express',icon: '🟢',  desc: 'Backend server' },
  { name: 'LowDB',            icon: '🗄️',  desc: 'Flat-file database' },
  { name: 'JWT',              icon: '🔐',  desc: 'Authentication' },
  { name: 'react-globe.gl',   icon: '🌐',  desc: '3D globe (Three.js)' },
  { name: 'REST Countries API',icon: '🌍', desc: 'Country data source' },
  { name: 'CSS Variables',    icon: '🎨',  desc: 'Design system' },
];

export default function AboutPage() {
  return (
    <div className="about-page container">

      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero-glow" />
        <div className="about-course-badge">IT 301 — Web and Mobile Application Development</div>
        <h1 className="about-title">About GlobeScope</h1>
        <p className="about-desc">
          GlobeScope is a full-stack web application built as our Final Group Project for IT 301.
          It lets users explore, compare, and save information about 195+ countries worldwide —
          complete with an interactive 3D globe.
        </p>
      </div>

      {/* Team */}
      <section className="about-section">
        <div className="about-section-head">
          <p className="eyebrow"><span className="eyebrow-dot" />The Team</p>
          <h2 className="about-section-title">Meet the people behind it</h2>
        </div>
        <div className="about-team-grid">
          {TEAM.map((m, i) => {
            const initials = m.name.split(' ').map(w => w[0]).slice(0, 2).join('');
            return (
              <div key={m.name} className={`about-member about-member-${m.color} fade-up`} style={{ animationDelay: `${i * 0.07}s` }}>
                <div className={`about-member-top about-top-${m.color}`}>
                  <div className={`about-avatar about-avatar-${m.color}`}>{initials}</div>
                  <span className="about-member-icon-sm">{m.icon}</span>
                </div>
                <div className="about-member-body">
                  <h3 className="about-member-name">{m.name}</h3>
                  <span className={`about-member-role about-role-${m.color}`}>{m.role}</span>
                  <p className="about-member-desc">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech stack */}
      <section className="about-section">
        <div className="about-section-head">
          <p className="eyebrow"><span className="eyebrow-dot" />Tech Stack</p>
          <h2 className="about-section-title">Built with</h2>
        </div>
        <div className="about-tech-grid">
          {TECH.map(t => (
            <div key={t.name} className="about-tech-card">
              <span className="about-tech-icon">{t.icon}</span>
              <div>
                <p className="about-tech-name">{t.name}</p>
                <p className="about-tech-desc">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <div className="about-footer-note">
        <span>🎓</span>
        <p>This project was created for academic purposes — IT 301, Web and Mobile Application Development.</p>
      </div>

    </div>
  );
}
