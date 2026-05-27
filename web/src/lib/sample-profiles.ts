import type { BuilderInput } from "@/lib/skill-graph-schema";

export type SampleAudience = "students" | "employees" | "recruiters";

export type StressSample = BuilderInput & {
  id: string;
  candidate_type: string;
  audience: SampleAudience[];
  title: string;
  what_it_tests: string;
  expected_signal: string;
};

export const stressSamples: StressSample[] = [
  {
    id: "HG-ST-001",
    title: "Student web projects baseline",
    candidate_type: "Student",
    audience: ["students"],
    what_it_tests: "Whether baseline mode rewards coursework, internships, SQL, and practical projects without inventing senior experience.",
    expected_signal: "React, Node.js, SQL, Git, project proof gaps",
    analysis_mode: "baseline_profile",
    name: "Aarav Student",
    target_role: "",
    target_job_description: "",
    github_url: "",
    project_links: [],
    resume_text: `Aarav Student
Bengaluru, India
Education: B.Tech Computer Science, 2026
Summary: Final-year student with coursework in data structures, web development, databases, and operating systems.
Projects:
- Campus Events Portal built with React, Node.js, Express, and MongoDB. Implemented event listing, registration, and admin dashboard.
- Library SQL mini project with normalized schema, joins, indexes, and reporting queries.
- Seminar on accessibility basics and responsive UI design.
Skills: JavaScript, React, Node.js, SQL, Git, HTML, CSS.
Internship: Two-month frontend intern, fixed UI bugs and wrote component tests.`,
  },
  {
    id: "HG-ST-002",
    title: "Junior backend target match",
    candidate_type: "Employee",
    audience: ["employees", "recruiters"],
    what_it_tests: "Whether target-role mode maps Node.js, REST APIs, PostgreSQL, testing, Docker basics, and gaps against a backend JD.",
    expected_signal: "REST APIs, PostgreSQL, Docker, CI/CD gap",
    analysis_mode: "target_gap",
    name: "Meera Backend",
    target_role: "Backend Engineer",
    target_job_description:
      "We need a Backend Engineer with Node.js or Python, REST APIs, PostgreSQL, Redis, Docker, testing, CI/CD, and cloud deployment experience.",
    github_url: "https://github.com/octocat",
    project_links: ["https://github.com/octocat/Hello-World"],
    resume_text: `Meera Backend
Hyderabad, India
Education: B.E Information Science, 2022
Experience: 2 years as Software Engineer at a SaaS startup.
Work:
- Built REST APIs in Node.js and Express for customer billing workflows.
- Used PostgreSQL tables, migrations, and query optimization for reporting endpoints.
- Added Jest unit tests and Postman collections for API validation.
- Basic Docker usage for local development.
Projects: Expense API with authentication, PostgreSQL, and deployment notes.
Skills: Node.js, Express, REST APIs, PostgreSQL, JavaScript, Git, Docker basics, testing.`,
  },
  {
    id: "HG-ST-003",
    title: "Senior infrastructure baseline",
    candidate_type: "Employee",
    audience: ["employees"],
    what_it_tests: "Whether resume-first extraction captures enterprise infrastructure depth, certifications, and operations leadership.",
    expected_signal: "AIX, SUSE, PowerHA, Pacemaker, Azure, RCA",
    analysis_mode: "baseline_profile",
    name: "Suresh Infrastructure",
    target_role: "",
    target_job_description: "",
    github_url: "",
    project_links: [],
    resume_text: `Suresh Infrastructure
Pune, India
Summary: Senior infrastructure specialist with 13 years in UNIX, Linux, and enterprise operations.
Current Role: Senior Lead Infrastructure Engineer.
Experience:
- Administered IBM AIX, SUSE Linux, VIOS, HMC, NIM, and LPAR environments.
- Built and supported PowerHA, HACMP, Pacemaker, and GPFS clusters.
- Led technical health checks, vulnerability remediation, and compliance reviews.
- Managed major incidents and RCA documentation for production systems.
Certifications: ITIL V3 Foundation; IBM Certified System Expert - High Availability for AIX; Microsoft Certified Azure Administrator Associate.
Skills: AIX, SUSE Linux, PowerHA, Pacemaker, GPFS, Azure, RCA, health checks, incident management.`,
  },
  {
    id: "HG-ST-004",
    title: "Ops to Senior AI Systems transition",
    candidate_type: "Career transition",
    audience: ["employees", "recruiters"],
    what_it_tests: "Whether strong ops evidence is treated as transferable but high-priority AI gaps reduce the score.",
    expected_signal: "Direct ops match, logical transfer, Python/ML/RAG/agentic gaps",
    analysis_mode: "target_gap",
    name: "Devika AIOps Transition",
    target_role: "Senior AI Systems Engineer",
    target_job_description:
      "Design and deploy AI-driven operational intelligence systems. Required skills: Python, machine learning, statistics, anomaly detection, RAG over runbooks, agentic workflows, embeddings, vector stores, APIs, Docker, Kubernetes, observability, drift monitoring, and human-in-the-loop guardrails. Preferred: AIOps, SRE, incident systems, SAP HANA, SAP BTP, ITIL.",
    github_url: "",
    project_links: [],
    resume_text: `Devika AIOps Transition
Bangalore, India
Summary: 14 years of enterprise operations experience across AIX, Linux, Azure, SAP migrations, high-availability clusters, incident response, and RCA.
Experience:
- Senior Technical Lead for UNIX/Linux estates.
- Led major incident response, L4/L5 RCA preparation, and technical health checks.
- Built Pacemaker clusters for SAP HANA and supported PowerHA/HACMP environments.
- Azure cloud administration and migration support.
Certifications: ITIL V3, IBM High Availability for AIX, Microsoft Azure infrastructure certification.
Skills: AIX, SUSE Linux, Azure, SAP HANA operations, Pacemaker, RCA, incident management, technical health check.`,
  },
  {
    id: "HG-ST-005",
    title: "Fresher data analyst target",
    candidate_type: "Student",
    audience: ["students", "recruiters"],
    what_it_tests: "Whether student analytics projects, internship reporting, SQL, Excel, and Python basics are scored realistically.",
    expected_signal: "SQL, Excel, Python basics, dashboarding gap",
    analysis_mode: "target_gap",
    name: "Nisha Analyst",
    target_role: "Data Analyst",
    target_job_description:
      "Looking for Data Analyst with SQL, Excel, Python or R, dashboarding, business metrics, data cleaning, storytelling, and stakeholder communication.",
    github_url: "",
    project_links: [],
    resume_text: `Nisha Analyst
Chennai, India
Education: B.Sc Statistics, 2025
Projects:
- Retail sales analysis using Excel pivot tables, VLOOKUP, charts, and dashboard summary.
- SQL project with customer orders, joins, filters, and monthly revenue reports.
- Python basics with pandas for CSV cleaning and matplotlib charts.
Internship: Business analytics intern, prepared weekly KPI reports for operations team.
Skills: SQL, Excel, Python basics, pandas, statistics, presentation, data cleaning.`,
  },
  {
    id: "HG-ST-006",
    title: "Business analyst product fit",
    candidate_type: "Employee",
    audience: ["employees", "recruiters"],
    what_it_tests: "Whether non-code corporate experience is evaluated without forcing engineering-only proof.",
    expected_signal: "Requirements, stakeholder interviews, user stories, SQL basics",
    analysis_mode: "target_gap",
    name: "Rahul Business",
    target_role: "Product Business Analyst",
    target_job_description:
      "Role requires requirements gathering, stakeholder interviews, user stories, process mapping, acceptance criteria, SQL basics, dashboards, Agile ceremonies, and clear communication.",
    github_url: "",
    project_links: [],
    resume_text: `Rahul Business
Noida, India
Experience: 6 years as Business Analyst in retail and logistics domains.
Work:
- Conducted stakeholder interviews, created BRD and functional requirement documents.
- Wrote user stories, acceptance criteria, and process maps for order management workflows.
- Coordinated with engineering, QA, and product managers during Agile ceremonies.
- Built simple SQL reports and dashboard requirement documents.
Skills: Business analysis, stakeholder management, user stories, process improvement, SQL basics, Agile, communication.`,
  },
  {
    id: "HG-ST-007",
    title: "QA automation to SDET",
    candidate_type: "Employee",
    audience: ["employees", "recruiters"],
    what_it_tests: "Whether automation testing is mapped to SDET requirements and modern framework gaps are exposed.",
    expected_signal: "Selenium, API testing, defect triage, Playwright/CI gap",
    analysis_mode: "target_gap",
    name: "Pooja QA",
    target_role: "SDET",
    target_job_description:
      "SDET role requiring test automation, Playwright or Selenium, API testing, CI/CD, JavaScript or Java, test strategy, defect triage, and reliability mindset.",
    github_url: "",
    project_links: [],
    resume_text: `Pooja QA
Kochi, India
Experience: 4 years in manual and automation testing.
Work:
- Built Selenium automation scripts in Java for regression test suites.
- Performed REST API testing using Postman and wrote API assertions.
- Participated in defect triage, release sign-off, and root cause analysis for escaped defects.
- Maintained test cases, smoke tests, and regression plans.
Skills: Selenium, Java, Postman, REST API testing, test cases, regression, defect triage, Agile.`,
  },
  {
    id: "HG-ST-008",
    title: "Cloud DevOps target match",
    candidate_type: "Employee",
    audience: ["employees", "recruiters"],
    what_it_tests: "Whether DevOps evidence is matched to Linux, Azure, Docker, Kubernetes, Terraform, CI/CD, and monitoring.",
    expected_signal: "Azure, Linux, Docker, Kubernetes, Terraform, monitoring",
    analysis_mode: "target_gap",
    name: "Imran DevOps",
    target_role: "Cloud DevOps Engineer",
    target_job_description:
      "Cloud DevOps Engineer with AWS or Azure, Linux, Docker, Kubernetes, Terraform, CI/CD, monitoring, incident response, and security remediation.",
    github_url: "",
    project_links: [],
    resume_text: `Imran DevOps
Mumbai, India
Experience: 5 years in Linux administration and cloud operations.
Work:
- Managed Azure virtual machines, Linux patching, backup checks, and incident response.
- Created CI/CD pipelines using GitHub Actions for internal services.
- Used Docker for packaging services and basic Kubernetes deployments.
- Wrote Terraform modules for network and VM provisioning.
- Supported Prometheus and Grafana dashboards for infrastructure monitoring.
Skills: Azure, Linux, Docker, Kubernetes, Terraform, GitHub Actions, Prometheus, Grafana, incident response.`,
  },
  {
    id: "HG-ST-009",
    title: "Weak noisy backend applicant",
    candidate_type: "Student",
    audience: ["students", "recruiters"],
    what_it_tests: "Whether the system stays honest when the resume has weak evidence and no GitHub proof.",
    expected_signal: "Low score, high gaps, no invented backend expertise",
    analysis_mode: "target_gap",
    name: "Kiran Noisy",
    target_role: "Backend Engineer",
    target_job_description:
      "Backend Engineer requiring REST APIs, databases, backend language expertise, testing, deployment, and production debugging.",
    github_url: "",
    project_links: [],
    resume_text: `Kiran Noisy
India
Summary: Hardworking and passionate about technology. Looking for good opportunity.
Education: BCA, 2024
Experience: Fresher.
Skills: MS Office, communication, teamwork, HTML basics.
Projects: College website assignment, not deployed. No GitHub link available.
Certifications: Completed online computer basics course.`,
  },
  {
    id: "HG-ST-010",
    title: "ML researcher target match",
    candidate_type: "Student",
    audience: ["students", "recruiters"],
    what_it_tests: "Whether ML academic proof is separated from missing MLOps and production deployment proof.",
    expected_signal: "Python, statistics, model evaluation, MLOps/cloud gaps",
    analysis_mode: "target_gap",
    name: "Ananya Research",
    target_role: "Machine Learning Engineer",
    target_job_description:
      "Machine Learning Engineer with Python, statistics, ML models, model evaluation, MLOps, APIs, cloud deployment, experiment tracking, and production monitoring.",
    github_url: "",
    project_links: [],
    resume_text: `Ananya Research
Delhi, India
Education: M.Tech Data Science, 2024
Research:
- Thesis on time-series forecasting using ARIMA, XGBoost, and LSTM baselines.
- Published seminar paper on model evaluation metrics and cross-validation.
Projects:
- Python notebook for demand forecasting with pandas, scikit-learn, and error analysis.
- Flask API prototype serving a trained regression model.
Skills: Python, pandas, scikit-learn, statistics, regression, time-series forecasting, Flask, model evaluation.
Gaps: Limited Docker, Kubernetes, cloud deployment, and production monitoring experience.`,
  },
];
