/* ===== data.js — ALL content lives here. Edit this file only to add/change members. ===== */
const fb = q => 'https://www.facebook.com/search/top?q=' + encodeURIComponent(q);
const li = q => 'https://www.linkedin.com/search/results/all/?keywords=' + encodeURIComponent(q);

/* Shared profile copy for members 2-4 */
const shared = {
  intro: 'First-year SNAC student at PNC, passionate about networking, Linux systems, servers, cloud computing and cybersecurity. Enjoys exploring new technologies and building practical projects.',
  goal: 'Become a Cloud Infrastructure Engineer who designs, deploys and manages secure cloud infrastructure.',
  about: 'Currently studying System and Network Administration & Cybersecurity (SNAC) at PNC. Strong interest in IT infrastructure, networking, Linux administration and cloud technologies; developing skills in system management, network configuration, web development and problem solving. Believes continuous learning and hands-on experience are key to becoming a successful IT professional.',
  education: 'Passerelles Numériques Cambodia (PNC) — SNAC program — First-Year Student',
  subjects: 'IT Support, Cisco Networking, Linux Administration, Server OS, Database, English for IT, Professional Life, ESD',
  skills: [
    ['Networking', 'IP Addressing, LAN/WAN, DHCP, VLAN, Router & Switch, Packet Tracer, GNS3'],
    ['System Administration', 'Linux CLI, Ubuntu Server, Windows Server, Apache2, Server Configuration'],
    ['Web Development', 'HTML5, CSS3, JavaScript, Responsive Design, Git & GitHub'],
    ['Other', 'Database, Cloud and Cybersecurity Fundamentals'],
    ['Soft skills', 'Teamwork, Communication, Problem Solving, Time Management, Adaptability']
  ],
  projects: [
    ['IT Support Project — Computer Maintenance and Upgrade', 'Teamwork project checking and improving computer performance: troubleshooting, hardware checks, RAM and SSD upgrade, system optimization.', 'Servers'],
    ['Home IT Support Website', 'Website offering computer repair and IT support services. HTML5, CSS3, JavaScript, AWS, AI website tools.', 'Web'],
    ['Apache2 Web Server Deployment', 'Configured Apache2 on Ubuntu Server to host a website.', 'Servers'],
    ['Networking Laboratory', 'Static IP, DHCP, VLAN, router and switch configuration in Cisco Packet Tracer and GNS3.', 'Networking']
  ],
  extra: 'Student Association Club (SA Club): helps organize student activities and school events, and builds leadership and teamwork.',
  blurb: "Let's Connect — open to learning opportunities, internships and collaboration in IT projects."
};

const TEAM = {
  meta: { email: 'Chanrathana.seng@fellow.passerellesnumeriques.org', phone: '090 393 760', loc: 'Phnom Penh, Cambodia' },
  roles: ['Linux Administrator', 'System Administrator', 'Network Administrator', 'Database Administrator', 'Ethical Hacker'],
  features: [
    { i: 'fa-network-wired', t: 'Networking', d: 'VLANs, trunking, routing, DHCP and NAT.' },
    { i: 'fa-linux fa-brands', t: 'Server OS / Linux', d: 'Ubuntu and Windows Server in production-style labs.' },
    { i: 'fa-gears', t: 'System Administration', d: 'Users, services, backups and monitoring.' },
    { i: 'fa-shield-halved', t: 'Cybersecurity', d: 'Hardening, firewalls and vulnerability testing.' },
    { i: 'fa-database', t: 'Database Administration', d: 'MariaDB and MySQL setup, backup and restore.' }
  ],
  built: [
    ['fa-route', 'Cisco Switch & Router', 'VLAN, trunking, router-on-a-stick, DHCP, NAT'],
    ['fa-windows fa-brands', 'Windows Server 2022', 'Active Directory, DNS, file sharing'],
    ['fa-laptop', 'Client Laptops', 'Windows & Linux clients, Outlook, KeePass'],
    ['fa-server', 'Ubuntu Web + Database', 'Apache2 web server with a MariaDB/MySQL database server'],
    ['fa-graduation-cap', 'Moodle LMS', 'Customized learning platform'],
    ['fa-box-archive', 'Backup & Restore', 'Scheduled backups with tested restores']
  ],
  skillGroups: [
    ['Networking', [['VLAN & Trunking', 85], ['DHCP & NAT', 80], ['Routing & Switching', 82]]],
    ['Servers', [['Ubuntu / Linux', 90], ['Apache2 / Nginx', 85], ['Windows Server & AD', 75]]],
    ['Security', [['Hardening (SSH, UFW, Fail2ban)', 80], ['Vulnerability Assessment', 72], ['Log Auditing', 70]]],
    ['Database', [['MariaDB / MySQL', 85], ['Backup & Restore', 88], ['Access Control', 78]]]
  ],
  gallery: ['Network topology', 'Proxmox cloud', 'Moodle dashboard', 'Server rack lab'],
  career: [
    ['fa-cloud', 'Cloud Infrastructure Engineer', 'Designing and running secure cloud systems.'],
    ['fa-user-shield', 'Cybersecurity Specialist', 'Finding and fixing weaknesses before attackers do.'],
    ['fa-people-group', 'Student life at PNC', 'SA Club, teamwork projects and peer learning.']
  ],
  members: [
    {
      id: 1, name: 'Chanrathana Seng', role: 'Linux / Web Administrator', tagline: 'Builds, secures and monitors web servers.',
      photo: 'images/team/member1.jpg',
      intro: 'Associate Degree (IT) student at Passerelles Numériques Cambodia, focused on Linux, web servers and databases.',
      about: 'Associate Degree (IT) student at Passerelles Numériques Cambodia. Works across networking, server operating systems, system administration, IT support and cybersecurity, with hands-on database administration experience.',
      education: 'Passerelles Numériques Cambodia (PNC) — Associate Degree in IT',
      skills: [['Core skills', 'Networking, Server OS / Linux, System Administration, IT Support, Cybersecurity, Database Administration']],
      projects: [
        ['Moodle LMS Deployment & Database Administration Challenge', 'Deployed Moodle LMS and administered its database.', 'Servers'],
        ['Server OS Project', 'Build, deploy, secure and monitor a web server.', 'Security']
      ],
      goal: 'Grow into a senior Linux and web infrastructure professional.',
      blurb: "Let's Connect — open to learning opportunities and collaboration.",
      contact: { email: 'Chanrathana.seng@fellow.passerellesnumeriques.org', phone: '090 393 760', loc: 'Phnom Penh', facebook: fb('chanrathana seng'), linkedin: li('CHANTAHANA SENG') }
    },
    {
      id: 2, name: 'Sopheak Bol', role: 'System Administration', tagline: 'System Administration Student', photo: 'images/team/member2.jpg', ...shared,
      contact: { email: 'sopheak.bol@fellow.passerellesnumeriques.org', loc: 'Phnom Penh, Cambodia', github: 'https://github.com/sopheakbol-del', linkedin: 'https://linkedin.com/in/bol-sopheak-9685b640b/' }
    },
    {
      id: 3, name: 'Lan Loeur', role: 'Network Administration', tagline: 'Network Administration Student', photo: 'images/team/member3.jpg', ...shared,
      contact: { email: 'lan.loeur@fellow.passerellesnumeriques.org', loc: 'Phnom Penh, Cambodia', github: 'https://github.com/lanloeur-tech' }
    },
    {
      id: 4, name: 'Kimsreang Srong', role: 'Database Administration', tagline: 'Database Administration Student', photo: 'images/team/member4.jpg', ...shared,
      contact: { email: 'kimsreang.srong@fellow.passerellesnumeriques.org', loc: 'Phnom Penh, Cambodia' }
    },
    {
      id: 5, name: 'Tat Miquel', role: 'Junior System Administrator & Ethical Hacking Specialist', tagline: 'Secures multi-tier servers on AWS and Linux.', photo: 'images/team/member5.jpg',
      intro: 'Associate Degree candidate in IT at PNC, specializing in System Administration, Cloud Infrastructure, Networking and Ethical Hacking.',
      about: 'Highly motivated Associate Degree candidate in IT at PNC. Experienced in building, managing and securing multi-tier server architectures on AWS and Linux; skilled in vulnerability assessments, security hardening, network protocols and database administration.',
      education: 'Associate Degree in IT, PNC — System Administration & Linux, Cloud & AWS, Ethical Hacking & Web Security, Cisco Networking & CCNA Security concepts',
      skills: [
        ['Cybersecurity & Ethical Hacking', 'VAPT, vulnerability scanning, Kali Linux, Parrot OS, Nmap, Burp Suite, Wireshark, Metasploit, OWASP ZAP, SSH hardening, UFW/IPTables, Fail2ban, IAM/RBAC, Syslog'],
        ['Cloud & System Administration', 'Ubuntu, Debian, RHEL, Windows Server, AWS (EC2, RDS, Security Groups, IAM, Route 53), Nginx, Apache, Moodle LMS'],
        ['Networking', 'TCP/IP, subnetting, routing & switching, segmentation, SSL/TLS, SSH, OpenVPN, DNS'],
        ['Database Administration', 'MariaDB, MySQL, multi-tier isolation, automated backups, restores, point-in-time recovery'],
        ['IT Support', 'Troubleshooting, hardware/software maintenance, user access control']
      ],
      projects: [
        ['Moodle LMS Deployment & Secure Database Administration', 'Split web and DB servers into separate AWS EC2 instances; Security Groups allow DB access only from the web server; SSL/TLS for HTTPS and DB connections; scripted MariaDB backups with restore tests.', 'Servers'],
        ['Secure Multi-Tenant Linux Web Server & Threat Monitoring', 'Nmap/Burp recon before deployment; SSH hardening (new port, no root login, key auth); Fail2ban + UFW against brute force; centralized Syslog auditing.', 'Security'],
        ['Web Application VAPT Lab', 'Found SQLi, XSS and broken authentication with Burp Suite, SQLMap and DVWA/TryHackMe; wrote reports with remediation guidance.', 'Security']
      ],
      goal: 'Become a cloud security and ethical hacking professional.',
      blurb: "Let's Connect — open to internships and security collaboration.",
      contact: { email: 'miquel.tat@fellow.passerellesnumeriques.org', phone: '(+855) 70 923 678 / 99 923 678', loc: 'Phnom Penh, Cambodia', linkedin: li('Tat Miquel'), facebook: fb('Tat Miquel') }
    }
  ]
};
