import { Calculator, Megaphone, Target, Users } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { roles, type RoleIcon } from '../data/roles';
import { cssVars } from '../lib/cssVars';
import styles from './Roles.module.css';

const icons: Record<RoleIcon, typeof Target> = {
  strategy: Target,
  finance: Calculator,
  media: Megaphone,
};

export function Roles() {
  return (
    <section id="roles" className={styles.section} aria-labelledby="roles-title">
      <div className="container">
        <SectionHeader
          turn="03"
          label="Team Roles"
          titleId="roles-title"
          title={['Three minds.', 'One business.']}
          lede="Each team has three members. Each member leads one part of the business, and every member must be able to explain all of it."
        />

        <ol role="list" className={styles.roles}>
          {roles.map((role, index) => {
            const Icon = icons[role.icon];
            return (
              <li
                key={role.member}
                className={styles.role}
                data-reveal=""
                style={cssVars({ '--reveal-delay': `${index * 110}ms` })}
              >
                <div className={styles.head}>
                  <span className={styles.memberLabel}>Member</span>
                  <span className={styles.icon}>
                    <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </div>
                <span className={styles.number} aria-hidden="true">
                  {role.member}
                </span>
                <h3 className={styles.title}>
                  <span className="visually-hidden">Member {role.member}: </span>
                  <span className={styles.titleLine}>{role.title[0]}</span>{' '}
                  <span className={styles.titleLine}>{role.title[1]}</span>
                </h3>
                <p className={styles.summary}>{role.summary}</p>
                <p className={styles.leadsLabel}>Leads on</p>
                <ul role="list" className={styles.leads}>
                  {role.leads.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        <div className={styles.shared} data-reveal="">
          <span className={styles.sharedIcon}>
            <Users size={22} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <p>
            <strong>Lead responsibilities, not boundaries.</strong> All three members must understand the full
            business and be ready to answer questions outside their individual roles.
          </p>
        </div>
      </div>
    </section>
  );
}
