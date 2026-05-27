# HireGEN Stress Test Results - 2026-05-27

**Run started:** 2026-05-27T08:41:50.100Z  
**Target:** https://hiregen-swart.vercel.app  
**Result:** 10/10 passed, 0 needs review

These cases use synthetic/JSON Resume-inspired resumes. They are safe to commit and repeat, and they avoid scraping personal resumes from the internet.

| ID | Type | Mode | HTTP | Engine | Score | High gaps | Result | Warnings |
|---|---|---|---:|---|---:|---:|---|---|
HG-ST-001 | student | baseline_profile | 200 | openai | 70 | 1 | PASS | -
HG-ST-002 | junior-developer | target_gap | 200 | openai | 70 | 2 | PASS | -
HG-ST-003 | senior-employee | baseline_profile | 200 | openai | 75 | 1 | PASS | -
HG-ST-004 | career-transition | target_gap | 200 | openai | 39 | 3 | PASS | -
HG-ST-005 | fresher | target_gap | 200 | openai | 60 | 3 | PASS | -
HG-ST-006 | business-analyst | target_gap | 200 | openai | 75 | 1 | PASS | -
HG-ST-007 | qa-automation | target_gap | 200 | openai | 65 | 2 | PASS | -
HG-ST-008 | cloud-devops | target_gap | 200 | openai | 75 | 1 | PASS | -
HG-ST-009 | weak-noisy | target_gap | 200 | openai | 21 | 3 | PASS | -
HG-ST-010 | researcher | target_gap | 200 | openai | 65 | 4 | PASS | -

## HG-ST-001 - student

- Status: 200
- Generation mode: openai
- Match score: 70
- Result: PASS
- Warnings: None
- Summary: Final-year computer science student with solid academic background in web development and database management. Experienced in building applications using popular technologies and frameworks through academic projects and an internship.
- Skills: JavaScript (80), React (75), Node.js (75), SQL (70), HTML (65), CSS (65), Git (60)
- Gaps: medium: Advanced JavaScript, medium: Backend Development with Express, high: Deployment using cloud services

## HG-ST-002 - junior-developer

- Status: 200
- Generation mode: openai
- Match score: 70
- Result: PASS
- Warnings: None
- Summary: Backend Engineer with 2 years of experience in building REST APIs, database management, and testing. Strong foundation in Node.js and PostgreSQL. Looking to enhance skills in Docker and CI/CD practices for improved cloud deployment capabilities. GitHub scan: Found 8 public repos; strongest recent repos include Hello-World, git-consortium, Spoon-Knife.
- Skills: REST APIs (85), Node.js (80), PostgreSQL (80), Live Product Portfolio (78), Git Portfolio (76), Express (75), Jest (70), Docker (60)
- Gaps: high: CI/CD, medium: Advanced Docker, medium: Redis, high: Cloud Deployment

## HG-ST-003 - senior-employee

- Status: 200
- Generation mode: openai
- Match score: 75
- Result: PASS
- Warnings: None
- Summary: Senior infrastructure specialist with extensive experience in UNIX and Linux environments, specializing in high availability and incident management.
- Skills: AIX (90), SUSE Linux (85), PowerHA (80), Incident Management (80), Pacemaker (75), Azure (75), Health Checks (75), GPFS (70)
- Gaps: high: Git/project proof packaging, medium: Infrastructure automation proof, medium: Lab Proof

## HG-ST-004 - career-transition

- Status: 200
- Generation mode: openai
- Match score: 39
- Result: PASS
- Warnings: None
- Summary: Devika AIOps Transition has strong transferable operations evidence for Senior AI Systems Engineer: UNIX/Linux, high-availability clusters, Azure/SAP operations, incident handling, and RCA. The target-role score is lower because core AI engineering requirements still need proof: Python/ML on operations data, RAG over runbooks/incidents, agentic RCA workflows, and production AI service deployment.
- Skills: UNIX/Linux operations foundation (86), HA cluster operations transfer (78), Incident/RCA operations signal (76), Cloud/SAP operations context (72), Python + ML on ops data (34), Statistics + anomaly detection (32), RAG over runbooks/incidents (30), Agentic RCA workflows (31), Production AI service deployment (40), Observability and drift monitoring (36)
- Gaps: high: Python + ML on operations data, high: RAG over runbooks and incidents, high: Agentic RCA workflow, medium: Production AI service deployment, medium: SAP AI platform context

## HG-ST-005 - fresher

- Status: 200
- Generation mode: openai
- Match score: 60
- Result: PASS
- Warnings: None
- Summary: Nisha possesses foundational skills in data analysis with experience in Excel, SQL, and Python. Currently, she is an intern focusing on business analytics but lacks advanced technical skills and real-world projects to fully meet the requirements for a Data Analyst role.
- Skills: Excel (80), SQL (70), data cleaning (70), presentation (60), Python (50), pandas (50)
- Gaps: high: Advanced SQL, high: Python (Advanced), medium: Data Visualization, medium: Stakeholder Communication, high: Project Portfolio

## HG-ST-006 - business-analyst

- Status: 200
- Generation mode: openai
- Match score: 75
- Result: PASS
- Warnings: None
- Summary: Rahul has 6 years of experience as a Business Analyst in the retail and logistics sectors, with strong skills in requirements gathering, stakeholder interviews, user stories, and Agile methodologies. He has foundational knowledge of SQL and a good track record in process mapping and communication.
- Skills: Business Analysis (85), Communication (85), Stakeholder Management (80), Process Mapping (80), Agile Ceremonies (80), User Stories (75), Acceptance Criteria (70), SQL Basics (65)
- Gaps: high: Advanced SQL Queries, medium: Data Visualization Tools, medium: Requirements Elicitation Techniques, medium: Agile Methodologies Deep Dive

## HG-ST-007 - qa-automation

- Status: 200
- Generation mode: openai
- Match score: 65
- Result: PASS
- Warnings: None
- Summary: Pooja QA has 4 years of experience in both manual and automation testing. Her expertise includes building automation scripts using Selenium in Java, performing REST API testing, and participating in core testing activities like defect triage and root cause analysis.
- Skills: Selenium (80), Java (75), Postman (70), REST API testing (70), Defect Triage (60), Test Strategy (55)
- Gaps: high: Playwright, high: CI/CD, medium: JavaScript, medium: Test Strategy

## HG-ST-008 - cloud-devops

- Status: 200
- Generation mode: openai
- Match score: 75
- Result: PASS
- Warnings: None
- Summary: Imran has 5 years of experience in Linux administration and cloud operations, primarily focused on Azure. He has worked on CI/CD pipelines, containerization using Docker, and infrastructure as code with Terraform. He also has experience with monitoring solutions like Prometheus and Grafana.
- Skills: Azure (80), Linux (70), Terraform (70), CI/CD (70), Incident Response (70), Docker (60), Prometheus (60), Grafana (60), Kubernetes (50)
- Gaps: high: Advanced Kubernetes management, medium: Cloud Security Remediation, medium: Monitoring and Incident Response, medium: CI/CD Best Practices, medium: Terraform Advanced Features

## HG-ST-009 - weak-noisy

- Status: 200
- Generation mode: openai
- Match score: 21
- Result: PASS
- Warnings: None
- Summary: Hardworking and passionate about technology. Looking for good opportunity as a Backend Engineer.
- Skills: MS Office (50), Communication (50), Teamwork (50), HTML Basics (30)
- Gaps: high: REST APIs, high: Database Management, high: Backend Programming Languages, medium: Testing and Debugging, medium: Deployment Practices

## HG-ST-010 - researcher

- Status: 200
- Generation mode: openai
- Match score: 65
- Result: PASS
- Warnings: None
- Summary: Ananya is an aspiring Machine Learning Engineer with a solid foundation in data science, particularly in time-series forecasting and model evaluation. She possesses practical experience with Python libraries such as pandas and scikit-learn but has significant gaps in essential skills for transitioning into a production-oriented role in machine learning.
- Skills: Python (80), time-series forecasting (80), pandas (70), scikit-learn (70), model evaluation (70), statistics (60), regression (60), Flask (50)
- Gaps: high: Docker, high: Kubernetes, high: Cloud Deployment, high: Production Monitoring

